export enum ModulesReferencesEnum {
  customers = 146,
  quotations = 133,
  simcards = 117,
  transfersimcard = 156,
  deviceconfiguration = 165,
  devices = 121,
  simcardscontracts = 118,
  warehousesetting = 157,
  devicefirmware = 159,
  shipment = 158,
  transfermodeltype = 162,
}

export enum TaskStatusEnum {
  ToDo = 1,
  Open = 2,
  Done = 3,
  OnHold = 4,
}

export enum TaskActionsEnum {
  Start = 1,
  Pause = 2,
  Resume = 3,
  Assigne = 4,
  Complete = 5,
  Close = 6,
  ClosedByBlockedTransaction = 7,
}

export enum HTTPMethods {
  deleteReq = 'deleteReq',
  putReq = 'putReq',
  postReq = 'postReq',
  getHeaderReq = 'getHeaderReq',
  getReq = 'getReq',
  postReqWithUrlHeader = 'postReqWithUrlHeader',
  postReqWithHeaderpostReq = 'postReqWithHeaderpostReq',
  postDolphine = 'postDolphine',
  postReqWithHeader = 'postReqWithHeader',
}

export enum SearchInputTypes {
  text = 'TEXT',
  choice = 'CHOICE',
  select = 'SELECT',
  date = 'DATE',
  range = 'RANGE',
  number = 'NUMBER',
  selectValue = 'SELECTVALUE',
}

export enum TaskActions {
  start = 'start',
  resume = 'resume',
  pause = 'pause',
  complete = 'complete',
}

export enum TasksEnum {
  completeCustomerInformation = 1,
  requestAux = 2,
  createQuotation = 3,
  quotationPendingForApproval = 4,
  quotationApprovedWithEdit = 5,
  quotationApproved = 6,
  quotationApprovedWithInstallationEdit = 7,
  manualTask = 8,
  completeCommercialRegistrationTask = 9,
  quotationPendingTechnicianApprovalTask = 10,
  assignToSalesRep = 11,
  installationRequest = 12,
  assignToTechnician = 13,
  serverOutage = 14,
  reportOutage = 15,
  prepareVisit = 16,
  goToWarehouseDeliveryNote = 17,
  goToInstall = 18,
  CheckSignalDevice = 19,
  CheckSignalAccessory = 20,
  goToWarehouseDeliveryReturn = 21,
  PrepareVisitMaintenance = 22,
  GoToMaintain = 23,
  CheckUnitSignal = 24,
  CheckMaintenance = 25,
  CheckMaintainedDeviceSignal = 25,
  CheckMaintainedAccessorySignal = 26,
  AccountingApprovalTask = 27,
  CreateDeliveryNoteTask = 28,
  GoToStopService = 29,
  PrepareVisitStopService = 30,
  PrepareVisitReService = 31,
  GoToReService = 32,
  CheckReService = 33,
  RSNamingIssues = 35,
  ManualSTRequest = 36,
  DNNamingIssues = 37,
  DRRemovingIssues = 38,
  RemotelyReservice = 39,
  RemovefromWASL = 40,
  RemoveFromWaslTSU = 42,
  DVRsItemsCheck = 43,
  TSURequest = 34,
  LinkWASLUnits = 41,
}

export enum massageType {
  massage = 1,
  massageAndFiles = 2,
  Audio = 3,
  complete = 4,
  TaskClosed = 5,
  TaskReOpened = 6,
  TaskReAssinged = 7,
  AutoCheckStart = 8,
  AutoCheckEnd = 9,
}
export enum WorkOrderDecisions {
  new = 0,
  accepted = 1,
  rejected = 2,
}

