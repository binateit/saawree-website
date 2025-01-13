import { ID } from "./model";

//Register Model
export type Register = {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  emailAddress?: string;
  mobileNumber?: string;
  password?: string;
  confirmPassword?: string;
  addressLine1?: string;
  addressLine2?: string;
  stateId?: number;
  stateName?: string;
  city?: string;
  zipCode?: string;
  countryId?: number;
  agentCode?: string;
};

export interface AuthModel {
  isGuestUser: boolean;
  token: string;
  refreshToken?: string;
  refreshTokenExpiryTime?: Date;
}

export interface CustomerModel {
  id: string;
  customerId: number;
  customerTypeId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  userId?: string;
}

export interface UserModel {
  id: string;
  appVendorId?: number;
  customerId?: number;
  customerTypeId?: number;
  firstName?: string;
  lastName?: string;
  company?: string;
  customerDisplayName?: string;
  emailAddress?: string;
  mobileNumber?: string;
  mobilePhone?: string;
  isInternal?: boolean;
  tenantTypeId?: number;
  linkedTenantId?: string;
  isActive?: true;
  userId?: string;
  rateTypeId?: number;
}

export interface AgentModel {
  id: string;
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
  zipCode: string;
  commissionPercent: number;
  dateOfBirth: string;
  dateOfAnniversary: string;
  isActive: boolean;
  userId: string;
  password: string;
  rateTypeId: number;
  rateTypeName: string;
  enableLogin: boolean;
  imagePath: string;
}

export interface RefreshToken {
  token: string;
  refreshToken: string;
}

export interface RefeshTokenResponse {
  token: string;
  tokenExpiryTime: Date;
  refreshToken: string;
  refreshTokenExpiryTime: Date;
}

export type EmailConfirmation = {
  userId: string;
  emailCode: number;
};

export type ResendOTP = {
  userId: string;
};

export type AgentLoginResult = {
  data: AgentLoginData;
  messages: any[];
  succeeded: boolean;
};

export type AgentLoginData = {
  token: string;
  tokenExpiryTime: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  agentCode: string;
  firstName: string;
  lastName: string;
  companyName: string;
  emailAddress: string;
  mobileNumber: string;
};

//ForgotPassword Model

export type ForgotPassword = {
  email?: string;
  origin?: string;
};

//Reset Password
export type ResetPassword = {
  password?: string;
  confirmPassword?: string;
  token?: string;
};
