import { Component, Input, OnInit } from '@angular/core';
import { TableService } from '../../../services/table.service';
import { LazyLoadEvent } from 'primeng/api';
import { ColumnsInterface } from '../../../models/Interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(private tableService: TableService) {}
  @Input() columns: ColumnsInterface[];
  items!: any[];
  value1;
  first = 0;

  rows = 10;
  totalRecords!: number;

  loading: boolean = false;

  representatives!: any[];

  selectAll: boolean = false;

  selectedItems!: any[];

  ngOnInit() {
    this.loading = true;
  }

  loadItems(event) {
    this.loading = true;

    setTimeout(() => {
      this.tableService
        .getCustomers({ lazyEvent: JSON.stringify(event) })
        .subscribe((res) => {
          this.items = res.data;
          this.totalRecords = res.totalRecords;
          this.loading = false;
        });
    }, 1000);
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedItems = value;
  }

  onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
      this.tableService
        .getCustomers({ lazyEvent: JSON.stringify(event) })
        .subscribe((res) => {
          this.selectedItems = res.customers;
          this.selectAll = true;
        });
    } else {
      this.selectedItems = [];
      this.selectAll = false;
    }
  }
}
