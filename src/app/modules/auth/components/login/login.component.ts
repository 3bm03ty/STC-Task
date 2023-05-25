import { AuthService } from './../../../../core/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';
import { Router } from '@angular/router';
import { PermissionsService } from 'src/app/core/services/permissions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  lang!: string;
  message!: string;
  isLoading = false;

  leaveInput = false;
  show = false;
  loading = false;


  constructor(private _DirectionService: DirectionService, private _TranslateService: TranslateService, private _FormBuilder: FormBuilder,
    private _AuthService: AuthService, private _Router: Router, private _PermissionsService: PermissionsService) {
    this.getDirection()
  }

  //get direction
  getDirection() {
    this._DirectionService.dir.subscribe((res) => {
      if (res == 'rtl') {
        this._TranslateService.use('ar');
        this.lang = 'ar';
      } else {
        this._TranslateService.use('en');
        this.lang = 'en';
      }
    });
  }

  public loginForm: FormGroup = this._FormBuilder.group({
    userName: [null, [Validators.required]],
    password: [undefined, [Validators.required]],
  });

  get controls(): any {
    return this.loginForm.controls;
  }

  login(loginForm: FormGroup) {
    this.isLoading = true; // Set the loading indicator to true
    console.log(loginForm.value);

    this._AuthService.login(loginForm.value.userName, loginForm.value.password).subscribe((res) => {
      console.log(res);
      if (res?.status === 200 && res?.statusText === 'OK') {
        localStorage.setItem('userData', JSON.stringify(res?.body));
        if (res.body) {
          this._PermissionsService.setPermissions([res.body.permissions]);
          console.log(res.body);
          if (res.body.permissions == "USER") {
            this._Router.navigateByUrl(`/categories/categories`);
          } else if (res.body.permissions == "ADMIN") {
            this._Router.navigateByUrl(`/products/products`);
          }
        }
      }
    })
  }

  onFocusOutEvent() {
    this.leaveInput = true;
  }

  changeType() {
    if (this.show) {
      this.show = false
    }
    else {
      this.show = true
    }

  }


}
