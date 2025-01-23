import axios, { AxiosResponse } from "axios";
import { ID, PaginationFilter, Result } from "../models/model";
import {
  CreateCustomerAddress,
  CustomerAddress,
  CustomerAddressByIdQueryResponse,
  CustomerAddressQueryResponse,
  CustomerRecord,
  EditCustomerProfile,
} from "../models/customerModel";
import axiosInstance from "../helpers/axiosInstance";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const Customer_Record_URL = `${API_URL}/customers/overview`;
const Customer_Profile_URL = `${API_URL}/customers/profile`;
const Customer_Address_URL = `${API_URL}/customeraddress/search/web-customer`;
const Customer_Address_By_Id_URL = `${API_URL}/customeraddress`;
const Update_Customer_Address_URL = `${Customer_Address_By_Id_URL}/web-customer`;

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

const getCustomerAddress = async (): Promise<
  CustomerAddressQueryResponse[]
> => {
  return await axiosInstance
    .post(Customer_Address_URL)
    .then((d: AxiosResponse<CustomerAddressQueryResponse[]>) => {
      return d.data;
    });
};

const getCutsomerAddressById = async (
  id: ID
): Promise<CustomerAddressByIdQueryResponse> => {
  return await axiosInstance
    .get(`${Customer_Address_By_Id_URL}/${id}`)
    .then(
      (response: AxiosResponse<CustomerAddressByIdQueryResponse>) =>
        response.data
    )
    .catch((err) => {
      return err;
    });
};

const updateCustomerAddress = (customer: CustomerAddress): Promise<Result> => {
  return axiosInstance.put(
    `${Update_Customer_Address_URL}/${customer.customerAddressId}`,
    {
      addressType: customer?.addressTypeId,
      address: customer.address,
      customerAddressId: customer.customerAddressId,
    }
  );
};

const createCustomerAddress = (
  createCustomerAddress: CreateCustomerAddress
): Promise<Result> => {
  return axiosInstance.post(
    `${Update_Customer_Address_URL}`,
    createCustomerAddress
  );
};
export {
  getRecordById,
  updateCustomerProfile,
  getCustomerAddress,
  getCutsomerAddressById,
  updateCustomerAddress,
  createCustomerAddress,
};
