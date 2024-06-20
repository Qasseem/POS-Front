import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { AppTranslateService } from 'src/app/core/shared/services/translate.service';

@Component({
  selector: 'oc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  sidebarVisible = true;
  items = [
    {
      label: this.translateService.instant('Dashboard'),
      icon: 'dashboard',
      expanded: false,
      routerLink: '/main/dashboard',
      active: false,
    },
    {
      label: this.translateService.instant('Merchants'),
      icon: 'Users',
      expanded: false,
      routerLink: '/main/merchant/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Merchants'),
          expanded: true,
          routerLink: '/main/merchant/list',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Merchants'),
          expanded: true,
          routerLink: '/main/merchant/favorites',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('Terminals'),
      icon: 'terminals',
      expanded: false,
      routerLink: '/main/terminal/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Terminals'),
          expanded: true,
          routerLink: '/main/terminal/list',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Terminals'),
          expanded: true,
          routerLink: '/main/terminal/favorites',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('Tickets'),
      icon: 'tickets',
      expanded: false,
      routerLink: '/main/ticket/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Tickets'),
          expanded: true,
          routerLink: '/main/ticket/list',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Tickets'),
          expanded: true,
          routerLink: '/main/ticket/favorites',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('User Management'),
      icon: 'users-management',
      expanded: false,
      routerLink: '/main/user-management/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Users'),
          expanded: true,
          routerLink: '/main/user-management/user/list',
          active: false,
        },
        {
          label: this.translateService.instant('Roles & Permissions'),
          expanded: true,
          routerLink: '/main/user-management/role/list',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('Locations'),
      icon: 'locations',
      expanded: false,
      routerLink: '/main/locations/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Region'),
          expanded: true,
          routerLink: '/main/locations/region/list',
          active: false,
        },
        {
          label: this.translateService.instant('City'),
          expanded: true,
          routerLink: '/main/locations/city/list',
          active: false,
        },
        {
          label: this.translateService.instant('Zone'),
          expanded: true,
          routerLink: '/main/locations/zone/list',
          active: false,
        },
      ],
    },

    {
      label: this.translateService.instant('Admin Activities'),
      icon: 'admin-activities',
      expanded: false,
      routerLink: '/main/admin-activities/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Merchant Category Codes'),
          expanded: true,
          routerLink: '/main/admin-activities/list/merchant-category-codes',
          active: false,
        },
        {
          label: this.translateService.instant('Errand Channels'),
          expanded: true,
          routerLink: '/main/admin-activities/list/errands-channels',
          active: false,
        },
        {
          label: this.translateService.instant('POS Types'),
          expanded: true,
          routerLink: '/main/admin-activities/list/pos-types',
          active: false,
        },
        {
          label: this.translateService.instant('Categories Errand Types'),
          expanded: true,
          routerLink: '/main/admin-activities/list/categories-errands-types',
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
    this.translateService.setDefaultLang(this.storage.getLang());
    this.translateService.use(this.storage.getLang());
    this.router.events.subscribe({
      next: (route) => {
        if (route instanceof RouterEvent) {
          const url = route.url.split('/');
          let parentUrl = '';
          if (url[2] && url[2].includes('list')) {
            parentUrl = '/' + url[1] + '/' + url[2] + '/' + url[3];
          } else {
            parentUrl = '/' + url[1] + '/' + url[2];
          }
          const parentItemIndex = this.items.findIndex((x) =>
            x.routerLink.includes(parentUrl)
          );
          if (parentItemIndex > -1) {
            this.items[parentItemIndex].active = true;
            this.items[parentItemIndex].expanded =
              !this.items[parentItemIndex].expanded;
            const childItemIndex = this.items[
              parentItemIndex
            ]?.childs?.findIndex((y) => y.routerLink == route.url);
            if (childItemIndex > -1) {
              this.items[parentItemIndex]?.childs?.forEach((x) => {
                if (x.routerLink == route.url) {
                  x.active = true;
                } else {
                  x.active = false;
                }
              });
            }
          }
        }
      },
    });
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
  }
  panelExpanded(event, currentIndex) {
    this.items.forEach((item, index) => {
      if (currentIndex != index) {
        item.expanded = false;
      }
    });
  }

  setActiveItem(ss) {}

  navigate(item, child = null) {
    if (child == null && !item.childs?.length) {
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
      .subscribe(() => this.router.navigate(['/auth/login']));
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
