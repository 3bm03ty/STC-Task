import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private _Router: Router,
    private _authentication: AuthService,
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this._authentication.currentUserValue;
    if (currentUser) {
      // logged in so return true

      console.log();

      if (JSON.parse(currentUser).permissions == "USER") {
        this._Router.navigate([`./categories/categories`]);
        console.log("000");
        
        return false;

      } else if (JSON.parse(currentUser).permissions == "ADMIN") {
        this._Router.navigate([`./products/products`]);
        console.log("000");

        return false;
      }

    }

    return true;

  }

}
