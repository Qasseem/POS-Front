export interface ActionsInterface {
  name?: string;
  icon?: string;
  permission?: string;
  customPermission?: (row?: {}) => boolean;
  isDelete?: boolean;
  isBlock?: boolean;
  isEdit?: boolean;
  isDetails?: boolean;
  call?: (row?: {}) => any;
  actionName?: string;
}

export interface ViewCustomPermission {
  customPermission?: (row?: {}) => boolean;
}

export interface ActionListInterface extends Array<ActionsInterface> { }
export interface ViewCustomPermission { }

