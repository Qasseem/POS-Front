import { Component, OnInit } from '@angular/core';
import { AppTranslateService } from './core/shared/services/translate.service';
import { Spinkit } from 'ng-http-loader';
import { StorageService } from './core/services/storage.service';
import { AuthService } from './core/services/auth.service';
import { InactivityService } from './services/inactivity.service';

@Component({
  selector: 'oc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // this.inactivityService.initialize();
  }
  public spinkit = Spinkit;
  title = 'My Afaqy Customers';
  constructor(
    private appTranslateService: AppTranslateService,
    private storage: StorageService,
    private authService: AuthService,
    private inactivityService: InactivityService
  ) {
    this.appTranslateService.changeLangage(this.storage.getLang());
    if (!!this.storage.getToken()) {
      this.authService.getMenuLinks().subscribe({
        next: (res) => {
          // console.log(res.data);
          if (res.success) {
            let permissions = [];
            res.data.forEach((permission) => {
              permission.pages.forEach((page) => {
                const pagePermissions = page.frontEndNames.split(',');
                pagePermissions.forEach((x) => {
                  x = this.storage.convertToKebabCase(
                    permission.nameEn + ' ' + page.nameEn + ' ' + x
                  );
                  permissions.push(x);
                });
              });
            });
            permissions = Array.from(new Set([...permissions]));
            permissions = this.storage.sortAlphabetically(permissions);
            // permissions = permissions.filter(
            //   (x) => x == 'merchants-all-merchants-block'
            // );
            // console.log(permissions,'appComponent');
            this.storage.setItem('permissions', JSON.stringify(permissions));
          }
        },
      });
    }
  }
}