export enum ModulesNamesEnum {
  Delivery = 'delivery',
  Maintenance = 'maintenance',
  StopService = 'stopService',
  REService = 'reService',
}
export enum ReServiceStatusEnum {
  AwaitingAssign = 1,
  Assigned = 2,
  InProgress = 3,
  DeliveredToCustomer = 4,
  NamingInProgress = 5,
  NamedWithIssues = 6,
  Completed = 7,
  Blocked = 8,
  Cancelled = 9,
  AwaitingAccountingCheck = 10,
  AwaitingReviewINOUT = 11,
  invoice = 12,
  UnderInvoicing = 13,
  TransactionCompleted = 14,
}
export enum ModuleIdsEnum {
  Device = 1,
  Roles = 3,
  Delivery_Request = 4,
  Delivery_Note = 5,
  Delivery_Return = 6,
  Delivery_Dashboard = 7,
  Transfer_Request = 8,
  Transfer = 9,
  Maintenance_Request = 10,
  Maintenance = 11,
  Maintenance_Problems = 12,
  Employee_Stock = 13,
  SIM_Cards_Providers = 15,
  SIM_Cards_Contracts = 16,
  Technique_Company = 17,
  OldICTechnique_System = 18,
  Customer_Server_Status = 19,
  Employees = 20,
  Brand = 21,
  OldICServer_IP = 22,
  OldICBrand_Server_Port = 23,
  Customer_Server_Account = 24,
  Server_Units = 25,
  Customer_Server_Units = 26,
  SIM_Cards = 27,
  Device_Configuration = 28,
  Users = 29,
  Notification = 30,
  Notes_Template = 31,
  SellDoorReport = 111,
  SellDoorSetting = 113,
  Positions = 115,
  AssigneSalesMan = 116,
  SIMCard = 117,
  SimcardContract = 118,
  Devices = 121,
  Projects = 131,
  Quotation = 133,
  ModelTypePriceList = 137,
  SellDoor = 138,
  CustomerActivities = 139,
  CustomerTypes = 140,
  AllResellers = 145,
  AllCustomers = 146,
  Technique_System = 153,
  Server_IP = 154,
  Brand_Server_Port = 155,
  TransferSimCard = 156,
  WarehouseEmployee = 157,
  Shipment = 158,
  DeviceFirmware = 159,
  GroupModelType = 160,
  Tasks = 169,
  TaskActivity = 170,
  TransferModelType = 162,
  Warehousestock = 163,
  Employeestock = 164,
  DeviceConfiguration = 165,
  TechAPP = 172,
  GovernmentSector = 171,
  DeliveryNote = 173,
  DeliveryReturn = 174,
  MaintenanceCRM = 175,
  InOut = 177,
  Teams = 176,
  Statistics = 178,
  DeliveryRequest = 179,
  CRMEmployees = 180,
  CRMUsers = 181,
  RolesAndPermissions = 182,
  Departments = 183,
  JobTitles = 184,
  MaintenenaceReasons = 185,
  AVLIntegration = 186,
  StopService = 187,
  ReService = 188,
  DeviceSIM = 189,
  TSU = 190,
  Points = 191,
  TechniciansReport = 193,
  serverPoints = 194,
  simCardDelivery = 197,
  RemotelyReservice = 198,
  BillingOrders = 208,
  Invoicing = 210,
  PreSales = 212,
}

