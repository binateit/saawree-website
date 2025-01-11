import axios, { AxiosResponse } from "axios";
import { ID, Result } from "../models/model";
import { CustomerRecord, EditCustomerProfile } from "../models/customerModel";
import axiosInstance from "../helpers/axiosInstance";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const Customer_Record_URL = `${API_URL}/customers/overview`;
const Customer_Profile_URL = `${API_URL}/customers/profile`;

const getRecordById = async (): Promise<CustomerRecord> => {
  return await axiosInstance
    .get(`${Customer_Record_URL}`)
    .then((response: AxiosResponse<CustomerRecord>) => response.data)
    .then((response: CustomerRecord) => response)
    .catch((err) => {
      return err;
    });
};

const updateCustomerProfile = async (
  payload: EditCustomerProfile
): Promise<Result> => {
  return await axiosInstance
    .put(`${Customer_Profile_URL}`, payload)
    .then((response: AxiosResponse<Result>) => response.data)
    .catch((err: Result) => {
      return err;
    });
};

export { getRecordById, updateCustomerProfile };
