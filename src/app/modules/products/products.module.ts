import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyTranslateModule } from '../translate/translate.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LoaderInterceptor } from 'src/app/core/interceptors/loader.interceptor';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    UpdateProductComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MyTranslateModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPermissionsModule.forRoot(),
    NgxDropzoneModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    }
  ]
})
export class ProductsModule { }
