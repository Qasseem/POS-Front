import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { APIURL } from 'src/app/services/api';
import { MerchantCategoryService } from '../../services/merchant-category.service';

@Component({
  selector: 'oc-merchant-category-codes-list',
  templateUrl: './merchant-category-codes-list.component.html',
  styleUrls: ['./merchant-category-codes-list.component.scss'],
})
export class MerchantCategoryCodesListComponent implements OnInit {
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/admin-activities/list/merchant-category-codes/edit/${row?.id}`;
    this.router.navigate([URL]);
  }

  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: true,
    showExport: true,
    showFilter: false,
    showImport: true,
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'id',
      header: 'ID',
      width: '50px',
    },
    {
      field: 'nameEn',
      header: 'MCC Name En',
    },
    {
      field: 'nameAr',
      header: 'MCC Name Ar',
    },
    {
      field: 'status',
      header: 'Status',
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
  ];

  // filters: SearchInterface[] = [
  //   {
  //     type: SearchInputTypes.text,
  //     field: 'id',
  //     isFixed: true,
  //   },
  //   {
  //     type: SearchInputTypes.text,
  //     field: 'nameAr',
  //     isFixed: true,
  //   },
  //   {
  //     type: SearchInputTypes.text,
  //     field: 'nameEn',
  //     isFixed: true,
  //   },
  //   {
  //     type: SearchInputTypes.text,
  //     field: 'status',
  //     isFixed: true,
  //   },
  //   {
  //     type: SearchInputTypes.date,
  //     field: 'createDate',
  //     isFixed: true,
  //   },
  // ];
  showEdit = true;
  constructor(
    private router: Router,
    public authService: AuthService,
    public service: MerchantCategoryService
  ) {}

  ngOnInit() {
    if (
      !this.authService.hasPermission(
        'admin-activities-merchant-category-export'
      )
    ) {
      this.tableBtns.showExport = false;
    }
    if (
      !this.authService.hasPermission(
        'admin-activities-merchant-category-block'
      )
    ) {
      this.actions = this.actions.filter((x) => x.name !== 'Block');
    }
    if (
      !this.authService.hasPermission('admin-activities-merchant-category-edit')
    ) {
      // this.actions = this.actions.filter((x) => x.name !== 'Edit');
      this.showEdit = false;
    }
    if (
      !this.authService.hasPermission('admin-activities-merchant-category-add')
    ) {
      this.tableBtns.showImport = false;
    }
  }
  navigateToAdd() {
    this.router.navigate([
      'main/admin-activities/list/merchant-category-codes/add',
    ]);
  }
}
