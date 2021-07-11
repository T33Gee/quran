import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorAlertService } from 'src/app/services/error-alert.service';

@Component({
    selector: 'app-error-alert',
    templateUrl: './error-alert.component.html'
})
export class ErrorAlertComponent implements OnInit, OnDestroy {
    errorMessage: string;
    private destroyed = new Subject();

    constructor(private service: ErrorAlertService, private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.service.showError
            .pipe(takeUntil(this.destroyed))
            .subscribe(e => {
                this.errorMessage = e;
                this.scrollToMessage();
            });
            
        this.service.resetError
            .pipe(takeUntil(this.destroyed))
            .subscribe(_e => (this.errorMessage = null));
    }

    scrollToMessage(): void {
        (this.elementRef.nativeElement as HTMLElement).scrollIntoView({behavior: 'smooth'});
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    closeErrorMessage(): void {
        this.service.reset();
    }
}
