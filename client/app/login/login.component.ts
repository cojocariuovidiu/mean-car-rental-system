import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { SpinnerService } from "../services/utility/spinner.service";

@Component({
    selector: "app-login",
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html'
})
export class LoginComponent {

    public loginForm: FormGroup;

    constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private spinnerService: SpinnerService) {

        this.loginForm = formBuilder.group(
            {
                username: [],
                password: [],
                remember: []
            }
        )

    }

    public loginError: string;
    loginClick(event: MouseEvent) {

        this.loginError = "";
        this.spinnerService.subscribe();


        this.userService.login(this.loginForm.value)
            .subscribe(
                (value) => { // if this block login is successfull and can redirect to main page

                    this.spinnerService.unsubscribe();
                    this.router.navigateByUrl("uygulama");
                },
                (error) => {
                    this.spinnerService.unsubscribe();
                    this.loginError = error.error;
                });

    }



}