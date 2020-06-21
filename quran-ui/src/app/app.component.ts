import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'quran-ui';
  constructor(private _http: HttpClient) { 
    
  }
  async ngOnInit() {
    console.log("hey");
    this._http.get('http://localhost/Quran/api/index.php/welcome/sayHi').subscribe(res => {
      console.log(res);
    });
  }
  
}
