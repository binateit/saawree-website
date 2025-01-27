import axios, { AxiosResponse } from "axios";
import { ID, PaginationFilter, Result } from "../models/model";
import {
  ChangePassword,
  CreateCustomerAddress,
  CustomerAccounting,
  CustomerAddress,
  CustomerAddressByIdQueryResponse,
  CustomerAddressQueryResponse,
  CustomerRecord,
  EditCustomerProfile,
  InvoiceDetails,
  InvoicesQueryListResponse,
  PaymentDetails,
  PaymentsQueryListResponse,
} from "../models/customerModel";
import axiosInstance from "../helpers/axiosInstance";
import { FileResult } from "../models/saleOrderModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const Customer_Record_URL = `${API_URL}/customers/overview`;
const Customer_Profile_URL = `${API_URL}/customers/profile`;
const Customer_Address_URL = `${API_URL}/customeraddress/search/web-customer`;
const Customer_Address_By_Id_URL = `${API_URL}/customeraddress`;
const Update_Customer_Address_URL = `${Customer_Address_By_Id_URL}/web-customer`;
const CHANGE_PASSWORD_URL = `${API_URL}/customers/change-password`;
const Customer_Accounting_URL = `${API_URL}/customers/accounting`;
const Invoice_URL = `${API_URL}/invoices/my-invoices`;
const Invoice_By_Id_URL = `${API_URL}/invoices`;
const Invoice_Download_URL = `${API_URL}/invoices/downloadpdf`;
const Payment_Records_URL = `${API_URL}/paymentreceived/my-payments`;
const Payment_Records_Details_URL = `${API_URL}/saleorders/saleorderpayment`;

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

const changePassword = async (cp: ChangePassword): Promise<Result> => {
  return await axiosInstance
    .put(`${CHANGE_PASSWORD_URL}`, {
      password: cp.password,
      newPassword: cp.newPassword,
      confirmNewPassword: cp.confirmNewPassword,
    })
    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

const getCustomerAccountingDetails = async (): Promise<CustomerAccounting> => {
  return await axiosInstance
    .get(Customer_Accounting_URL)
    .then((response: AxiosResponse<CustomerAccounting>) => response?.data)
    .catch((err) => {
      return err;
    });
};

const updateCustomerAccounting = async (
  payload: CustomerAccounting
): Promise<Result> => {
  return await axiosInstance
    .post(`${Customer_Accounting_URL}`, payload)
    .then((response: AxiosResponse<Result>) => response.data)
    .catch((err: Result) => {
      return err;
    });
};

const deleteCustomerAddress = async (id: ID): Promise<Result> => {
  return axios
    .delete(`${Update_Customer_Address_URL}/${id}`)
    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

const getInvoicesOfCustomer = async (
  filter: PaginationFilter
): Promise<InvoicesQueryListResponse> => {
  return await axiosInstance
    .post(`${Invoice_URL}`, filter)
    .then((response: AxiosResponse<InvoicesQueryListResponse>) => response.data)
    .then((response: InvoicesQueryListResponse) => response)
    .catch((err) => {
      return err;
    });
};

const getInvoiceById = async (id: number): Promise<InvoiceDetails> => {
  return await axiosInstance
    .get(`${Invoice_By_Id_URL}/${id}`)
    .then((response: AxiosResponse<InvoiceDetails>) => response.data)
    .then((response: InvoiceDetails) => response)
    .catch((err) => {
      return err;
    });
};

const GeneratePdf = async (
  id: number,
  url: string
): Promise<any | FileResult> => {
  return await axiosInstance
    .get(`${API_URL}/${url}/${id}`, {
      responseType: "blob",
    })
    .then(async (response: any) => {
      if (response.type == "application/json") {
        const jsonData = await response.text();
        const errorData = JSON.parse(jsonData);
        return errorData;
      } else {
        let filename = response.headers["content-disposition"]
          .split(";")
          .find((n: any) => n.includes("filename="))
          .replace("filename=", "")
          .trim();

        var result: FileResult = {
          data: response.data,
          name: filename,
        };
        return result;
      }
    })
    .catch((err: any) => {
      return err;
    });
};

const getPaymentListOfCustomer = async (
  filter: PaginationFilter
): Promise<PaymentsQueryListResponse> => {
  return await axiosInstance
    .post(`${Payment_Records_URL}`, filter)
    .then((response: AxiosResponse<PaymentsQueryListResponse>) => response.data)
    .then((response: PaymentsQueryListResponse) => response)
    .catch((err) => {
      return err;
    });
};

const getPaymentDetailsById = async (id: number): Promise<PaymentDetails> => {
  return await axiosInstance
    .get(`${Payment_Records_Details_URL}/${id}`)
    .then((response: AxiosResponse<PaymentDetails>) => response.data)
    .then((response: PaymentDetails) => response)
    .catch((err) => {
      return err;
    });
};

export {
  getRecordById,
  updateCustomerProfile,
  getCustomerAddress,
  getCutsomerAddressById,
  updateCustomerAddress,
  createCustomerAddress,
  changePassword,
  getCustomerAccountingDetails,
  updateCustomerAccounting,
  deleteCustomerAddress,
  getInvoicesOfCustomer,
  getPaymentListOfCustomer,
  getInvoiceById,
  GeneratePdf,
  getPaymentDetailsById,
};
