export interface TableUrlInterface {
  import?: string;
  export?: string;
  exportDetails?: string;
  getAll: string;
  delete?: string;
  deleteAll?: string;
  block?: string;
  unblock?: string;
  updateStatus?: string;
  fill?: string;
  fillHistory?: string;
  updateByFile?: string;
}

export interface TableButtonsExistanceInterface {
  showAdd?: boolean;
  showExport?: boolean;
  showImport?: boolean;
  showFilter?: boolean;
  showAllButtons: true;
}
