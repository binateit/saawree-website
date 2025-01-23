import { AxiosResponse } from "axios";
import axiosInstance from "../helpers/axiosInstance";
import { ISalesOrder } from "../models/saleOrderModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const SalesOrder_BYID_URL = `${API_URL}/saleorders`;

const getSalesOrderById = async (id: number): Promise<ISalesOrder> => {
  return await axiosInstance
    .get(`${SalesOrder_BYID_URL}/${id}`)
    .then((response: AxiosResponse<ISalesOrder>) => response.data)
    .then((response: ISalesOrder) => response)
    .catch((err) => {
      return err;
    });
};

export { getSalesOrderById };
