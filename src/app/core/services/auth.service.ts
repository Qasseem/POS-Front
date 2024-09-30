import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { StorageService } from './storage.service';
import { finalize, take } from 'rxjs';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root',
})

/**
 * Auth Services
 * the main service for authentications
 */
export class AuthService {
  items: any[] = [];
  storage: any;
  constructor(
    private http: HttpService,
    private storgeService: StorageService,
    private msalSerivce: MsalService,
    private router: Router
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
  // logout(logoutData) {
  //   return this.http.postReq('/Security/Logout', logoutData);
  // }

  async getMenuItems() {
    await this.getMenuLinks().subscribe({
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

  logOut(): void {
    this.storgeService
      .clearStorage()
      .pipe(
        take(1),
        finalize(() => {})
      )
      .subscribe(() => this.router.navigate(['/auth/login']));
    this.msalSerivce.logout();
  }
}
