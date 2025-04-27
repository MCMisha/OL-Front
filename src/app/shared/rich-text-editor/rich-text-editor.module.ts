import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RichTextEditorComponent} from "./rich-text-editor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [RichTextEditorComponent],
  exports: [
    RichTextEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RichTextEditorModule { }
