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

@Component({
  selector: 'app-view-merchant',
  templateUrl: './view-merchant.component.html',
  styleUrls: ['./view-merchant.component.css'],
})
export class ViewMerchantComponent implements OnInit {
  details: any;
  constructor(
    private router: Router,
    private merchantService: MerchantService,
    private route: ActivatedRoute
  ) {}
  public url = APIURL;

  completeData(row: any): any {
    const URL = `/home/customers/info/${row?.id}`;
    return URL;
  }
  navToServiceSetting(row: any): any {
    const URL = `/home/customers/info/${row?.id}`;
    return URL;
  }
  goToDetails(row: any): any {
    const URL = `main/terminal/details/${row?.id}`;
    console.log(URL);
    return URL;
    this.router.navigate([URL]);
  }
  public columns: ColumnsInterface[] = [
    {
      field: 'reference',
      header: 'Ref',
    },
    {
      field: 'id',
      header: 'ID',
    },

    {
      field: [
        { label: 'merchantNameEN', custom: 'navigator' },
        { label: 'merchantNameAR', custom: 'default' },
      ],
      header: 'Name',
      customCell: 'multiLabel',
      action: (row) => this.goToDetails(row),
    },
    {
      field: 'userName',
      header: 'User Name',
    },
    {
      field: 'category',
      header: 'Category',
    },
    {
      field: [
        { label: 'merchantNameEN', custom: 'default' },
        { label: 'merchantNameAR', custom: 'default' },
      ],
      header: 'Created by',
      customCell: 'multiLabel',
    },
  ];

  public actions: ActionsInterface[] = [
    {
      name: 'edit',
      icon: 'fas fa-briefcase',
      permission: 'viewcustomerpayments',
      call: (row: any) => this.navToServiceSetting(row),
      customPermission: (row: any) => row.id > 3,
    },
    {
      name: 'add',
      icon: 'pi pi-fw pi-file',
      permission: 'completedata',
      call: (row: any) => this.completeData(row),
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
  id;

  ngOnInit() {
    this.id = this.route.snapshot.params.id || null;
    if (this.id) {
      this.getItemDetails();
    }
  }

  getItemDetails() {
    this.merchantService.GetDetails(this.id).subscribe((resp) => {
      if (resp.success) {
        this.details = resp.data;
        console.log(this.details);
      }
    });
  }

  navigateToAdd() {
    this.router.navigate(['main/merchant/add']);
  }
  backToList() {
    this.router.navigate(['main/merchant/all']);
  }
}
