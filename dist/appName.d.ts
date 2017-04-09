import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
export interface NameState {
    appName: string;
}
export declare const nameActions: {
    appName: Subject<string>;
};
export declare const nameMutator: Observable<(state: NameState) => NameState>;
