// utils/axiosInstance.ts

import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Session } from "../models/model";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  // Additional Axios config
});

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const session = await getSession();
  const UserSession = session as Session;
  if (UserSession?.user?.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${UserSession?.user?.token}`,
    } as AxiosRequestHeaders;
  } else {
    config.headers.set("tenant", "ho");
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (
  error: AxiosError | Error
): Promise<AxiosResponse | undefined> => {
  if (axios.isAxiosError(error)) {
    // const { message } = error;
    // const { method, url } = error.config as AxiosRequestConfig;
    const { status } = (error.response as AxiosResponse) ?? {};

    switch (status) {
      case 400: {
        // Bad Request
        return Promise.reject(error.response);
      }
      case 401: {
        return Promise.resolve(error.response);
      }
      case 403: {
        // "Permission denied"
        //navigate('error/access-denied')
        return Promise.resolve(undefined);
      }
      case 404: {
        // "Invalid request"
        //navigate('error/404')
        return Promise.resolve(undefined);
      }
      case 500: {
        // "Server error"
        //navigate('error/500')
        return Promise.resolve(undefined);
      }
      default: {
        // "Unknown error occurred"
        return Promise.resolve(undefined);
      }
    }
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
