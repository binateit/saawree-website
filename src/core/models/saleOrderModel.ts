import { Nullable } from "primereact/ts-helpers";
import { ID, Response } from "./model";

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
  otherCharges?: ISaleOrderOtherCharges[];
  outStandingAmount?: number;
  billAddressLine1?: string;
  billAddressLine2?: string;
  billCityName?: string;
  billStateId?: number;
  billStateName?: string;
  billCountryId?: number;
  billCountryName?: string;
  billZipCode?: string;
  saleOrderStatusName?: string;
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
  saleOrderStatusHistory: SaleOrderStatusHistory[];
}
export interface ISaleOrderOtherCharges {
  id: number;
  label: string;
  amount: number;
  isDeleted: boolean;
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

export type SaleOrderDto = {
  id: number;
  orderNumber: string;
  orderDate: string;
  expectedShipmentDate?: string;
  saleOrderStatusName: string;
  paymentStatusName: string;
  orderTotal: number;
  totalAmountReceived: number;
  outstandingAmount: number;
};
export type SalesOrderQueryListResponse = Response<Array<SaleOrderDto>>;

export type FileResult = {
  data: Blob;
  name: string;
  exception?: string;
};

export interface StatusList {
  id: number;
  name: string;
}

export interface FilterOption {
  filterOrderStatusId?: number;
  filterPaymentStatusId?: number;
  filterDates?: Nullable<Date>[];
}

export interface CustomerListDropdown {
  id: number;
  name: string;
}

export interface CustomerDetailforSOModel {
  discountPercent: number;
  termId: number;
  displayBillingAddress: string;
  rateTypeId: number;
  addressList: CustomerAddressForSO[];
}

export interface CustomerAddressForSO {
  customerAddressId: number;
  displayAddress: string;
}

export type Category = {
  id?: ID;
  name?: string;
  parentCategoryId?: number;
  parentCategoryName?: string;
  isActive?: boolean;
  isParent?: boolean;
  hasChild?: boolean;
  printName?: string;
  statusId?: number;
  uploadImage?: string;
  hsnCode?: number;
  taxRateId?: number;
  categoryImagePath?: string;
  imagePath?: string;
  isFeatured?: boolean;
  uploadBannerImage?: string;
  bannerImagePath?: string;
  banImagePath?: string;
  parentChildCategoryName?: string;
  sortNumber?: number;
};

export type CategoryQueryResponse = Response<Array<Category>>;

export type Color = {
  id?: ID;
  name?: string;
  colorCode?: string;
  isActive?: boolean;
  printName?: string;
};

export type ColorQueryResponse = Response<Array<Color>>;
export type PolishingType = {
  id?: ID;
  name?: string;
  shortName?: string;
  isActive?: boolean;
  printName?: string;
  createdOn?: Date;
};

export type PolishingTypeQueryResponse = Response<Array<PolishingType>>;

export type ProductGroup = {
  id?: number;
  name?: string;
  description?: string;
  isActive?: boolean;
  productGroupImage?: string;
  statusId?: number;
  imagePath?: string;
  categoryId?: number;
  spSemiWholeSeller?: number;
  spRetail?: number;
  spWholeSeller?: number;
  retailMoQ?: number;
  wholeSellerMoQ?: number;
  semiWholeSellerMoQ?: number;
  brandId?: number;
  manufacturerId?: number;
  secondaryCategory?: number[];
  designNumberId?: number;
  designNumber?: string;
  secondaryCategories?: SecondaryCategories[];
  purchasePrice?: number;
  vendorId?: string;
  productImagePath?: string;
  availabilityTypeId?: number;
};

export type SecondaryCategories = {
  productGroupId: number;
  categoryId: number;
  categoryName: string;
};

export type ProductGroupQueryResponse = Response<Array<ProductGroup>>;

export type CreateSaleOrderItem = {
  rowNumber: number;
  saleOrderItemId?: number;
  productId?: ID;
  productName?: string;
  quantity?: number;
  productPrice?: number;
  subTotal?: number;
  discountPercent?: number;
  discountAmount?: number;
  total?: number;
  taxPercent?: number;
  taxAmount?: number;
  totalInclusiveTax?: number;
  isDeleted?: boolean;
};

export interface CreateSaleOrder {
  customerId?: number;
  orderDate?: string;
  shippingAddressId?: number;
  notes?: string;
  discountPercent?: number;
}

export interface CreateSaleOrderRequestModel {
  saleOrderTypeId?: number;
  customerId?: number;
  orderDate?: string;
  shippingAddressId?: number;
  itemList?: CreateSaleOrderItemRequestModel[];
  notes?: string;
  discountPercent?: number;
}

export interface CreateSaleOrderItemRequestModel {
  productId: number;
  quantity: number;
  productPrice: number;
  taxPercent?: number;
  isDeleted: boolean;
}

export type SaleOrderRecords = {
  id: number;
  customerName: string;
  orderNumber: string;
  orderDate: string;
  saleOrderStatusName: string;
  paymentStatusName: string;
  orderTotal: number;
};

export type SaleOrderQueryResponse = Response<Array<SaleOrderRecords>>;
