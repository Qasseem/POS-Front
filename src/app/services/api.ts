export const APIURL = {
  login: '/Security/Login',
  menuLinks: '/CustomerSecurity/menuIC',
  register: '/CustomerSecurity/RegisterCustomerUser',
  getAllCities: '/City/GetAllCities',

  customerProfile: {
    customerTypeDropdown: '/CustomerType/GetCustomerTypeDropDown',
    getAllActivities: '/Activity/GetAllActivitiesFromDolphin',
    GetActivityDropDown: '/Activity/GetActivityDropDown',
    GetCustomerDetails: '/Customer/GetCustomerDetails',
    checkCustomerName: '/PreCustomer/CheckCustomerName',
    CheckCustomerContactEmail: '/Customer/CheckCustomerContactEmail',
    CheckCustomerContactPhone: '/Customer/CheckCustomerContactPhone',
    GetCityDetails: '/City/GetCityDetails',
    SubmitRequest: '/Customer/SubmitRequest',
    checkCommercialRecord: '/Customer/CheckCommercialRecord',
    CheckTaxiationNumber: '/Customer/CheckTaxiationNumber',
  },
  searchFilters: {
    getUserSearchFilters: '/SearchFilter/GetUserSearchFilters',
    pinFilter: '/SearchFilter/PinFilter',
    unPinFilter: '/SearchFilter/UnPinFilter',
    restoreFilters: '/SearchFilter/RestoreFilters',
  },
  forgotPassword: '/CustomerSecurity/ForgotPassword',
  Merchant: {
    Add: '/Merchant/SaveMerchant',
    GetOne: '/Merchant/GetMerchantById',
    Export: '/Merchant/ExportLeadGrid',
    GetGrid: '/Merchant/GetMerchantGrid',
    GetAllMerchantCategories: '/Merchant/GetAllMerchantCategories',
    Favorite: '/Merchant/AddFavorite',
    GetFavoriteMerchantGrid: '/Merchant/GetFavoriteMerchantGrid',
    ImportMerchants: '/Merchant/ImportMerchants',
  },

  Terminal: {
    Add: '/Terminal/SaveTerminal',
    GetOne: '/Terminal/GetTerminalById',
    Export: '/Terminal/ExportLeadGrid',
    GetGrid: '/Terminal/GetTerminalGrid',
    Favorite: '/Terminal/AddFavorite',
    GetFavoriteTerminalGrid: '/Terminal/GetFavoriteTerminalGrid',
    ImportTerminals: '/Terminal/ImportTerminals',
    GetAllRegions: '/Terminal/GetAllRegions',
    GetAllCities: '/Terminal/GetAllCities',
    GetAllZones: '/Terminal/GetAllZones',
    GetAllErrandChannels: '/Terminal/GetAllErrandChannels',
    GetAllPOSTypes: '/Terminal/GetAllPOSTypes',
    GetAllMechantDropDown: '/Terminal/GetAllMechantDropDown',
  },
  Users: {
    GetAllUsersDropDown: '/User/GetAllUsersDropDown',
  },

  AdminActivities: {
    AddMCC: '/AdminActivities/SaveMerchantCategory',
    getMCC: '/AdminActivities/GetMerchantCategoryGrid',
    getErrandsChannel: '/AdminActivities/GetErrandChannelGrid',
    AddErrandsChannel: '/AdminActivities/SaveErrandChannel',
    getPOSType: '/AdminActivities/GetPOSTypeGrid',
    addPOSType: '/AdminActivities/SavePOSType',
  },

  ErrandsType: {
    getErrandsType: '/ErrandType/GetErrandTypeGrid',
    addErrandType: '/ErrandType/SaveErrandType'
  }
};
