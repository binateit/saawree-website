import { AxiosResponse } from "axios";
import axiosInstance from "../helpers/axiosInstance";
import {
  Category,
  ColorQueryResponse,
  MakeToOrderProductsQueryResponse,
  PolishingTypeQueryResponse,
  ProductDetailsResponse,
  ProductsFilterOption,
  ReadyStockProductsQueryResponse,
} from "../models/productModel";
import {
  PaginationFilter,
  RecomendedProductsFilter,
  Result,
} from "../models/model";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const ADMIN_API_URL = process.env.NEXT_PUBLIC_APP_ADMIN_API_URL;
const CATEGORY_LIST_URL = `${API_URL}/category/ready-stock-category-list`;
const PolishingType_LIST_URL = `${ADMIN_API_URL}/polishingtypes/list`;
const Color_LIST_URL = `${ADMIN_API_URL}/colors/list`;
const READY_STOCK_PRODUCTS = `${API_URL}/products/search-ready-stock`;
const MAKE_TO_ORDER_PRODUCTS = `${API_URL}/productgroup/productgroup-list`;
const MAKE_TO_ORDER_PRODUCTS_DETAILS = `${API_URL}/products/product-detail`;
const RS_PRODUCTS_DETAILS = `${API_URL}/products/ready-stock-product-detail`;

const getCategoryList = async (): Promise<Category[]> => {
  return await axiosInstance
    .get(`${CATEGORY_LIST_URL}`)
    .then((d: AxiosResponse<Category[]>) => {
      return d.data;
    })
    .catch((err) => {
      return err;
    });
};

const getPolishingTypeList = async (): Promise<PolishingTypeQueryResponse> => {
  return await axiosInstance
    .get(`${PolishingType_LIST_URL}`)
    .then((d: AxiosResponse<PolishingTypeQueryResponse>) => {
      return d.data;
    })
    .catch((err) => {
      return err;
    });
};

const getColorList = async (): Promise<ColorQueryResponse> => {
  return await axiosInstance
    .get(`${Color_LIST_URL}`)
    .then((d: AxiosResponse<ColorQueryResponse>) => {
      return d.data;
    })
    .catch((err) => {
      return err;
    });
};

const getReadyStockProducts = async (
  filter: ProductsFilterOption
): Promise<ReadyStockProductsQueryResponse> => {
  return await axiosInstance
    .post(`${READY_STOCK_PRODUCTS}`, filter)
    .then((d: AxiosResponse<ReadyStockProductsQueryResponse>) => {
      return d.data;
    })
    .catch((err: Result) => {
      return err;
    });
};

const getMaketoOrderProducts = async (
  filter: PaginationFilter
): Promise<MakeToOrderProductsQueryResponse> => {
  return await axiosInstance
    .post(`${MAKE_TO_ORDER_PRODUCTS}`, filter)
    .then((d: AxiosResponse<MakeToOrderProductsQueryResponse>) => {
      return d.data;
    })
    .catch((err: Result) => {
      return err;
    });
};

const getRecomendedMaketoOrderProducts = async (
  filter: RecomendedProductsFilter
): Promise<MakeToOrderProductsQueryResponse> => {
  return await axiosInstance
    .post(`${MAKE_TO_ORDER_PRODUCTS}`, filter)
    .then((d: AxiosResponse<MakeToOrderProductsQueryResponse>) => {
      return d.data;
    })
    .catch((err: Result) => {
      return err;
    });
};

const getMaketoOrderProductDetails = async (
  id: number
): Promise<ProductDetailsResponse> => {
  return await axiosInstance
    .get(`${MAKE_TO_ORDER_PRODUCTS_DETAILS}/${id}`)
    .then((d: AxiosResponse<ProductDetailsResponse>) => {
      return d.data;
    })
    .catch((err) => {
      return err;
    });
};
const getRSProductDetails = async (
  id: number
): Promise<ProductDetailsResponse> => {
  return await axiosInstance
    .get(`${RS_PRODUCTS_DETAILS}/${id}`)
    .then((d: AxiosResponse<ProductDetailsResponse>) => {
      return d.data;
    })
    .catch((err) => {
      return err;
    });
};

const getReadyStockRecomendedProducts = async (
  filter: RecomendedProductsFilter
): Promise<ReadyStockProductsQueryResponse> => {
  return await axiosInstance
    .post(`${READY_STOCK_PRODUCTS}`, filter)
    .then((d: AxiosResponse<ReadyStockProductsQueryResponse>) => {
      return d.data;
    })
    .catch((err: Result) => {
      return err;
    });
};

export {
  getCategoryList,
  getPolishingTypeList,
  getColorList,
  getReadyStockProducts,
  getMaketoOrderProducts,
  getMaketoOrderProductDetails,
  getRecomendedMaketoOrderProducts,
  getRSProductDetails,
  getReadyStockRecomendedProducts,
};
