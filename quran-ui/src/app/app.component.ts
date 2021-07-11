import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorAlertService } from './services/error-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'quran-ui';
  
  
  constructor(errorAlertService: ErrorAlertService, router: Router) { 
      router.events.subscribe(() => {
        errorAlertService.reset();
    });
  }
  async ngOnInit() {
  }

  ngOnDestroy() {    
  }
  
}
