import { Component, Input, HostListener, ViewChild, ElementRef, EventEmitter, forwardRef } from "@angular/core";
import { DropdownItemComponent } from "./dropdownItem/dropdownItem.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

declare var _: any;

@Component({
    selector: "autocomplete-dropdown",
    styleUrls: ["autocompleteDropdown.component.css"],
    templateUrl: "autocompleteDropdown.component.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AutocompleteDropdownComponent)
        }
    ]
})
export class AutocompleteDropdownComponent implements ControlValueAccessor {

    public selectedItem: number = 0;
    public selectedValue: { name: string; value: string } = null;

    private onTouched: () => void;
    private onChange: (value) => void;
    private disabled: boolean;

    writeValue(obj: any): void {
        this.selectedValue = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }


    private _dataSource: any;
    @Input()
    public set dataSource(val: any) {
        this._dataSource = val;
        this.filteredSource = val;
    }

    public filteredSource: any;


    @Input()
    public displayField: string;
    @Input()
    public valueField: string;
    @Input()
    public searchUrl: string;

    public visible: boolean = false;

    @ViewChild("input")
    public input: ElementRef;
    @ViewChild("inputGroup")
    public inputGroup: ElementRef;
    @ViewChild("appendButton")
    public appendButton: ElementRef;
    @ViewChild("appendIcon")
    public appendIcon: ElementRef;
    @ViewChild("dropdown")
    public dropdown: ElementRef;

    public triggerClick: EventEmitter<null> = new EventEmitter();


    @HostListener('document:click', ['$event'])
    documentClick(event: MouseEvent) {
        // console.log(event.target);
        // console.log(event.currentTarget);
        if (
            event.target !== this.input.nativeElement &&
            event.target !== this.appendButton.nativeElement &&
            event.target !== this.appendIcon.nativeElement &&
            (event.target as HTMLElement).parentNode.parentNode !== this.dropdown.nativeElement) {
            this.visible = false;
            // console.log((event.target as HTMLElement).parentNode.parentNode);
            // console.log(event.target);
            // console.log(this.dropdown.nativeElement);
            // console.log(event.target === this.dropdown.nativeElement);
            // console.log("visible false")
        }
    }

    appendClick(event: MouseEvent) {
        this.visible = !this.visible;
        // console.log("visible toggle");
    }


    selectCurrent() {

    }


    private filterMustTriggered = false;
    inputKeydown(event: KeyboardEvent) {
        this.filterMustTriggered = false;

        // console.log(event.which);
        if (event.which === 40 && this.visible) {

            if (this.selectedItem < this.filteredSource.length - 1)
                this.selectedItem++;

        } else if (event.which === 38 && this.visible) {
            if (this.selectedItem > 0)
                this.selectedItem--;

        } else if (event.which === 13) {
            this.triggerClick.emit();

        }
        else {
            this.filterMustTriggered = true;
        }
    }

    inputChange(event: Event) {
        if (this.filterMustTriggered) {
            this.selectedItem = 0;
            this.filter();
        }
    }

    filter() {
        var input = this.input.nativeElement as HTMLInputElement;

        var value = input.value;

        if (value) {
            this.filteredSource = _.filter(this._dataSource, (x) => {
                return x[this.displayField].toUpperCase().indexOf(value.trim().toUpperCase()) > -1;
            });

        } else
            this.filteredSource = this.dataSource;
        this.visible = true;
    }

    itemSelected(event: DropdownItemComponent) {
        this.selectedItem = event.index;
    }

    inputBlur() {
        this.onTouched();
    }

    dropdownItemClicked(event: DropdownItemComponent) {
        if (this.selectedValue === event.value) {

            var input = this.input.nativeElement as HTMLInputElement;
            input.value = this.selectedValue.name;

        } else {
            this.selectedValue = event.value;
            if (this.onChange)
                this.onChange(this.selectedValue);
        }
        this.visible = false;
    }

}