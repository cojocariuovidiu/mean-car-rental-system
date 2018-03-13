import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "paginator",
    styleUrls: ["paginator.component.css"],
    templateUrl: "paginator.component.html"
})
export class PaginatorComponent {

    readonly defaultSize = 25;
    readonly sizeList = [
        10, 25, 50, 75, 100
    ]

    public current: number;;
    public take: number;

    @Input()
    total: number;

    @Output()
    onChange: EventEmitter<{ current: number, take: number }> = new EventEmitter<{ current: number, take: number }>();


    public get currentPage(): number {
        return Math.floor((this.current / this.take) + 1);
    }

    constructor() {
        this.take = this.defaultSize;
        this.current = 0;
    }

    public get pageCount(): number {
        return this.total ? Math.floor(this.total / this.take) : 0;
    }

    changePage(pageNumber) {
        if (pageNumber <= 0)
            pageNumber = 1;
        else if (pageNumber >= this.pageCount)
            pageNumber = this.pageCount;

        this.current = (pageNumber - 1) * this.take;
        this.onChange.emit({ current: this.current, take: this.take });
    }

    onSizeClick(size: number) {
        this.take = size;
        this.onChange.emit({ current: this.current, take: this.take });
    }
}