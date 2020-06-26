import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'quran-ui';
  displaySpinner: boolean;
  spinnerSubscription: Subscription;
  constructor(private _http: HttpClient, private spinner: SpinnerService) { 
    
  }
  async ngOnInit() {
  }
  ngOnDestroy() {
    this.spinnerSubscription.unsubscribe();
  }
  
}
