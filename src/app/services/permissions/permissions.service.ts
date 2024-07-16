import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { BehaviorSubject } from 'rxjs';
import { APIURL } from '../api';
import { take, finalize, map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private menuLinks$ = new BehaviorSubject([]);
  private permissions$ = new BehaviorSubject({});
  private currentPageRole$ = new BehaviorSubject('');
  private routes$ = new BehaviorSubject([]);

  constructor(private http: HttpService, private loading: NgxSpinnerService) {
    this.getRolesPermissions();
  }

  /**
   * Clear, Reset All permissions, routes, and pages Observables Data
   * @private clearAll()
   * @memberof PermissionsService
   * @returns {void}
   */
  private clearData(): void {
    this.permissions$.next({});
    this.routes$.next([]);
    this.currentPageRole$.next('');
    this.menuLinks$.next([]);
  }

  /**
   * Get the roles and permissions for the current active user
   * which allow the app to modifiy, show, and hide pages and actions
   * @private getRolesPermissions()
   * @memberof PermissionsService
   * @returns {void}
   */
  private getRolesPermissions(): void {
    this.loading.show();
    this.clearData();
    this.http
      .getReq(APIURL.menuLinks)
      .pipe(
        take(1),
        map((resp: any) => {
          if (!resp.success) {
            return;
          }
          this.menuLinks$.next(resp.data);
          resp.data.map((taps: any) => {
            taps.pages.map((route: any) => {
              this.routes$.next([...this.routes$.value, route.path]);
              this.permissions$.next({
                ...this.permissions$.value,
                [route.path]: route.Permissions,
              });
            });
          });
        }),
        finalize(() => this.loading.hide())
      )
      .subscribe();
  }
}
