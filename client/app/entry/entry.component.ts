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

    public selectedMenu: any;
    public menus: any = [
        {
            name: "Araç",
            faIconClass: "car",
            subMenus: [

                {
                    name: "Araç Listesi",
                    target: "araclar"
                },
                {
                    name: "Araç Ekle",
                    target: "arac-ekle"
                }
            ]
        },
        {
            name: "Müşteri",
            faIconClass: "user-circle",
            subMenus: [

                {
                    name: "Müşteri Ekle",
                    target: "uygulama/araclar"
                },
                {
                    name: "Müşteri Listesi",
                    target: "uygulama/arac-ekle"
                },
                {
                    name: "Müşteri Görüşme Ekranı",
                    target: "uygulama/arac-ekle"
                }
            ]
        },
        {
            name: "Muhasebe",
            faIconClass: "calculator",
            subMenus: [

                {
                    name: "Borç Ekleme",
                    target: "uygulama/araclar"
                },
                {
                    name: "Borç Listesi",
                    target: "uygulama/arac-ekle"
                },
                {
                    name: "Tahsilat Ekleme",
                    target: "uygulama/araclar"
                },
                {
                    name: "Tahsilat Listesi",
                    target: "uygulama/arac-ekle"
                },
                {
                    name: "Cari Hesap Ekstresi",
                    target: "uygulama/araclar"
                }
            ]
        }
    ]


    public selectMenu(menu: any) {
        if (this.selectedMenu != null) {
            if (this.selectedMenu === menu)
                this.selectedMenu = null;
            else
                this.selectedMenu = menu;

        } else {
            this.selectedMenu = menu;

        }
        console.log(menu);
    }

    public submenuClick() {
        this.selectedMenu = null;
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