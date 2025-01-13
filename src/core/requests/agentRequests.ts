import axios, { AxiosResponse } from "axios";
import { ID, Result } from "../models/model";
import axiosInstance from "../helpers/axiosInstance";
import { AgentRecord } from "../models/agentModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const Agent_Record_URL = `${API_URL}/agent/record`;

const getRecordById = async (id: ID): Promise<Result | AgentRecord> => {
  return axiosInstance
    .get(`${Agent_Record_URL}/${id}`)
    .then((response: AxiosResponse<AgentRecord>) => response.data)
    .then((response: AgentRecord) => response)
    .catch((err: Result) => {
      return err;
    });
};

export { getRecordById };
