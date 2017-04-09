import { Observable, Subject, Subscription } from "rxjs/Rx";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/publishReplay";
export declare type StateMutation<S> = (state: S) => S;
/**
 * Helper type so that you can create more expressive action types (which are just subjects)
 * @example
 *      var incrementAction = new Action<void>();
 *      var addAction = new Action<number>();
 *      var genericAction = new Action<Payload>();
 */
export declare class Action<P> extends Subject<P> {
}
/**
 * Creates an Observable of state which will emit everytime the state is mutated.
 * @param stateMutators
 * @param initialState
 */
export declare function createState<S>(stateMutators: Observable<StateMutation<S>>, initialState: S): Observable<S>;
export declare function createStateMutators<S>(...observables: Observable<StateMutation<S>>[]): Observable<StateMutation<S>>;
export declare type Reducer<S, P> = (state: S, actionPayload: P) => S;
export declare type GenericReducer<S, P> = (payload: P) => StateMutation<S>;
export declare class Store<S> {
    state: Observable<S>;
    stateMutators: Subject<StateMutation<S>>;
    constructor(initialState: S);
    addReducer<P>(action: Observable<P>, reducer: Reducer<S, P>): Subscription;
    select<T>(fn: (state: S) => T): Observable<T>;
}
