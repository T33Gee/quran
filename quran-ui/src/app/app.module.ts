import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AcceptInviteComponent } from './components/accept-invite/accept-invite.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransportService } from './services/backend/transport.service';
import { AcceptInviteService } from './services/backend/accept-invite.service';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './components/shared/card/card/card.component'
import { SessionService } from './services/session.service';
import { UserService } from './services/backend/user.service';
import { RecitalService } from './services/backend/recital.service';
import { RecitalComponent } from './components/recital/recital.component';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ErrorAlertService } from './services/error-alert.service';
import { ErrorAlertComponent } from './components/shared/error-alert/error-alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RunTaskService } from './services/run-task.service';
import { ExperienceService } from './services/experience.service';
import { AdminLoginComponent } from './components/admin/login/admin-login.component';
import { AdminHomeComponent } from './components/admin/home/admin-home.component';
import { AdminService } from './services/backend/admin.service';
import { AdminListComponent } from './components/admin/list/admin-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AcceptInviteComponent,
    SpinnerComponent,
    HomeComponent,
    NavbarComponent,
    CardComponent,
    RecitalComponent,
    ErrorAlertComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    NgxDatatableModule,
    NgbModule
  ],
  providers: [
    SessionService,
    TransportService,
    AcceptInviteService,
    UserService,
    RecitalService,
    ErrorAlertService,
    RunTaskService,
    ExperienceService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
