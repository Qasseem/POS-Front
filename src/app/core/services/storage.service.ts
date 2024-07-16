import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * Save items to local storage
   * By key, value pairs
   * @param {string} key the name of property
   * @param {string} value the value we need to store
   * @returns {Observable<void>}
   * @memberof StorageService
   */
  setItem(key: string, value: string): Observable<void> {
    return of(localStorage.setItem(key, value));
  }

  /**
   * Get the value from local storage for a given property
   * @param {string} key the key of the item we need
   * @returns {Observable<string>} the value of the given key
   * @memberof StorageService
   */
  getItem(key: string): Observable<string | null> {
    return of(localStorage.getItem(key));
  }

  /**
   * Get the value from local storage for a given property
   * @param {string} key the key of the item we need
   * @returns {Observable<string>} the value of the given key
   * @memberof StorageService
   */
  getStringItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * Check if the user type is admin or not
   *
   * @returns {boolean}
   * @memberof StorageService
   */
  isAdmin(): boolean {
    const userType = localStorage.getItem('userType');
    if (userType != null) {
      return +userType == 3;
    }
    return false;
  }

  /**
   * Get the token for the current active user
   * @returns {string} User Token
   * @memberof StorageService
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Clear the localstorge and active variables
   * @returns {Observable<void>}
   * @memberof StorageService
   */
  clearStorage(): Observable<void> {
    // console.log('asdddddddddd');
    // location.reload();
    return of(localStorage.clear());
  }

  /**
   * Clear the localstorge and active variables
   * @returns {Observable<void>}
   * @memberof StorageService
   */
  clearStorageWithoutReload(): Observable<void> {
    return of(localStorage.clear());
  }

  /**this.storage
   * Get the current language for the user
   * @returns {string} Current Language
   * @memberof StorageService
   */
  getLang(): string | null {
    return localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';
  }

  /**
   * Save items to local storage
   * By key, value pairs
   * @param {string} key the name of property
   * @param {any} value the value we need to store
   * @returns {Observable<void>}
   * @memberof StorageService
   */
  setCachedItem(key: string, value: any): Observable<void> {
    return of(localStorage.setItem(key, JSON.stringify(value)));
  }

  /**
   * Get the value from local storage for a given property
   * @param {string} key the key of the item we need
   * @returns {Observable<any>} the value of the given key
   * @memberof StorageService
   */
  public getCachedItem(key: string): any {
    let value = localStorage.getItem(key);
    value = value ? JSON.parse(value) : null;
    return value;
  }
  convertToKebabCase(input: string): string {
    return input
      .toLowerCase() // Convert the string to lowercase
      .replace(/&/g, 'and') // Replace '&' with 'and' if needed
      .replace(/[^\w\s-]/g, '') // Remove any non-word characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace one or more spaces with a hyphen
      .replace(/-+/g, '-');
  }

  public setLoginData(resp) {
    this.setItem('token', resp.data.token);
    this.setItem('lang', 'en');
    this.setItem('userNameEn', resp.data.nameEn);
    this.setItem('userNameAr', resp.data.nameAr);
    this.setItem('userId', resp.data.userId);
    this.setItem('userType', resp.data.userType);
    this.setItem('employeeId', resp.data.employeeId);
    this.setItem('userImage', resp.data.imagePath);
    let permissions = [];
    resp.data.permissions.forEach((permission) => {
      permission.pages.forEach((page) => {
        const pagePermissions = page.frontEndNames.split(',');
        pagePermissions.forEach((x) => {
          x = this.convertToKebabCase(
            permission.nameEn + ' ' + page.nameEn + ' ' + x
          );
          permissions.push(x);
        });
      });
    });
    permissions = Array.from(new Set([...permissions]));
    permissions = this.sortAlphabetically(permissions);
    // console.log(permissions);
    this.setItem('permissions', JSON.stringify(permissions));
  }
  sortAlphabetically(arr: string[]): string[] {
    return arr.sort((a, b) => a.localeCompare(b));
  }
}
