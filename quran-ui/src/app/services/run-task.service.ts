import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorAlertService } from './error-alert.service';
import { ExperienceService } from './experience.service';

@Injectable({
    providedIn: 'root'
})
export class RunTaskService {
    taskDidFail = new Subject<string>();
    didReset = new Subject<void>();

    constructor(private errorAlertService: ErrorAlertService,
                private experienceService: ExperienceService) {}

    async runTask<T>(
        taskDescription: string,
        task: () => Promise<T>,
        showSpinner: boolean = false,
        errorTask?: (error: Error) => Promise<void> | Promise<CustomError> | void | CustomError     
    ): Promise<boolean> {
        try {
            if (showSpinner) this.experienceService.setPageLoadingIndicator(true);
            await task();
            if (showSpinner) this.experienceService.setPageLoadingIndicator(false);
            return true;
        } catch (error) {
            if (showSpinner) this.experienceService.setPageLoadingIndicator(false);
            const customErrorText = errorTask && ((await errorTask(error)) as CustomError)?.errorText;
            if (customErrorText === ErrorText.DoNotDisplay) return false;
            const taskFailText = customErrorText ? `${customErrorText}` : `An error occurred while ${taskDescription}.`;
            this.errorAlertService.show(taskFailText);
            return false;
        }
    }

}
export enum ErrorText {
    DoNotDisplay = 'Do Not Display'
}

export class CustomError {
    errorText: string;
}
