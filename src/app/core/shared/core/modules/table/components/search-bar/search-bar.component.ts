import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { APIURL } from 'src/app/services/api';

import { SearchFilterService } from './services/search-filter.service';
import { SearchInterface } from '../../models/search-interface';
import { AppTranslateService } from 'src/app/core/shared/services/translate.service';
import { TableCoreService } from '../../services/table-core.service';
import {
  HTTPMethods,
  ModulesReferencesEnum,
  SearchInputTypes,
} from '../../models/enums';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass'],
})
export class SearchBarComponent implements OnInit, OnChanges {
  @ViewChild('op') mySearchDialog: any;
  apis: any;
  InputSearch$ = new Subject<string>();
  @Output() getListData = new EventEmitter();
  @Output() searchFilterTriggered = new EventEmitter();
  @Output() emitFormValue = new EventEmitter();
  @Output() emitSearchKeyValue = new EventEmitter();
  isDataLOadedOnce = false;
  @Input() filtersInput: SearchInterface[] = [];
  @Input() searchOnly = false;
  @Input() StyleInput = '';
  @Input() styleContainer =
    'border-radius: 0.2rem ;height: 50px;background-color: white;width: 651px';
  @Input() additionalField = true;
  @Input() placeholderSearch = 'Search';
  @Input() styleObj = {
    width: '1080px',
    'z-index': '9',
    'margin-top': '30px',
  };
  @Input() taskSearchHistoryObj = {};
  filtersForm: UntypedFormGroup;
  filterControls;
  unPinnedControls;
  isFilterForm = true;
  moduleReference: string;
  controlsCount = 0;
  formValueDictionary = {};
  formValueDictionaryTooltip = {};
  tooltipData = [];
  radioModel = 'Lefts';
  lastFormValue: any;
  isSearchedBefore: boolean;
  //var to assign the search text from history if exist
  inputTextHistoryValue: string;
  //var to assign the search form value from history if exist
  formHistoryData: any;
  taskListFormData: any;
  constructor(
    public language: AppTranslateService,
    private tableCoreService: TableCoreService,
    private route: Router,
    private searchFilterService: SearchFilterService
  ) {
    this.moduleReference = ModulesReferencesEnum[this.route.url.split('/')[2]];

    // create a empty FormGroup
    this.filtersForm = new UntypedFormGroup({});
    this.apis = APIURL;
  }

