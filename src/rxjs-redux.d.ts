import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/publishReplay";
export declare type Reducer<S> = (state: S) => S;
export declare function createState<S>(reducers: Observable<Reducer<S>>, initialState: S): Observable<S>;
export declare function createReducer<S>(...observables: Observable<Reducer<S>>[]): Observable<Reducer<S>>;
