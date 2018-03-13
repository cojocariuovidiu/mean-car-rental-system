import { Component, forwardRef, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormControl, FormBuilder, Validators, NG_ASYNC_VALIDATORS } from "@angular/forms";
import PlateModel from "../../../../models/vehicle/plate.model";
import { CommonUtilityService } from "../../../../services/utility/commonUtility.service";

declare var _: any;
declare var moment: any;

@Component({
    selector: "plate",
    styleUrls: ["plate.component.css"],
    templateUrl: "plate.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => PlateCompoent),
        }
    ]
})
export class PlateCompoent implements ControlValueAccessor {


    public plate: string;
    public dateFrom: Date;

    public newPlateHistoryForm: FormGroup;

    _tmpPlateHistory: PlateModel[];

    _plateHistory: PlateModel[];
    public set plateHistory(value: PlateModel[]) {

        this._plateHistory = _.sortBy(value, (x) => {
            return x.dateFrom;
        });
    }
    public get plateHistory() {
        return this._plateHistory;
    }

    public pushPlateHistory(value: PlateModel) {
        this._plateHistory.push(value);
        this.plateHistory = this._plateHistory;

        this.onChange(this._plateHistory);
    }

    constructor(private commonUtility: CommonUtilityService, private fb: FormBuilder) {

        this.newPlateHistoryForm = this.fb.group({
            "plate": [null, [Validators.required, Validators.pattern(commonUtility.vehiclePlatePattern)]],
            "dateFrom": [null, Validators.required]
        });
    }

    public onChange: any;
    public onTouched: any;
    public disabled: boolean;

    public editMode: boolean = false;


    writeValue(obj: any): void {
        this.plateHistory = <PlateModel[]>obj;
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

    addingInvalidState: boolean = false;

    addClick(event: MouseEvent) {
        this.addingInvalidState = false;
        if (this.newPlateHistoryForm.valid) {
            this.pushPlateHistory(this.newPlateHistoryForm.value);
            this.newPlateHistoryForm.controls.plate.reset();
            this.newPlateHistoryForm.controls.dateFrom.reset();
        } else {
            this.addingInvalidState = true;
        }
    }

    dateFromBlur() {
        this.onTouched();
    }

    plateBlur() {
        this.onTouched();
    }

    itemsBlur() {
        this.onTouched();
    }
}