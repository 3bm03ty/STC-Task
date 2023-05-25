import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MyTranslateModule } from '../translate/translate.module';
import { UnauthComponent } from './components/unauth/unauth.component';
import { IsLoggedInGuard } from 'src/app/guards/is-logged-in.guard';


@NgModule({
  declarations: [
    LoginComponent,
    UnauthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MyTranslateModule
  ],
  providers:[IsLoggedInGuard]
})
export class AuthModule { }
