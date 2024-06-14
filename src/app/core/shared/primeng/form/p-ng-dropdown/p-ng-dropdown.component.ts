import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormControl, UntypedFormGroup } from '@angular/forms';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  take,
} from 'rxjs';
import { PNgDropdownService } from './p-ng-dropdown.service';

@Component({
  selector: 'oc-p-ng-dropdown',
  templateUrl: './p-ng-dropdown.component.html',
  styleUrls: ['./p-ng-dropdown.component.css'],
})
export class PNgDropdownComponent implements OnInit {
  //Text for header
  @Input() ddlHeader: string;
  //Parent reactive form object to link with
  @Input() form: UntypedFormGroup;
  //Parent reactive form control name to link with
  @Input() controlName = 'ddl';
  //api url for fetching the ddl data
  @Input() url: string;
  //api page size value
  @Input() pageSize = 10;
  //disable search
  @Input() isSearchable = true;
  //single or multiple selection
  @Input() isMultiple = true;
  //load on scroll
  @Input() isVirtualScroll = true;
  //nameAr property string if it is not 'nameEn'
  @Input() nameAr = 'nameAr';
  //nameEn property string if it is not 'nameAr'
  @Input() nameEn = 'nameEn';
  //id property string if it is not 'id'
  @Input() id = 'id';
  //Array of ids which should removed from the itemsData
  @Input() removedItems = [];
  //emit selected items to parent module
  @Output() dataChange = new EventEmitter();
  //observable var to use in search (use operators)
  InputSearch$ = new Subject<string>();
  //to unsubscribe subscription
  searchSubscription: Subscription;
  ddlChangeSubscription: Subscription;
  //stop back end search and search only in front end
  @Input() abortServerSearch = false;
  // call ge request
  @Input() isGetRequest: boolean = false;
  //business vars\\
  //request search options
  getPaginationOptions = {
    selectedId: [],
    pageNumber: 0,
    searchCriteria: '',
    pageSize: this.pageSize,
  };
  //is required validators flag
  isRequired: boolean;
  //items list
  itemsData = [];
  //all items count var
  itemsSearchNo = 0;
  //flag to retrieve the data once with parentId
  getWithSelectedIdsFlag = true;
  constructor(private service: PNgDropdownService) {}
  ngOnChanges(changes: SimpleChanges): void {
    //check if the backend url changes
    if (changes['url'] && changes['url'].previousValue) {
      this.itemsData = [];
      this.getPaginationOptions.pageNumber = 0;
      this.getAllData('ngOnChanges2');
    }
  } //unSubscribe form any subscription
  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.ddlChangeSubscription?.unsubscribe();
  }

  ngOnInit() {
    //sync page size with pagesize input
    this.getPaginationOptions.pageSize = this.pageSize;
    this.ddlChangeSubscription = this.form
      .get(this.controlName)
      .valueChanges.subscribe((resp) => {
        if (!this.getWithSelectedIdsFlag)
          this.ddlChangeSubscription.unsubscribe();
        else {
          //if the control has initials or selected values put it in search option selected array
          if (this.form.get(this.controlName).value)
            this.isMultiple
              ? (this.getPaginationOptions.selectedId = this.form.get(
                  this.controlName
                ).value)
              : (this.getPaginationOptions.selectedId = [
                  this.form.get(this.controlName).value['id'],
                ]);
          let result = this.itemsData.map((a) => a[this.id]);

          if (
            (this.isMultiple &&
              resp?.length &&
              !resp.every((val) => result.includes(val))) ||
            (!this.isMultiple && resp && !result.includes(resp))
          )
            this.getAllData('valueChanges');
        }
      });
    if (
      (this.isMultiple && this.form.get(this.controlName).value?.length) ||
      (!this.isMultiple && this.form.get(this.controlName).value)
    ) {
      this.isMultiple
        ? (this.getPaginationOptions.selectedId = this.form.get(
            this.controlName
          ).value)
        : (this.getPaginationOptions.selectedId = [
            this.form.get(this.controlName).value['id'],
          ]);
    }
    //check if the control has required validators
    this.hasRequiredField(this.form.get(this.controlName));
    //abort server side search if not needed
    !this.abortServerSearch ? this.searchOnType() : null;
    //get data for the first time
    this.getAllData('onInit');
  }
  //is required validators flag
  hasRequiredField = (abstractControl: AbstractControl): boolean => {
    if (abstractControl.validator) {
      const validator = abstractControl.validator({} as AbstractControl);
      if (validator && validator['required']) {
        this.isRequired = true;
        return true;
      }
    }
    this.isRequired = false;
    return false;
  };
  //load on scroll method
  onScrollToEnd() {
    if (this.itemsSearchNo === this.itemsData.length) return;
    this.getPaginationOptions.pageNumber++;
    this.getAllData('onScrollToEnd');
  }

  //gets data from server by options
  getAllData(message = '') {
    if (!this.isGetRequest) {
      this.service
        .getData(this.url, this.getPaginationOptions)
        .pipe(take(1), distinctUntilChanged())
        .subscribe((resp: any) => {
          if (resp.success && resp.data.data) {
            message == 'valueChanges'
              ? (this.getWithSelectedIdsFlag = false)
              : null;

            if (
              JSON.stringify(this.itemsData) !== JSON.stringify(resp.data.data)
            ) {
              this.itemsData = this.itemsData.concat(resp.data.data);
              this.itemsSearchNo =
                resp.data.listCount - this.removedItems.length;
              this.removedItems.length ? this.removedItemsFromItemsData() : '';
            }
          }
          if (resp.success && resp.data && !resp.data.data) {
            message == 'valueChanges'
              ? (this.getWithSelectedIdsFlag = false)
              : null;
            resp.data.map((item) => {
              item.id = item.code;
            });
            this.itemsData = resp.data;
            this.itemsSearchNo = resp.data.length;
          }
        });
    } else {
      this.service
        .getAllData(this.url)
        .pipe(take(1), distinctUntilChanged())
        .subscribe((resp: any) => {
          if (resp.success) {
            if (this.nameAr)
              resp.data.map((item) => {
                item.nameAr = item[this.nameAr];
              });

            if (this.nameEn)
              resp.data.map((item) => {
                item.nameEn = item[this.nameEn];
              });

            if (this.id)
              resp.data.map((item) => {
                item.id = item[this.id];
              });
          }
          this.itemsData = resp.data;
          this.itemsSearchNo = resp.data.length;
        });
    }
  }
  //removes items from list based on business cases
  removedItemsFromItemsData() {
    this.itemsData = this.itemsData.filter(
      (x) => x[this.id] != this.removedItems.find((y) => y == x[this.id])
    );
  }
  // load data by search in server side
  searchOnType() {
    this.searchSubscription = this.InputSearch$.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((searchValue) => {
      this.getPaginationOptions.pageNumber = 0;
      if (searchValue) this.getPaginationOptions.searchCriteria = searchValue;
      else this.getPaginationOptions.searchCriteria = '';
      if (searchValue != null) {
        this.itemsData = [];
        this.getAllData('searchOnType');
      }
    });
  }

  focusout() {}
  //emits selected items if needed
  itemSelected(items) {
    this.dataChange.emit(items);
  }
  get control() {
    return this.form?.get(this.controlName) as FormControl;
  }
}
