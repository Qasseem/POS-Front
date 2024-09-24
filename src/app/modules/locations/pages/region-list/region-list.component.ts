import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsInterface } from 'src/app/core/shared/core/modules/table/models/actions.interface';
import { SearchInputTypes } from 'src/app/core/shared/core/modules/table/models/enums';
import { SearchInterface } from 'src/app/core/shared/core/modules/table/models/search-interface';
import { TableButtonsExistanceInterface } from 'src/app/core/shared/core/modules/table/models/table-url.interface';
import { ColumnsInterface } from 'src/app/core/shared/models/Interfaces';
import { RegionService } from '../../services/region.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'oc-region-list',
  templateUrl: './region-list.component.html',
  styleUrl: './region-list.component.scss',
})
export class RegionListComponent {
  public tableBtns: TableButtonsExistanceInterface = {
    showAllButtons: true,
    showAdd: true,
    showExport: true,
    showFilter: true,
    showImport: true,
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'id',
      header: 'ID',
      width: '50px',
    },

    {
      field: [
        { label: 'nameEn', custom: 'default' },
        { label: 'nameAr', custom: 'default' },
      ],
      header: 'Name',
      customCell: 'multiLabel',
      width: '200px',
    },
    {
      field: 'status',
      header: 'Status',
      width: '80px',
    },
    {
      field: [
        { label: 'createdBy', custom: 'normal' },
        { label: 'createDate', custom: 'defaultDate' },
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
      permission: 'viewcustomerpayments',
      call: (row: any) => this.editItem(row),
      // customPermission: (row: any) => row.id > 3,
    },
  ];

  filters: SearchInterface[] = [
    {
      type: SearchInputTypes.text,
      field: 'nameEn',
      isFixed: true,
    },
    {
      type: SearchInputTypes.text,
      field: 'nameAR',
      isFixed: true,
    },
    {
      type: SearchInputTypes.date,
      field: 'createDate',
      isFixed: true,
    },
  ];
  showEdit = true;
  showBlock = true;
  constructor(
    private router: Router,
    public service: RegionService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.hasPermission('locations-regions-export')) {
      this.tableBtns.showExport = false;
    }
    if (!this.authService.hasPermission('locations-regions-block')) {
      // this.actions = this.actions.filter((x) => x.name !== 'Block');
      this.showBlock = false;
    }
    if (!this.authService.hasPermission('locations-regions-edit')) {
      // this.actions = this.actions.filter((x) => x.name !== 'Edit');
      this.showEdit = false;
    }
    if (!this.authService.hasPermission('locations-regions-add')) {
      this.tableBtns.showImport = false;
    }
  }

  navigateToAdd() {
    this.router.navigate(['main/locations/region/add']);
  }

  editItem(row: any): any {
    const URL = `main/locations/region/edit/${row?.id}`;
    this.router.navigate([URL]);
  }
}
