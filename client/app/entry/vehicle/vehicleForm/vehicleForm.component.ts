import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import ColorModel from "../../../models/vehicle/color.model";
import BrandModel from "../../../models/vehicle/brand.model";
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from "@angular/forms";
import VehicleModel from "../../../models/vehicle/vehicle.model";
import { SpinnerService } from "../../../services/utility/spinner.service";
import { VehicleService } from "../../../services/vehicle.service";
import { AppConfigService } from "../../../services/utility/appConfig.service";
import { FileService } from "../../../services/file.service";
import { CommonUtilityService } from "../../../services/utility/commonUtility.service";

@Component({
    selector: 'vehicleForm',
    templateUrl: 'vehicleForm.component.html',
    styleUrls: ['vehicleForm.component.css']
})
export class VehicleFormComponent implements OnInit {

    ngOnInit(): void {


    }

    selectedBrand: BrandModel = null;


    public _vehicleModel: VehicleModel = {};
    @Input()
    public set vehicleModel(val: VehicleModel) {
        this._vehicleModel = val;

        if (this.vehicleForm) {
            this.vehicleForm.patchValue(
                this._vehicleModel
            )

            let brandModelUpdated = false;
            this.spinnerService.subscribe();
            setInterval(x => {
                if (!brandModelUpdated && !!this.vehicleForm.controls.brand) {

                    this.vehicleForm.patchValue({ brandModel: this._vehicleModel.brandModel });
                    brandModelUpdated = true;
                    this.spinnerService.unsubscribe();
                }

            }, 1000);


        }
    }
    public get vehicleModel() {
        return this._vehicleModel;
    }

    public vehicleForm: FormGroup;

    constructor(
        private appConfig: AppConfigService,
        private activatedRoute: ActivatedRoute,
        private vehicleService: VehicleService,
        private spinnerService: SpinnerService,
        private fb: FormBuilder,
        private commonUtility: CommonUtilityService
    ) {

        this.vehicleForm = this.fb.group({
            "plateHistory": [null, Validators.required],
            "modelYear": [],
            "registrationDocumentNumber": [],
            "registrationDate": [],
            "kmStatus": [null, Validators.required],
            "nextExaminationDate": [],
            "trafficInsurenceEndDate": [],
            "vehicleInsurenceEndDate": [],
            "ogsLabelNumber": [],
            "warning": [],
            "description": [],
            "isSold": [],
            "saleInfo": this.fb.group({
                "saleDate": [],
                "saleKm": [],
                "saledPerson": [],
                "saleAmount": []
            }),
            "engineNumber": [],
            "chassisNumber": [],
            "tapeCode": [],
            "brand": [null, Validators.required],
            "brandModel": [null, Validators.required],
            "color": [],
            "gearType": [],
            "seatCount": [],
            "enginePower": [],
            "horsePower": [],
            "files": []
        });
    }

    private errorMessages = "";
    saveVehicle(event: MouseEvent) {
        if (this.vehicleModel && this.vehicleModel._id) {

        } else {

            console.log(this.vehicleForm);

            this.spinnerService.subscribe();

            this.vehicleService.add(<VehicleModel>this.vehicleForm.value)
                .subscribe(x => {
                    this.spinnerService.unsubscribe();
                });

        }
    }

}