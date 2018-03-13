import { Component, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import BrandModel from "../../../../models/vehicle/brand.model";


@Component({
    selector: "brandModel",
    templateUrl: "brandModel.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => BrandModelComponent),
        }
    ]
})
export class BrandModelComponent implements ControlValueAccessor {


    private _brandModels: BrandModel[];
    @Input()
    public set brandModels(value: BrandModel[]) {

        this.value = null;
        this._brandModels = value;
    }

    private _value: BrandModel;
    public set value(val: BrandModel) {
        this._value = val;
        this.selectedValue = val ? val._id : null;
        if (this.onChange)
            this.onChange(this._value);
    }
    public selectedValue: string = null;

    private onChange: (any) => void;
    private onTouched: () => void;

    public disabled: boolean;


    writeValue(obj: any): void {
        this.value = obj;
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

    onBrandModelChange(event: Event) {
        var elem = event.currentTarget as HTMLSelectElement;
        var selectedIndex = elem.selectedIndex;
        var selectedOption = elem.options[selectedIndex];
        var selectedValue = selectedOption.value;

        if (selectedValue) {

            var selectedBrandModel = this._brandModels.find(x => x._id === selectedValue);

            this.value = selectedBrandModel;

        } else {
            this.value = null;
        }
    }

    onBlur() {
        this.onTouched();
    }
}