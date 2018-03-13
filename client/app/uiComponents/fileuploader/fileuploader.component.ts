import { Component, ViewChild, ElementRef, Input, ApplicationRef, QueryList, ViewChildren, forwardRef } from "@angular/core";
import { HttpClient, HttpRequest, HttpEventType } from "@angular/common/http";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import FileModel from "../../models/vehicle/file.model";

@Component({
    selector: "fileuploader",
    styleUrls: ["fileuploader.component.css"],
    templateUrl: "fileuploader.component.html",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => FileUploaderComponent)
    }]
})
export class FileUploaderComponent implements ControlValueAccessor {

    public uploading: number = 0;

    private valueFiles: FileModel[] = [];


    private onChange: (any) => void;
    private propogateTouch: (any) => void;
    private disabled: boolean;
    writeValue(obj: any): void {
        this.valueFiles = obj || [];
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.propogateTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    public fileIcons: any = {
        "text/html": "fa-file-text-o",
        "image/jpeg": "fa-file-image-o",
        "image/png": "fa-file-image-o",
        "application/x-zip-compressed": "fa-file-zip-o",
        "application/pdf": "fa-file-pdf-o",
        "text/plain": "fa-file-text-o",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "fa-file-word-o",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "fa-file-word-o",
        "application/vnd.ms-excel": "fa-file-word-o",
        "application/msword": "fa-file-word-o",
        "video/mpeg": "fa-file-movie-o",
        "0": "fa-file"
    };


    constructor(private httpClient: HttpClient, private appRef: ApplicationRef) {

    }

    public fileList: CustomFileList = new CustomFileList();
    @ViewChildren("fileBox")
    public fileBoxList: QueryList<ElementRef>;

    @Input()
    public fileApiUrl = "";

    @Input()
    public entityId = "";

    @ViewChild("fileUploader")
    public fileUploader: ElementRef;

    fileClick(event: MouseEvent) {
        this.fileUploader.nativeElement.click();
    }

    filesChange(event: Event) {
        var nativeElement = this.fileUploader.nativeElement;

        if (nativeElement && nativeElement.files && nativeElement.files.length > 0) {

            for (var i = 0; i < nativeElement.files.length; i++) {
                var file = nativeElement.files[i];
                this.fileList.files.push(file);
                nativeElement.value = "";
            }

        }
    }


    uploadFiles(event: Event) {
        if (!this.fileApiUrl || this.fileApiUrl == "")
            return;

        for (let i = 0; i < this.fileList.length; i++) {
            let formData = new FormData();
            let file = this.fileList.files[i];

            // exception, accessing dom directly
            let progressBar = this.fileBoxList.toArray()[i].nativeElement.querySelector(".progress-bar");


            formData.append("file" + i, file);
            this.uploading++;

            let request = new HttpRequest("POST", this.entityId ? this.fileApiUrl + "/" + this.entityId : this.fileApiUrl, formData, { reportProgress: true });

            this.httpClient.request(request).subscribe(x => {
                if (x.type === HttpEventType.UploadProgress) {

                    progressBar["style"].width = ((x.loaded / x.total * 100)).toFixed(0) + "%";


                } else if (x.type === HttpEventType.Response) {
                    // console.log("response body:" + x.body)
                    // let fileId = x.body;

                    console.log(x.body);
                    this.valueFiles.push(<FileModel>x.body);
                    this.onChange(this.valueFiles);
                    this.fileList.files.splice(this.fileList.files.indexOf(file), 1);

                    this.uploading--;

                } else {
                    // console.log(x)
                }
            });

        }
    }


    clearFiles() {
        this.fileList.files = [];
    }

    removeFileFromList(file: File) {
        this.fileList.files.splice(this.fileList.files.indexOf(file), 1);
    }

}


export class CustomFileList {
    public formData: FormData = new FormData();

    public files: File[] = [];

    public get length(): number {
        return this.files.length;
    }

    constructor() {

    }
}