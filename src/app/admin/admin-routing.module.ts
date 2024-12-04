import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
  { path: '', component: AdminComponent},
  { path: 'panel', component: AdminPanelComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
