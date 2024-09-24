import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { APIURL } from 'src/app/services/api';
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
    return this.http.postReq(APIURL.login, loginData);
  }
  register(registerData) {
    return this.http.postReq(APIURL.register, registerData);
  }
  getMenuLinks() {
    return this.http.getReq(APIURL.menuLinks);
  }

  forgotPassword(data) {
    return this.http.postReq(APIURL.forgotPassword, data);
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
    return this.http.postReq(APIURL.logout, logoutData);
  }
}
