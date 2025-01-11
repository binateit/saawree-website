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

export type EditCustomerProfile = {
  userId: string;
  firstName: string;
  lastName: string;
  companyName: string;
  mobileNumber: string;
  emailAddress: string;
  website: string;
  whatsappNumber: string;
  dateOfBirth: string;
  dateOfAnniversary: string;
};
