import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { UserService } from "../services/user.service";
import { SpinnerService } from "../services/utility/spinner.service";

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private userService: UserService, private spinnerService: SpinnerService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {


        this.spinnerService.subscribe();

        return new Observable(observer => {

            this.userService.getExistingUser().subscribe(x => {
                if (x) {
                    observer.next(true);
                    observer.complete();
                } else {
                    observer.next(false);
                    observer.complete();
                }
            });
        });

    }
}