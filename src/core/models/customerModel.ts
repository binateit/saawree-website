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
  userId: string;
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
