import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  HTTPMethods,
  SearchInputTypes,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { APIURL } from 'src/app/services/api';
import { MerchantService } from '../../services/merchant.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toaster.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'oc-merchant-favorite-list',
  templateUrl: './merchant-favorite-list.component.html',
  styleUrls: ['./merchant-favorite-list.component.scss'],
})
export class MerchantFavoriteListComponent implements OnInit, OnDestroy {
  public url = APIURL;
  alive = false;
  viewDetails = true;
  reloadIfUpdated = false;
  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: false,
    showExport: false,
    showFilter: true,
    showImport: false,
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'reference',
      header: 'Ref',
      width: '100px',
    },
    {
      field: 'merchantId',
      header: 'ID',
      width: '100px',
    },

    {
      field: [
        { label: 'merchantNameEN', custom: 'navigator' },
        { label: 'merchantNameAR', custom: 'default' },
      ],
      header: 'Name',
      customCell: 'multiLabel',
      link: 'main/merchant/details/',
      width: '200px',
    },
    {
      field: 'userName',
      header: 'User Name',
      width: '110px',
    },
    {
      field: 'category',
      header: 'Category',
      width: '110px',
    },
    {
      field: [
        { label: 'createdBy', custom: 'normal' },
        { label: 'createdAt', custom: 'defaultDate' },
      ],
      header: 'Created by',
      customCell: 'multiLabel',
      width: '200px',
    },
  ];

  public actions: ActionsInterface[] = [
    {
      name: 'Edit',
      icon: 'pi pi-file-edit',
      // permission: 'viewcustomerpayments',
      call: (row: any) => this.editItem(row),
      // customPermission: (row: any) => row.id > 3,
    },
    // {
    //   name: 'Block',
    //   icon: 'pi pi-ban',
    //   permission: 'completedata',
    //   call: (row: any) => this.blockItem(row),
    // },
    // {
    //   name: 'Remove From favorites',
    //   icon: 'pi pi-heart-fill',
    //   permission: 'completedata',
    //   call: (row: any) => this.removeFromFavorite(row),
    // },
  ];

  filters: SearchInterface[] = [
    {
      type: SearchInputTypes.text,
      field: 'MerchantNameEN',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'MerchantNameAR',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'UserName',
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'category',
      isFixed: true,
      url: this.url.Merchant.GetAllMerchantCategories,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      type: SearchInputTypes.date,
      field: 'createDate',
      isFixed: true,
    },
  ];

  constructor(
    private router: Router,
    public service: MerchantService,
    private authService: AuthService,
    private toaster: ToastService
  ) {}
  showFavourite = false;

  ngOnInit() {
    if (!this.authService.hasPermission('merchants-all-merchants-details')) {
      this.viewDetails = false;
    }
    if (!this.authService.hasPermission('merchants-all-merchants-export')) {
      this.tableBtns.showExport = false;
    }
    if (!this.authService.hasPermission('merchants-all-merchants-block')) {
      this.actions = this.actions.filter((x) => x.name !== 'Block');
    }
    if (!this.authService.hasPermission('merchants-all-merchants-edit')) {
      this.actions = this.actions.filter((x) => x.name !== 'Edit');
    }
    if (!this.authService.hasPermission('merchants-all-merchants-favorite')) {
      // this.actions = this.actions.filter((x) => x.name !== 'Add to favorites');
      this.showFavourite = false;
    }
  }

  navigateToAdd() {
    this.router.navigate(['main/merchant/add']);
  }
  removeFromFavorite(row: any): any {
    let isFavorite = !row.isFavourite;
    this.service
      .Favorite({ id: row?.id, isFavorite: isFavorite })
      .subscribe((resp) => {
        if (resp.success) {
          this.reloadIfUpdated = true;
          const message = isFavorite
            ? 'Add to favorites successfully'
            : 'Removed from favorites successfully';
          this.toaster.toaster.clear();
          this.toaster.showSuccess(message);
          row.isFavourite = isFavorite;
          return row;
        }
      });
    this.reloadIfUpdated = false;
  }
  editItem(row: any): any {
    const URL = `main/merchant/edit/${row?.id}`;
    this.router.navigate([URL]);
  }

  blockItem(row: any): any {
    const isBlock = !row.isBlock;
    const action = isBlock ? 'Block' : 'Unblock';
    const okText = isBlock ? 'Yes, Block' : 'Yes, Unblock';
    this.service
      .confirm(
        `Are you sure you want to ${action} this item?`,
        `${action} Item`,
        okText,
        'No,Cancel'
      )
      .subscribe((response) => {
        if (response) {
          this.service
            .Block({ id: row.id, isBlock })
            .pipe(takeWhile(() => this.alive))
            .subscribe((response) => {
              if (response.success) {
                const message = isBlock
                  ? 'Blocked successfully'
                  : 'Unblocked successfully';
                this.toaster.toaster.clear();
                this.toaster.showSuccess(message);
                row.isBlock = isBlock; // Update the row's block status
                // this.updateActions(row);
                this.reloadIfUpdated = true;
                return row;
              }
            });
        }
      });
    this.reloadIfUpdated = false;
  }

  goToDetails(row: any): any {
    const URL = `main/merchant/details/${row?.id}`;
    return URL;
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
