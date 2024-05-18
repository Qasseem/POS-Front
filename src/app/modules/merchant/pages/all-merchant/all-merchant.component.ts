import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  HTTPMethods,
  SearchInputTypes,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { APIURL } from 'src/app/services/api';

@Component({
  selector: 'app-all-merchant',
  templateUrl: './all-merchant.component.html',
  styleUrls: ['./all-merchant.component.css'],
})
export class AllMerchantComponent implements OnInit {
  public url = APIURL;

  completeData(row: any): any {
    throw new Error('Method not implemented.');
  }
  navToServiceSetting(row: any): any {
    throw new Error('Method not implemented.');
  }
  goToDetails(row: any): any {
    const dolphinId = row.dolphinId || 0;
    const id = row.id;
    const URL = `/home/customers/info/${id}/${dolphinId}`;
    return URL;
  }
  public columns: ColumnsInterface[] = [
    {
      field: 'reference',
      header: 'Ref',
      width: '100px',
    },
    {
      field: 'id',
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
      action: (row) => this.goToDetails(row),
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
        { label: 'merchantNameEN', custom: 'default' },
        { label: 'merchantNameAR', custom: 'default' },
      ],
      header: 'Created by',
      customCell: 'multiLabel',
      width: '200px',
    },
  ];

  public actions: ActionsInterface[] = [
    {
      name: 'customers.solutionsSettings',
      icon: 'fas fa-briefcase',
      permission: 'viewcustomerpayments',
      call: (row: any) => this.navToServiceSetting(row),
    },
    {
      name: 'customers.complete',
      icon: 'fas fa-user-edit',
      permission: 'completedata',
      call: (row: any) => this.completeData(row),
      customPermission: (row: any) => row.statusId === 1 || row.statusId === 2,
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
      isFixed: false,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}
  navigateToAdd() {
    this.router.navigate(['main/merchant/add']);
  }
}
