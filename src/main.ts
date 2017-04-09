import {  Observable } from "rxjs/Observable";

// imports for static example (Redux like)
import { createState, createStateMutators, StateMutation } from "./rxjs-redux";
import { counterActions, counterMutator, CounterState } from "./counter";
import { nameActions, nameMutator, NameState } from "./appName";

// imports for dynamic example
import { Action, Reducer, Store } from "./rxjs-redux";

// our application state as a strongly typed interface
interface IAppState extends CounterState, NameState /* otherState1, otherState2,...*/ { }

/// --- STATIC EXAMPLE

// best practice is to use a plain object as State instance to allow serialization etc.
const initialState: IAppState = {
    counter: 0,
    appName: "Initial Name"
};

// put together all reducers just as with createReducer in Redux
const stateMutators = createStateMutators<IAppState>(
    counterMutator,
    nameMutator
    /* ...
    myOtherReducer1,
    myOtherReducer2
    */
);

// the state observable replaces the store known from Redux
const state: Observable<IAppState> = createState(stateMutators, initialState);

// helper function to print state changes
function printStateChange(newState) {
    const stateJson = document.createTextNode(JSON.stringify(newState));
    document.querySelector("body").appendChild(stateJson);
    // add a line break after each state update
    const breakLine = document.createElement("br");
    document.querySelector("body").appendChild(breakLine);
}
// output every state change
state.subscribe(printStateChange);

// dispatch some actions
counterActions.increment.next();
counterActions.increment.next();
nameActions.appName.next("Foo");
counterActions.decrement.next(5);
counterActions.increment.next(8);
nameActions.appName.next("Bar");


/// --- DYNAMIC EXAMPLE USING AN EXPLICIT STORE
const store = new Store<IAppState>(initialState);

const incrementAction = new Action<number>();
const decrementAction = new Action<number>();

const incrementReducer: Reducer<IAppState, number> = (state, n = 1) => ({ ...state, counter: state.counter + n });
const decrementReducer = (state: IAppState, n: number = 1) => ({ ...state, counter: state.counter - n });

store.select(s => s.counter).subscribe(printStateChange);

const incSubscription = store.addReducer(incrementAction, incrementReducer);

incrementAction.next(1);
incrementAction.next(1);

// add a new reducer during runtime
const decSubscription = store.addReducer(decrementAction, decrementReducer);
decrementAction.next(1);
decrementAction.next(1);

// remove reducer during runtime to deactivate it
decSubscription.unsubscribe();

// these have no effect now
decrementAction.next(1);
decrementAction.next(1);
