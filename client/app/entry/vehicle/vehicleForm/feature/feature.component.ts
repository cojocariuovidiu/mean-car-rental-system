import { Component, forwardRef } from "@angular/core";
import { VehicleFeatureService } from "../../../../services/vehicleFeature.service";
import FeatureModel from "../../../../models/vehicle/feature.model";
import { SpinnerService } from "../../../../services/utility/spinner.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import VehicleFeatureModel from "../../../../models/vehicle/vehicleFeature.model";
import { FeatureItemComponent } from "./featureItem/featureItem.component";

@Component({
    templateUrl: "feature.component.html",
    styleUrls: ["feature.component.css"],
    selector: "feature",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => FeatureComponent)
    }]
})
export class FeatureComponent implements ControlValueAccessor {

    public selected: { name: string; value: string; };

    public value: VehicleFeatureModel[] = [];

    private onChange: (any) => void;
    private onTouched: () => void;
    private disabled: boolean;

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

    public features: FeatureModel[];



    constructor(private spinnerService: SpinnerService, private vehicleFeatureService: VehicleFeatureService) {

        this.spinnerService.subscribe();
        vehicleFeatureService.getAll().subscribe(x => {

            this.features = x;

            this.spinnerService.unsubscribe();
        });



    }


    onItemRemoved(event: FeatureItemComponent) {
        this.value.splice(this.value.indexOf(event.value), 1);
        this.onChange(this.value);
    }


    addClick(event: MouseEvent) {
        if (!this.selected)
            return;
        var selectedFeature = this.features.find(x => x._id === this.selected.value);
        if (!this.value)
            this.value = [];

        var exists = this.value.find(x => x.feature._id === selectedFeature._id);

        if (!exists) {
            this.value.push({ feature: selectedFeature });
            this.onChange(this.value);
        }
        this.selected = null;

    }

    onOutstandingChecked(event: FeatureItemComponent) {
        this.onChange(this.value);
    }

}