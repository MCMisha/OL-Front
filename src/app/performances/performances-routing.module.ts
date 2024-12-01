import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformancesComponent } from './performances.component';

const routes: Routes = [
  { path: '', component: PerformancesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformancesRoutingModule {}
