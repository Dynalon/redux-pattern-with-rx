import { Observable, Subject, Subscription } from "rxjs/Rx";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/publishReplay";

// THIS FILE CONTAINS THE BOILERPLATE CODE YOU NEED TO COPY/REFERENCE

/// STATIC INTERFACES - WIRE UP ACTIONS/STATEMUTATORS (~REDUCERS) STATICALLY (=REDUX STYLE)
export type StateMutation<S> = (state: S) => S;

/**
 * Helper type so that you can create more expressive action types (which are just subjects)
 * @example
 *      var incrementAction = new Action<void>();
 *      var addAction = new Action<number>();
 *      var genericAction = new Action<Payload>();
 */
export class Action<P> extends Subject<P>{ };


/**
 * Creates an Observable of state which will emit everytime the state is mutated.
 * @param stateMutators
 * @param initialState
 */
export function createState<S>(stateMutators: Observable<StateMutation<S>>, initialState: S): Observable<S> {
    return stateMutators
        .scan((state: S, reducer: StateMutation<S>) => reducer(state), initialState)

        // these two lines make our observable hot and have it emit the last state
        // upon subscription
        .publishReplay(1)
        .refCount();
}

export function createStateMutators<S>(...observables: Observable<StateMutation<S>>[]): Observable<StateMutation<S>> {
    return Observable.merge.apply(Observable, observables);
}

/// DYNAMIC INTERFACE - ABLE TO WIRE UP ACTIONS/REDUCERS AT DYNAMICALLY AT RUNTIME

export type Reducer<S, P> = (state: S, actionPayload: P) => S;
export type GenericReducer<S, P> = (payload: P) => StateMutation<S>;

export class Store<S> {
    state: Observable<S>;
    stateMutators = new Subject<StateMutation<S>>();

    constructor(initialState: S) {
        this.state = createState(this.stateMutators, initialState);
    }

    addReducer<P>(action: Observable<P>, reducer: Reducer<S, P>): Subscription {
        const combinedReducer: GenericReducer<S, P> = (payload) => (state) => reducer(state, payload);
        return action.map(combinedReducer).subscribe(cr => this.stateMutators.next(cr));
    }

    select<T>(fn: (state: S) => T) {
        return this.state.map(fn);
    }
}
