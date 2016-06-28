import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";
import {createReducer} from "./rxjs-redux";
import {AppState} from "./main";

// actions are actually just RxJS Subjects with explicit type information
export const counterActions = {
    increment: new Subject<number>(),
    decrement: new Subject<number>()
};

// the reducer is an observable of reducer functions invoked whenever an
// action is emitted
export const counterReducer = createReducer<AppState>(
    counterActions.increment.map( (n = 1) => {
        // replace Object.assign with ES7 object spread operator as soon as TypeScript supports it :(
        return (state: AppState) => Object.assign(state, { counter: state.counter + n });
    }),
    counterActions.decrement.map( (n = 1) => {
        return (state: AppState) => Object.assign(state, { counter: state.counter - n });
    })
);
