import axios, { AxiosResponse } from "axios";
import {
  AgentLoginResult,
  AgentModel,
  EmailConfirmation,
  ForgotPassword,
  RefeshTokenResponse,
  RefreshToken,
  RegistationResponse,
  Register,
  ResendOTP,
  ResetPassword,
  UserModel,
  UserProfile,
} from "../models/authModel";
import { Result } from "../models/model";

import axiosInstance from "../helpers/axiosInstance";
const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;

//store
const REGISTER_URL = `${API_URL}/customers/register`;
const EMAIL_CONFIRMATION_URL = `${API_URL}/customers/email-confirmation`;
const RESEND_OTP_URL = `${API_URL}/customers/resend-email-otp`;
const LOGIN_URL = `${API_URL}/customers/login`;
const AGENT_LOGIN_URL = `${API_URL}/agent/login`;
const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/customers/profile`;
const GET_AGENT_BY_ACCESSTOKEN_URL = `${API_URL}/agent/profile`;
const REFRESH_TOKEN_URL = `${API_URL}/customers/refresh-token`;
const AGENT_REFRESH_TOKEN_URL = `${API_URL}/agent/refresh-token`;
const FORGOT_PASSWORD_URL = `${API_URL}/customers/forgot-password`;
const AGENT_FORGOT_PASSWORD_URL = `${API_URL}/agent/forgot-password`;
const RESET_PASSWORD_URL = `${API_URL}/customers/reset-password`;
const RESET_AGENT_PASSWORD_URL = `${API_URL}/agent/reset-password`;

const registerCustomer = async (
  register: Register
): Promise<RegistationResponse | Result> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post(
      REGISTER_URL,
      {
        firstName: register.firstName,
        lastName: register.lastName,
        companyName: register.companyName,
        emailAddress: register.emailAddress,
        mobileNumber: register.mobileNumber,
        password: register.password,
        confirmPassword: register.confirmPassword,
        addressLine1: register.addressLine1,
        addressLine2: register.addressLine2,
        stateId: register.stateId,
        stateName: register.stateName,
        city: register.city,
        zipCode: register.zipCode,
        countryId: register.countryId,
        agentCode: register.agentCode,
      },
      { headers: headers }
    )

    .then((response: AxiosResponse<RegistationResponse>) => response.data)
    .then((response: RegistationResponse) => response)
    .catch((err: Result) => {
      return err;
    });
};

const customerEmailConfirmation = async (
  email: EmailConfirmation
): Promise<Result> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post(
      EMAIL_CONFIRMATION_URL,
      {
        userId: email.userId,
        emailCode: email.emailCode,
      },
      { headers: headers }
    )

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

//resend OTP

const resendOTP = async (otp: ResendOTP): Promise<Result> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post(
      RESEND_OTP_URL,
      {
        userId: otp.userId,
      },
      { headers: headers }
    )

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

const login = async (username: string, password: string): Promise<Result> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post<Result>(
      LOGIN_URL,
      {
        username,
        password,
      },
      { headers: headers }
    )
    .then((res) => res.data);
};

const agentLogin = async (
  username: string,
  password: string
): Promise<AgentLoginResult> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post<AgentLoginResult>(
      AGENT_LOGIN_URL,
      {
        username,
        password,
      },
      { headers: headers }
    )
    .then((res) => res.data);
};

const getAgentByToken = (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.get<AgentModel>(GET_AGENT_BY_ACCESSTOKEN_URL, {
    headers: headers,
  });
};

const getUserByToken = (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    headers: headers,
  });
};

const getRefreshToken = async (refreshToken: RefreshToken) => {
  const headers = {
    tenant: "ho",
  };
  return axios.post<RefeshTokenResponse>(
    REFRESH_TOKEN_URL,
    {
      token: refreshToken.token,
      refreshToken: refreshToken.refreshToken,
    },
    {
      headers: headers,
    }
  );
};

const getUserProfileByToken = async (token: string): Promise<UserProfile> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return axiosInstance
    .get(GET_USER_BY_ACCESSTOKEN_URL, {
      headers: headers,
    })
    .then((res: AxiosResponse<UserProfile>) => res.data);
};

const getAgentRefreshToken = async (refreshToken: RefreshToken) => {
  const headers = {
    tenant: "ho",
  };
  return axios.post<RefeshTokenResponse>(
    AGENT_REFRESH_TOKEN_URL,
    {
      token: refreshToken.token,
      refreshToken: refreshToken.refreshToken,
    },
    {
      headers: headers,
    }
  );
};

const forgotPassword = async (forpass: ForgotPassword): Promise<Result> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post(
      FORGOT_PASSWORD_URL,
      {
        email: forpass.email,
      },
      { headers: headers }
    )

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

const forgotAgentPassword = async (
  forpass: ForgotPassword
): Promise<Result> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post(
      AGENT_FORGOT_PASSWORD_URL,
      {
        email: forpass.email,
      },
      { headers: headers }
    )

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

//reset password

const resetPassword = async (resetpass: ResetPassword): Promise<Result> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post(
      RESET_PASSWORD_URL,
      {
        password: resetpass.password,
        confirmPassword: resetpass.confirmPassword,
        token: resetpass.token,
      },
      { headers: headers }
    )

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

//reset agent password

const resetAgentPassword = async (
  resetpass: ResetPassword
): Promise<Result> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post(
      RESET_AGENT_PASSWORD_URL,
      {
        password: resetpass.password,
        confirmPassword: resetpass.confirmPassword,
        token: resetpass.token,
      },
      { headers: headers }
    )

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

export {
  registerCustomer,
  customerEmailConfirmation,
  resendOTP,
  login,
  getUserByToken,
  getRefreshToken,
  agentLogin,
  getAgentByToken,
  getAgentRefreshToken,
  forgotPassword,
  forgotAgentPassword,
  resetPassword,
  resetAgentPassword,
  getUserProfileByToken,
};
