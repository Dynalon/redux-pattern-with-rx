"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
// imports for static example (Redux like)
var rxjs_redux_1 = require("./rxjs-redux");
var counter_1 = require("./counter");
var appName_1 = require("./appName");
// imports for dynamic example
var rxjs_redux_2 = require("./rxjs-redux");
/// --- STATIC EXAMPLE
// best practice is to use a plain object as State instance to allow serialization etc.
var initialState = {
    counter: 0,
    appName: "Initial Name"
};
// put together all reducers just as with createReducer in Redux
var stateMutators = rxjs_redux_1.createStateMutators(counter_1.counterMutator, appName_1.nameMutator);
// the state observable replaces the store known from Redux
var state = rxjs_redux_1.createState(stateMutators, initialState);
// helper function to print state changes
function printStateChange(newState) {
    var stateJson = document.createTextNode(JSON.stringify(newState));
    document.querySelector("body").appendChild(stateJson);
    // add a line break after each state update
    var breakLine = document.createElement("br");
    document.querySelector("body").appendChild(breakLine);
}
// output every state change
state.subscribe(printStateChange);
// dispatch some actions
counter_1.counterActions.increment.next();
counter_1.counterActions.increment.next();
appName_1.nameActions.appName.next("Foo");
counter_1.counterActions.decrement.next(5);
counter_1.counterActions.increment.next(8);
appName_1.nameActions.appName.next("Bar");
/// --- DYNAMIC EXAMPLE USING AN EXPLICIT STORE
var store = new rxjs_redux_2.Store(initialState);
var incrementAction = new rxjs_redux_2.Action();
var decrementAction = new rxjs_redux_2.Action();
var incrementReducer = function (state, n) {
    if (n === void 0) { n = 1; }
    return (__assign({}, state, { counter: state.counter + n }));
};
var decrementReducer = function (state, n) {
    if (n === void 0) { n = 1; }
    return (__assign({}, state, { counter: state.counter - n }));
};
store.select(function (s) { return s.counter; }).subscribe(printStateChange);
var incSubscription = store.addReducer(incrementAction, incrementReducer);
incrementAction.next(1);
incrementAction.next(1);
// add a new reducer during runtime
var decSubscription = store.addReducer(decrementAction, decrementReducer);
decrementAction.next(1);
decrementAction.next(1);
// remove reducer during runtime to deactivate it
decSubscription.unsubscribe();
// these have no effect now
decrementAction.next(1);
decrementAction.next(1);
//# sourceMappingURL=main.js.map