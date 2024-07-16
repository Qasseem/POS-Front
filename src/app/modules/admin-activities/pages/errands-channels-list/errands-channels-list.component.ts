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
  selector: 'oc-errands-channels-list',
  templateUrl: './errands-channels-list.component.html',
  styleUrls: ['./errands-channels-list.component.scss'],
})
export class ErrandsChannelsListComponent implements OnInit {
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/admin-activities/errands-channels/edit/${row?.id}`;
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
      width: '100px',
    },

    {
      field: 'nameEn',
      header: 'Channel Name EN',
      width: '200px',
    },
    {
      field: 'nameAr',
      header: 'Channel Name Ar',
      width: '200px',
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
  //     field: 'nameEn',
  //     isFixed: true,
  //   },
  //   {
  //     type: SearchInputTypes.text,
  //     field: 'nameAr',
  //     isFixed: true,
  //   },
  //   {
  //     type: SearchInputTypes.text,
  //     field: 'UserName',
  //     isFixed: true,
  //   },
  //   {
  //     isMultiple: true,
  //     type: SearchInputTypes.select,
  //     field: 'status',
  //     isFixed: true,
  //     // url: this.url.Merchant.GetAllMerchantCategories,
  //     // method: HTTPMethods.getReq,
  //     // propValueName: 'id',
  //   },
  //   {
  //     type: SearchInputTypes.date,
  //     field: 'createDate',
  //     isFixed: true,
  //   },
  // ];

  constructor(
    private router: Router,
    private service: AdminActivitiesService
  ) {}

  ngOnInit() {}
  navigateToAdd() {
    this.router.navigate(['main/admin-activities/errands-channels/add']);
  }
}
