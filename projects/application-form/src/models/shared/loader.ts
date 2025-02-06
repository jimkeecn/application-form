import { BehaviorSubject, Observable, Subscription, timer } from "rxjs";

export class Loader{
    private _loader$ = new BehaviorSubject<boolean>(true);
    private _loaderSubscription?: Subscription
    private _isLoading = false;
    private _loaderOverTime = false; 
    onLoader(x: number = 60000) {
        if (this._isLoading) return; // Prevent multiple triggers
        this._isLoading = true;
    
        this._loader$.next(true);
        this._loaderSubscription?.unsubscribe();
        this._loaderSubscription = timer(x).subscribe(() => {
            this._loader$.next(false);
            this._isLoading = false; // Reset state
            this._loaderOverTime = true;
        });
    }
    
    offLoader() {
        this._loader$.next(false);
        this._isLoading = false;
        this._loaderOverTime = false;
    }

    get loader$() {
        return this._loader$.asObservable();
    }

    get loaderOverTime(): boolean {
        return this._loaderOverTime;
    }

    destroyLoader() {
        // Unsubscribe the active timer subscription if any.
        this._loaderSubscription?.unsubscribe();
        // Complete the subject so that subscribers know no more emissions will occur.
        this._loader$.complete();
    }
}


type Constructor<T = {}> = new (...args: any[]) => T;

export function LoaderMixin<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        private _loader$ = new BehaviorSubject<boolean>(true);
        private _loaderSubscription?: Subscription
        private _isLoading = false;
        onLoader(x: number = 60000) {
            if (this._isLoading) return; // Prevent multiple triggers
            this._isLoading = true;
        
            this._loader$.next(true);
            this._loaderSubscription?.unsubscribe();
            this._loaderSubscription = timer(x).subscribe(() => {
                this._loader$.next(false);
                this._isLoading = false; // Reset state
            });
        }
        
        offLoader() {
            this._loader$.next(false);
            this._isLoading = false;
        }

        get loader$() {
            return this._loader$.asObservable();
        }

        get loader(): Observable<boolean> {
            return this._loader$.asObservable();
        }
    };
}