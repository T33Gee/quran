import { Injectable } from "@angular/core";
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable()
export class SpinnerService {
    taskCompleted = true;
    constructor(private _spinner: MatSpinner){}
    async run(task) {
        this.taskCompleted = false;
        await task;
        this.taskCompleted = true;
    }
}