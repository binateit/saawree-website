import { AxiosResponse } from "axios";
import axiosInstance from "../helpers/axiosInstance";
import { HomePageResponse, MenuCategoriesResponse } from "../models/homeModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;

const STORE_WEB_HOME = `${API_URL}/web/homepage`;
const STORE_WEB_MENU_CAT = `${API_URL}/web/menu-categories`;

const getHomePage = async (): Promise<HomePageResponse> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .get<HomePageResponse>(STORE_WEB_HOME, { headers: headers })
    .then((response: AxiosResponse<HomePageResponse>) => response.data)
    .catch((err) => {
      return err;
    });
};

const getMenuCategories = async (): Promise<MenuCategoriesResponse> => {
  const headers = {
    tenant: "ho",
  };
  return await axiosInstance
    .get<MenuCategoriesResponse>(STORE_WEB_MENU_CAT, { headers: headers })
    .then((response: AxiosResponse<MenuCategoriesResponse>) => response.data)
    .catch((err) => {
      return err;
    });
};

export { getHomePage, getMenuCategories };
