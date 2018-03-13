import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from "@angular/core";
import { AutocompleteDropdownComponent } from "../autocompleteDropdown.component";

@Component({
    selector: "dropdown-item",
    styleUrls: ["dropdownItem.component.css"],
    templateUrl: "dropdownItem.component.html"
})
export class DropdownItemComponent {

    private _parent: AutocompleteDropdownComponent;
    @Input()
    public set parent(val: AutocompleteDropdownComponent) {
        val.triggerClick.subscribe((x) => {

            if (this.selected) {
                this.itemElement.nativeElement.click();
            }
        });
        this._parent = val;
    }

    @Input()
    public clickTrigger: any;
    @Input()
    public selected: boolean = false;

    private _value: any;

    @Input()
    public set value(val: { name: string, value: string }) {
        this._value = val;
    }
    public get value() {
        return this._value;
    }

    @Input()
    public index: number;

    @Output()
    public onSelected: EventEmitter<DropdownItemComponent> = new EventEmitter<DropdownItemComponent>();
    @Output()
    public onClicked: EventEmitter<DropdownItemComponent> = new EventEmitter<DropdownItemComponent>();

    @ViewChild("itemElement")
    public itemElement: ElementRef;

    mouseOver() {
        this.onSelected.emit(this);
    }


    dropdownItemClick(event: MouseEvent) {
        this.onClicked.emit(this);
    }

}