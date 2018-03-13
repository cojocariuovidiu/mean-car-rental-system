import { NgModule } from "@angular/core";
import { DropdownItemComponent } from "./dropdownItem/dropdownItem.component";
import { AutocompleteDropdownComponent } from "./autocompleteDropdown.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DropdownItemComponent,
        AutocompleteDropdownComponent
    ],
    exports: [
        AutocompleteDropdownComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class AutoCompleteDropdownModule {

}