export enum PermissionsNameEnum {
  View = 'view',
  Add = 'add',
  Delete = 'delete',
  Edit = 4,
  Details = 'details',
  dvrchecksignal = 'dvrchecksignal',
  Export = 6,
  Import = 7,
  Reports = 8,
  DeviceNaming = 9,
  DeviceNamingOnServer = 10,
  DeliveryReturn = 11,
  ServerAdd = 12,
  TechnicalApproval = 13,
  Complete = 'complete',
  Invoice = 'invoice',
  ServerDeviceRemove = 16,
  Received = 17,
  AssignTechnician = 18,
  Delivery = 19,
  EmergancyInstallation = 20,
  Transfer = 21,
  Submit = 22,
  ServerHandle = 23,
  AssignServerEng = 24,
  Maintenance = 25,
  ServerUpdate = 26,
  ServerUpdateComplete = 27,
  AccountingApproval = 28,
  Synchronize = 29,
  ChangePassword = 30,
  ViewAll = 'viewall',
  InventoryCount = 32,
  UpdateByFile = 33,
  DeviceNamingComplete = 34,
  DeviceNamingCompleteOnServer = 35,
  CompleteReport = 36,
  Search = 37,
  FillData = 38,
  Replace = 39,
  AttachApproval = 40,
  InstallAPK = 41,
  Review = 42,
  SubDelivery = 43,
  ExportDeliveryDevice = 44,
  MorshedSubDelivery = 45,
  MorshedDeliveryReport = 46,
  SendSMS = 47,
  SendEmail = 48,
  ViewBranchTechnician = 49,
  ExportDevice = 50,
  SalesReturn = 51,
  ViewByBranch = 52,
  ViewBySalesCustomers = 53,
  ViewBySalesMangerCustomers = 54,
  ViewByBranchCustomers = 55,
  ViewByCustomerEmployee = 56,
  ViewByFromWarehouse = 57,
  ViewByToWarehouse = 58,
  ViewByAllCustomers = 59,
  AssignTechnicianByCustomers = 60,
  DownloadFiles = 61,
  ServerApproval = 62,
  WaslRegister = 63,
  AfaqyRegister = 64,
  WaslInquery = 65,
  TechnicianReassign = 66,
  Reservice = 67,
  WaslDelete = 68,
  AfaqySystemDelete = 69,
  ViewHistory = 70,
  ViewItemHistory = 71,
  ViewTrackingCompany = 72,
  ViewCustomer = 73,
  ViewOperatingCompany = 74,
  ViewOperatingCompanyDriver = 75,
  ViewEmployeeByDepartment = 76,
  CheckIn_New = 77,
  CheckIn_Visit = 78,
  ActualCustomerNameEn = 79,
  ActualCustomerNameAr = 80,
  Block = 81,
  ViewAllPointSales = 82,
  ViewAllSalesmanName = 83,
  UnBlock = 84,
  Delegation = 85,
  ViewAllBranches = 86,
  CompleteData = 87,
  WriteInDolphin = 88,
  CustomerDecision = 97,
  ApprovalGeneralManager = 95,
  ApprovalBranchManager = 96,
  ApprovalSalesManager = 93,
  ApprovalSales = 94,
  ViewTechniciansByBranch = 101,
  ImportToAdd = 99,
  Cancel = 100,
  ApprovalSalesCoordinator = 102,
  ApprovalSalesDevelopment = 103,
  ApprovalBusinessDevelopment = 104,
  DownloadAttachmentAr = 105,
  DownloadAttachmentEn = 106,
  Print = 107,
  PrintAr = 108,
  ManageWareHouse = 109,
  ViewByManager = 110,
  DefualtView = 111,
  External = 112,
  EditResponsibleEmployee = 113,
  MarkAsLost = 114,
  MarkAsFound = 115,
  EditTaskSetting = 116,
  EditAgentSetting = 117,
  CompleteCustomerInformation = 118,
  RequestAux = 119,
  CreateQuotation = 120,
  QuotationPendingForApproval = 121,
  QuotationApproveWithEdit = 122,
  QuotationApproved = 123,
  QuotationApprovedWithInstallationEdit = 124,
  CompleteCommercialRegistrationTask = 125,
  QuotationPendingTechnicianApprovalTask = 126,
  AssignToSalesRep = 127,
  InstallationRequest = 128,
  AssignToTechnician = 129,
  ServerOutage = 130,
  ReportOutage = 131,
  AddActivity = 132,
  ActivitySetting = 133,
  Login = 134,
  Sales = 135,
  Notification = 136,
  PrepareVisitTask = 137,
  GoToWarehouseDeliveryNoteTask = 138,
  GoToInstallTask = 139,
  GoToWarehouseDeliveryReturn = 140,
  CheckSignalDevice = 141,
  CheckSignalAccessory = 142,
  AddToServer = 143,
  NameOnServer = 144,
  RemoveFromServer = 145,
  PrepareMaintenanceVisitTask = 146,
  GoToMaintainTask = 147,
  CheckUnitSignal = 148,
  CheckSignalDeviceMaintenance = 149,
  AssignSalesMan = 150,
  CheckSignalAccessoryMaintenance = 151,
  Delivered = 152,
  FinanceChecks = 153,
  RushHour = 154,
  TaskReport = 155,
  TeamUtilization = 156,
  ResponseTime = 157,
  HandlingTime = 158,
  TeamMembers = 159,
  CompletedTasks = 160,
  AccountingApprovalTask = 161,
  CreateDeliveryNoteTask = 162,
  AccountingBlock = 163,
  ChangePasswordByAdmin = 164,
  AddToServerIntegration = 165,
  NameOnServerIntegration = 166,
  ReviewInOut = 168,
  GoToStopService = 169,
  PrepareVisitStopService = 170,
  ReturnToWarehouse = 171,
  ChangeSimcardStatus = 172,
  DVRCheckSignal = 173,
  UploadFiles = 174,
  SkipChecks = 175,
  Approve = 'approve',
  editcustomerpayments = 'editcustomerpayments',
  WaslUnlink = 'unlinkwasldoc',
  DVRItemCheck = 'dvritemcheck',
  StopServicePrepareVisit = 'preparevisitstopservice',
  ReServicePrepareVisit = 'preparevisitreservice',
}

