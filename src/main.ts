import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/map";
import "rxjs/add/operator/publishReplay";

// This is the boilerplate code you need to copy - but make sure to understand it :)
type Reducer<S> = (state: S) => S;
function createState<S>(reducers: Observable<Reducer<S>>, initialState: S) {
    return reducers
        .scan( (state: S, reducer: Reducer<S>) => reducer(state), initialState)

        // these two lines make our observable emit the last state upon subscription
        .publishReplay(1)
        .refCount();
}

// our application state as strongly typed class
class AppState {
    counter: number = 0;
};

// actions are actually just RxJS Subjects with explicit type information
const counterActions = {
    increment: new Subject<number>(),
    decrement: new Subject<number>()
};

// the reducer is an observable of reducer functions invoked whenever an
// action is emitted
const counterReducer = Observable.merge(
    counterActions.increment.map( (n = 1) => {
        return (state: AppState) => Object.assign(state, { counter: state.counter + n });
    }),
    counterActions.decrement.map( (n = 1) => {
        return (state: AppState) => Object.assign(state, { counter: state.counter - n });
    })
);

const reducer = Observable.merge(
    counterReducer
    /* ...
    myOtherReducer1,
    myOtherReducer2
    */
);

// setup done, now lets get started

// the state replaces the store known from Redux
const state: Observable<AppState> = createState(reducer, new AppState());

// output every state change
state.subscribe(newState => {
    const stateJson = document.createTextNode(JSON.stringify(newState));
    document.querySelector("body").appendChild(stateJson);
});

// dispatch some actions
counterActions.increment.next(1);
counterActions.increment.next(1);
counterActions.decrement.next(5);
