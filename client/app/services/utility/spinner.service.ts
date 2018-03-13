
export class SpinnerService {

    public activePromiseCount:number = 0;

    public subscribe() {
        this.activePromiseCount++;
    }

    public unsubscribe() {
        this.activePromiseCount--;

    }
}