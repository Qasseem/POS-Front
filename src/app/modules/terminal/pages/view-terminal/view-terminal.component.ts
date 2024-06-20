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
    private route: ActivatedRoute
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
    },
    {
      name: 'Block',
      icon: 'pi pi-ban',
      call: (row: any) => this.blockItem(row),
    },
    {
      name: 'Add to favorite ',
      icon: 'pi pi-heart',
      call: (row: any) => this.addToFavorite(row),
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
      field: 'users',
      isFixed: true,
      url: this.url.Users.GetAllUsersDropDown,
      method: HTTPMethods.postReq,
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

  navigateToAdd() {
    this.router.navigate(['main/terminal/add']);
  }

  id;

  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
    }
  }

  getItemDetails() {
    this.terminalService.GetDetails(this.id).subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
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
      });
  }

  backToList() {
    this.router.navigate(['main/terminal/list']);
  }
}
