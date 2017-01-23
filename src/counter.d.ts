import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
export interface CounterState {
    counter: number;
}
export declare const counterActions: {
    increment: Subject<number>;
    decrement: Subject<number>;
};
export declare const counterReducer: Observable<(state: CounterState) => CounterState>;
