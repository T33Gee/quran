import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptInviteComponent } from './components/accept-invite/accept-invite.component';
import { HomeComponent } from './components/home/home.component';
import { RecitalComponent } from './components/recital/recital.component';


const routes: Routes = [
  { path: 'accept-invite', component: AcceptInviteComponent },
  /// { path: 'home', component: HomeComponent },
  { path: 'recital', component: RecitalComponent },
  { path: 'admin', component: RecitalComponent },
  { path: '', redirectTo: '/accept-invite', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
}
