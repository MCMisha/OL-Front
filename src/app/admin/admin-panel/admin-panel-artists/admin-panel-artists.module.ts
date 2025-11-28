import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelArtistsComponent } from './admin-panel-artists.component';
import {AdminPanelArtistsRoutingModule} from "./admin-panel-artists-routing.module";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressBar} from "@angular/material/progress-bar";
import {AdminPanelArtistNewComponent} from "./admin-panel-artist-new/admin-panel-artist-new.component";
import {AdminPanelArtistEditComponent} from "./admin-panel-artist-edit/admin-panel-artist-edit.component";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {RichTextEditorModule} from "../../../shared/rich-text-editor/rich-text-editor.module";
import {MatOption, MatSelect} from "@angular/material/select";



@NgModule({
  declarations: [
    AdminPanelArtistsComponent,
    AdminPanelArtistNewComponent,
    AdminPanelArtistEditComponent
  ],
  imports: [
    CommonModule,
    AdminPanelArtistsRoutingModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatProgressBar,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatFormField,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatInput,
    MatError,
    MatFormField,
    MatLabel,
    MatSuffix,
    RichTextEditorModule,
    MatSelect,
    MatOption
  ]
})
export class AdminPanelArtistsModule { }
