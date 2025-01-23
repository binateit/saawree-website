export type Items = {
  productId?: number;
  price?: number;
  quantity?: number;
  productName?: string;
  designNumber?: number;
  imagePath?: string;
  colorId?: number;
  colorName?: string;
  polishingTypeId?: number;
  polishingTypeName?: string;
};

export type AddCart = {
  orderType?: number;
  items?: Items[];
  isFromBuyNow?: boolean;
};

export type CartDetails = {
  items: Item[];
  orderSubTotal: number;
  totalDiscountedPrice: number;
  totalTaxAmount: number;
  orderTotal: number;
  orderTotalTaxInclusive: number;
  roundOff: number;
};
export type Item = {
  cartId: number;
  orderType: number;
  productId: number;
  designNumber: string;
  productName: string;
  imagePath: string;
  productPrice: number;
  quantity: number;
  subTotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  taxPercent: number;
  taxAmount: number;
  totalInclusiveTax: number;
};

export type UpdateCartPayload = {
  cartId: number;
  quantity: number;
}[];

export type PlaceOrderPayload = {
  isFromBuyNow: boolean;
  shipAddressId: number;
  paymentModeId: number;
};

export type RazorPay = {
  razorPayPaymentId?: string;
  razorPayOrderId?: string;
  razorPaySignature?: string;
};
