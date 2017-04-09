"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
var rxjs_redux_1 = require("./rxjs-redux");
// actions are actually just RxJS Subjects with explicit type information
exports.counterActions = {
    increment: new Subject_1.Subject(),
    decrement: new Subject_1.Subject()
};
// the state mutators is an observable of mutator functions invoked whenever an
// action is emitted
exports.counterMutator = rxjs_redux_1.createStateMutators(exports.counterActions.increment.map(function (n) {
    if (n === void 0) { n = 1; }
    return function (state) { return (__assign({}, state, { counter: state.counter + n })); };
}), exports.counterActions.decrement.map(function (n) {
    if (n === void 0) { n = 1; }
    return function (state) { return (__assign({}, state, { counter: state.counter - n })); };
}));
//# sourceMappingURL=counter.js.map