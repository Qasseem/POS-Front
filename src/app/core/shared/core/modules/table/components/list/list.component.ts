import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
  OnDestroy,
  OnChanges,
  Output,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {
  take,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  finalize,
  map,
} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { APIURL } from 'src/app/services/api';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormArray,
} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableUrlInterface } from '../../models/table-url.interface';
import { ColumnsInterface } from '../../models/columns.interface';
import {
  ActionsInterface,
  ViewCustomPermission,
} from '../../models/actions.interface';
import { TableOptionsInterface } from '../../models/options.interface';
import { AppTranslateService } from 'src/app/core/shared/services/translate.service';
import { TableCoreService } from '../../services/table-core.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;
  @ViewChild('deleteSwal', { static: false }) deleteSwal: any;

  @Input() data: any[];
  @Input() selectedData: any[];
  @Input() url: TableUrlInterface;
  @Input() columnsI: ColumnsInterface[];
  @Input() actions: ActionsInterface[];
  @Input() id = 'id';
  @Input() options: TableOptionsInterface;
  @Input() clientSide: boolean;
  @Input() first = 0;
  @Input() noDataText = '';
  @Input() viewCustomPermission: ViewCustomPermission;

  displayBasic = false;
  displayBasicDelete = false;
  @Output() selected: EventEmitter<any[]> = new EventEmitter<any[]>();
  apis;
  selectedColumns = [] as ColumnsInterface[];
  filteredArray: string[] = [];
  listForm: UntypedFormGroup;
  columnFormArray: UntypedFormArray;
  notes: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private firstInit: boolean; // To trigger the first time data load
  navigateTo: any;
  moduleName: any;
  constAction: any;
  customPermission: boolean[];
  itemRow: any;
  deletedItem: any = {};
  activatedRoute: string;
  fullRoute: string[];

  listActions = [];
  rowData;
  setRow(rowData) {
    this.rowData = rowData;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    public lang: AppTranslateService,
    public tableCore: TableCoreService,
    private translateService: TranslateService
  ) {}
  navToFilter() {
    this.tableCore.filterClick$.next(true);
  }
  reset() {
    this.first = 0;
  }

  callAction(name) {
    let action = this.actions.find((x) => x.name == name);
    if (action) {
      action.call(this.rowData);
    }
  }
  validateActionsForRow(rowData) {
    this.listActions = [];
    this.actions.forEach((element) => {
      if (
        element.customPermission == undefined ||
        element.customPermission(rowData)
      ) {
        this.listActions.push({
          label: element.name,
          icon: element.icon,
          command: () => {
            this.callAction(element?.name);
          },
        });
      }
    });
  }
  ngOnInit() {
    this.listActions = [];
    this.actions.forEach((element) => {
      this.listActions.push({
        label: element.name,
        command: () => {
          this.callAction(element?.name);
        },
      });
    });

    this.fullRoute = this.router.url?.split('/');
    this.activatedRoute =
      '/' + this.fullRoute[1] + '/' + this.fullRoute[2] + '/details/';
    this.apis = APIURL;
    this.navigateTo = this.route.snapshot.data.navigateTo;
    this.moduleName = this.route.snapshot.data.moduleName;

    this.columnsI.map((col) => {
      this.translateService
        .get(col.header)
        .pipe(take(1))
        .subscribe((translation) => {
          col.header = translation;
        });
    });

    this.selectedColumns = this.columnsI;
    this.updateSelectedColumnsAPI();

    this.getDataFromService();
    this.columnSearchInput();

    this.buildEditableForm();

    this.options = {
      add: true,
      search: false,
      reorder: false,
      loading: false,
      details: true,
      history: true,
      check: false,
      blockNote: true,
      columnSearch: true,
      editable: false,
      historyDetails: false,
      export: true,
      ...this.options,
    };
    this.checkConstAction(this.actions);
    this.filterDate();
  }

  ngOnChanges() {
    if (this.data && this.clientSide)
      this.tableCore.pageOptions.count = this.data.length;
  }

  ngOnDestroy() {
    this.tableCore.searchNew$.next({});
    this.tableCore.search = '';
    this.tableCore.pageOptions = {
      count: -1,
      offset: 0,
      limit: 10,
      searchKey: '',
      isSearchFilter: false,
    };
    this.firstInit = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  collectNotes(note) {
    this.notes = note;
  }

  /**
   * Get the Table Data from the Service
   * @memberof TableComponent
   */
  getTableData(): void {
    if (this.url && this.url.getAll)
      this.tableCore
        .getAllData(this.url.getAll, this.route.snapshot.params.id)
        .pipe(
          take(1),
          map(() => (this.data = this.tableCore.tableData)),
          finalize(() => (this.firstInit = true))
        )
        .subscribe();
  }
  checkConstAction(actions) {
    if (typeof actions === 'boolean' && actions == false) {
      return;
    }
    this.constAction = actions?.some(
      (v) => v.isDelete || v.isBlock || v.isEdit
    );
  }

  getDataFromService() {
    if (!this.clientSide) this.getTableData();
  }

  /**
   * Toggle Block, Unblock permission string
   *
   * @param {*} row - Table Row
   * @returns {string} - Permission String
   * @memberof ListComponent
   */
  getBlockPermission(row: any): string {
    if (!this.url.unblock) return 'block';
    return row.isBlock ? 'unblock' : 'block';
  }

  buildEditableForm() {
    if (!this.options.editable) return;
    // const newFilArray = this.columnsI.map(col => {
    //   if (!col.editable) return;
    //   return { [col.field]: ['', col.form.validation] };
    // });
    this.columnFormArray = this.fb.array([]);
  }

  createRowFormArray() {
    return this.fb.group({});
  }

  /**
   * Navigate to Details Page
   * @param {number} id - Item ID
   * @returns {Promise<boolean>}
   * @memberof TableComponent
   */
  goToDetailsPage(id: string): Promise<boolean> {
    return this.router.navigate(['../details', id], {
      relativeTo: this.route.parent,
    });
  }

  viewHistory(row) {
    this.router.navigate([this.navigateTo, row.id], {
      relativeTo: this.route.parent,
      queryParams: {
        moduleName: this.moduleName,
        relativeTo: this.route.parent,
        row: JSON.stringify(row),
      },
    });
  }

  /**
   * Navigate to Edit Page
   * @param {number} id - Item ID
   * @returns {Promise<boolean>}
   * @memberof TableComponent
   */
  goToEditPage(id: string): Promise<boolean> {
    return this.router.navigate(['../edit', id], {
      relativeTo: this.route.parent,
    });
  }

  /**
   * Navigate to Deleted History Page
   * @returns {Promise<boolean>}
   * @memberof TableComponent
   */
  goToDeletedHistoryPage(): Promise<boolean> {
    return this.router.navigate(['../deletedhistory'], {
      relativeTo: this.route.parent,
    });
  }

  /**
   * Create Array of strings from selected columns
   * @memberof ListComponent
   */
  updateSelectedColumnsAPI(): void {
    this.filteredArray = [];
    this.selectedColumns.map((col) => this.filteredArray.push(col.field));
  }

  /**
   * Delete a Single Item from the Table
   * @param {string} id - Item ID
   * @memberof TableComponent
   */
  async delete() {
    if (!this.url.delete) return;
    // const swalConfirm = await this.deleteConfirm.fire();
    // if (swalConfirm.value)
    this.tableCore
      .deleteItem(this.url.delete, this.deletedItem.id)
      .pipe(
        take(1),
        finalize(() => this.getTableData())
      )
      .subscribe();
    this.displayBasicDelete = !this.displayBasicDelete;
  }

  export(): void {
    if (this.url.export)
      this.tableCore
        .exportTable(this.url.export, this.filteredArray)
        .subscribe();
  }
  exportDetails(): void {
    if (this.url.exportDetails)
      this.tableCore
        .exportTable(this.url.exportDetails, this.filteredArray)
        .subscribe();
  }
  exportClientData() {
    const data = this.data.map((item) =>
      this.selectedColumns.reduce(
        (old, crr) => ({ ...old, [crr.header]: item[crr.field] }),
        {}
      )
    );

    const fileName = 'Report';
    const exportType = 'xls';

    // exportFromJSON({ data, fileName, exportType });
  }
  /**
   * Show the block alert
   *
   * @param {*} [item] The item row data
   * @memberof ListComponent
   */
  showBlockModal(item?: any) {
    this.displayBasic = !this.displayBasic;
    this.itemRow = item;
    this.notes = item && item.note ? item.note : '';
    return (calBack) => calBack;
  }
  showDeletemodal(item) {
    this.deletedItem = item;
    this.displayBasicDelete = !this.displayBasicDelete;
  }
  No() {
    this.displayBasic = !this.displayBasic;
  }
  noDelete() {
    this.displayBasicDelete = !this.displayBasicDelete;
  }
  /**
   * Block a single Item from the Table
   * @param {BlockItemInterface} data - The item ID and Block State
   * @param {*} item - The full object of the selected item
   * @returns {void}
   * @memberof TableComponent
   */
  toggleBlock(): void {
    const data = {
      id: this.itemRow[this.id],
      isBlock: this.itemRow.isBlock,
      note: this.notes,
    };

    const unblockUrl: string = this.url.unblock || this.url.block;
    const url: string = data.isBlock ? unblockUrl : this.url.block;

    if (url)
      this.tableCore
        .toggleBlock(url, data, this.itemRow)
        .pipe(take(1))
        .subscribe(() => this.getTableData());
    this.displayBasic = !this.displayBasic;
  }

  /**
   * Fire When The Table Page Changes
   * @param {*} pageInfo - The Object For Table Pages
   * @memberof TableComponent
   */
  setPage(pageInfo: any): void {
    this.tableCore.pageOptions.offset = pageInfo.first / pageInfo.rows;
    this.tableCore.pageOptions.limit = pageInfo.rows;
    if (this.firstInit) this.getTableData();
  }

  /**
   * Search For Each Table Column
   * @param {*} pageInfo - Table Page Info Event
   * @memberof ListComponent
   */
  columnSearchHandle(searchValue: string, colId: string): void {
    if (colId === 'id') {
      this.tableCore.searchNew$.next({
        ...this.tableCore.searchNew$.value,
        [colId]: searchValue ? searchValue : 0,
      });
    } else {
      this.tableCore.searchNew$.next({
        ...this.tableCore.searchNew$.value,
        [colId]: searchValue,
      });
    }
  }

  /**
   * Search Functionality for Each Column with typing
   * Then call the backend to get the matched search criteria
   * @memberof TableComponent
   */
  columnSearchInput(): void {
    this.tableCore.searchNew$
      .pipe(debounceTime(700), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((search) => {
        const hasSearch = Object.keys(search).length;

        if (!this.clientSide && hasSearch) {
          this.resetPageOptions();
          this.getTableData();
        }
      });
  }

  /**
   * Reset
   *
   * @memberof ListComponent
   */
  resetPageOptions() {
    this.tableCore.pageOptions = {
      count: -1,
      offset: 0,
      limit: 10,
      searchKey: '',
      isSearchFilter: this.tableCore.pageOptions.isSearchFilter,
    };
  }

  onRowSelect(event) {
    this.selected.emit(this.selectedData);
  }

  onRowUnselect(event) {
    this.selected.emit(this.selectedData);
  }
  copyToClipboard(elementId) {
    var copyText = document.getElementById(elementId);
    var textArea = document.createElement('textarea');
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
  }
  filterDate() {
    return true;
  }
}