export enum DeliveryNoteStatusEnum {
  Draft = 1,
  New = 2,
  DeliveryAssigned = 3,
  AddedToServer = 4,
  DeliveryToTechnician = 5,
  UnderInstallation = 6,
  DeliveryToCustomer = 7,
  DeviceNaming = 8,
  DeliveryCompleted = 9,
  AddedWithIssues = 10,
  DeviceNamingWithIssues = 11,
  ReadyForNaming = 12,
  AddToServerInProgress = 13,
  Postponed = 14,
  Cancelled = 15,
  Invoiced = 16,
  Blocked = 17,
  UnderDeliveryReturn = 18,
  UnderInvoicing = 19,
}

export enum BillingOrderStatusEnum {
  Delayed = 1,
  Due = 2,
  NotDue = 3,
  Issued = 4,
  Blocked = 5,
}

export enum MaintenanceStatusEnum {
  New = 1,
  AwaitingAutomaticChecks = 2,
  AwaitingManualChecks = 3,
  Passed = 4,
  AwaitingAssigning = 5,
  Assigned = 6,
  Inprogress = 7,
  Resolved = 8,
  Postponed = 9,
  Closed = 10,
  Completed = 11,
  AccountingChecked = 12,
  Blocked = 13,
  SalesReturned = 14,
}

export enum StopServiceStatusEnum {
  AwaitingAutoStopService = 1,
  AwaitingAssigning = 2,
  Assigned = 3,
  UninstallationInProgress = 4,
  RemovingFromServerInProgress = 5,
  Completed = 6,
  Closed = 7,
  RemovedWithIssues = 8,
  Postponed = 9,
  Cancelled = 10,
  Blocked = 11,
  SalesReturned = 12,
  TransactionCompleted = 13,
  PendingWASLDoc = 14,
  UploadWASLDoc = 15,
  AwaitingWASLUnlink = 16,
  WASLDocRejected = 17,
}

export enum TransferServerUnitStatusEnum {
  AwaitingAutoTransfer = 1,
  TransferInProgress = 2,
  Transfered = 3,
  Cancelled = 4,
  TransferedWithIssue = 5,
  Completed = 6,
  CompletedWithIssues = 7,
  AwaitingApproval = 8,
  AccountantCheck = 9,
  Blocked = 10,
  PendingWASLDoc = 11,
  PendingWASLLink = 12,
  AwaitingWASLUnlink = 13,
  WASLDocRejected = 14,
  PendingLinkWASLDoc = 15,
}

export enum DeviceStatusEnum {
  New = 1,
  In_store = 2,
  Configured_Updated = 3,
  Connted_with_SIM_card = 4,
  Transfered_to_branch = 5,
  In_customer_delivery_phase = 6,
  Spare_to_technician = 7,
  Connected_with_server = 8,
  Disconnected_with_server = 9,
  Disconnected_customer_service = 10,
  Damage = 11,
  In_maintenance = 12,
  Missing = 13,
  Required_for_maintenance = 14,
  Customer_Property = 15,
  Delivered_to_customer = 16,
  In_Repair = 17,
  In_Repair_Review = 18,
  Shipped = 19,
  Lost = 20,
}

export enum DeviceStatusNamesEnum {
  Status1 = 'New',
  Status2 = 'In store',
  Status3 = 'Configured or updated',
  Status4 = 'Connected with sim card',
  Status5 = 'Transfered to branch',
  Status6 = 'In customer delivery phase',
  Status7 = 'Spare to technician',
  Status8 = 'Connected with server',
  Status9 = 'Disconnected with server',
  Status10 = 'Disconnected customer service',
  Status11 = 'Damage',
  Status12 = 'Im maintenance',
  Status13 = 'Missing',
  Status14 = 'Required for maintenance',
  Status15 = 'Customer property',
  Status16 = 'Delivered to customer',
  Status17 = 'In repair',
  Status18 = 'In repair review',
  Status19 = 'Shipped',
  Status20 = 'Lost',
}

