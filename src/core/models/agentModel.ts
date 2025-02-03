import { Response } from "./model";

export type AgentRecord = {
  totalCustomerCount?: number;
  totalSaleOrderCount?: number;
  totalSaleOrderAmount?: number;
  totalAgentCommission?: number;
  totalPaidCommission?: number;
};

export type ChangePassword = {
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

export type AgentProfile = {
  id: number;
  agentCode: string;
  firstName: string;
  lastName: string;
  companyName: string;
  emailAddress: string;
  mobileNumber: string;
  whatsappNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateId: number;
  stateName: string;
  countryId: number;
  countryName: string;
  zipCode: string;
  commissionPercent: number;
  dateOfBirth: string;
  dateOfAnniversary: string;
  isActive: boolean;
  password: string;
  rateTypeId: number;
  rateTypeName: string;
  enableLogin: boolean;
  imagePath: string;
};

export type EditAgentProfile = {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  whatsappNumber: string;
  companyName: string;
  emailAddress: string;
  dateOfBirth: string;
  dateOfAnniversary: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateId: number;
  stateName?: string;
  countryId: number;
  countryName?: string;
  zipCode: string;
};

export type CustomersOfAgent = {
  id: number;
  printName: string;
  companyName: string;
  emailAddress: string;
  mobileNumber: string;
  accountStatusName: string;
};

export type CustomersOfAgentQueryListResponse = Response<
  Array<CustomersOfAgent>
>;

export type InvoiceRecords = {
  id: number;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  orderTotal: number;
  invoiceStatusName: string;
};

export type InvoicesQueryListResponse = Response<Array<InvoiceRecords>>;

export type AgentPaymentRecords = {
  id: number;
  paymentNumber: string;
  customerName: string;
  amountReceived: number;
  paymentDate: string;
  paymentModeName: string;
  isAdvance: boolean;
  usedAmount: number;
  advanceAmountLeft?: number;
};

export type AgentPaymentQueryResponse = Response<Array<AgentPaymentRecords>>;

export interface ColorDetails {
  productId: number;
  productName: string;
  colorId: number;
  colorName: string;
  colorCode: string;
  imagePath: string;
}

export type AgentCommissionRecord = {
  id: number;
  agentId: number;
  agentName: string;
  saleOrderId: number;
  orderNumber: string;
  orderTotal: number;
  agentCommissionStatusId: number;
  agentCommissionStatusName: string;
  earnCommission: number;
};

export type AgentCommissionQueryResponse = Response<
  Array<AgentCommissionRecord>
>;

export type AgentPayoutRecord = {
  id: number;
  referenceNumber: string;
  agentId: number;
  agentName: string;
  totalAmountPaid: number;
  paymentDate: string;
  paymentModeName: string;
};

export type AgentPayoutQueryResponse = Response<Array<AgentPayoutRecord>>;

export type AgentPayoutDetails = {
  id: number;
  agentId: number;
  agentName: string;
  totalAmountPaid: number;
  paymentDate: string;
  paymentModeId: number;
  paymentModeName: string;
  referenceNumber: string;
  notes: string;
  commissions: Commission[];
};

export type Commission = {
  id: number;
  agentPayoutId: number;
  agentCommissionId: number;
  amountPaid: number;
  saleOrderNumber: string;
  saleOrderDate: string;
  saleOrderAmount: number;
  customerName: string;
};
