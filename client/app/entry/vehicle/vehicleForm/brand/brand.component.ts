import { Component, Output, EventEmitter, ViewChild, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import BrandModel from "../../../../models/vehicle/brand.model";
import { VehicleService } from "../../../../services/vehicle.service";
import { SpinnerService } from "../../../../services/utility/spinner.service";

@Component({
    selector: "brand",
    templateUrl: "brand.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => BrandComponent),
        }
    ]
})
export class BrandComponent implements ControlValueAccessor {

    public selectedValue: string;

    private onChange: (any) => void;
    private onTouched: () => void;
    public disabled: boolean;

    public value: BrandModel;
    public brands: BrandModel[];

    writeValue(obj: any): void {
        this.value = obj;
        this.selectedValue = this.value ? this.value._id : null;
        if (this.onChange)
            this.onChange(this.value);
        // this.change.emit(this.value);
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

    constructor(private vehicleService: VehicleService, private spinnerService: SpinnerService) {
        this.selectedValue = null;
        spinnerService.subscribe();
        vehicleService.getBrands().subscribe(x => {
            this.brands = x;
            spinnerService.unsubscribe();
        });
    }


    // @Output()
    // public change: EventEmitter<BrandModel> = new EventEmitter<BrandModel>();

    onBrandChange(event: Event) {

        var elem = <HTMLSelectElement>event.currentTarget;
        var selectedIndex = elem.selectedIndex;
        var selectedOption = elem.options[selectedIndex];
        var selectedValue = selectedOption.value;

        if (selectedValue) {

            var selectedBrand = this.brands.find(x => {
                return x._id === selectedValue;
            });
            this.value = selectedBrand;

        } else {
            this.value = null;
        }
        this.onChange(this.value);
    }

    onBlur() {
        this.onTouched();
    }
}