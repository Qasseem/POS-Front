import { Component, OnInit } from '@angular/core';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';

@Component({
  selector: 'app-all-merchant',
  templateUrl: './all-merchant.component.html',
  styleUrls: ['./all-merchant.component.css'],
})
export class AllMerchantComponent implements OnInit {
  public columns: ColumnsInterface[] = [
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'country',
      header: 'Country',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
