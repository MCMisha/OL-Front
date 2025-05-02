import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelNewsComponent } from './admin-panel-news.component';
import {RichTextEditorModule} from "../../../shared/rich-text-editor/rich-text-editor.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminPanelNewsRoutingModule} from "./admin-panel-news-routing.module";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
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
import { AdminPanelNewsNewComponent } from './admin-panel-news-new/admin-panel-news-new.component';
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import { AdminPanelNewsEditComponent } from './admin-panel-news-edit/admin-panel-news-edit.component';



@NgModule({
  declarations: [
    AdminPanelNewsComponent,
    AdminPanelNewsNewComponent,
    AdminPanelNewsEditComponent
  ],
  imports: [
    CommonModule,
    AdminPanelNewsRoutingModule,
    RichTextEditorModule,
    FormsModule,
    MatButton,
    MatProgressBar,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatIconButton,
    MatSuffix
  ]
})
export class AdminPanelNewsModule { }
