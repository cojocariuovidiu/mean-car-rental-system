import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import VehicleModel from "../models/vehicle/vehicle.model";
import PagedResult from "../models/misc/pagedResult";
import { AppConfigService } from "./utility/appConfig.service";
import ColorModel from "../models/vehicle/color.model";
import BrandModel from "../models/vehicle/brand.model";
import { UserService } from "./user.service";
import FeatureModel from "../models/vehicle/feature.model";

@Injectable()
export class VehicleFeatureService {
    constructor(private http: HttpClient, private appConfigService: AppConfigService, private userService: UserService) { }


    getAll(): Observable<Array<FeatureModel>> {
        return this.http.get<Array<FeatureModel>>(
            this.appConfigService.apiRoot + "/vehicleFeature/all",
            { headers: this.userService.authHeader });
    }
}