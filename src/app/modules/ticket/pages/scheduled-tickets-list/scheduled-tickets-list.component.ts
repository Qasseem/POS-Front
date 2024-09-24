import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/services/toaster.service';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  HTTPMethods,
  SearchInputTypes,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { ScheduleTicketsService } from '../../services/schedule-tickets.service';

@Component({
  selector: 'app-scheduled-tickets-list',
  templateUrl: './scheduled-tickets-list.component.html',
  styleUrl: './scheduled-tickets-list.component.scss',
})
export class ScheduledTicketsListComponent implements OnInit, OnDestroy {
  alive = true;

  editItem(row: any): any {
    const URL = `main/ticket/edit/${row?.ticketId}`;
    this.router.navigate([URL]);
  }
  cloneItem(row: any): any {
    const URL = `main/ticket/clone/${row?.ticketId}`;
    this.router.navigate([URL]);
  }
  blockItem(row: any): any {
    const isBlock = !row.isBlock;
    const action = isBlock ? 'Block' : 'Unblock';
    const okText = isBlock ? 'Yes, Block' : 'Yes, Unblock';
    // this.service
    //   .confirm(
    //     `Are you sure you want to ${action} this item?`,
    //     `${action} Item`,
    //     okText,
    //     'No,Cancel'
    //   )
    //   .subscribe((response) => {
    //     if (response) {
    this.service
      .Block({ id: row.ticketId, isBlock })
      .pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (response) => {
          if (response.success) {
            const message = isBlock
              ? 'Blocked successfully'
              : 'Unblocked successfully';
            this.toaster.toaster.clear();
            this.toaster.showSuccess(message);
            row.isBlock = isBlock; // Update the row's block status
            if (row.hasOwnProperty('status')) {
              row.status = isBlock ? 'Blocked' : response.data.status;
            }
            if (row.hasOwnProperty('statusEn')) {
              row.statusEn = isBlock ? 'Blocked' : response.data.status;
            }
            // this.updateActions(row);
            // this.reloadIfUpdated = true;
          }
        },
      });
    //   }
    // });
    this.reloadIfUpdated = false;
  }
  updateActions(row: any) {
    // this.actions = this.actions.map((actionItem) => {
    //   if (actionItem.name === 'Block' && row.isBlocked) {
    //     return {
    //       ...actionItem,
    //       name: 'Unblock',
    //       icon: 'pi pi-check',
    //       call: (r: any) => this.blockItem(r),
    //     };
    //   } else if (actionItem.name === 'Unblock' && !row.isBlocked) {
    //     return {
    //       ...actionItem,
    //       name: 'Block',
    //       icon: 'pi pi-ban',
    //       call: (r: any) => this.blockItem(r),
    //     };
    //   }
    //   return actionItem;
    // });
  }
  goToDetails(row: any): any {
    const id = row.merchantNumber;
    const URL = `/main/merchant/details/${id}`;
    return URL;
  }

  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: false,
    showExport: false,
    showFilter: true,
    showImport: true,
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'scheduleId',
      header: 'Schedule ID',
    },
    {
      field: [
        { label: 'merchantEn', custom: 'navigator' },
        { label: 'merchantAr', custom: 'default' },
      ],
      header: 'Merchant Name',
      customCell: 'multiLabel',
      link: '/main/merchant/details/',
      action: (row) => this.goToDetails(row),
    },

    {
      field: [
        { label: 'categoryNameEn', custom: 'default' },
        { label: 'categoryNameAr', custom: 'default' },
      ],
      header: 'Category',
      customCell: 'multiLabel',
    },
    {
      field: [
        { label: 'errandTypeEn', custom: 'default' },
        { label: 'errandTypeAr', custom: 'default' },
      ],
      header: 'Errand Type',
      customCell: 'multiLabel',
    },
    {
      field: 'recurrenceTypeEn',
      header: 'Recurrence',
    },
    {
      field: [{ label: 'startDate', custom: 'defaultDate' }],
      header: 'Starting at',
      customCell: 'multiLabel',
      width: '200px',
    },
    {
      field: [{ label: 'endDate', custom: 'defaultDate' }],
      header: 'Ending at',
      customCell: 'multiLabel',
      width: '200px',
    },
    {
      field: 'statusEn',
      header: 'Status',
      // customCell: 'multiLabel',
    },
  ];

  public actions: ActionsInterface[] = [
    // {
    //   name: 'Edit',
    //   icon: 'pi pi-file-edit',
    //   call: (row: any) => this.editItem(row),
    //   // customPermission: (row: any) => row.id > 3,
    // },
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
      type: SearchInputTypes.date,
      field: 'startDate',
      isFixed: true,
    },
    {
      type: SearchInputTypes.date,
      field: 'endDate',
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'merchant',
      isFixed: true,
      url: '/Terminal/GetAllMechantDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: false,
      type: SearchInputTypes.select,
      field: 'category',
      isFixed: true,
      url: '/Ticket/GetTicketCategory',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'errandType',
      isFixed: true,
      url: '/Ticket/GetCategoryErrandTypes',
      method: HTTPMethods.getReq,
      propValueName: 'id',
      header: '1',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'status',
      isFixed: true,
      url: '/Schedule/GetScheduleStatus',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'recurrence',
      isFixed: true,
      url: '/Schedule/GetScheduleRecurrenceType',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'createdBy',
      isFixed: true,
      url: '/User/GetAllUsersDropDown',
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
  viewDetails = true;
  reloadIfUpdated = false;
  constructor(
    private router: Router,
    public service: ScheduleTicketsService,
    public toaster: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.hasPermission('tickets-all-tickets-details')) {
      this.viewDetails = false;
    }
    if (!this.authService.hasPermission('tickets-all-tickets-export')) {
      this.tableBtns.showExport = false;
    }
    if (!this.authService.hasPermission('tickets-all-tickets-block')) {
      this.actions = this.actions.filter((x) => x.name !== 'Block');
    }
    if (!this.authService.hasPermission('tickets-all-tickets-edit')) {
      this.actions = this.actions.filter((x) => x.name !== 'Edit');
    }
    if (!this.authService.hasPermission('tickets-all-tickets-add')) {
      this.tableBtns.showImportCancellation = false;
      this.tableBtns.showImportVisit = false;
      this.tableBtns.showChangeStatus = false;
    }
    if (!this.authService.hasPermission('tickets-all-tickets-favorite')) {
      this.actions = this.actions.filter((x) => x.name !== 'Add to favorites');
    }
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
