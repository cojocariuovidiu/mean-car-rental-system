import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "./services/user.service";
import { SpinnerService } from "./services/utility/spinner.service";

declare var $: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private spinnerService: SpinnerService
    ) {
        // if (!userService.user)
        //     this.router.navigateByUrl('uygulamagiris');
        // else
        // this.router.navigateByUrl('uygulama');
    }

}

