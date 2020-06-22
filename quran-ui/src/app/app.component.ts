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
    this.spinnerSubscription = this.spinner.spinnerCounter.subscribe((counter: number) => {
      this.displaySpinner = counter != 0;
    });
    console.log("hey");
    this._http.get('http://localhost/Quran/api/index.php/welcome/sayHi').subscribe(res => {
      console.log(res);
    });
  }
  ngOnDestroy() {
    this.spinnerSubscription.unsubscribe();
  }
  
}
