import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import localePl from '@angular/common/locales/pl';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {AdminPanelModule} from "./admin/admin-panel/admin-panel.module";
import {AdminPanelGenreModule} from "./admin/admin-panel/admin-panel-genre/admin-panel-genre.module";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule} from "@angular/forms";
import {RichTextEditorModule} from "./shared/rich-text-editor/rich-text-editor.module";
import {OverlayModule} from '@angular/cdk/overlay';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats} from "@angular/material/core";
import {registerLocaleData} from "@angular/common";
import {CustomDateAdapter} from "./adapters/custom-date-adapter";

registerLocaleData(localePl)

export const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AdminPanelModule,
    AdminPanelGenreModule,
    RichTextEditorModule,
    FormsModule,
    OverlayModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'pl' },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
