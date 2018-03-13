import { ActivatedRoute } from "@angular/router";
import { OnInit, Component } from "@angular/core";

@Component({
    selector: "vehicleAdd",
    styleUrls: ["vehicleAdd.component.css"],
    templateUrl: "vehicleAdd.component.html"
})
export class VehicleAddComponent implements OnInit {
    index: number;
    active: boolean;
    title: string;
    params: { [key: string]: any; };

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {

    }
}