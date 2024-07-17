import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';
import { APIURL } from 'src/app/services/api';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'oc-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss',
})
export class RoleListComponent implements OnInit {
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/user-management/role/edit/${row?.id}`;
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
      header: 'Role Name',
    },
    {
      field: 'status',
      header: 'Status',
    },
    {
      field: [
        { label: 'createdBy', custom: 'default' },
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
      call: (row: any) => this.editItem(row),
    },
  ];

  showEdit = true;
  showBlock = true;
  constructor(
    private router: Router,
    public service: RoleService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.hasPermission('users-and-permissions-roles-export')) {
      this.tableBtns.showExport = false;
    }
    if (!this.authService.hasPermission('users-and-permissions-roles-block')) {
      this.showBlock = false;
    }
    if (!this.authService.hasPermission('users-and-permissions-roles-edit')) {
      this.showEdit = false;
    }
    if (!this.authService.hasPermission('users-and-permissions-roles-add')) {
      this.tableBtns.showImport = false;
    }
  }
  navigateToAdd() {
    this.router.navigate(['main/user-management/role/add']);
  }
}
