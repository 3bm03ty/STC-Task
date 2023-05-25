import { Route, Router } from '@angular/router';
import { PermissionsService } from './../../../core/services/permissions.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { productsRoutes } from 'src/app/modules/products/routes/products-routes';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  dir!: string;
  constructor(private _TranslateService: TranslateService,
    private _DirectionService: DirectionService,
    private _PermissionsService:PermissionsService,
    private _Router:Router) {

  }


  ngOnInit(): void {
    this.dir = localStorage.getItem('dir') || '';
    this._TranslateService.use(this.dir == 'ltr' ? 'en' : 'ar');
  }
  changeLanguage(lang: string) {
    lang == 'en' ? localStorage.setItem('dir', 'ltr') : localStorage.setItem('dir', 'rtl')
    this.dir = localStorage.getItem('dir') || '';
    if (this.dir == 'rtl') {
      this.Arabic();
    } else {
      this.English();
    }
  }
  Arabic() {
    this.dir = 'rtl';
    localStorage.setItem('dir', 'rtl');
    this._TranslateService.use('ar');
    this._DirectionService.dir.next('rtl');
  }
  English() {
    this.dir = 'ltr';
    localStorage.setItem('dir', 'ltr');
    this._TranslateService.use('en');
    this._DirectionService.dir.next('ltr');
  }


  logOut() {
    // Clear local storage
    localStorage.clear();

    // Clear permissions from ngx-permissions
    this._PermissionsService.clearPermissions();

    // Navigate back to login page
    this._Router.navigate(['/auth']);
  }

}
