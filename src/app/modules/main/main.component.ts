import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      routerLink: '/main/merchant/list',
      active: true,
      childs: [
        {
          label: this.translateService.instant('Mechants'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/merchant/list',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Mechants'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/merchant/favorites',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('Terminals'),
      icon: 'pi pi-users',
      expanded: true,
      routerLink: '/main/terminal/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Terminals'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/terminal/list',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Terminals'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/terminal/list',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('Tickets'),
      icon: 'pi pi-users',
      expanded: true,
      routerLink: '/main/ticket/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Tickets'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/ticket/list',
          active: false,
        },
        {
          label: this.translateService.instant('Favorite Tickets'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/ticket/list',
          active: false,
        },
      ],
    },
    {
      label: this.translateService.instant('Locations'),
      icon: 'pi pi-users',
      expanded: true,
      routerLink: '/main/locations/list',
      active: false,
      // childs: [
      //   {
      //     label: this.translateService.instant('Tickets'),
      //     icon: 'pi pi-users',
      //     expanded: true,
      //     routerLink: '/main/ticket/list',
      //     active: false,
      //   },
      //   {
      //     label: this.translateService.instant('Favorite Tickets'),
      //     icon: 'pi pi-users',
      //     expanded: true,
      //     routerLink: '/main/ticket/list',
      //     active: false,
      //   },
      // ],
    },
    {
      label: this.translateService.instant('Admin Activities'),
      icon: 'pi pi-users',
      expanded: true,
      routerLink: '/main/admin-activities/list',
      active: false,
      childs: [
        {
          label: this.translateService.instant('Merchant Category Codes'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/admin-activities/list/merchant-category-codes',
          active: true,
        },
        {
          label: this.translateService.instant('Errand Channels'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/admin-activities/list/errands-channels',
          active: false,
        },
        {
          label: this.translateService.instant('POS Types'),
          icon: 'pi pi-users',
          expanded: true,
          routerLink: '/main/admin-activities/list/pos-types',
          active: false,
        },
        {
          label: this.translateService.instant('Categories Errand Types'),
          icon: 'pi pi-users',
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
