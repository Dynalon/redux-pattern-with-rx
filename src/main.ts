import {createState, createReducer} from "./rxjs-redux";
import {counterActions, counterReducer} from "./counter";

// our application state as strongly typed class
export class AppState {
    counter: number = 0;
};

// put together all reducers just as with createReducer in Redux
const reducer = createReducer(
    counterReducer
    /* ...
    myOtherReducer1,
    myOtherReducer2
    */
);

// the state replaces the store known from Redux
const state = createState(reducer, new AppState());

// output every state change
state.subscribe(newState => {
    const stateJson = document.createTextNode(JSON.stringify(newState));
    document.querySelector("body").appendChild(stateJson);
});

// dispatch some actions
counterActions.increment.next(1);
counterActions.increment.next(1);
counterActions.decrement.next(5);
counterActions.increment.next(8);
