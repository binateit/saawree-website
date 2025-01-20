import { Result } from "../models/model";

import { AxiosResponse } from "axios";

import axiosInstance from "../helpers/axiosInstance";
import { AddCart, CartDetails } from "../models/cartModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const Cart_ADD_URL = `${API_URL}/cart`;
const Cart_DETAILS_URL = `${API_URL}/cart/getcartlist`;

const createCart = async (cart: AddCart): Promise<Result> => {
  return await axiosInstance
    .post(Cart_ADD_URL, {
      orderType: cart.orderType,
      items: cart.items,
      isFromBuyNow: cart.isFromBuyNow,
    })

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

const getCartDetails = async (): Promise<CartDetails> => {
  return await axiosInstance
    .post(Cart_DETAILS_URL, {
      isFromBuyNow: false,
    })

    .then((response: AxiosResponse<CartDetails>) => response.data)
    .catch((err) => {
      return err;
    });
};

export { createCart, getCartDetails };
