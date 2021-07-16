import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptInviteComponent } from './components/accept-invite/accept-invite.component';
import { AdminHomeComponent } from './components/admin/home/admin-home.component';
import { AdminListComponent } from './components/admin/list/admin-list.component';
import { AdminLoginComponent } from './components/admin/login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { RecitalComponent } from './components/recital/recital.component';


const routes: Routes = [
  { path: 'accept-invite', component: AcceptInviteComponent },
  /// { path: 'home', component: HomeComponent },
  { path: 'recital', component: RecitalComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin-list', component: AdminListComponent },
  { path: '', redirectTo: '/accept-invite', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
}
