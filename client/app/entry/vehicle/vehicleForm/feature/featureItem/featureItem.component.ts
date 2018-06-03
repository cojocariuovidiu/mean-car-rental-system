import { Component, Input, Output, EventEmitter } from "@angular/core";
import VehicleFeatureModel from "../../../../../models/vehicle/vehicleFeature.model";
import { ControlValueAccessor } from "@angular/forms";

@Component({
    selector: "feature-item",
    styleUrls: ["featureItem.component.css"],
    templateUrl: "featureItem.component.html"
})
export class FeatureItemComponent {



    @Input()
    public value: VehicleFeatureModel;

    @Output()
    public remove: EventEmitter<FeatureItemComponent> = new EventEmitter<FeatureItemComponent>();
    @Output()
    public outstandingChecked: EventEmitter<FeatureItemComponent> = new EventEmitter<FeatureItemComponent>();


    itemRemove(event: MouseEvent) {

        this.remove.emit(this);
    }

    outstandingChange(event: Event) {
        var checked = (event.currentTarget as HTMLInputElement).checked;
        this.value.outstanding = checked;
        this.outstandingChecked.emit(this);
    }
}