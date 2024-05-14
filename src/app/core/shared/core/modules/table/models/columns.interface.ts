import { Validators } from '@angular/forms';

export interface ColumnsInterface {
  profileImg?: any;
  field: any;
  header: string;
  placeholder?: string;
  width?: string;
  orderEnabled?: boolean;
  filterMode?: string;
  filterDropdown?: {
    label: string;
    value: any;
    cssClasses?: string;
  }[];
  customCell?: string;
  action?: (row?: any) => any;
  editable?: boolean;
  mapLink?: {
    longitude: string;
    latitude: string;
  };
  form?: {
    type: string; // the type of each form controller [select, autocomplete, text, password, date, timer]
    validation?: Validators[];
    placeholder?: string;
    select?: { value: any; name: string }[]; // the array of selection dropdown
    autoComplete?: {
      url: string;
      isMultiple: boolean;
    };
  };
  hideTooltop?: boolean;
  styleObj?:{}
  // searchEnabled?: boolean;
  // cssClass?: any;
  // cellTemplate?: TemplateRef<any>;
  // sortable?: boolean;
  // minWidth?: number;
  // isSelected?: boolean;
}

// === customCell Values ===
// - boolean
// - date
// - customStyle
// - currency
// - navigator
// - copy
