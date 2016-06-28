import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/publishReplay";

// THIS FILE CONTAINS THE BOILERPLATE CODE YOU NEED TO COPY

export type Reducer<S> = (state: S) => S;

export function createState<S>(reducers: Observable<Reducer<S>>, initialState: S): Observable<S> {
    return reducers
        .scan( (state: S, reducer: Reducer<S>) => reducer(state), initialState)

        // these two lines make our observable emit the last state upon subscription
        .publishReplay(1)
        .refCount();
}

export function createReducer<S>(...observables: Observable<Reducer<S>>[]): Observable<Reducer<S>> {
    return Observable.merge.apply(Observable, observables);
}
