import { NgModule } from "@angular/core";
import { VehicleRoutingModule } from "./vehicle.routing.module";
import { VehicleListComponent } from "./vehicleList/vehicleList.component";
import { VehicleFormComponent } from "./vehicleForm/vehicleForm.component";
import { HttpClientModule } from "@angular/common/http";
import { DataTableComponent } from "../../uiComponents/datatable/datatable.component";
import { CommonModule } from "@angular/common";
import { ToolBoxComponent } from "../../uiComponents/toolBox/toolBoxcomponent";
import { VehicleAddComponent } from "./vehicleAdd/vehicleAdd.component";
import { VehicleEditComponent } from "./vehicleEdit/vehicleEdit.component";
import { VehicleDetailComponent } from "./vehicleDetail/vehicleDetail.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PlateCompoent } from "./vehicleForm/plate/plate.component";
import { FileUploaderComponent } from "../../uiComponents/fileuploader/fileuploader.component";
import { PlateItemComponent } from "./vehicleForm/plate/plateItem/plateItem.component";
import { BrandComponent } from "./vehicleForm/brand/brand.component";
import { BrandModelComponent } from "./vehicleForm/brandModel/brandModel.component";
import { ColorComponent } from "./vehicleForm/color/color.component";
import { GearTypeComponent } from "./vehicleForm/gearType/gearType.component";
import { DatePickerComponent } from "../../uiComponents/datepicker/datepicker.component";
import { UpperCaseLetterAndNumberDirective } from "../../directives/uppercase.directive";
import { AutocompleteDropdownComponent } from "../../uiComponents/autocompleteDropdown/autocompleteDropdown.component";
import { AutoCompleteDropdownModule } from "../../uiComponents/autocompleteDropdown/autocompleteDropdown.module";
import { FeatureComponent } from "./vehicleForm/feature/feature.component";

@NgModule({
    imports:
        [
            CommonModule,
            VehicleRoutingModule,
            ReactiveFormsModule,
            FormsModule,
            AutoCompleteDropdownModule
        ],
    declarations:
        [
            VehicleListComponent,
            VehicleFormComponent,
            DataTableComponent,
            ToolBoxComponent,
            VehicleAddComponent,
            VehicleEditComponent,
            VehicleDetailComponent,
            PlateCompoent,
            PlateItemComponent,
            FileUploaderComponent,
            BrandComponent,
            BrandModelComponent,
            ColorComponent,
            GearTypeComponent,
            DatePickerComponent,
            UpperCaseLetterAndNumberDirective,
            FeatureComponent
        ]
})
export class VehicleModule {

}