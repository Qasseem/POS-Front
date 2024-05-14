export const APIURL = {
  login: '/CustomerSecurity/LoginIC',
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
  },
};
