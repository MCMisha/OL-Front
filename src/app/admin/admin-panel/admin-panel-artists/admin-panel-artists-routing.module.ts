import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminPanelArtistsComponent} from "./admin-panel-artists.component";
import {AdminPanelArtistNewComponent} from "./admin-panel-artist-new/admin-panel-artist-new.component";
import {AdminPanelArtistEditComponent} from "./admin-panel-artist-edit/admin-panel-artist-edit.component";


const routes: Routes = [
  {path: '', component: AdminPanelArtistsComponent},
  {path: 'new', component: AdminPanelArtistNewComponent},
  {path: ':id/edit', component: AdminPanelArtistEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelArtistsRoutingModule { }
