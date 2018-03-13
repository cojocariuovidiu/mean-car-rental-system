import { Component, HostListener, ComponentRef, ComponentFactoryResolver, OnInit, AfterViewInit, AfterViewChecked, OnChanges, SimpleChanges, ApplicationRef } from "@angular/core";
import { SpinnerService } from "../services/utility/spinner.service";
import { Router } from "@angular/router";
import { VehicleAddComponent } from "./vehicle/vehicleAdd/vehicleAdd.component";
import { HomeComponent } from "./home/home.component";
import { AppConfigService } from "../services/utility/appConfig.service";
import { UserService } from "../services/user.service";

@Component({
    selector: 'app-entry',
    templateUrl: 'entry.component.html',
    styleUrls: ['entry.component.css']
})
export class EntryComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
    ngOnChanges(changes: SimpleChanges): void {

    }
    ngAfterViewChecked(): void {

    }
    ngAfterViewInit(): void {

    }
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private appConfigService: AppConfigService,
        public spinnerService: SpinnerService,
        private applicationRef: ApplicationRef,
        private userService: UserService) {


    }

    ngOnInit(): void {
        this.spinnerService.subscribe();

        this.userService.getExistingUser().subscribe(
            x => {
                this.spinnerService.unsubscribe();
                if (!x)
                    this.router.navigateByUrl("uygulamagiris");
            },
            error => {
                this.router.navigateByUrl("uygulamagiris");
            });
    }

}