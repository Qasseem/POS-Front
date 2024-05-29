import { Component, OnInit } from '@angular/core';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import {
  HTTPMethods,
  SearchInputTypes,
} from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { APIURL } from 'src/app/services/api';
import { TerminalService } from '../../services/terminal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-terminal',
  templateUrl: './all-terminal.component.html',
  styleUrls: ['./all-terminal.component.css'],
})
export class AllTerminalComponent implements OnInit {
  addToFavorite(row: any): any {
    this.service.Favorite({ id: row?.id }).subscribe((resp) => {
      if (resp.success) {
      }
    });
    const URL = `main/merchant/edit/${row?.id}`;
    console.log(this.url);

    this.router.navigate([this.url]);
    return URL;
  }
  public url = APIURL;

  editItem(row: any): any {
    const URL = `main/terminal/edit/${row?.id}`;
    console.log(URL);
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
    showImport: true,
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
      field: 'merchantId',
      header: 'Merchant Id',
    },
    {
      field: [
        { label: 'merchantNameEN', custom: 'navigator' },
        { label: 'merchantNameAR', custom: 'default' },
      ],
      header: 'Merchant Name',
      customCell: 'multiLabel',
      action: (row) => this.goToDetails(row),
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
      field: 'posType',
      header: 'POS Type',
    },
    {
      field: 'errandChannel',
      header: 'Errand Channel',
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
      call: (row: any) => this.addToFavorite(row),
    },
  ];

  filters: SearchInterface[] = [
    {
      type: SearchInputTypes.text,
      field: 'MerchantNameEN',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'MerchantNameAR',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'UserName',
      isFixed: true,
    },
    {
      isMultiple: true,
      type: SearchInputTypes.select,
      field: 'category',
      isFixed: true,
      url: this.url.Merchant.GetAllMerchantCategories,
      method: HTTPMethods.getReq,
      propValueName: 'id',
    },
    {
      type: SearchInputTypes.date,
      field: 'createDate',
      isFixed: true,
    },
  ];

  constructor(private router: Router, private service: TerminalService) {}

  ngOnInit() {}
  navigateToAdd() {
    this.router.navigate(['main/terminal/add']);
  }
}
