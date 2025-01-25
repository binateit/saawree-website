import axios, { AxiosResponse } from "axios";
import axiosInstance from "../helpers/axiosInstance";
import {
  FileResult,
  ISalesOrder,
  SalesOrderQueryListResponse,
  StatusList,
} from "../models/saleOrderModel";
import { PaginationFilter } from "../models/model";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const SalesOrder_BYID_URL = `${API_URL}/saleorders`;
const SalesOrder_FOR_CUSTOMER = `${API_URL}/saleorders/search-for-customer`;
const CHALLAN_PDF_URL = `${API_URL}/saleorders/downloadpdf`;
const SaleOrder_Status_LIST = `${API_URL}/status/get-sale-order-status`;
const SaleOrderPayment_Status_List = `${API_URL}/status/get-payment-status`;

const getSalesOrderById = async (id: number): Promise<ISalesOrder> => {
  return await axiosInstance
    .get(`${SalesOrder_BYID_URL}/${id}`)
    .then((response: AxiosResponse<ISalesOrder>) => response.data)
    .then((response: ISalesOrder) => response)
    .catch((err) => {
      return err;
    });
};

const getSaleOrdersOfCustomer = async (
  filter: PaginationFilter
): Promise<SalesOrderQueryListResponse> => {
  return await axiosInstance
    .post(`${SalesOrder_FOR_CUSTOMER}`, filter)
    .then(
      (response: AxiosResponse<SalesOrderQueryListResponse>) => response.data
    )
    .then((response: SalesOrderQueryListResponse) => response)
    .catch((err) => {
      return err;
    });
};

const GenerateChallanPdf = async (id: number): Promise<any | FileResult> => {
  return await axiosInstance
    .get(`${CHALLAN_PDF_URL}/${id}`, {
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

const getSaleOrderStatus = async (): Promise<StatusList[]> => {
  return await axiosInstance
    .get(SaleOrder_Status_LIST)
    .then((response: AxiosResponse<StatusList[]>) => response.data)
    .then((response: StatusList[]) => response)
    .catch((err) => {
      return err;
    });
};

const getPaymentStatus = async (): Promise<StatusList[]> => {
  return await axiosInstance
    .get(SaleOrderPayment_Status_List)
    .then((response: AxiosResponse<StatusList[]>) => response.data)
    .then((response: StatusList[]) => response)
    .catch((err) => {
      return err;
    });
};
export {
  getSalesOrderById,
  getSaleOrdersOfCustomer,
  GenerateChallanPdf,
  getSaleOrderStatus,
  getPaymentStatus,
};
