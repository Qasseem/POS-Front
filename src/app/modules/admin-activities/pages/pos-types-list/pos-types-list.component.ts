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
  selector: 'oc-pos-types-list',
  templateUrl: './pos-types-list.component.html',
  styleUrls: ['./pos-types-list.component.scss'],
})
export class POSTypesListComponent implements OnInit {
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
    const URL = `main/merchant/details/${row?.id}`;
    console.log(URL);

    return URL;
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
    }
  ];

  filters: SearchInterface[] = [
    {
      type: SearchInputTypes.text,
      field: 'nameEn',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'nameAr',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'status',
      isFixed: true,
    },
    {
      type: SearchInputTypes.date,
      field: 'createDate',
      isFixed: true,
    },
  ];

  constructor(private router: Router, private service: AdminActivitiesService) { }

  ngOnInit() { }
  navigateToAdd() {
    this.router.navigate(['main/merchant/add']);
  }
}
