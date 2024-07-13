import { Component, OnInit } from '@angular/core';
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
import { DialogService } from 'src/app/services/dialog.service';
import { takeWhile } from 'rxjs';
import { ToastService } from 'src/app/core/services/toaster.service';

@Component({
  selector: 'oc-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss'],
})
export class MerchantListComponent implements OnInit {
  public url = APIURL;
  alive: boolean = true;
  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: true,
    showExport: true,
    showFilter: true,
    showImport: true,
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
      permission: 'viewcustomerpayments',
      call: (row: any) => this.editItem(row),
      // customPermission: (row: any) => row.id > 3,
    },
    {
      name: 'Block',
      icon: 'pi pi-ban',
      permission: 'completedata',
      call: (row: any) => this.toggleBlockItem(row),
    },

    {
      name: 'Add to favorite ',
      icon: 'pi pi-heart',
      permission: 'completedata',
      call: (row: any) => this.addToFavorite(row),
    },
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
    private service: MerchantService,
    public dialogService: DialogService,
    public toaster: ToastService
  ) {}

  ngOnInit() {}

  navigateToAdd() {
    this.router.navigate(['main/merchant/add']);
  }
  addToFavorite(row: any): any {
    this.service
      .Favorite({ id: row?.id, isFavorite: true })
      .subscribe((resp) => {
        if (resp.success) {
        }
      });
  }
  editItem(row: any): any {
    const URL = `main/merchant/edit/${row?.id}`;
    this.router.navigate([URL]);
  }

  toggleBlockItem(row: any): any {
    const isBlock = !row.isBlocked;
    const action = isBlock ? 'block' : 'unblock';
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
                this.toaster.showSuccess(message);
                row.isBlocked = isBlock; // Update the row's block status
                this.updateActions(row);
              }
            });
        }
      });
  }
  updateActions(row: any) {
    this.actions = this.actions.map((actionItem) => {
      if (actionItem.name === 'Block' && row.isBlocked) {
        return {
          ...actionItem,
          name: 'Unblock',
          icon: 'pi pi-check',
          call: (r: any) => this.toggleBlockItem(r),
        };
      } else if (actionItem.name === 'Unblock' && !row.isBlocked) {
        return {
          ...actionItem,
          name: 'Block',
          icon: 'pi pi-ban',
          call: (r: any) => this.toggleBlockItem(r),
        };
      }
      return actionItem;
    });
  }

  goToDetails(row: any): any {
    const URL = `main/merchant/details/${row?.id}`;
    return URL;
  }
}
