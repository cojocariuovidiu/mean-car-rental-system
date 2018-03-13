import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import VehicleModel from "../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../services/vehicle.service";

declare var _: any;

@Component({
    selector: "vehicleDetail",
    styleUrls: ["vehicleDetail.component.css"],
    templateUrl: "vehicleDetail.component.html"
})
export class VehicleDetailComponent {
    index: number;
    active: boolean;
    title: string;
    params: { [key: string]: any; };

    private vehicleModel: VehicleModel;
    constructor(
        private activatedRoute: ActivatedRoute,
        private vehicleService: VehicleService
    ) {

    }

    ngOnInit(): void {

    }
}