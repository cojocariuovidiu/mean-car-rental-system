import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EntryComponent } from './entry/entry.component';
import { LoginComponent } from './login/login.component';
import { VehicleAddComponent } from './entry/vehicle/vehicleAdd/vehicleAdd.component';
import { VehicleEditComponent } from './entry/vehicle/vehicleEdit/vehicleEdit.component';
import { VehicleDetailComponent } from './entry/vehicle/vehicleDetail/vehicleDetail.component';
import { AuthGuardService } from './routeGuards/authGuard.service';


const appRoutes: Routes = [

    {
        path: 'uygulamagiris',
        component: LoginComponent
    },
    {
        path: 'uygulama',
        component: EntryComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }