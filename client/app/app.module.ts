import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app.routing.module";
import { EntryModule } from "./entry/entry.module";
import { AppConfigService } from "./services/utility/appConfig.service";
import { VehicleService } from "./services/vehicle.service";
import { SpinnerService } from "./services/utility/spinner.service";
import { CommonUtilityService } from "./services/utility/commonUtility.service";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { PaginatorComponent } from "./uiComponents/paginator/paginator.component";
import { UpperCaseLetterAndNumberDirective } from "./directives/uppercase.directive";
import { UserService } from "./services/user.service";
import { VehicleFeatureService } from "./services/vehicleFeature.service";



@NgModule({
    declarations:
        [
            AppComponent,
            LoginComponent,
            PaginatorComponent
        ],
    imports:
        [
            BrowserModule,
            CommonModule,
            HttpClientModule,
            FormsModule,
            ReactiveFormsModule,
            AppRoutingModule,
            EntryModule,
        ],
    providers:
        [
            AppConfigService,
            VehicleService,
            SpinnerService,
            CommonUtilityService,
            UserService,
            VehicleFeatureService
        ],
    bootstrap: [AppComponent]
})
export class AppModule {

}