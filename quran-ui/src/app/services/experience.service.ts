import { Injectable } from '@angular/core';

@Injectable()
export class ExperienceService {
    constructor() { }

    setApplicationTitle(title: string): void {
        // this.renderService.setHubName(title);
    }

    setPageLoadingIndicator(show: boolean): void {
        // setTimeout(() => this.renderService.setPageLoadingIndicator(show));
    }
}
