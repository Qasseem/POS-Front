import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { PosTypesService } from 'src/app/modules/admin-activities/services/pos-types.service';
import { APIURL } from 'src/app/services/api';

@Component({
  selector: 'app-notification-center-list',
  templateUrl: './notification-center-list.component.html',
  styleUrl: './notification-center-list.component.scss',
})
export class NotificationCenterListComponent implements OnInit {
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/admin-activities/pos-types/edit/${row?.id}`;
    this.router.navigate([URL]);
  }

  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: true,
    showExport: false,
    showFilter: false,
    showImport: false,
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'id',
      header: 'ID',
      width: '50px',
    },
    {
      field: 'title',
      header: 'Title',
      customDefaultCell: true,
      customDefaultCellLimit: 100,
    },
    {
      field: 'message',
      header: 'Message',
      width: '150px',
      customDefaultCell: true,
      customDefaultCellLimit: 100,
    },
    {
      field: 'count',
      header: 'Devices',
    },
    {
      field: 'userType',
      header: 'User Type',
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

  constructor(
    private router: Router,
    public authService: AuthService,
    public service: PosTypesService
  ) {}

  ngOnInit() {}
  navigateToAdd() {
    this.router.navigate(['main/notification-center/add']);
  }
}
