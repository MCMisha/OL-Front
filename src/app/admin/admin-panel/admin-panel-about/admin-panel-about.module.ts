import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPanelAboutComponent} from './admin-panel-about.component';
import {AdminPanelAboutRoutingModule} from "./admin-panel-about-routing.module";
import {MaterialModule} from "../../../material.module";
import {AdminPanelAboutNewComponent} from './admin-panel-about-new/admin-panel-about-new.component';
import {AdminPanelAboutEditComponent} from './admin-panel-about-edit/admin-panel-about-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RichTextEditorModule} from "../../../shared/rich-text-editor/rich-text-editor.module";
import {CdkDrag, CdkDragHandle, CdkDropList} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    AdminPanelAboutComponent,
    AdminPanelAboutNewComponent,
    AdminPanelAboutEditComponent
  ],
  imports: [
    CommonModule,
    AdminPanelAboutRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RichTextEditorModule,
    CdkDropList,
    CdkDragHandle,
    CdkDrag,
  ]
})
export class AdminPanelAboutModule {
}