  //this method is for task module history search
  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.taskSearchHistoryObj.currentValue) {
      console.log(changes?.taskSearchHistoryObj.currentValue);
      if (changes?.taskSearchHistoryObj.currentValue?.toolTipData) {
        this.formValueDictionaryTooltip =
          changes?.taskSearchHistoryObj.currentValue?.toolTipData;
        this.convertObjToArray();
        this.taskListFormData = changes?.taskSearchHistoryObj.currentValue;
      }
      if (changes?.taskSearchHistoryObj.currentValue?.searchKey) {
        console.log('inside');

        this.inputTextHistoryValue =
          changes?.taskSearchHistoryObj.currentValue?.searchKey;
      }
    }
  }
  ngOnInit() {
    //check if there is any history for the activated page
    if (this.tableCoreService.gridSearchHistory[this.route.url]) {
      //assign the search ker if exist in history obj
      this.inputTextHistoryValue =
        this.tableCoreService.gridSearchHistory[this.route.url].searchKey;
      //check if there is any toolTip data in search history obj
      if (
        this.tableCoreService.gridSearchHistory[this.route.url].search
          .toolTipData
      ) {
        //assign the tool tip data if exist in history obj
        this.formHistoryData = this.formValueDictionaryTooltip =
          this.tableCoreService.gridSearchHistory[this.route.url].search;
        this.formValueDictionaryTooltip =
          this.tableCoreService.gridSearchHistory[
            this.route.url
          ].search.toolTipData;
        this.convertObjToArray();
      }
    }

    this.searchOnType();
  }
  getDDLData(item) {
    let targetedApi =
      item.method == HTTPMethods.getReq
        ? this.searchFilterService.getData(item.url)
        : this.searchFilterService.getDataWithPostCall(item.url);

    targetedApi.pipe(take(1)).subscribe((resp) => {
      if (
        this.filtersInput.find((x) => x.field == item.field).type ==
        SearchInputTypes.select
      ) {
        resp.data.forEach((item) => {
          item?.code ? (item.code = item.code.trim()) : '';
        });

        this.filtersInput.find((x) => x.field == item.field).ddlData =
          resp.data;
      } else {
        resp.data.data.forEach((item) => {
          item?.code ? (item.code = item.code.trim()) : '';
        });
        this.filtersInput.find((x) => x.field == item.field).ddlData =
          resp.data.data;
      }
      // this.filtersInput.find((x) => x.field == item.field).type ==
      // SearchInputTypes.select
      //   ? (this.filtersInput.find((x) => x.field == item.field).ddlData =
      //       resp.data)
      //   : (this.filtersInput.find((x) => x.field == item.field).ddlData =
      //       resp.data.data);
    });
  }

  async createForms() {
    if (this.filtersInput) {
      this.filterControls = this.filtersInput.filter((ctr) => {
        return ctr.isFixed || ctr.isPinned;
      });
      this.unPinnedControls = this.filtersInput.filter((ctr) => {
        return !ctr.isFixed;
      });

      for (const ctrl of this.filterControls) await this.createControls(ctrl);

      //check if there is any form data for filters history obj and fill the search form with history data with deep copy
      if (this.formHistoryData) {
        let copiedFormValue = Object.assign({}, this.formHistoryData);
        delete copiedFormValue.toolTipData;
        this.filtersForm.setValue(copiedFormValue);
      }
      if (this.taskListFormData) {
        this.filtersForm.patchValue(this.taskListFormData);
      }
    }
  }

  async createControls(ctrl) {
    const formControl = this.createControl(ctrl);
    if (ctrl.type === SearchInputTypes.range) {
      const formControl1 = this.createControl(ctrl);
      const formControl2 = this.createControl(ctrl);

      this.filtersForm.addControl(ctrl.field + 'From', formControl1);
      this.filtersForm.addControl(ctrl.field + 'To', formControl2);
    } else this.filtersForm.addControl(ctrl.field, formControl);
  }
  // function for create FormControl
  private createControl(ctrl): UntypedFormControl {
    if (ctrl.type === SearchInputTypes.text) return new UntypedFormControl('');
    else if (ctrl.type === SearchInputTypes.choice && !ctrl.isMultiple)
      return new UntypedFormControl(null);
    // in case of select is single set it`s from value as null object
    else if (ctrl.type === SearchInputTypes.select && !ctrl.isMultiple)
      return new UntypedFormControl(null);
    else if (
      ctrl.type === SearchInputTypes.range ||
      ctrl.type === SearchInputTypes.number
    )
      return new UntypedFormControl(null);
    else return new UntypedFormControl([]);
  }

  async search(filtersFormValue) {
    this.searchFilterTriggered.emit(true);
    const toolTipData = await this.prepareTooltipData();
    //addd tool tip data with form value to store it in search history obj to retriev later
    const searchObjWithToolTipData = { ...this.filtersForm.value, toolTipData };
    this.emitFormValue.next(searchObjWithToolTipData);
    this.tableCoreService.pageOptions.isSearchFilter = true;
    this.lastFormValue = this.filtersForm.value;
    this.tableCoreService.searchNew$.next(searchObjWithToolTipData);
    this.mySearchDialog.hide();
    this.isSearchedBefore = true;
  }
  async prepareTooltipData() {
    this.formValueDictionaryTooltip = {};
    Object.keys(this.filtersForm.controls).forEach((key) => {
      if (
        this.filtersForm.get(key).value?.length ||
        (!Array.isArray(this.filtersForm.get(key).value) &&
          this.filtersForm.get(key).value)
      ) {
        if (this.formValueDictionary[key]) {
          this.formValueDictionaryTooltip[key] = this.formValueDictionary[key];
        }
      }
    });
    return this.formValueDictionaryTooltip;
  }

  addNewFilter() {
    this.isFilterForm = false;
  }
  addNewFilterToForm() {
    for (const ctrl of this.unPinnedControls) {
      if (
        ctrl.selectedToFilter &&
        !this.filterControls.find((el) => el.field === ctrl.field)
      ) {
        this.createControls(ctrl);
        this.filterControls.push(ctrl);
        if (
          (ctrl.url && ctrl.type == SearchInputTypes.choice) ||
          (ctrl.url && ctrl.type == SearchInputTypes.select)
        ) {
          if (!ctrl.serverSide) {
            this.getDDLData(ctrl);
          }
        }
      }
      if (!ctrl.selectedToFilter) {
        this.filterControls = this.filterControls.filter(
          (el) => el.field !== ctrl.field
        );
      }
    }
    this.filterControls = [...this.filterControls];

    this.isFilterForm = true;
  }
  pin(ctrl) {
    let requestBody = {
      moduleId: this.moduleReference,
      filterName: ctrl.field,
    };
    let pinStatus;
    ctrl.isPinned
      ? (pinStatus = this.tableCoreService.unPinFilter(requestBody))
      : (pinStatus = this.tableCoreService.pinFilter(requestBody));

    pinStatus.pipe(take(1)).subscribe((resp) => {});

    this.filterControls.find((el) => el.field === ctrl.field).isPinned =
      !this.filterControls.find((el) => el.field === ctrl.field).isPinned;
  }

  resetToDefaults() {
    this.filterControls.map((ctrl) => {
      if (!ctrl.isPinned && !ctrl.isFixed) {
        this.filtersForm.removeControl(ctrl.field);
        this.filterControls = this.filterControls.filter(
          (el) => el.field !== ctrl.field
        );
        ctrl.selectedToFilter = false;
      }
    });
    this.filterControls = [...this.filterControls];
    this.filtersForm.updateValueAndValidity();
  }

  //this method used to rest form value to its initials (empty array or empty string)
  resetForm() {
    Object.keys(this.filtersForm.controls).forEach((key) => {
      if (Array.isArray(this.filtersForm.get(key).value))
        this.filtersForm.get(key).setValue([]);
      else this.filtersForm.get(key).setValue('');
    });
    this.formValueDictionary = {};
  }

  searchOnType() {
    this.InputSearch$.pipe(debounceTime(700), distinctUntilChanged()).subscribe(
      (searchValue) => {
        this.emitSearchKeyValue.emit(searchValue);

        this.tableCoreService.pageOptions.searchKey = searchValue;
        this.tableCoreService.pageOptions.isSearchFilter = false;
        this.resetForm();
        this.tooltipData = [];
        this.tableCoreService.searchNew$.next({});
        this.getListData.emit(true);
      }
    );
  }
  SearchAll(value) {}
  dismissed(event) {
    // if (this.lastFormValue && this.isSearchedBefore)
    //   this.filtersForm.setValue(this.lastFormValue);
    this.convertObjToArray();
  }

  getSelectedData(event, ctrlName) {
    if (event) {
      let propValue = '';
      if (Array.isArray(event)) {
        event.map((item) => {
          this.language.currentLanguage() === 'en'
            ? (propValue += item.nameEn + ', ')
            : (propValue += item.nameAr + +', ');
        });
        propValue = propValue.slice(0, -2);
      } else {
        this.language.currentLanguage() === 'en'
          ? (propValue = event.nameEn)
          : (propValue = event.nameAr);
      }
      this.formValueDictionary[ctrlName] = propValue;
    }
  }
  getInputData(value, ctrlName) {
    if (value) this.formValueDictionary[ctrlName] = value;
  }
  getInputRangeData(value, ctrlName, source) {
    if (value) {
      source === 'from'
        ? (this.formValueDictionary[ctrlName + 'From'] = value)
        : (this.formValueDictionary[ctrlName + 'To'] = value);
    }
  }
  getDateData(value, ctrlName, pickerType) {
    if (value && pickerType !== 'timer') {
      let propValue = '';
      value.map((item) => {
        if (item) propValue += item.toLocaleDateString() + ' To ';
      });
      propValue = propValue.substring(0, propValue.length - 4);
      this.formValueDictionary[ctrlName] = propValue;
    }
    if (value && pickerType == 'timer') {
      let propValue = '';
      value.map((item) => {
        if (item) propValue += item.toLocaleTimeString('en-US') + ' To ';
      });
      propValue = propValue.substring(0, propValue.length - 4);
      this.formValueDictionary[ctrlName] = propValue;
      if (!value[1] || !value[0]) {
        this.filtersForm.get(ctrlName).setValue(null);
      }
    }
  }
  convertObjToArray() {
    this.tooltipData = Object.keys(this.formValueDictionaryTooltip).map(
      (key) => [String(key), this.formValueDictionaryTooltip[key]]
    );
  }
  show(event) {
    if (!this.isDataLOadedOnce) {
      this.isDataLOadedOnce = true;
      this.filtersInput.map((item) => {
        if (
          (item.isFixed && item.url && item.type == SearchInputTypes.choice) ||
          (item.isFixed && item.url && item.type == SearchInputTypes.select)
        ) {
          if (!item.serverSide) {
            this.getDDLData(item);
          }
        }
      });
    }
  }
  //delete the search data history for this activated route incase the user delete the search text by himself to prevent applying search
  inputText(event) {
    this.searchFilterTriggered.emit(true);
    if (event == null || event == '') {
      delete this.tableCoreService.gridSearchHistory[this.route.url];
    }
  }
}
