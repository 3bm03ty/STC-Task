import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private permissionsService: NgxPermissionsService) { }

  loadStoredPermissions(): Observable<unknown> | Promise<unknown> | void {
    // Load the stored permissions from local storage or your backend API
    const json = localStorage.getItem('userData');
    const user = JSON.parse(json || '{}');
    const permissions = ([user?.permissions] || []) as string[];

    // Set the permissions using NgxPermissionsService
    this.permissionsService.flushPermissions();
    this.permissionsService.loadPermissions(permissions);
  }

  setPermissions(permissions: string[]) {
    // Set the permissions using NgxPermissionsService
    this.permissionsService.flushPermissions();
    this.permissionsService.loadPermissions(permissions);
  }

  clearPermissions() {
    // Clear the permissions using NgxPermissionsService
    this.permissionsService.flushPermissions();
  }
}
