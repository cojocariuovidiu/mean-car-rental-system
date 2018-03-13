import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "./utility/appConfig.service";
import { DEFAULT_INTERPOLATION_CONFIG } from "@angular/compiler";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class UserService {

    public readonly tokenCookieKey = "app-auth-token";

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    setCookie(name) {

    }

    public get token() {
        return this.getCookie(this.tokenCookieKey);
    }
    public get authHeader() {
        var obj = {};
        obj[this.tokenCookieKey] = this.getCookie(this.tokenCookieKey);
        return obj;
    }
    public user: any;
    constructor(private httpClient: HttpClient, private appConfig: AppConfigService) {
    }


    public login(userInfo: { username: string, password: string, remember: boolean }) {

        return new Observable(observer => {

            this.httpClient.post(this.appConfig.publicApiRoot + "/appLogin", userInfo, { observe: "response" })
                .subscribe(
                    x => {

                        if (x.status === 200) { // if status 200 response must contain token

                            observer.next(x.body);
                            observer.complete();
                        }

                    },
                    error => {
                        observer.error(error);
                    });
        });
    }

    public logout() {
        this.user = null;
    }


    public getExistingUser(): Observable<any> {
        return new Observable(observer => {

            if (this.user) { // if user already set
                console.log("user already set");
                observer.next(this.user);
                observer.complete();
            } else {
                var token = this.getCookie(this.tokenCookieKey);

                if (token) {
                    this.httpClient.get(this.appConfig.publicApiRoot + "/user/" + token)
                        .subscribe(
                            x => { // x must be user info 
                                this.user = x;
                                observer.next(this.user);
                                observer.complete();
                            },
                            error => {
                                observer.error(error.message);
                            });

                } else {
                    observer.next(null);
                    observer.complete();
                }

            }

        });


    }

}