export enum WarehouseNamesEnum {
  jed = 'Jeddah',
  whs = 'Main warhouse',
  dam = 'Dammam',
  tri = 'Technician Riyadh',
  tje = 'Technician Jeddah',
  tdm = 'Technician Dammam',
}

export enum SIMCardStatusNamesEnum {
  Status1 = 'New',
  Status2 = 'In branch',
  Status3 = 'Linked with device',
  Status4 = 'Spare to employee',
  Status5 = 'Blanked to client',
  Status6 = 'Connected to server',
  Status7 = 'Disconnected from server',
  Status8 = 'Replacement inside device',
  Status9 = 'Damage',
  Status10 = 'Missing',
  Status11 = 'Replacement with supplier',
  Status12 = 'Cancelled',
  Status13 = 'Ready to replacement',
  Status14 = 'Active suspend',
  Status15 = 'Inactive Suspend',
  Status16 = 'Shipped',
  Status17 = 'Lost',
  Status18 = 'Terminated',
}

export enum DeviceStatusNamesEnum {
  New = 'New',
  In_store = 'In store',
  Configured_Updated = 'Configured updated',
  Connted_with_SIM_card = 'Connted with SIM card',
  Transfered_to_branch = 'Transfered to branch',
  In_customer_delivery_phase = 'In customer delivery phase',
  Spare_to_technician = 'Spare to technician',
  Connected_with_server = 'Connected with server',
  Disconnected_with_server = 'Disconnected with server',
  Disconnected_customer_service = 'Disconnected customer service',
  Damage = 'Damage',
  In_maintenance = 'In maintenance',
  Missing = 'Missing',
  Required_for_maintenance = 'Required for maintenance',
  Customer_Property = 'Customer property',
  Delivered_to_customer = 'Delivered to customer',
  In_Repair = 'In repair',
  In_Repair_Review = 'In repair review',
  Shipped = 'Shipped',
  Lost = 'Lost',
}

export enum SIMCardStatusNamesEnum {
  New = 'New',
  In_Branch = 'In branch',
  Linked_with_device = 'Linked with device',
  Spare_to_employee = 'Spare to employee',
  Blanked_to_client = 'Blanked to client',
  Connected_to_server = 'Connected to server',
  Disconnected_to_server = 'Disconnected from server',
  Replacement_inside_device = 'Replacement inside device',
  Damage = 'Damage',
  Missing = 'Missing',
  Replacement_with_Supplier = 'Replacement with supplier',
  Cancelled = 'Cancelled',
  Ready_to_replacement = 'Ready to replacement',
  ActiveSuspend = 'Active suspend',
  InActiveSuspend = 'Inactive Suspend',
  Shipped = 'Shipped',
  Lost = 'Lost',
  Terminated = 'Terminated',
}
export enum DeliveryReturnStatusEnum {
  New = 1,
  Completed = 2,
  DeliveredToWarehouse = 3,
  RemovedWithIssues = 4,
}

export enum TransferSimCardStatusEnum {
  New = 1,
  Accepted = 2,
  Rejected = 3,
  Cancelled = 4,
}
export enum TransferSimCardsNamesEnum {
  New = 'New',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
}

export enum ReserviceRemotelyStatusEnum {
  New = 1,
  AwaitingCheck = 2,
  Checked = 3,
  Invoiced = 4,
  Cancelled = 5,
  Completed = 6,
  Blocked = 7,
  UnderInvoicing = 8,
  TransactionCompleted = 9,
  AddingToServerInprogress = 10,
  AddedWithIssue = 11,
}
export enum SIMCardDeliveryStatusEnum {
  New = 1,
  DeliveredToCustomer = 2,
  Invoiced = 3,
  Cancelled = 4,
}
export enum ContractStatusEnum {
  New = 1,
  AwaitingReview = 2,
  Reviewed = 3,
  CustomerAccepted = 4,
  CustomerRejected = 5,
  Completed = 6,
  Cancelled = 7,
}

export enum PreSalesRequestStatusEnum {
  None = 1,
  New = 2,
  Assigned = 3,
  Completed = 4,
}

export enum PreSalesProgressStatusEnum {
  New = 1,
  Spare = 2,
  InProgress = 3,
  Cancelled = 4,
  Delayed = 5,
  Pending = 6,
  Demo = 7,
  Hold = 8,
  Complete = 9,
}
export enum PaymentType {
  Subscription = 1,
  FlatFee = 2,
  OneTimePayment = 3,
}

