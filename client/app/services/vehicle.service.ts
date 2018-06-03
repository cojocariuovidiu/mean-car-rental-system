import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import VehicleModel from "../models/vehicle/vehicle.model";
import PagedResult from "../models/misc/pagedResult";
import { AppConfigService } from "./utility/appConfig.service";
import ColorModel from "../models/vehicle/color.model";
import BrandModel from "../models/vehicle/brand.model";
import { UserService } from "./user.service";

@Injectable()
export class VehicleService {
    public vehicleFileApi;

    constructor(private http: HttpClient, private appConfigService: AppConfigService, private userService: UserService) {

        this.vehicleFileApi = appConfigService.apiRoot + "/vehicle/file";
    }

    getPaged(current: number, take: number, sort: { [key: string]: 0 | 1 | -1 | undefined | null }): Observable<PagedResult<VehicleModel>> {
        return this.http
            .post<PagedResult<VehicleModel>>(
                this.appConfigService.apiRoot + "/vehicle/paged",
                { skip: current, limit: take, sort: sort },
                { headers: this.userService.authHeader }
            );
    }

    getByNumber(vehicleNumber: number): Observable<VehicleModel> {
        return this.http.get<VehicleModel>(
            this.appConfigService.apiRoot + "/vehicle/byNumber/" + vehicleNumber,
            { headers: this.userService.authHeader }
        );
    }

    getColors(): Observable<Array<ColorModel>> {
        return this.http.get<Array<ColorModel>>(
            this.appConfigService.apiRoot + "/color/all",
            { headers: this.userService.authHeader });
    }

    getBrands(): Observable<Array<BrandModel>> {
        return this.http.get<Array<BrandModel>>(
            this.appConfigService.apiRoot + "/brand/all",
            { headers: this.userService.authHeader });
    }

    add(vehicleModel: VehicleModel): Observable<VehicleModel> {
        return this.http.post<VehicleModel>(
            this.appConfigService.apiRoot + "/vehicle/add",
            vehicleModel,
            { headers: this.userService.authHeader });
    }


    update(vehicleModel: VehicleModel): Observable<null> {
        return this.http.post<null>(
            this.appConfigService.apiRoot + "/vehicle/update",
            vehicleModel,
            { headers: this.userService.authHeader });
    }
}