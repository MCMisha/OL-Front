import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPanelCommentRoutingModule} from './admin-panel-comment-routing.module';
import {AdminPanelCommentNewComponent} from './admin-panel-comment-new/admin-panel-comment-new.component';
import {AdminPanelCommentEditComponent} from './admin-panel-comment-edit/admin-panel-comment-edit.component';
import {AdminPanelCommentComponent} from "./admin-panel-comment.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatProgressBar} from "@angular/material/progress-bar";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {AdminPanelCommentFormComponent} from './admin-panel-comment-form/admin-panel-comment-form.component';
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AdminPanelCommentComponent,
    AdminPanelCommentNewComponent,
    AdminPanelCommentEditComponent,
    AdminPanelCommentFormComponent
  ],
  imports: [
    CommonModule,
    AdminPanelCommentRoutingModule,
    MatPaginator,
    MatProgressBar,
    MatTable,
    MatColumnDef,
    MatButton,
    MatCell,
    MatHeaderCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRow,
    MatHeaderRow,
    MatRowDef,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatProgressSpinner,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerToggle
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule]
})
export class AdminPanelCommentModule {
}
