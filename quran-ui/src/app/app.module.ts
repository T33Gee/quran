import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './components/login/login.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransportService } from './services/backend/transport.service';
import { LoginService } from './services/backend/login.service';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './components/shared/card/card/card.component'
import { SessionService } from './services/session.service';
import { UserService } from './services/backend/user.service';
import { EffortsComponent } from './components/efforts/efforts.component';
import { KhatamEffortComponent } from './components/shared/efforts/khatam-effort/khatam-effort.component';
import { SurahEffortComponent } from './components/shared/efforts/surah-effort/surah-effort.component';
import { CollapsibleCardComponent } from './components/shared/collapsible-card/collapsible-card.component';
import { EffortService } from './services/backend/effort.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpinnerComponent,
    HomeComponent,
    NavbarComponent,
    CardComponent,
    EffortsComponent,
    KhatamEffortComponent,
    SurahEffortComponent,
    CollapsibleCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    SpinnerService,
    SessionService,
    TransportService,
    LoginService,
    UserService,
    EffortService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
