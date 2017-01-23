import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { createReducer } from "./rxjs-redux";

export interface NameState {
    appName: string;
}

// actions are actually just RxJS Subjects with explicit type information
export const nameActions = {
    appName: new Subject<string>(),
};

// the reducer is an observable of reducer functions invoked whenever an
// action is emitted
export const nameReducer = createReducer<NameState>(
    nameActions.appName.map(newName => {
        return (state: NameState) => ({ ...state, appName: newName });
    })
);
