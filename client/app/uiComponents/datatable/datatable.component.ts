import { Component, OnInit, Output, EventEmitter, Input, ViewEncapsulation, HostListener, ElementRef, ViewChild } from "@angular/core";
import BaseModel from "../../models/_base.model";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import PagedResult from "../../models/misc/pagedResult";
import { UserService } from "../../services/user.service";
import { SpinnerService } from "../../services/utility/spinner.service";

@Component({
    selector: 'datatable',
    templateUrl: 'datatable.component.html',
    styleUrls: ['datatable.component.css']
})
export class DataTableComponent {

    readonly defaultSize = 25;
    readonly sizeList = [
        10, 25, 50, 75, 100
    ]

    public current: number;;
    public take: number;

    public loading: boolean;

    @Output()
    public selectedRow: Element;
    @Output()
    public selectedRowIndex: number;




    @ViewChild("dataTable")
    public dataTable: HTMLTableElement;

    public get tableTopPosition() {
        return this.dataTable.clientTop;
    }

    public _options: DataTableConfigurationObject;
    @Input()
    set options(options: DataTableConfigurationObject) {
        this._options = options;

        if (this._options.rowSelectable === null && this._options.rowSelectable === undefined)
            this._options.rowSelectable = false;

        this.loadTable();
    }

    loadTable() {
        this.spinnerService.subscribe();
        var order = {};
        for (var i in this._options.columns) {
            var col = this._options.columns[i];
            if (col.dataField && col.order) {
                order[col.dataField] = col.order;
                break;
            }
        }


        this.httpClient
            .post<PagedResult<any>>(this._options.serviceUrl, { skip: this.current, limit: this.take, sort: order }, { headers: this.userService.authHeader })
            .subscribe(data => { this.data = data; this.spinnerService.unsubscribe(); this.selectedRow = null; })

    }


    public get pageCount(): number {
        return this.data ? Math.floor(this.data.total / this.take) : 0;
    }

    public get currentPage(): number {
        return Math.floor((this.current / this.take) + 1);
    }

    public data: PagedResult<BaseModel>;

    constructor(
        private httpClient: HttpClient,
        private userService: UserService,
        private spinnerService: SpinnerService) {
        this.take = this.defaultSize;
        this.current = 0;
    }

    changePage(pageNumber) {
        if (pageNumber <= 0)
            pageNumber = 1;
        else if (pageNumber >= this.pageCount)
            pageNumber = this.pageCount;

        this.current = (pageNumber - 1) * this.take;
        this.loadTable();
    }

    columnHeaderClick(column: ColumnConfiguration) {
        if (column.orderable !== false) {
            this._options.columns.forEach(x => {
                if (x != column)
                    x.order = null;
            });

            if (column.order) {
                if (column.order === -1)
                    column.order = 1;
                else
                    column.order = -1;
            }
            else
                column.order = -1;

            this.loadTable();

        }
    }

    onSizeClick(size: number) {
        this.take = size;
        this.loadTable();
    }

    setActiveRow(row: Element, rowIndex: number) {
        if (!this._options.rowSelectable)
            return;
        if (this.selectedRow)
            this.selectedRow.classList.remove('selected');
        if (this.selectedRowIndex !== rowIndex) {
            this.selectedRow = row;
            this.selectedRowIndex = rowIndex;
            this.selectedRow.classList.add('selected');
        } else {
            this.selectedRow = this.selectedRowIndex = null;
        }
        var rowData;
        if (this.selectedRowIndex || this.selectedRowIndex == 0) {
            rowData = this.data.data[this.selectedRowIndex];
        }
        this.rowSelectionChanged.emit({ row: this.selectedRow, index: this.selectedRowIndex, data: rowData });


    }

    @Output()
    public rowSelectionChanged: EventEmitter<{ row: Element, index: number, data: BaseModel }> =
        new EventEmitter<{ row: Element, index: number, data: BaseModel }>();

}

export class PagingObject {
}

export interface DataTableConfigurationObject {
    rowSelectable: boolean;
    serviceUrl: string;
    columns?: ColumnConfiguration[];
    operationColumnConfiguration?: OperationColumnConfiguration; // if this exists on configuration object add the operation column
}

export interface ColumnConfiguration {
    dataField?: string;
    title?: string;
    render?: (value: string, index?: number, component?: DataTableComponent, cell?: ElementRef, row?: any) => string;
    order?: 1 | -1 | 0 | null | undefined;
    orderable?: boolean;
}

export interface OperationColumnConfiguration {
    operationButtonsEnabled?: (component: DataTableComponent) => boolean;
    editButton?: OperationColumnItemConfiguration;
    detailButton?: OperationColumnItemConfiguration;
    removeButton?: OperationColumnItemConfiguration;
}

export interface OperationColumnItemConfiguration {
    active: boolean;
    routerLinkGenerator?: (data: any) => string;
    clickAction?: any;
}