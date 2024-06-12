import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { APIResponseInterface } from 'src/app/core/shared/interfaces/common-inferfaces';

import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage/storage.service';
import { AppTranslateService } from 'src/app/core/shared/services/translate.service';
import { finalize, take, window } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  sidebarVisible = true;
  panelOpenState = false;
  items = [
    // {
    //   label: this.translateService.instant('Dashboard'),
    //   icon: 'pi pi-users',
    //   expanded: true,
    //   routerLink: '/main/merchant/all',
    //   active: false,
    //   childs: [],
    // },
    {
      label: this.translateService.instant('Merchants'),
      icon: 'pi pi-users',
      expanded: true,
      routerLink: '/main/merchant/all',
      active: true,
      childs: [
        {
          label: this.translateService.instant('Mechants'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/merchant/all',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Mechants'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/merchant/Favorite',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('Terminals'),
      icon: 'pi pi-users',
      expanded: true,
      routerLink: '/main/terminal/all',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Terminals'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/terminal/all',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Terminals'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/terminal/all',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('Tickets'),
      icon: 'pi pi-users',
      expanded: true,
      routerLink: '/main/ticket/all',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Tickets'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/ticket/all',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Tickets'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/ticket/all',
          active: false,
        },
      ],
    },
  ];

  listActions = [
    {
      label: 'Log-out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logOut();
      },
    },
  ];

  moduleHeader: string;
  userType: any;
  userName: any;

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private router: Router,
    public storage: StorageService,
    private appTranslateService: AppTranslateService,
    private loading: NgxSpinnerService
  ) {
    if (this.authService.items.length == 0) {
      // this.getUserMenu();
    }
    this.translateService.setDefaultLang(this.storage.getLang());
    this.translateService.use(this.storage.getLang());
  }

  ngOnDestroy(): void {}

  changeLangage(lang: string) {
    location.reload();
    this.appTranslateService.changeLangage(lang);
    this.storage.setItem('lang', lang);
  }

  clickItem(event) {
    // this.items.push(event.item);
  }

  ngOnInit() {
    this.userName = this.storage.getStringItem('userNameEn');
    this.userType = this.storage.getStringItem('userType');
    console.log(this.userName);
  }

  setActiveItem(ss) {}

  navigate(item, child = null) {
    if (child == null && !item.childs.length) {
      this.navigateFromParent(item);
    }
    if (child != null) {
      this.setAllPropsByNameInArray(this.items, 'active', false);
      item.active = true;
      child.active = true;
      this.router.navigate([child.routerLink]);
    }
  }
  navigateFromParent(item) {
    this.setAllPropsByNameInArray(this.items, 'active', false);
    item.active = true;
    this.router.navigate([item.routerLink]);
  }

  logOut(): void {
    this.loading.show();
    this.storage
      .clearStorage()
      .pipe(
        take(1),
        finalize(() => this.loading.hide())
      )
      .subscribe(() => this.router.navigate(['/login']));
  }
  setAllPropsByNameInArray(arr, propName, value) {
    arr.forEach((obj) => {
      for (const key in obj) {
        if (key === propName) {
          obj[key] = value;
        } else if (typeof obj[key] === 'object') {
          this.setAllPropsByNameInArray(obj[key], propName, value);
        }
      }
    });
  }
}
