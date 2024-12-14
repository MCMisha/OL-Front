import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPanelGenreComponent} from "./admin-panel-genre.component";
import {AdminPanelGenreEditComponent} from './admin-panel-genre-edit/admin-panel-genre-edit.component';
import {AdminPanelGenreNewComponent} from './admin-panel-genre-new/admin-panel-genre-new.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {AdminPanelGenreRoutingModule} from "./admin-panel-genre-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {DialogConfirmComponent} from "../../../shared/dialog-confirm/dialog-confirm.component";


@NgModule({
  declarations: [AdminPanelGenreComponent, AdminPanelGenreEditComponent, AdminPanelGenreNewComponent, DialogConfirmComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    AdminPanelGenreRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    FormsModule,
    MatProgressBar,
    MatDialogModule
  ]
})
export class AdminPanelGenreModule {
}
