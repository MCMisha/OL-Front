import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminPanelSliderComponent} from "./admin-panel-slider.component";
import {AdminPanelSliderFormComponent} from "./admin-panel-slider-form/admin-panel-slider-form.component";

const routes: Routes = [
  {path: '', component: AdminPanelSliderComponent},
  {path: 'new', component: AdminPanelSliderFormComponent},
  {path: ':id/edit', component: AdminPanelSliderFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelSliderRoutingModule {
}
