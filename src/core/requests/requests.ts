import { AxiosResponse } from "axios";
import axiosInstance from "../helpers/axiosInstance";
import { Register } from "../models/authModel";
import {
  CountryQueryResponse,
  Result,
  StateQueryResponse,
} from "../models/model";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const API_ADMIN_URL = process.env.NEXT_PUBLIC_APP_ADMIN_API_URL;

//admin api
const State_LIST_URL = `${API_ADMIN_URL}/states/state-list`;
const Country_LIST_URL = `${API_ADMIN_URL}/countries/country-list`;

const getStateList = async (countryId: number): Promise<StateQueryResponse> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .post(`${State_LIST_URL}`, { countryId }, { headers: headers })
    .then((d: AxiosResponse<StateQueryResponse>) => {
      return d.data;
    });
};

const getCountryList = async (): Promise<CountryQueryResponse> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .get(`${Country_LIST_URL}`, { headers: headers })
    .then((d: AxiosResponse<CountryQueryResponse>) => {
      return d.data;
    })
    .catch((err: Result) => {
      return err;
    });
};

export { getStateList, getCountryList };
