import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonUtilityService } from "../../services/utility/commonUtility.service";


@Component({
    template: "<input class='form-control form-control-sm' [(ngModel)]='selectedDate' (change)='onDateChange()' type='date'/>",
    selector: "datepicker",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => DatePickerComponent)
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor {

    public selectedDate: string;

    public value: Date;


    public onChanged: (any) => void;
    public onTouched: () => void;

    public disabled: boolean;

    writeValue(obj: any): void {
        this.value = obj;
        this.selectedDate = this.commonUtility.formatDate(this.value, "YYYY-MM-DD");
    }
    registerOnChange(fn: any): void {
        this.onChanged = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onDateChange() {
        this.value = new Date(this.selectedDate);
        this.onChanged(this.value);
        console.log('on date change');
    }

    constructor(private commonUtility: CommonUtilityService) {

    }
}