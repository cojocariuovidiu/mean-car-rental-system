import { Component, Input, forwardRef, EventEmitter, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { CommonUtilityService } from "../../../../../services/utility/commonUtility.service";

@Component({
    selector: "plateitem",
    styleUrls: ["plateItem.component.css"],
    templateUrl: "plateItem.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => PlateItemComponent),
        }
    ]
})
export class PlateItemComponent implements ControlValueAccessor {

    public plateHistoryForm: FormGroup;

    constructor(private commonUtility: CommonUtilityService, private fb: FormBuilder) {

        this.plateHistoryForm = this.fb.group({
            "dateFrom": [null, [Validators.required, Validators]],
            "plate": [null, [Validators.required, Validators.pattern(this.commonUtility.vehiclePlatePattern), Validators.maxLength(8)]]
        });
    }

    private _tmpDateFrom;
    private _tmpPlate;

    @Output()
    public blur: EventEmitter<null> = new EventEmitter<null>();

    @Input()
    public set setValue(val: { plate: string; dateFrom: Date }) {
        this._plate = val.plate;
        this._dateFrom = val.dateFrom;
        this.plateHistoryForm.patchValue({ "dateFrom": this.dateFrom, "plate": this.plate });

        if (this.onChange)
            this.onChange(val);
    }

    private _dateFrom;
    public set dateFrom(val: Date) {
        this._dateFrom = val;
        this.plateHistoryForm.patchValue({ "dateFrom": this.dateFrom });
        if (this.onChange)
            this.onChange({ plate: this._plate, dateFrom: this._dateFrom });
    }
    public get dateFrom(): Date {
        return this.commonUtility.formatDate(this._dateFrom, 'YYYY-MM-DD');
    }

    private _plate;
    public set plate(val: string) {
        this._plate = val;
        this.plateHistoryForm.patchValue({ "plate": this.plate });
        if (this.onChange)
            this.onChange({ plate: this._plate, dateFrom: this._dateFrom });

    }
    public get plate(): string {
        return this._plate;
    }

    private onChange: (any) => void;
    private onTouched: () => void;
    private disabled: boolean;
    private touched: boolean = false;

    writeValue(obj: any): void {
        this._plate = obj.plate;
        this._dateFrom = obj.dateFrom;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    setTouched() {
        if (!this.touched) {
            this._tmpDateFrom = this._dateFrom;
            this._tmpPlate = this._plate;
            this.touched = true;
        }
    }

    onPlateBlur() {
        this.setTouched();
        if (this.onTouched) {
            this.onTouched();
            this.blur.emit();
        }
    }

    onDateBlur() {
        this.setTouched();
        if (this.onTouched) {
            this.onTouched();
            this.blur.emit();
        }
    }

    onCancelClick(event: MouseEvent) {
        this.plate = this._tmpPlate;
        this.dateFrom = this._tmpDateFrom;
        this.touched = false;
    }
}