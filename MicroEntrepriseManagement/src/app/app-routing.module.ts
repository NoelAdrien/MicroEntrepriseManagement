import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EncaissementComponent } from './encaissement/encaissement.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'encaissement', component: EncaissementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
