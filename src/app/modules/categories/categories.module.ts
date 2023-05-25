import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MyTranslateModule } from '../translate/translate.module';
import { CoreModule } from 'src/app/core/core.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoaderInterceptor } from 'src/app/core/interceptors/loader.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MyTranslateModule,
    NgxDatatableModule,
    MatDialogModule

    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    }
  ]
})
export class CategoriesModule { }
