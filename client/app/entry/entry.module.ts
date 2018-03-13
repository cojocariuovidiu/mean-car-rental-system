

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './entry.component';
import { VehicleModule } from './vehicle/vehicle.module';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { FileService } from '../services/file.service';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        BrowserModule,
        VehicleModule,

    ],
    exports: [
        RouterModule
    ],
    declarations: [
        EntryComponent,
        HomeComponent
    ],
    entryComponents: [
        HomeComponent
    ]
})
export class EntryModule { }