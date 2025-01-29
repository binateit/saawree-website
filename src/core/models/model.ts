export type ID = undefined | null | number | string;
export interface AuthModel {
  isGuestUser: boolean;
  token: string;
  refreshToken?: string;
  refreshTokenExpiryTime?: Date;
}

export interface UserModel {
  id: number;
  appVendorId?: number;
  customerId?: number;
  customerTypeId?: number;
  firstName?: string;
  lastName?: string;
  company?: string;
  customerDisplayName?: string;
  emailAddress?: string;
  contactNumber?: string;
  mobilePhone?: string;
  isInternal?: boolean;
  tenantTypeId?: number;
  linkedTenantId?: string;
  isActive?: true;
  userId?: string;
  rateId?: number;
}

export type Result = {
  succeeded: boolean;
  messages: string[];
  data: any;
  source: string;
  exception: string;
  errorCode: number;
  supportMessage: string | null;
  statusCode: number;
  propertyResults: PropertyFailureResult[];
};

export type ResultStatus = {
  orderId: string;
  saleOrderId: number;
};

export type PropertyFailureResult = {
  propertyName: string;
  errorMessage: string;
  formattedMessagePlaceholderValues: { [key: string]: any };
};

export type SelectOptionProps = {
  value: number;
  label: string;
};

export type SelectOption<T> = {
  value: T;
  label: string;
};

export type PaginationResponse = {
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  pageSize?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
};
export type Response<T> = PaginationResponse & {
  data?: T;
  pagination?: PaginationResponse;
};
//State Model

export type State = {
  id?: number;
  name?: string;
  countryId?: number;
  countryName?: string;
  isActive?: boolean;
  createdOn?: Date;
  statusId?: number;
};
export type StateQueryResponse = Response<Array<State>>;

//Country Model
export type Country = {
  id?: ID;
  name?: string;
  countryCode?: string;
};

export type CountryQueryResponse = Response<Array<Country>>;

export type userToken = {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userId: string;
  rateTypeId: number;
  isGuestUser: boolean;
  userType: string;
};

export type Session = {
  user: User;
  expires: string;
};
export type User = {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  userType: string;
};

export type Search = {
  keyword?: string | undefined;
  fields?: Array<string> | undefined;
};

export type Filter = {
  logic?: string | undefined;
  filters?: Array<Filter> | undefined;
  field?: string | undefined;
  operator?: string | undefined;
  value?: any | undefined;
};

export type BaseFilter = {
  keyword?: string | undefined;
  advancedSearch?: Search | undefined;
  advancedFilter?: Filter | undefined;
};
export type StatusFilter = BaseFilter & {
  isActive?: boolean;
};
export type PaginationFilter = BaseFilter & {
  first?: number;
  tenantTypeId?: number;
  pageNumber?: number;
  pageSize?: number;
  orderBy?: Array<string>;
  sortOrder?: number | null;
  sortField?: string;
};

export type RecomendedProductsFilter = {
  categoryIds: number[];
};

export type Product = {
  id?: ID;
  name?: string;
  barcode?: string;
  description?: string;
  isActive?: boolean;
  itemGroupId?: number;
  colorId?: number;
  colorName?: string;
  polishingTypeId?: number;
  polishingTypeName?: string;
  spSemiWholeSeller?: number;
  spRetail?: number;
  availableQuantity?: number;
  spWholeSeller?: number;
  retailMoQ?: number;
  wholeSellerMoQ?: number;
  semiWholeSellerMoQ?: number;
  metaTagDescription?: string;
  metaTagKeyword?: string;
  metaTagTitle?: string;
  statusId?: number;
  lowStockAlert?: number;
  initialStockBalance?: number;
  retailPrice?: number;
  unitId?: number;
  purchasePrice?: number;
  productGroupId?: number;
  productGroupName?: string;
  isDefault?: boolean;
  taxRateId?: number;
  isReadyInStock?: boolean;
  taxRateName?: string;
  designNumberId?: number;
  designNumber?: string;
  categoryId?: number;
  categoryName?: string;
  productImagePath?: string;
  taxRateValue?: number;
};

export type ProductQueryResponse = Response<Array<Product>>;
