import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";


@Component({
    templateUrl: "gearType.component.html",
    selector: "gearType",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => GearTypeComponent)
        }
    ]
})
export class GearTypeComponent implements ControlValueAccessor {

    constructor() {
        this._value = null;
    }

    public _value: 0 | 1 | undefined | null;

    private onChange: (any) => void;
    private onTouched: () => void;

    public disabled: boolean;

    writeValue(obj: any): void {
        this._value = obj;
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

    radioChange(event: Event) {
        var elem = event.currentTarget as HTMLInputElement;
        var value = elem.value;

        this.onChange(value);
    }


}