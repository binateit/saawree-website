import { AxiosResponse } from "axios";
import { PaginationFilter, Result } from "../models/model";
import axiosInstance from "../helpers/axiosInstance";
import {
  AgentCommissionQueryResponse,
  AgentPaymentQueryResponse,
  AgentPayoutDetails,
  AgentPayoutQueryResponse,
  AgentProfile,
  AgentRecord,
  ChangePassword,
  CustomersOfAgentQueryListResponse,
  EditAgentProfile,
  InvoicesQueryListResponse,
} from "../models/agentModel";
import { CustomerDetails } from "../models/customerModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const Agent_Record_URL = `${API_URL}/agent/overview`;
const CHANGE_PASSWORD_URL = `${API_URL}/agent/change-password`;
const GET_AGENT_BY_ACCESSTOKEN_URL = `${API_URL}/agent/profile`;
const GET_CUSTOMERS_BY_AGENT = `${API_URL}/customers/searchbyagent`;
const GET_CUSTOMERS_BY_AGENT_DETAILS = `${API_URL}/customers`;
const GET_AGENT_PAYOUT_DETAILS = `${API_URL}/agentpayout`;
const Invoice_URL = `${API_URL}/invoices/agent-invoices`;
const Payment_Records_URL = `${API_URL}/paymentreceived/agent-customer-payment`;
const Payout_Records_URL = `${API_URL}/agentpayout/my-payouts`;
const Commission_Records_URL = `${API_URL}/agentcommission/my-commission`;

const getRecordById = async (): Promise<AgentRecord> => {
  return axiosInstance
    .get(`${Agent_Record_URL}`)
    .then((response: AxiosResponse<AgentRecord>) => response.data)
    .then((response: AgentRecord) => response)
    .catch((err) => {
      return err;
    });
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

const getAgentByToken = async (): Promise<AgentProfile> => {
  return await axiosInstance
    .get(GET_AGENT_BY_ACCESSTOKEN_URL)
    .then((response: AxiosResponse<AgentProfile>) => response?.data)
    .catch((err) => {
      return err;
    });
};

const updateAgentProfile = async (
  payload: EditAgentProfile
): Promise<Result> => {
  return await axiosInstance
    .post(`${GET_AGENT_BY_ACCESSTOKEN_URL}`, payload)
    .then((response: AxiosResponse<Result>) => response.data)
    .catch((err: Result) => {
      return err;
    });
};

const getCustomerOfAgent = async (
  filter: PaginationFilter
): Promise<CustomersOfAgentQueryListResponse> => {
  return await axiosInstance
    .post(`${GET_CUSTOMERS_BY_AGENT}`, filter)
    .then(
      (response: AxiosResponse<CustomersOfAgentQueryListResponse>) =>
        response.data
    )
    .then((response: CustomersOfAgentQueryListResponse) => response)
    .catch((err) => {
      return err;
    });
};

const getCustomerofAgentDetails = async (
  id: number
): Promise<CustomerDetails> => {
  return await axiosInstance
    .get(`${GET_CUSTOMERS_BY_AGENT_DETAILS}/${id}`)
    .then((response: AxiosResponse<CustomerDetails>) => {
      return response?.data;
    })
    .catch((err) => {
      return err;
    });
};

const getInvoicesOfAgent = async (
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

const getPaymentListOfAgent = async (
  filter: PaginationFilter
): Promise<AgentPaymentQueryResponse> => {
  return await axiosInstance
    .post(`${Payment_Records_URL}`, filter)
    .then((response: AxiosResponse<AgentPaymentQueryResponse>) => response.data)
    .then((response: AgentPaymentQueryResponse) => response)
    .catch((err) => {
      return err;
    });
};

const getCommissionListOfAgent = async (
  filter: PaginationFilter
): Promise<AgentCommissionQueryResponse> => {
  return await axiosInstance
    .post(`${Commission_Records_URL}`, filter)
    .then(
      (response: AxiosResponse<AgentCommissionQueryResponse>) => response.data
    )
    .then((response: AgentCommissionQueryResponse) => response)
    .catch((err) => {
      return err;
    });
};

const getPayoutListOfAgent = async (
  filter: PaginationFilter
): Promise<AgentPayoutQueryResponse> => {
  return await axiosInstance
    .post(`${Payout_Records_URL}`, filter)
    .then((response: AxiosResponse<AgentPayoutQueryResponse>) => response.data)
    .then((response: AgentPayoutQueryResponse) => response)
    .catch((err) => {
      return err;
    });
};

const getAgentPayoutDetails = async (
  id: number
): Promise<AgentPayoutDetails> => {
  return await axiosInstance
    .get(`${GET_AGENT_PAYOUT_DETAILS}/${id}`)
    .then((response: AxiosResponse<AgentPayoutDetails>) => {
      return response?.data;
    })
    .catch((err) => {
      return err;
    });
};
export {
  getRecordById,
  changePassword,
  getAgentByToken,
  updateAgentProfile,
  getCustomerOfAgent,
  getCustomerofAgentDetails,
  getInvoicesOfAgent,
  getPaymentListOfAgent,
  getPayoutListOfAgent,
  getCommissionListOfAgent,
  getAgentPayoutDetails,
};
