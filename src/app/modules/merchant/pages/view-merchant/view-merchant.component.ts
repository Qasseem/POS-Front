import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  HTTPMethods,
  SearchInputTypes,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { APIURL } from 'src/app/services/api';
import { MerchantService } from '../../services/merchant.service';
import { TerminalService } from 'src/app/modules/terminal/services/terminal.service';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'oc-view-merchant',
  templateUrl: './view-merchant.component.html',
  styleUrls: ['./view-merchant.component.scss'],
})
export class ViewMerchantComponent implements OnInit {
  details: any;
  formType = 'view';
  coordinates = { lat: null, lng: null };
  address;
  viewDetails = true;
  merchantId: any;
  constructor(
    private router: Router,
    private merchantService: MerchantService,
    public terminalService: TerminalService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  public url = APIURL;

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
      field: 'reference',
      header: 'Ref',
    },
    {
      field: 'terminalId',
      header: 'Terminal Id',
    },

    {
      field: 'phoneNumber',
      header: 'Phone Number',
    },
    {
      field: 'city',
      header: 'City',
    },

    {
      field: [
        { label: 'createdBy', custom: 'default' },
        { label: 'createdAt', custom: 'defaultDate' },
      ],
      header: 'Created by',
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
    // {
    //   name: 'Add to favorite ',
    //   icon: 'pi pi-heart',
    //   call: (row: any) => this.addToFavorite(row),
    // },
  ];

  filters: SearchInterface[] = [
    {
      type: SearchInputTypes.date,
      field: 'createDate',
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
      type: SearchInputTypes.select,
      field: 'users',
      isFixed: true,
      url: this.url.Users.GetAllUsersDropDown,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      type: SearchInputTypes.text,
      field: 'phone',
      isFixed: true,
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
      type: SearchInputTypes.text,
      field: 'address',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'landmark',
      isFixed: true,
    },
  ];

  id;
  showFavourite = true;
  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
    }
    if (!this.authService.hasPermission('merchants-all-merchants-details')) {
      this.viewDetails = false;
    }
    if (!this.authService.hasPermission('merchants-all-merchants-export')) {
      this.tableBtns.showExport = false;
    }
    if (!this.authService.hasPermission('merchants-all-merchants-block')) {
      this.actions = this.actions.filter((x) => x.name !== 'Block');
    }
    if (!this.authService.hasPermission('merchants-all-merchants-edit')) {
      this.actions = this.actions.filter((x) => x.name !== 'Edit');
    }
    if (!this.authService.hasPermission('merchants-all-merchants-favorite')) {
      this.showFavourite = false;
      // this.actions = this.actions.filter((x) => x.name !== 'Add to favorites');
    }
  }

  getItemDetails() {
    this.merchantService.GetDetails(this.id).subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
        this.id = this.details.id;
        this.coordinates = {
          lat: resp.data.latitude,
          lng: resp.data.longitude,
        };
        // this.handleAddress(resp);
      }
    });
  }

  navigateToAdd() {
    this.router.navigate(['main/terminal/add'], {
      queryParams: { merchantId: this.id },
    });
  }
  handleAddress(resp: any) {
    this.terminalService
      .GetAddressFromLatLng(resp.data.latitude, resp.data.longitude)
      .subscribe((resp: any) => {
        this.address = resp?.address;
        this.details.address = this.address;
      });
  }

  backToList() {
    this.router.navigate(['main/merchant/list']);
  }
}
