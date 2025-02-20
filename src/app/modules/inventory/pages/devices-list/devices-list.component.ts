import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import {
  ActionsInterface,
  ActionsTypeEnum,
} from 'src/app/core/shared/core/modules/table/models/actions.interface';
import { DevicesService } from '../../services/devices.service';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import {
  HTTPMethods,
  SearchInputTypes,
} from 'src/app/core/shared/core/modules/table/models/enums';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css'],
})
export class DevicesListComponent implements OnInit {
  constructor(
    private router: Router,
    public authService: AuthService,
    public service: DevicesService
  ) {}

  ngOnInit() {
    if (!this.authService.hasPermission('inventory-devices-details')) {
      this.viewDetails = false;
    }
    if (!this.authService.hasPermission('inventory-devices-export')) {
      this.tableBtns.showExport = false;
    }
    if (!this.authService.hasPermission('inventory-devices-block')) {
      // this.actions = this.actions.filter((x) => x.name !== 'Block');
      this.showBlock = false;
    }
    if (!this.authService.hasPermission('inventory-devices-edit')) {
      // this.actions = this.actions.filter((x) => x.name !== 'Edit');
      this.showEdit = false;
    }
    if (!this.authService.hasPermission('inventory-devices-add')) {
      this.tableBtns.showImport = false;
    }
  }

  navigateToAdd() {
    this.router.navigate(['main/inventory/devices/add']);
  }

  editItem(row: any): any {
    const URL = `main/inventory/devices/edit/${row?.id}`;
    this.router.navigate([URL]);
  }

  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: true,
    showExport: true,
    showFilter: true,
    showImport: false,
  };

  filters: SearchInterface[] = [
    {
      type: SearchInputTypes.text,
      field: 'deviceId',
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'modelType',
      isFixed: true,
      url: '/ModelType/GetModelTypeDropDown/0',
      method: HTTPMethods.getReq,
      propValueName: 'id',
      params: 0,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'condition',
      isFixed: true,
      url: '/Device/GetConditionDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      type: SearchInputTypes.text,
      field: 'serialNumber',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'imei',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'simSerial',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'merchantId',
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
      field: 'status',
      isFixed: true,
      url: '/Device/GetStatusDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'errandChannel',
      isFixed: true,
      url: '/Terminal/GetAllErrandChannels',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'warehouse',
      isFixed: true,
      url: '/Warehouse/GetWarehouseDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'warehouseManager',
      isFixed: true,
      url: '/User/GetAllSystemUserDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'agent',
      isFixed: true,
      url: '/User/GetAllUsersDropDown',
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      type: SearchInputTypes.choice,
      field: 'merchant',
      isFixed: true,
      url: '/Terminal/GetAllMechantDropDown',
      isMultiple: true,
      serverSide: true,
      method: HTTPMethods.postReq,
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
    /////////
  ];

  public columns: ColumnsInterface[] = [
    {
      field: 'id',
      header: 'ID',
      width: '50px',
    },

    {
      field: 'serialNumber',
      header: 'Device Serial',
      width: '100px',
    },
    {
      field: 'imei',
      header: 'IMEI',
      width: '100px',
    },
    {
      field: 'simSerial',
      header: 'SIM Serial',
      width: '100px',
    },
    {
      field: [
        { label: 'ownerEn', custom: 'normal' },
        { label: 'ownerAr', custom: 'defaultDate' },
      ],
      header: 'Owner',
      customCell: 'multiLabel',
      width: '100px',
    },
    {
      field: 'warehouse',
      header: 'Waehouse',
      width: '100px',
    },

    {
      field: [
        { label: 'createdBy', custom: 'normal' },
        { label: 'createDate', custom: 'defaultDate' },
      ],
      header: 'Created by',
      customCell: 'multiLabel',
      width: '100px',
    },
    {
      field: 'statusName',
      header: 'Status',
      width: '100px',
    },
    {
      field: 'conditionName',
      header: 'Condition',
      width: '100px',
    },
  ];

  public actions: ActionsInterface[] = [
    {
      name: 'Edit',
      icon: 'pi pi-file-edit',
      call: (row: any) => this.editItem(row),
      customPermission: (row: any) => this.showEdit,
    },
    {
      name: 'Block',
      icon: 'pi pi-ban',
      call: (row: any) => this.blockItem(row),
      customPermission: (row: any) => this.showBlock,
    },
  ];
  public gridActionsList: ActionsInterface[] = [
    {
      name: 'Bulk Add',
      icon: 'pi pi-file-plus',
      permission: 'inventory-devices-add',
      call: (row: any) => this.bulkAdd(row),
      type: ActionsTypeEnum.File,
      uploadFileData: {
        url: '/Device/import',
        header: 'Upload Bulk Warehouses',
        templateName: 'Import Add Device Template.xlsx',
      },
    },
    {
      name: 'Bulk update',
      icon: 'pi pi-chart-bar',
      permission: 'inventory-devices-add',
      call: (row: any) => this.bulkAdd(row),
      type: ActionsTypeEnum.File,
      uploadFileData: {
        url: '/Device/importToUpdate',
        header: 'Update Bulk Devices',
        templateName: 'Import Update Device Template.xlsx',
      },
    },
    {
      name: 'Import to fill data',
      icon: 'pi pi-credit-card',
      permission: 'inventory-devices-add',
      call: (row: any) => this.bulkAdd(row),
      type: ActionsTypeEnum.File,
      uploadFileData: {
        url: '/Device/ImportToFill',
        header: 'Import To Fill Data',
        templateName: 'Import Fill Device Template.xlsx',
      },
    },
    {
      name: 'Import to fill data',
      icon: 'pi pi-desktop',
      permission: 'inventory-devices-add',
      call: (row: any) => this.bulkAdd(row),
      type: ActionsTypeEnum.File,
      uploadFileData: {
        url: '/Device/ImportToConfigure',
        header: 'Import To Configure',
        templateName: 'Import Fill Device Template.xlsx',
      },
    },
  ];
  bulkAdd(row: any): any {}
  showBlock = true;
  showEdit = true;
  viewDetails = true;
  blockItem(row: any): any {}
}
