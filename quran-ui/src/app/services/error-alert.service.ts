import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorAlertService {
    get showError(): Observable<string> {
        return this._showError;
    }
    get resetError(): Observable<void> {
        return this._resetError;
    }

    private _showError = new Subject<string>();
    private _resetError = new Subject<void>();

    show(message: string, autoclose?: boolean ): void {
        this._showError.next(message);

        if (autoclose) {
            setTimeout(() => {
                this.reset();
            }, 5000);
        }
    }

    reset(): void {
        this._resetError.next();
    }
}
