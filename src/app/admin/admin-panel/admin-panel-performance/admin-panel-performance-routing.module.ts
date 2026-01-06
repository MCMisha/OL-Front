import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelPerformanceComponent} from "./admin-panel-performance.component";
import {AdminPanelPerformanceNewComponent} from "./admin-panel-performance-new/admin-panel-performance-new.component";
import {
  AdminPanelPerformanceEditComponent
} from "./admin-panel-performance-edit/admin-panel-performance-edit.component";
import {
  AdminPanelPerformanceEditImplementersComponent
} from "./admin-panel-performance-edit/admin-panel-performance-edit-implementers/admin-panel-performance-edit-implementers.component";
import {
  AdminPanelPerformanceEditTicketPriceComponent
} from "./admin-panel-performance-edit/admin-panel-performance-edit-ticket-price/admin-panel-performance-edit-ticket-price.component";
import {
  AdminPanelPerformanceEditArtistComponent
} from "./admin-panel-performance-edit/admin-panel-performance-edit-artist/admin-panel-performance-edit-artist.component";

const routes: Routes = [
  {path: '', component: AdminPanelPerformanceComponent},
  {path: 'new', component: AdminPanelPerformanceNewComponent},
  {path: ':id/edit', component: AdminPanelPerformanceEditComponent},
  {path: ':id/edit/implementers', component: AdminPanelPerformanceEditImplementersComponent},
  {path: ':id/edit/ticket-price', component: AdminPanelPerformanceEditTicketPriceComponent},
  {path: ':id/edit/artist', component: AdminPanelPerformanceEditArtistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelPerformanceRoutingModule { }
