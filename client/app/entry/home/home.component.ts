import { Component, OnInit } from "@angular/core";
@Component({
    template: "welcome home"
})
export class HomeComponent implements OnInit {

    index: number;
    title: string;
    params: { [key: string]: any; };

    constructor() {
    }

    ngOnInit(): void {
    }

}