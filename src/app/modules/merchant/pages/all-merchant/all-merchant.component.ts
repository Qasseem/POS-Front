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
  addToFavorite(row: any): any {
    const URL = `main/merchant/edit/${row?.id}`;
    console.log(this.url);

    this.router.navigate([this.url]);
    return URL;
  }
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/merchant/edit/${row?.id}`;
    console.log(URL);
    this.router.navigate([URL]);
  }
  blockItem(row: any): any {
    const URL = `/home/customers/info/${row?.id}`;
    return URL;
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
      name: 'Edit',
      icon: 'pi pi-file-edit',
      permission: 'viewcustomerpayments',
      call: (row: any) => this.editItem(row),
      customPermission: (row: any) => row.id > 3,
    },
    {
      name: 'Block',
      icon: 'pi pi-ban',
      permission: 'completedata',
      call: (row: any) => this.blockItem(row),
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

  constructor(private router: Router) {}

  ngOnInit() {}
  navigateToAdd() {
    this.router.navigate(['main/merchant/add']);
  }
}
