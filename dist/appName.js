"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
var rxjs_redux_1 = require("./rxjs-redux");
// actions are actually just RxJS Subjects with explicit type information
exports.nameActions = {
    appName: new Subject_1.Subject(),
};
// the reducer is an observable of reducer functions invoked whenever an
// action is emitted
exports.nameMutator = rxjs_redux_1.createStateMutators(exports.nameActions.appName.map(function (newName) {
    return function (state) { return (__assign({}, state, { appName: newName })); };
}));
//# sourceMappingURL=appName.js.map