export enum FamilyCode {
  Devices = '001001',
  DVR = '001003',
  AVL = '001',
  Accessories = '001002',
  DVRAccessories = '001006',
  SERVICE = '001004',
}
export enum FamilyCodeOman {
  Devices = '001001',
  DVR = '001003',
  AVL = '001',
  Accessories = '001002',
  DVRAccessories = '001006',
  SERVICE = '001004',
}
export enum ModelTypesEnum {
  DevicesInstallationCharges = 14,
  LoadSensor = 55,
  PressureSensor = 53,
  LoadSensorD = 312,
  PressureSensorD = 313,
  SensorsInstallationCharges = 258,
  WeightSensorInstallationCharges = 257,
  VMSInstallationCharges = 259,
  TaxiInstallationCharges = 274,
  DataHub = 315,
  LoraGateway = 152,
  MDVRHeroME4104 = 191,
  Teltonika_B120 = 88,
  GSMSubscription = 13,
}

export enum ModelTypesEnumOman {
  DevicesInstallationCharges = 14,
  LoadSensor = 19,
  PressureSensor = 20,
  SensorsInstallationCharges = 15,
  WeightSensorInstallationCharges = 16,
  VMSInstallationCharges = 17,
  TaxiInstallationCharges = 18,
  DataHub = 22,
  //Missing
  LoadSensorD = 19,
  PressureSensorD = 20,
  LoraGateway = 21,
  MDVRHeroME4104 = 42,
  Teltonika_B120 = 60,
  GSMSubscription = 1,
}

export enum InvoiceStatusEnum {
  Issued = 1,
  Collected = 2,
}

export enum PaymentTypeEnum {
  Subscription = 1,
  FlatFee = 2,
  OneTimePayment = 3,
}
export enum CountriesEnum {
  Oman = 'OMAN',
  KSA = 'KSA',
}
export enum InvoiceReturnTypeEnum {
  NoReturn = 1,
  PartiallyReturn = 2,
  FullyReturn = 3,
  Reissued = 4,
}

export enum InvoiceTypes {
  AVL = 1,
  Devices = 2,
  Services = 3,
  Demo = 4,
}

export enum InvoiceItemTypeEnum {
  Device = 1,
  Subscription = 2,
  InstallationCharge = 3,
}

export enum CustomerStatusEnum {
  New = 1,
  PreCustomer = 2,
  WrittenOnDolphin = 3,
  Demo = 4,
  Contracted = 5,
  BLocked = 6,
  ActiveCustomer = 7,
}

export enum CustomerUpdateRequestStatusEnum {
  Activated = 1,
  UnderReview = 2,
  Rejected = 3,
  Accepted = 4,
}
export enum TaskCategoriesEnum {
  CreateAccount = 1,
  EnableDisableAccount = 2,
  TechnicalRequests = 3,
}
export enum RequestDDL {
  AllRequests = 0,
  DeliveryRequests = 179,
  DeliveryNotes = 173,
  Maintenance = 175,
  StopService = 187,
  Reservice = 188,
  RemoteReservice = 198,
  TSU = 190,
}
export enum ActiveDashboard {
  Tasks = 1,
  Statistics = 2,
  PerformanceTracker = 3,
}

export const SubscriptionPeriodNamesEnum = {
  1: '1 Month',
  2: '2 Month',
  3: '3 Month',
  4: '4 Month',
  5: '6 Month',
  6: '12 Month',
  7: '2 Years',
  8: '3 Years',
  9: '4 Years',
  10: '9 Month',
  11: '18 Month',
  12: '5 Years',
};

export enum DeliveryRequestStatusEnum {
  Blocked = 1,
  PendingForApproval = 2,
  Approved = 3,
  Rejected = 4,
  AwaitingAssign = 5,
  Completed = 6,
  AwaitingDVRsItemsCheck = 7,
}

export enum DeliveryRequestTypeEnum {
  Sales = 1,
  Demo = 2,
  ConvertedToSales = 3,
  ClosedDemo = 4,
}
export enum LeadStatusEnum {
  New = 1,
  Contacted = 2,
  InProgress = 3,
  NewCustomer = 4,
  Rejected = 5,
}
