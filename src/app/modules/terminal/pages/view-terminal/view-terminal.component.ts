import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIURL } from 'src/app/services/api';
import { TerminalService } from '../../services/terminal.service';
import {
  HTTPMethods,
  SearchInputTypes,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'oc-view-terminal',
  templateUrl: './view-terminal.component.html',
  styleUrls: ['./view-terminal.component.scss'],
})
export class ViewTerminalComponent implements OnInit {
  details: any;
  address: any;
  public url = APIURL;
  formType = 'view';
  coordinates = { lat: null, lng: null };

  markerPositions = [];
  constructor(
    private router: Router,
    private terminalService: TerminalService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.formType = this.route.snapshot.data.type;
  }

  addToFavorite(row: any): any {
    this.terminalService.Favorite({ id: row?.id }).subscribe((resp) => {
      if (resp.success) {
      }
    });
  }

  editItem(row: any): any {
    const URL = `main/terminal/edit/${row?.id}`;
    this.router.navigate([URL]);
  }
  blockItem(row: any): any {
    const URL = `/home/customers/info/${row?.id}`;
    return URL;
  }
  goToDetails(row: any): any {
    const id = row.id;
    const URL = `main/merchant/details/${row?.id}`;
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
      field: 'ticketId',
      header: 'Ticket ID',
    },
    {
      field: 'merchantId',
      header: 'Merchant Id',
    },
    {
      field: [
        { label: 'merchantEn', custom: 'default' },
        { label: 'merchantAr', custom: 'default' },
      ],
      header: 'Merchant Name',
      customCell: 'multiLabel',
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
  ];

  public actions: ActionsInterface[] = [
    {
      name: 'Edit',
      icon: 'pi pi-file-edit',
      call: (row: any) => this.editItem(row),
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
      field: 'tickedId',
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
  ];

  navigateToAdd() {
    this.router.navigate(['main/ticket/add']);
  }

  id;
  viewDetails = true;
  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
    }
    if (!this.authService.hasPermission('terminals-all-terminals-details')) {
      this.viewDetails = false;
    }
    if (!this.authService.hasPermission('terminals-all-terminals-export')) {
      this.tableBtns.showExport = false;
    }
    if (!this.authService.hasPermission('terminals-all-terminals-block')) {
      this.actions = this.actions.filter((x) => x.name !== 'Block');
    }
    if (!this.authService.hasPermission('terminals-all-terminals-edit')) {
      this.actions = this.actions.filter((x) => x.name !== 'Edit');
    }
  }

  getItemDetails() {
    this.terminalService.GetDetails(this.id).subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
        this.coordinates.lng = parseFloat(this.details.longitude);
        this.coordinates.lat = parseFloat(this.details.latitude);
        this.coordinates = { ...this.coordinates };
        this.handleAddress(resp);
      }
    });
  }
  handleAddress(resp: any) {
    this.coordinates = {
      lat: resp.data.latitude,
      lng: resp.data.longitude,
    };
    this.terminalService
      .GetAddressFromLatLng(resp.data.latitude, resp.data.longitude)
      .subscribe((resp: any) => {
        this.address = resp?.address;
        this.details.address = this.address;
      });
  }

  backToList() {
    this.router.navigate(['main/terminal/list']);
  }
}
