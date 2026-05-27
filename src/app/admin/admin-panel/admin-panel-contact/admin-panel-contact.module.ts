import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelContactComponent } from './admin-panel-contact.component';
import { AdminPanelContactNewComponent } from './admin-panel-contact-new/admin-panel-contact-new.component';
import { AdminPanelContactEditComponent } from './admin-panel-contact-edit/admin-panel-contact-edit.component';
import {AdminPanelContactRoutingModule} from "./admin-panel-contact-routing.module";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {ReactiveFormsModule} from "@angular/forms";
import {RichTextEditorModule} from "../../../shared/rich-text-editor/rich-text-editor.module";

@NgModule({
  declarations: [
    AdminPanelContactComponent,
    AdminPanelContactNewComponent,
    AdminPanelContactEditComponent
  ],
  imports: [
    CommonModule,
    AdminPanelContactRoutingModule,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    MatButton,
    MatIcon,
    MatIconButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatSlideToggle,
    ReactiveFormsModule,
    RichTextEditorModule
  ]
})
export class AdminPanelContactModule { }
