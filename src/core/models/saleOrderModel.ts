import { Response } from "./model";

export interface ISalesOrder {
  id: number;
  customerId: number;
  customerName?: string;
  orderNumber?: string;
  orderDate: Date;
  orderStatusName?: string;
  paymentStatusName?: string;
  expectedShipmentDate: Date;
  notes?: string;
  subTotal: number;
  adjustment: number;
  roundOff: number;
  orderTotal: number;
  itemList: ISaleOrderItem[];
  paymentList: paymentList[];
  billAddressLine1?: string;
  billAddressLine2?: string;
  billCityName?: string;
  billStateId?: number;
  billStateName?: string;
  billCountryId?: number;
  billCountryName?: string;
  shipAddressLine1?: string;
  shipAddressLine2?: string;
  shipCityName?: string;
  shipStateId?: number;
  shipStateName?: string;
  shipCountryId?: number;
  shipZipCode?: string;
  shipCountryName?: string;
  contactNumber?: string;
  mobileNumber?: string;
  email?: string;
  discountAmount?: number;
  totalDiscountedPrice?: number;
  totalTaxAmount?: number;
  saleOrderStatusHistory?: SaleOrderStatusHistory[];
}

export interface ISaleOrderItem {
  rowNumber: number;
  saleOrderItemId?: number;
  saleOrderId?: number;
  designNumber?: string;
  categoryName?: string;
  productId?: ID;
  productName?: string;
  productImagePath?: string;
  polishingTypeId?: number;
  polishingTypeName?: string;
  colorId?: number;
  colorName?: string;
  quantity?: number;
  productPrice?: number;
  subTotal?: number;
  discountApplicable?: number;
  discountPercent?: number;
  discountAmount?: number;
  total?: number;
  taxPercent?: number;
  taxAmount?: number;
  totalInclusiveTax?: number;
  saleOrderItemTaxDtos?: SaleOrderItemTaxDtos[];
  isDeleted?: boolean;
  saleOrderStatusHistory?: SaleOrderStatusHistory[];
}
export type SaleOrderStatusHistory = {
  saleOrderId: number;
  statusDate: Date | string;
  saleOrderStatusId: number;
  saleOrderStatusName: string;
  notes: string;
};
export type SaleOrderItemTaxDtos = {
  id?: number;
  saleOrderItemId?: number;
  taxId?: number;
  taxPercent?: number;
  taxName?: string;
  taxAmount?: number;
};

export interface paymentList {
  id?: number;
  saleOrderId?: number;
  saleOrderNumber?: string;
  saleOrderDate?: Date;
  customerName?: string;
  orderAmount?: number;
  amountReceived?: number;
  bankAccountId?: number;
  accountName?: string;
  paymentDate?: Date;
  paymentModeId?: number;
  paymentModeName?: string;
}
export type SalesOrderQueryResponse = Response<Array<ISalesOrder>>;
