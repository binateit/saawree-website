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
