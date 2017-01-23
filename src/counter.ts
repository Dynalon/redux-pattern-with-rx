import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/map";
import { createReducer } from "./rxjs-redux";

// note how we define the parts of the State used in this file in a separate interface
// (all state interfaces will be merge later to form the global state).
export interface CounterState {
    counter: number;
}

// actions are actually just RxJS Subjects with explicit type information
export const counterActions = {
    increment: new Subject<number>(),
    decrement: new Subject<number>()
};

// the reducer is an observable of reducer functions invoked whenever an
// action is emitted
export const counterReducer = createReducer<CounterState>(
    counterActions.increment.map((n = 1) => {
        return (state: CounterState) => ({ ...state, counter: state.counter + n })
    }),
    counterActions.decrement.map((n = 1) => {
        return (state: CounterState) => ({ ...state, counter: state.counter - n });
    })
);
