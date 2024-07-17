import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  SearchInputTypes,
  HTTPMethods,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { APIURL } from 'src/app/services/api';
import { takeWhile } from 'rxjs';
import { ToastService } from 'src/app/core/services/toaster.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'oc-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit, OnDestroy {
  alive = true;
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/ticket/edit/${row?.ticketId}`;
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
            row.isBlocked = isBlock; // Update the row's block status
            this.updateActions(row);
            this.reloadIfUpdated = true;
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
    const id = row.tickedId;
    const URL = `/main/ticket/details/${id}`;
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
      field: 'ticketId',
      header: 'Ticket ID',
    },
    {
      field: 'merchantId',
      header: 'Merchant ID',
    },
    {
      field: [
        { label: 'merchantEn', custom: 'navigator' },
        { label: 'merchantAr', custom: 'default' },
      ],
      header: 'Merchant Name',
      customCell: 'multiLabel',
      action: (row) => this.goToDetails(row),
    },
    {
      field: 'terminalId',
      header: 'Terminal ID',
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
      field: [
        { label: 'cityEn', custom: 'default' },
        { label: 'zoneEn', custom: 'default' },
      ],
      header: 'City & Zone',
      customCell: 'multiLabel',
    },
    {
      field: 'assignee',
      header: 'Assignee',
    },
    {
      field: 'statusEn',
      header: 'Status',
      // customCell: 'multiLabel',
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
      field: 'ticketId',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'terminalId',
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'merchant',
      isFixed: true,
      url: this.url.Terminal.GetAllMechantDropDown,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.choice,
      field: 'status',
      isFixed: true,
      url: this.url.Ticket.GetAllTicketsStatuses,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: false,
      type: SearchInputTypes.select,
      field: 'overdue',
      ddlData: [
        { nameEn: 'Yes', id: true },
        { nameEn: 'No', id: false },
      ],
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'assignee',
      isFixed: true,
      url: this.url.Users.GetAllUsersDropDown,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'posType',
      isFixed: true,
      url: this.url.Terminal.GetAllPOSTypes,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'errandChannel',
      isFixed: true,
      url: this.url.Terminal.GetAllErrandChannels,
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
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'feedback',
      isFixed: true,
      url: this.url.Ticket.GetAllFeedbacks,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
  ];
  viewDetails = true;
  reloadIfUpdated = false;
  constructor(
    private router: Router,
    private service: TicketService,
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
      this.tableBtns.showImport = false;
    }
    if (!this.authService.hasPermission('tickets-all-tickets-favorite')) {
      this.actions = this.actions.filter((x) => x.name !== 'Add to favorites');
    }
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
  navigateToAdd() {
    this.router.navigate(['main/ticket/add']);
  }
}
