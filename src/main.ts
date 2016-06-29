import {createState, createReducer} from "./rxjs-redux";
import {counterActions, counterReducer, CounterState} from "./counter";
import {nameActions, nameReducer, NameState} from "./appName";

// our application state as strongly typed class
export class AppState implements CounterState, NameState {
    counter: number = 0;
    appName: string = "";
};

// put together all reducers just as with createReducer in Redux
const reducer = createReducer<AppState>(
    counterReducer,
    nameReducer
    /* ...
    myOtherReducer1,
    myOtherReducer2
    */
);

// the state replaces the store known from Redux
const state = createState(reducer, new AppState());

// output every state change
state.subscribe(newState => {
    const stateJson = document.createTextNode(JSON.stringify(newState, undefined, 2));
    document.querySelector("body").appendChild(stateJson);

    // add a line break after each state update
    const breakLine = document.createElement("br");
    document.querySelector("body").appendChild(breakLine);
});

// dispatch some actions
counterActions.increment.next(1);
counterActions.increment.next(1);
counterActions.decrement.next(5);
counterActions.increment.next(8);

nameActions.appName.next("Foo");
nameActions.appName.next("Bar");
