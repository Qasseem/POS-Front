import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})

/**
 * Auth Services
 * the main service for authentications
 */
export class AuthService {
  items: any[] = [];
  constructor(
    private http: HttpService,
    private storgeService: StorageService
  ) {}

  login(loginData) {
    return this.http.postReq('/Security/Login', loginData);
  }
  register(registerData) {
    return this.http.postReq('/Security/RegisterCustomerUser', registerData);
  }
  getMenuLinks() {
    return this.http.getReq('/Security/Menu');
  }

  forgotPassword(data) {
    return this.http.postReq('/CustomerSecurity/ForgotPassword', data);
  }
  isAuthenticated() {
    return !!this.storgeService.getToken();
  }
  hasPermission(permission: string): boolean {
    // console.log(this.storgeService.getCachedItem('permissions'))
    return JSON.parse(
      this.storgeService.getStringItem('permissions')
    )?.includes(permission);
  }
  logout(logoutData) {
    return this.http.postReq('/Security/Logout', logoutData);
  }

  getMenuItems() {
    this.getMenuLinks().subscribe({
      next: (res) => {
        if (res.success) {
          let permissions = [];
          res.data.forEach((permission) => {
            permission.pages.forEach((page) => {
              const pagePermissions = page.frontEndNames.split(',');
              pagePermissions.forEach((x) => {
                x = this.storgeService.convertToKebabCase(
                  permission.nameEn + ' ' + page.nameEn + ' ' + x
                );
                permissions.push(x);
              });
            });
          });
          permissions = Array.from(new Set([...permissions]));
          permissions = this.storgeService.sortAlphabetically(permissions);
          // permissions = permissions.filter(
          //   (x) => x == 'merchants-all-merchants-block'
          // );
          // console.log(permissions,'appComponent');
          this.storgeService.setItem(
            'permissions',
            JSON.stringify(permissions)
          );
        }
      },
    });
  }
}
