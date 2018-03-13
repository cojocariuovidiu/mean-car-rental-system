import { Component } from "@angular/core";
import { VehicleFeatureService } from "../../../../services/vehicleFeature.service";
import FeatureModel from "../../../../models/vehicle/feature.model";
import { SpinnerService } from "../../../../services/utility/spinner.service";

@Component({
    templateUrl: "feature.component.html",
    styleUrls: ["feature.component.css"],
    selector: "feature"
})
export class FeatureComponent {


    public features: FeatureModel[];

    constructor(private spinnerService: SpinnerService, private vehicleFeatureService: VehicleFeatureService) {

        this.spinnerService.subscribe();
        vehicleFeatureService.getAll().subscribe(x => {

            this.features = x;

            this.spinnerService.unsubscribe();
        });

    }

}