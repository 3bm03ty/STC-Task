import { NgxPermissionsModule } from 'ngx-permissions';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MyTranslateModule } from '../modules/translate/translate.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    LoaderComponent,
    NavbarComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    NgSelectModule,
    NgxDatatableModule,
    MyTranslateModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoaderComponent,
    NavbarComponent,
    NotFoundComponent,
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    NgSelectModule,
    NgxDatatableModule,
    MyTranslateModule
  ],
  providers: []
})
export class SharedModule { }
