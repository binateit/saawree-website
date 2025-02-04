/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios";
import axiosInstance from "../helpers/axiosInstance";
import {
  CreateSaleOrderRequestModel,
  CustomerDetailforSOModel,
  CustomerListDropdown,
  FileResult,
  ISalesOrder,
  PolishingTypeQueryResponse,
  ProductGroupQueryResponse,
  SalesOrderQueryListResponse,
  StatusList,
} from "../models/saleOrderModel";
import { ID, PaginationFilter, Product, Result } from "../models/model";
import { CategoryQueryResponse } from "../models/productModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const ADMIN_API_URL = process.env.NEXT_PUBLIC_APP_ADMIN_API_URL;
const SalesOrder_BYID_URL = `${API_URL}/saleorders`;
const SalesOrder_FOR_CUSTOMER = `${API_URL}/saleorders/my-orders`;
const SalesOrder_FOR_AGENT = `${API_URL}/saleorders/agent-orders`;
const CHALLAN_PDF_URL = `${API_URL}/saleorders/downloadpdf`;
const TRACK_SALES_ORDER = `${API_URL}/saleorders/track-order`;
const SaleOrder_Status_LIST = `${API_URL}/status/get-sale-order-status`;
const SaleOrderPayment_Status_List = `${API_URL}/status/get-payment-status`;
const Customer_List_URL = `${API_URL}/customers/customer-by-agent-dropdown`;
const CUSTOMER_DETAILS_FORSO_URL = `${API_URL}/customers/details-for-so`;
const Category_LIST_URL = `${API_URL}/category/search`;
const PolishingType_LIST_URL = `${ADMIN_API_URL}/polishingtypes/search`;
const Product_Group_LIST_URL = `${API_URL}/productgroup/search`;
const ProductColor_URL = `${API_URL}/products/colordetails`;

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

const getSaleOrdersOfAgent = async (
  filter: PaginationFilter
): Promise<SalesOrderQueryListResponse> => {
  return await axiosInstance
    .post(`${SalesOrder_FOR_AGENT}`, filter)
    .then(
      (response: AxiosResponse<SalesOrderQueryListResponse>) => response.data
    )
    .then((response: SalesOrderQueryListResponse) => response)
    .catch((err) => {
      return err;
    });
};

const GenerateChallanPdf = async (id: number): Promise<FileResult> => {
  return await axiosInstance
    .get(`${CHALLAN_PDF_URL}/${id}`, {
      responseType: "blob",
    })
    .then(async (response: any) => {
      console.log(response);
      if (response.type == "application/json") {
        const jsonData = await response.text();
        const errorData = JSON.parse(jsonData);
        return errorData;
      } else {
        const filename = response.headers["content-disposition"]
          .split(";")
          .find((n: string) => n.includes("filename="))
          .replace("filename=", "")
          .trim();

        const result: FileResult = {
          data: response.data,
          name: filename,
        };
        return result;
      }
    })
    .catch((err) => {
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

const getCustomerList = async (): Promise<CustomerListDropdown[]> => {
  return await axiosInstance
    .get(Customer_List_URL)
    .then((response: AxiosResponse<CustomerListDropdown[]>) => response.data)
    .then((response: CustomerListDropdown[]) => response)
    .catch((err) => {
      return err;
    });
};

const getCustomerDetailsForSOById = async (
  id: ID
): Promise<CustomerDetailforSOModel> => {
  return axiosInstance
    .get(`${CUSTOMER_DETAILS_FORSO_URL}/${id}`)
    .then((response: AxiosResponse<CustomerDetailforSOModel>) => response.data)
    .then((response: CustomerDetailforSOModel) => response);
};

const getCategoryList = async (
  filter: PaginationFilter
): Promise<CategoryQueryResponse> => {
  return await axiosInstance
    .post(`${Category_LIST_URL}`, filter)
    .then((d: AxiosResponse<CategoryQueryResponse>) => {
      return d.data;
    })
    .catch((err: Result) => {
      return err;
    });
};

const getPolishingTypeList = async (
  filter: PaginationFilter
): Promise<PolishingTypeQueryResponse> => {
  return await axiosInstance
    .post(`${PolishingType_LIST_URL}`, filter)
    .then((d: AxiosResponse<PolishingTypeQueryResponse>) => {
      return d.data;
    })
    .catch((err: Result) => {
      return err;
    });
};

const getProductGroupList = async (
  filter: PaginationFilter
): Promise<ProductGroupQueryResponse> => {
  return await axiosInstance
    .post(`${Product_Group_LIST_URL}`, filter)
    .then((d: AxiosResponse<ProductGroupQueryResponse>) => {
      return d.data;
    })
    .catch((err: Result) => {
      return err;
    });
};

const getProductColor = async (
  productGroupId?: number,
  polishingTypeId?: number
): Promise<Result | Product> => {
  let url: string = `${ProductColor_URL}`;

  if (polishingTypeId !== undefined) {
    url =
      url +
      `?productGroupId=${productGroupId}` +
      `&polishingTypeId=${polishingTypeId}`;
  }
  return axiosInstance
    .get(`${url}`)
    .then((response: AxiosResponse<Product>) => response.data)
    .then((response: Product) => response)
    .catch((err: Result) => {
      return err;
    });
};
const createSalesOrder = async (
  salesOrder: CreateSaleOrderRequestModel
): Promise<Result> => {
  return await axiosInstance
    .post(SalesOrder_BYID_URL, salesOrder)
    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

const getOrderTracking = async (order: {
  orderNumber: string;
  mobileNumber: string;
}): Promise<ISalesOrder> => {
  return await axiosInstance
    .post(`${TRACK_SALES_ORDER}`, order)
    .then((response: AxiosResponse<ISalesOrder>) => response.data)
    .then((response: ISalesOrder) => response)
    .catch((err) => {
      throw err;
    });
};

export {
  getSalesOrderById,
  getSaleOrdersOfCustomer,
  GenerateChallanPdf,
  getSaleOrderStatus,
  getPaymentStatus,
  getCustomerList,
  getCustomerDetailsForSOById,
  getCategoryList,
  getPolishingTypeList,
  getProductGroupList,
  createSalesOrder,
  getProductColor,
  getSaleOrdersOfAgent,
  getOrderTracking,
};
