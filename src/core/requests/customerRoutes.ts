import axios, { AxiosResponse } from "axios";
import { ID, Result } from "../models/model";
import { CustomerRecord } from "../models/customerModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const Customer_Record_URL = `${API_URL}/customers/record`;

const getRecordById = async (id: ID): Promise<Result | CustomerRecord> => {
  return axios
    .get(`${Customer_Record_URL}/${id}`)
    .then((response: AxiosResponse<CustomerRecord>) => response.data)
    .then((response: CustomerRecord) => response)
    .catch((err: Result) => {
      return err;
    });
};

export { getRecordById };
