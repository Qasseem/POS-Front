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
  items: any[] = [];
  items1 = [
    {
      label: this.translateService.instant('customer'),
      icon: 'pi pi-fw pi-user',
      expanded: true,
      routerLink: '',
      items: [
        {
          label: this.translateService.instant(
            'customerProfile.customerProfile'
          ),

          command: (event) => {
            this.clickItem(event);
          },
          routerLink: '/main/customerProfile/details', // Add your route here
          routerLinkActiveOptions: { exact: false },
          style: { 'background-color': 'blue' },
        },
      ],
    },
  ];
  items2 = [
    {
      icon: 'pi pi-fw pi-user',
      label: this.translateService.instant('customer'),

      expanded: true,
      routerLink: '',
      items: [
        {
          label: this.translateService.instant(
            'customerProfile.customerProfile'
          ),
          command: (event) => {
            this.clickItem(event);
          },
          routerLink: '/main/customerProfile/details', // Add your route here
          routerLinkActiveOptions: { exact: false },
          style: { 'background-color': 'blue' },
        },
      ],
    },
  ];
  moduleHeader: string;
  sub1: any;

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private router: Router,
    public storage: StorageService,
    private appTranslateService: AppTranslateService,
    private loading: NgxSpinnerService
  ) {
    this.items = this.authService.items;
    if (this.authService.items.length == 0) {
      // this.getUserMenu();
    }
    this.translateService.setDefaultLang(this.storage.getLang());
    this.translateService.use(this.storage.getLang());
    this.sub1 = router.events.subscribe((val) => {
      let moduleName = this.router.url.split('/')[2]
        ? this.router.url.split('/')[2]
        : this.router.url.split('/')[1];
      this.moduleHeader = 'parentsModulesName.' + moduleName;
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  changeLangage(lang: string) {
    location.reload();
    this.appTranslateService.changeLangage(lang);
    this.storage.setItem('lang', lang);
  }

  clickItem(event) {
    console.log(event);
    // this.items.push(event.item);
  }
  getUserMenu() {
    this.authService.getMenuLinks().subscribe((resp: APIResponseInterface) => {
      console.log(resp);
      if (resp.success) {
        this.generateMenuItems(resp.data);
      }
    });
  }

  generateMenuItems(data: []) {
    if (data && data.length > 0) {
      data.map((parentItem: any, index) => {
        this.authService.items.push({
          label: parentItem?.nameEn,
          icon: 'pi pi-fw pi-file',
          expanded: false, //parentItem?.path == 'simcards',
          expexpanded: false,
          id: parentItem?.id.toString(),
          items: [],
        });
        parentItem.pages.map((item) => {
          this.authService.items[index]?.items.push({
            label: item?.nameEn,
            icon: 'pi pi-fw pi-file',
            id: item?.id.toString(),
            expexpanded: false,
            items: [],
            routerLink: [item?.path],
            command: (event) => {
              this.clickItem(event);
            },
          });
        });
      });
    }
    this.items = this.authService.items;
    console.log(this.authService.items);
  }

  ngOnInit() {}

  setActiveItem(ss) {
    console.log(ss);
  }
  navigate(path) {
    this.router.navigate([path]);
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
}
