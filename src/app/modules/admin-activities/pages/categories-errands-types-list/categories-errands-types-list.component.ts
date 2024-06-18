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
import { AdminActivitiesService } from '../../services/admin-activities.service';

@Component({
  selector: 'oc-categories-errands-types-list',
  templateUrl: './categories-errands-types-list.component.html',
  styleUrls: ['./categories-errands-types-list.component.scss'],
})
export class CategoriesErrandsTypesListComponent implements OnInit {
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/admin-activities/categories-errands-types/edit/${row?.id}`;
    this.router.navigate([URL]);
  }

  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: true,
    showExport: true,
    showFilter: true,
    showImport: true,
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'id',
      header: 'ID',
      width: '100px',
    },
    {
      field: 'categoryName',
      header: 'Category',
    },
    {
      field: 'nameEn',
      header: 'Type Name En',
    },
    {
      field: 'nameAr',
      header: 'Type Name Ar',
    },
    {
      field: 'requireQuantity',
      header: 'Require Qty?',
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
    private service: AdminActivitiesService
  ) {}

  ngOnInit() {}
  navigateToAdd() {
    this.router.navigate([
      'main/admin-activities/categories-errands-types/add',
    ]);
  }
}
