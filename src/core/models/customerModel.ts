import { Response } from "./model";

export type CustomerRecord = {
  totalSaleOrderCount?: number;
  totalSaleOrderAmount?: number;
  totalPaymentReceived?: number;
  outstandingAmount?: number;
  totalInvoiceCount?: number;
  totalInvoiceAmount?: number;
  totalInovicePaymentReceived?: number;
  outstandingInvoiceAmount?: number;
};

export type CustomerAddress = {
  id?: number;
  customerAddressId?: number;
  customerName?: string;
  addressId?: number;
  address?: Address;
  addressTypeId?: number;
  addressTypeName?: string;
  displayAddress?: string;
  isDefault?: boolean;
};

export interface CreateCustomerAddress {
  address: Address;
  addressType: number;
  isDefault: boolean;
}

export type EditCustomerProfile = {
  firstName: string;
  lastName: string;
  companyName: string;
  mobileNumber: string;
  emailAddress: string;
  website: string;
  whatsappNumber: string;
  faxNumber: string;
  printName: string;
  contactPerson: string;
  dateOfBirth: string;
  dateOfAnniversary: string;
};

export type CustomerAddressQueryResponse = {
  customerAddressId: number;
  addressId: number;
  addressTypeId: number;
  addressTypeName: string;
  displayAddress: string;
  isDefault: boolean;
};

export type CustomerAddressByIdQueryResponse = {
  id: number;
  customerId: number;
  customerName: string;
  addressId: number;
  address: Address;
  addressTypeId: number;
  addressTypeName: string;
  displayAddress: string;
  isDefault: boolean;
};
export type Address = {
  addressId?: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateId?: number;
  stateName?: string;
  countryId?: number;
  countryName?: string;
  zipCode: string;
  phoneNumber: string;
  displayAddress?: string;
};

export type ChangePassword = {
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

export type CustomerAccounting = {
  lstNumber?: string | undefined;
  cstNumber?: string | undefined;
  gstNumber?: string | undefined;
  panNumber?: string | undefined;
  aadharNumber?: string | undefined;
  gstRegistrationTypeId?: number | undefined;
  gstRegistrationTypeName?: string | undefined;
};

export enum gstRegisteredType {
  RegisteredBusinessRegular = 1,
  RegisteredBusinessComposition = 2,
  UnregisteredBusiness = 3,
  Consumer = 4,
  Overseas = 5,
  SpecialEconomicZoneSEZ = 6,
  DeemedExport = 7,
  TaxDeductor = 8,
  SEZDeveloper = 9,
}

export type InvoiceRecords = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceStatusName: string;
  orderTotal: number;
};

export type InvoicesQueryListResponse = Response<Array<InvoiceRecords>>;

export type PaymentRecords = {
  id: number;
  paymentNumber: string;
  amountReceived: number;
  paymentDate: string;
  paymentModeName: string;
  isAdvance: boolean;
  usedAmount: number;
  advanceAmountLeft: number;
};

export type PaymentsQueryListResponse = Response<Array<PaymentRecords>>;

export type InvoiceDetails = {
  id: number;
  saleOrderId: number;
  customerId: number;
  customerName: string;
  emailAddress: string;
  mobileNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  billAddressLine1: string;
  billAddressLine2: string;
  billCityName: string;
  billStateId: number;
  billZipCode: string;
  billStateName?: string;
  billCountryId: number;
  billCountryName: string;
  shipAddressLine1: string;
  shipAddressLine2: string;
  shipCityName: string;
  shipStateId: number;
  shipStateName: string;
  shipCountryId: number;
  shipCountryName: string;
  shipZipCode: string;
  termId: number;
  termName: string;
  termNumberOfDays: number;
  dueDate: string;
  paymentStatusId: number;
  paymentStatusName: string;
  invoiceStatusId: number;
  invoiceStatusName: string;
  orderTotal: number;
  orderSubTotal: number;
  roundOff: number;
  totalDiscountedPrice: number;
  totalTaxAmount: number;
  totalOtherCharges: number;
  gstNumber?: string;
  notes: string;
  placeOfSupplyId: number;
  placeOfSupplyName: string;
  itemList: ItemList[];
  // paymentList: any[];
  otherCharges: OtherChargesDto[];
};

