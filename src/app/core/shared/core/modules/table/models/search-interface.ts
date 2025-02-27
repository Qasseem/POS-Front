export interface SearchInterface {
  id?: string;
  type?: string;
  header?: string | boolean;
  propValueName?: string;
  field?: string;
  url?: string;
  controlWidth?: Number;
  isPinned?: boolean;
  isFixed?: boolean;
  isMultiple?: boolean;
  isDateFrom?: boolean;
  ddlHideArabicName?: boolean;
  isDateTo?: boolean;
  dateType?: boolean;
  selectedToFilter?: boolean;
  method?: string;
  ddlPosition?: string;
  params?: any;
  data?: any;
  ddlData?: Array<any>;
  typeInput?: string;
  headerName?: any;
  mask?: string;
  pickerType?: string;
  serverSide?: boolean;
  pageSize?: Number;
  filter?: boolean;
  filterBy?: string;
}
