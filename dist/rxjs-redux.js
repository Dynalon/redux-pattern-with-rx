"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/scan");
require("rxjs/add/operator/publishReplay");
/**
 * Helper type so that you can create more expressive action types (which are just subjects)
 * @example
 *      var incrementAction = new Action<void>();
 *      var addAction = new Action<number>();
 *      var genericAction = new Action<Payload>();
 */
var Action = (function (_super) {
    __extends(Action, _super);
    function Action() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Action;
}(Rx_1.Subject));
exports.Action = Action;
;
/**
 * Creates an Observable of state which will emit everytime the state is mutated.
 * @param stateMutators
 * @param initialState
 */
function createState(stateMutators, initialState) {
    return stateMutators
        .scan(function (state, reducer) { return reducer(state); }, initialState)
        .publishReplay(1)
        .refCount();
}
exports.createState = createState;
function createStateMutators() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    return Rx_1.Observable.merge.apply(Rx_1.Observable, observables);
}
exports.createStateMutators = createStateMutators;
var Store = (function () {
    function Store(initialState) {
        this.stateMutators = new Rx_1.Subject();
        this.state = createState(this.stateMutators, initialState);
    }
    Store.prototype.addReducer = function (action, reducer) {
        var _this = this;
        var combinedReducer = function (payload) { return function (state) { return reducer(state, payload); }; };
        return action.map(combinedReducer).subscribe(function (cr) { return _this.stateMutators.next(cr); });
    };
    Store.prototype.select = function (fn) {
        return this.state.map(fn);
    };
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=rxjs-redux.js.map