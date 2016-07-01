import {createState, createReducer} from "./rxjs-redux";
import {counterActions, counterReducer, CounterState} from "./counter";
import {nameActions, nameReducer, NameState} from "./appName";

// our application state as a strongly typed class which makes up the initial state
interface IAppState extends CounterState, NameState /* otherState1, otherState2,...*/ {}

// best practice is to use a plain object as State instance to allow serialization etc.
const initialState: IAppState = {
    counter: 0,
    appName: "Initial Name"
};

// put together all reducers just as with createReducer in Redux
const reducer = createReducer<IAppState>(
    counterReducer,
    nameReducer
    /* ...
    myOtherReducer1,
    myOtherReducer2
    */
);

// the state replaces the store known from Redux
const state = createState(reducer, initialState);

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
nameActions.appName.next("Foo");
counterActions.decrement.next(5);
counterActions.increment.next(8);
nameActions.appName.next("Bar");
