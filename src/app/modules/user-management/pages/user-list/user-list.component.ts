import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { ToastService } from 'src/app/core/services/toaster.service';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  SearchInputTypes,
  HTTPMethods,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'oc-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  alive: boolean = true;
  statusList = [
    { id: 'active', name: 'Active' },
    { id: 'blocked', name: 'Blocked' },
  ];

  editItem(row: any): any {
    const URL = `main/user-management/user/edit/${row?.id}`;
    this.router.navigate([URL]);
  }

  changePassword(row: any): any {
    const URL = `main/user-management/user/change-password/${row?.id}`;
    this.router.navigate([URL]);
  }
  toggleBlockItem(row: any): any {
    const isBlock = !row.isBlock;
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
                row.isBlock = isBlock; // Update the row's block status
                // this.updateActions(row);
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
      call: (row: any) => this.toggleBlockItem(row),
    },
    {
      name: 'Change Password',
      icon: 'pi pi-eye',
      call: (row: any) => this.changePassword(row),
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
      url: '/User/GetAllUserTypeDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'role',
      isFixed: true,
      url: '/Role/GetAllRolesDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'manager',
      isFixed: true,
      url: '/User/GetAllManagerDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: false,
      type: SearchInputTypes.select,
      field: 'region',
      isFixed: true,
      url: '/Terminal/GetAllRegions',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: false,
      type: SearchInputTypes.select,
      field: 'city',
      isFixed: true,
      url: '/Terminal/GetAllCities',
      method: HTTPMethods.getReq,
      propValueName: 'id',
      header: '0',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'zone',
      isFixed: true,
      url: '/Terminal/GetAllZones',
      method: HTTPMethods.getReq,
      propValueName: 'id',
      header: '0',
    },
  ];

  constructor(
    private router: Router,
    public service: UserService,
    public authService: AuthService,
    public dialogService: DialogService,
    public toaster: ToastService
  ) {}
  showEdit = true;
  showBlock = true;

  ngOnInit() {
    if (!this.authService.hasPermission('users-and-permissions-users-export')) {
      this.tableBtns.showExport = false;
    }
    if (!this.authService.hasPermission('users-and-permissions-users-block')) {
      this.showBlock = false;
    }
    if (!this.authService.hasPermission('users-and-permissions-users-edit')) {
      this.showEdit = false;
    }
    if (!this.authService.hasPermission('users-and-permissions-users-add')) {
      this.tableBtns.showImport = false;
    }
  }
  navigateToAdd() {
    this.router.navigate(['main/user-management/user/add']);
  }
}
