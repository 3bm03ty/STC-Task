import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPermissionsModule } from 'ngx-permissions';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [

  ],
  imports: [
    CoreRoutingModule,
    // StoreModule.forRoot({}, {}),
    
  ],
  exports: [

  ]
})
export class CoreModule { }
