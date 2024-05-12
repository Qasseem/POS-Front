import { Component, OnInit } from '@angular/core';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';

@Component({
  selector: 'app-all-merchant',
  templateUrl: './all-merchant.component.html',
  styleUrls: ['./all-merchant.component.css'],
})
export class AllMerchantComponent implements OnInit {
  customerInfo(row: any): any {
    const dolphinId = row.dolphinId || 0;
    const id = row.id;
    const URL = `/home/customers/info/${id}/${dolphinId}`;
    return URL;
  }
  public columns: ColumnsInterface[] = [
    {
      field: 'name',
      header: 'Name',
    },

    {
      field: [
        { label: 'createBy', custom: 'firstLabel' },
        { label: 'createDate', custom: 'default' },
      ],
      header: 'Create by',
      customCell: 'multiLabel',
    },
    {
      field: [
        { label: 'nameEn', custom: 'navigator' },
        { label: 'nameAr', custom: 'icon' },
      ],
      header: 'CustomerName',
      customCell: 'multiLabel',
      action: (row) => this.customerInfo(row),
    },
  ];

  constructor() {}

  ngOnInit() {}
}
