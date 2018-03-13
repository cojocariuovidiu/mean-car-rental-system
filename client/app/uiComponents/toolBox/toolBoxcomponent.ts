import { Component, Input, Output, EventEmitter } from "@angular/core";
import { AppConfigService } from "../../services/utility/appConfig.service";

@Component({
    selector: "toolbox",
    styleUrls: ["toolbox.component.css"],
    templateUrl: "toolbox.component.html"
})
export class ToolBoxComponent {

    constructor(private appConfig: AppConfigService) {

    }

    private doubleClick: boolean = false;

    @Input()
    public editActive: boolean = true;
    @Input()
    public detailActive: boolean = true;
    @Input()
    public removeActive: boolean = true;
    @Input()
    public allEnabled: boolean = false;

    @Input()
    public editRouterLink: string;

    @Input()
    public detailRouterLink: string;

    @Input()
    public removeRouterLink: string;

}