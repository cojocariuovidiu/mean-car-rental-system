import { Component, Output, EventEmitter } from "@angular/core";
import { DataTableConfigurationObject, DataTableComponent } from "../../../uiComponents/datatable/datatable.component";
import BaseModel from "../../../models/_base.model";
import { AppConfigService } from "../../../services/utility/appConfig.service";

declare var moment: any;

@Component({
    selector: 'vehicleList',
    templateUrl: './vehicleList.component.html',
    styleUrls: ['./vehicleList.component.css']
})
export class VehicleListComponent {


    public options: DataTableConfigurationObject;

    onRowSelectionChanged(event: { row: Element; index: number, data: BaseModel }) {
        this.rowSelectionChanged.emit(event);
    }

    @Output()
    public rowSelectionChanged: EventEmitter<{ row: Element; index: number, data: BaseModel }> =
        new EventEmitter<{ row: Element; index: number, data: BaseModel }>();

    constructor(private appConfigService: AppConfigService) {

        this.options = {
            rowSelectable: false,
            serviceUrl: this.appConfigService.apiRoot + "/vehicle/paged",
            operationColumnConfiguration: {
                editButton: {
                    active: true,
                    routerLinkGenerator: (data: any) => {
                        return "/uygulama/arac-duzenle/" + data["vehicleNumber"];
                    }
                },
                detailButton: {
                    active: true,
                    routerLinkGenerator: (data: any) => {
                        return "/uygulama/arac-detay/" + data["vehicleNumber"];
                    }
                },
                removeButton: {
                    active: true,
                    clickAction: () => {
                        console.log("remove click");
                    }
                }
            },
            columns:
                [
                    {
                        title: "Araç No",
                        dataField: "vehicleNumber"
                    },
                    {
                        dataField: "plate",
                        title: "Plaka",
                        order: -1
                    },
                    {
                        dataField: "nextExaminationDate",
                        title: "Gelecek Muayene Tarihi",
                        render: function (value) {
                            return value ? moment(value).format('DD/MM/YYYY') : "-";
                        }
                    },
                    {
                        dataField: "modelYear",
                        title: "Model Yıl"
                    },
                    {
                        dataField: "kmStatus",
                        title: "KM Durumu"
                    },
                    {
                        dataField: "registrationDocumentNumber",
                        title: "Ruhsat Belge No"
                    },
                    {
                        dataField: "registrationDate",
                        title: "Tescil Tarihi",
                        render: function (value) {
                            return value ? moment(value).format('DD/MM/YYYY') : "-";
                        }
                    },
                    {
                        dataField: "brandName",
                        title: "Marka"
                    },
                    {
                        dataField: "brandModelName",
                        title: "Model"
                    },
                    {
                        dataField: "colorName",
                        title: "Renk"
                    }
                ]
        }
    }
}