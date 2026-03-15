import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelCommentRoutingModule } from './admin-panel-comment-routing.module';
import { AdminPanelCommentNewComponent } from './admin-panel-comment-new/admin-panel-comment-new.component';
import { AdminPanelCommentEditComponent } from './admin-panel-comment-edit/admin-panel-comment-edit.component';
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
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    AdminPanelCommentComponent,
    AdminPanelCommentNewComponent,
    AdminPanelCommentEditComponent
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
    MatRowDef
  ]
})
export class AdminPanelCommentModule { }
