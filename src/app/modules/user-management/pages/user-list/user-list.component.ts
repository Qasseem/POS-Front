import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  SearchInputTypes,
  HTTPMethods,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';
import { APIURL } from 'src/app/services/api';

@Component({
  selector: 'oc-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  statusList = [
    { id: 'active', name: 'Active' },
    { id: 'blocked', name: 'Blocked' },
  ];

  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/user-management/user/edit/${row?.id}`;
    this.router.navigate([URL]);
  }
  blockItem(row: any): any {
    const URL = `/home/customers/info/${row?.id}`;
    return URL;
  }

  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: true,
    showExport: true,
    showFilter: true,
    showImport: false,
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'id',
      header: 'ID',
      width: '50px',
    },
    {
      field: [
        { label: 'imageUrl', custom: 'image' },
        { label: 'firstName', custom: 'default' },
        { label: 'lastName', custom: 'default' },
        { label: 'userName', custom: 'email' },
      ],
      header: 'User',
      customCell: 'multiLabel',
    },
    {
      field: 'userType',
      header: 'User Type',
    },
    // {
    //   field: 'userName',
    //   header: 'User Name',
    // },
    {
      field: 'phoneNumber',
      header: 'Phone Number',
    },
    {
      field: [
        { label: 'createdBy', custom: 'default' },
        { label: 'createDate', custom: 'defaultDate' },
      ],
      header: 'Created by',
      customCell: 'multiLabel',
      width: '200px',
    },
    {
      field: 'status',
      header: 'Status',
    },
  ];

  public actions: ActionsInterface[] = [
    {
      name: 'Edit',
      icon: 'pi pi-file-edit',
      call: (row: any) => this.editItem(row),
      // customPermission: (row: any) => row.id > 3,
    },
    {
      name: 'Block',
      icon: 'pi pi-ban',
      call: (row: any) => this.blockItem(row),
    },
  ];

  filters: SearchInterface[] = [
    {
      type: SearchInputTypes.date,
      field: 'createDate',
      isFixed: true,
    },

    {
      type: SearchInputTypes.text,
      field: 'id',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'username',
      isFixed: true,
    },

    {
      type: SearchInputTypes.text,
      field: 'email',
      isFixed: true,
    },

    {
      type: SearchInputTypes.number,
      field: 'phoneNumber',
      isFixed: true,
    },
    {
      type: SearchInputTypes.number,
      field: 'nationalId',
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'userType',
      isFixed: true,
      url: this.url.Users.getAllUsersTypeDropdown,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'role',
      isFixed: true,
      url: this.url.Role.getAllRolesDropdown,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    // {
    //   isMultiple: true,
    //   type: SearchInputTypes.select,
    //   field: 'status',
    //   isFixed: true,
    //   url: this.statusList,
    //   method: HTTPMethods.getReq,
    //   propValueName: 'id',
    // },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'manager',
      isFixed: true,
      url: this.url.Users.getAllManagerDropdown,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'region',
      isFixed: true,
      url: this.url.Terminal.GetAllRegions,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'city',
      isFixed: true,
      url: this.url.Terminal.GetAllCities,
      method: HTTPMethods.getReq,
      propValueName: 'id',
      header: '0',
    },

    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'zone',
      isFixed: true,
      url: this.url.Terminal.GetAllZones,
      method: HTTPMethods.getReq,
      propValueName: 'id',
      header: '0',
    },
  ];

  constructor(private router: Router, private service: TerminalService) {}

  ngOnInit() {}
  navigateToAdd() {
    this.router.navigate(['main/user-management/user/add']);
  }
}
