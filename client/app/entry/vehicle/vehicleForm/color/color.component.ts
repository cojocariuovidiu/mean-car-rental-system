import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import ColorModel from "../../../../models/vehicle/color.model";
import { SpinnerService } from "../../../../services/utility/spinner.service";
import { VehicleService } from "../../../../services/vehicle.service";


@Component({
    templateUrl: "color.component.html",
    selector: "color",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ColorComponent)
        }
    ]
})
export class ColorComponent implements ControlValueAccessor {

    public value: ColorModel;
    public selectedValue: string;

    public colors: ColorModel[];

    constructor(private vehicleService: VehicleService, private spinnerService: SpinnerService) {

        this.selectedValue = null;

        spinnerService.subscribe();
        vehicleService.getColors().subscribe(x => {
            this.colors = x;
            spinnerService.unsubscribe();
        });
    }

    private onChange: (any) => void;
    private onTouched: () => void;
    public disabled: boolean;

    writeValue(obj: any): void {
        this.value = obj;
        this.selectedValue = this.value ? this.value._id : null;
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

    onColorChange(event: Event) {
        var elem = event.currentTarget as HTMLSelectElement;
        var selectedIndex = elem.selectedIndex;
        var selectedOption = elem.options[selectedIndex];
        var selectedValue = selectedOption.value;

        if (selectedValue) {

            var selectedColor = this.colors.find(x => x._id === selectedValue);

            this.value = selectedColor;

        } else {
            this.value = null;
        }
        this.onChange(this.value);
    }

}