import { Result } from "../models/model";

import { AxiosResponse } from "axios";

import axiosInstance from "../helpers/axiosInstance";
import { AddCart, CartDetails, UpdateCartPayload } from "../models/cartModel";

const API_URL = process.env.NEXT_PUBLIC_APP_STORE_API_URL;
const Cart_ADD_URL = `${API_URL}/cart`;
const Cart_DETAILS_URL = `${API_URL}/cart/getcartlist`;
const Cart_CLEAR_CART_URL = `${API_URL}/cart/clearcart`;
const Cart_REMOVE_ITEM_URL = `${API_URL}/cart/removecartitem`;
const Cart_UPDATE_CART_ITEMS_URL = `${API_URL}/cart/update-cart`;

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

const updateCartItems = async (cart: UpdateCartPayload): Promise<Result> => {
  return await axiosInstance
    .post(Cart_UPDATE_CART_ITEMS_URL, { itemList: cart })

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

const clearCart = async (): Promise<Result> => {
  return await axiosInstance
    .delete(Cart_CLEAR_CART_URL)

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

const removeCartItem = async (id: number): Promise<Result> => {
  return await axiosInstance
    .delete(`${Cart_REMOVE_ITEM_URL}/${id}`)

    .then((response: AxiosResponse<Result>) => response.data)
    .then((response: Result) => response)
    .catch((err: Result) => {
      return err;
    });
};

export {
  createCart,
  getCartDetails,
  updateCartItems,
  clearCart,
  removeCartItem,
};
