import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpResponse } from "@angular/common/http";
import VehicleModel from "../../../models/vehicle/vehicle.model";
import { VehicleService } from "../../../services/vehicle.service";

@Component({
    styleUrls: ["vehicleEdit.component.css"],
    selector: "vehicleEdit",
    templateUrl: "vehicleEdit.component.html"
})
export class VehicleEditComponent implements OnInit {

    index: number;
    active: boolean;
    title: string;
    params: { [key: string]: any; };

    public vehicleModel: VehicleModel = {};
    constructor(
        private activatedRoute: ActivatedRoute,
        private vehicleService: VehicleService
    ) {

        var vehicleNumber = this.activatedRoute.snapshot.params["number"];

        vehicleService.getByNumber(vehicleNumber).subscribe(x => {
            this.vehicleModel = x;
        });
    }

    ngOnInit(): void {

    }
}