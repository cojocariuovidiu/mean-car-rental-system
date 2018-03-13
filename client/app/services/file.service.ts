import { Injectable } from "@angular/core";
import { AppConfigService } from "./utility/appConfig.service";


@Injectable()
export class FileService {

    public vehicleFileApi;

    constructor(private appConfig: AppConfigService) {
    }
}