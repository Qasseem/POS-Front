import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'oc-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss'],
})
export class TicketsListComponent implements OnInit {
  // addToFavorite(row: any): any {
  //   this.service.Favorite({ id: row?.id }).subscribe((resp) => {
  //     if (resp.success) {
  //     }
  //   });
  // }
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/ticket/edit/${row?.ticketId}`;
    this.router.navigate([URL]);
  }
  blockItem(row: any): any {
    const URL = `/home/customers/info/${row?.id}`;
    return URL;
  }
  goToDetails(row: any): any {
    const id = row.id;
    const URL = `main/ticket/details/${row?.id}`;
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
      header: 'Merchant Id',
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
      header: 'Terminal Id',
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
      field: [
        { label: 'statusEn', custom: 'default' },
        { label: 'statusAr', custom: 'default' },
      ],
      header: 'Status',
      customCell: 'multiLabel',
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
    {
      name: 'Add to favorite ',
      icon: 'pi pi-heart',
      // call: (row: any) => this.addToFavorite(row),
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
      field: 'merchantEn',
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
      // url: this.url.Users.GetAllUsersDropDown,
      method: HTTPMethods.postReq,
      propValueName: 'id',
    },
    {
      type: SearchInputTypes.text,
      field: 'overdue',
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.choice,
      field: 'assignee',
      isFixed: true,
      url: this.url.Users.GetAllUsersDropDown,
      method: HTTPMethods.postReq,
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
      header: '0',
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

  constructor(private router: Router, private service: TicketService) {}

  ngOnInit() {}
  navigateToAdd() {
    this.router.navigate(['main/ticket/add']);
  }
}
