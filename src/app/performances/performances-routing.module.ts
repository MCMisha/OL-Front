import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformancesComponent } from './performances.component';
import {PerformancesDetailsComponent} from "./performances-details/performances-details.component";

const routes: Routes = [
  { path: '', component: PerformancesComponent },
  { path: 'details/:id', component: PerformancesDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformancesRoutingModule { }
