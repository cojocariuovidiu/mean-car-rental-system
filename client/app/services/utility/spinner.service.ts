import { INT_TYPE } from "@angular/compiler/src/output/output_ast";

export class SpinnerService {

    private _activePromiseCount: number = 0;

    public get activePromiseCount() {
        return this._activePromiseCount;
    }
    public set activePromiseCount(value: number) {
        this._activePromiseCount = value;
    }


    public subscribe() {
        this._activePromiseCount++;
    }

    public unsubscribe() {
        this._activePromiseCount--;
    }
}