export type OtherChargesDto = {
  id: number;
  label: string;
  amount: number;
  isDeleted: boolean;
};
export type ItemList = {
  invoiceItemId: number;
  categoryName: string;
  hsnCode: number;
  productId: number;
  productName: string;
  productImagePath: string;
  polishingTypeId: number;
  polishingTypeName: string;
  colorId: number;
  colorName: string;
  quantity: number;
  productPrice: number;
  subTotal: number;
  discountApplicable: boolean;
  discountPercent: number;
  discountAmount: number;
  total: number;
  taxPercent: number;
  taxAmount: number;
  totalInclusiveTax: number;
  invoiceItemTaxDtos: InvoiceItemTaxDto[];
  isDeleted: boolean;
};
export type InvoiceItemTaxDto = {
  invoiceItemId: number;
  taxId: number;
  taxPercent: number;
  taxName: string;
  taxAmount: number;
};

export type PaymentDetails = {
  id: number;
  customerId: number;
  amountReceived: number;
  paymentDate: string;
  paymentNumber: string;
  paymentModeId: number;
  paymentModeName: string;
  referenceNumber: string;
  pdfPath: string;
  isAdvance: boolean;
  notes: string;
  customerDetailForPaymentDto: CustomerDetailForPaymentDto;
  saleOrderPayments: SaleOrderPayment[];
  bankId: number;
  bankName: string;
  chequeBankName: string;
  chequeNumber: string;
  chequeDate: string;
};
export type SaleOrderPayment = {
  id: number;
  paymentReceivedId: number;
  saleOrderId: number;
  saleOrderNumber: string;
  amountReceived: number;
  paymentDate: string;
  orderDate: string;
};
export type CustomerDetailForPaymentDto = {
  id: number;
  customerName: string;
  email: string;
  mobileNumber: string;
};

export type CustomerDetails = {
  id: number;
  appVendorId?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  printName: string;
  faxNumber: string;
  emailAddress: string;
  website: string;
  contactPerson: string;
  mobileNumber: string;
  whatsappNumber: string;
  dateOfBirth: string;
  dateOfAnniversary: string;
  lstNumber?: string;
  cstNumber?: string;
  gstNumber?: string;
  panNumber: string;
  aadharNumber: string;
  gstRegistrationTypeId: number;
  gstRegistrationTypeName: string;
  termId?: number;
  creditLimitInAmount: number;
  discountPercent: number;
  applyGST: boolean;
  rateTypeId: number;
  rateTypeName: string;
  isInternal: boolean;
  tenantTypeId: number;
  linkedTenantId?: number;
  userName: string;
  billingAddress: BillingAddress;
  shippingAddress: BillingAddress;
  additionalAddress: AdditionalAddress;
  agentId: number;
  enableLogin: boolean;
  imagePath?: string;
  placeOfSupplyId?: number;
  placeOfSupplyName?: string;
  userId: string;
  accountStatusId: number;
  accountStatusName: string;
  enableCredit: boolean;
  customerCode?: string;
  isVerified: boolean;
  customerSaleOrderTransactionHistories: CustomerSaleOrderTransactionHistory[];
  customerSaleOrders: CustomerSaleOrderTransactionHistory[];
  customerInvoices: CustomerInvoice[];
  customerPayments: CustomerPayment[];
};
export type CustomerPayment = {
  paymentNumber: string;
  paymentModeName: string;
  amountReceived: number;
  isAdvance: boolean;
  referenceNumber: string;
  advanceAmountLeft?: number;
  paymentDate: string;
};
export type CustomerInvoice = {
  invoiceId: number;
  invoiceNumber: string;
  invoiceStatusName: string;
  invoiceDate: string;
  orderTotal: number;
  saleOrderId: number;
  saleOrderNumber: string;
};
export type CustomerSaleOrderTransactionHistory = {
  saleOrderId: number;
  orderNumber: string;
  saleOrderStatusId: number;
  orderStatusName: string;
  orderDate: string;
  orderTotal: number;
};
export type AdditionalAddress = {
  addressId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateId: number;
  stateName: string;
  countryId?: number;
  countryName?: string;
  zipCode: string;
  phoneNumber: string;
  displayAddress: string;
};
export type BillingAddress = {
  addressId: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateId: number;
  stateName: string;
  countryId: number;
  countryName: string;
  zipCode: string;
  phoneNumber: string;
  displayAddress: string;
};

export type CustomerFilters = {
  filterPrintName?: string;
  filterEmailAddress?: string;
  filterMobileNumber?: string;
};
