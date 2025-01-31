"use client";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCartDetails } from "../requests/cartRequests";
import { CartDetails } from "../models/cartModel";
import { useSession } from "next-auth/react";
import { Session } from "../models/model";

interface CartCountContextType {
  cartCount: number | null;
  setCartCount: (data: number | null) => void;
  isBuyNow: boolean;
  setIsBuyNow: (isBuy: boolean) => void;
  cartData: CartDetails | undefined;
}

const CartCountContext = createContext<CartCountContextType | undefined>(
  undefined
);
interface CartCountProviderProps {
  children: React.ReactNode;
}

export const CartCountProvider: React.FC<CartCountProviderProps> = ({
  children,
}) => {
  const { data: session, status: authStatus } = useSession();

  const userSession = session as Session;

  const [cartCount, setCount] = useState<number | null>(null);
  const [isBuyNow, setIsBuy] = useState<boolean>(false);

  const { data: cartData } = useQuery({
    queryKey: ["cartDetails", isBuyNow],
    queryFn: () => getCartDetails(isBuyNow),
    enabled:
      authStatus === "authenticated" &&
      userSession?.user?.userType === "customer",
  });

  useEffect(() => {
    if (cartData) {
      setCount(cartData?.items?.length as number);
    } else {
      setCount(0);
    }
  }, [cartData]);
  const setCartCount = (data: number | null) => {
    setCount(data);
  };

  const setIsBuyNow = (buynow: boolean) => {
    setIsBuy(buynow);
  };
  const contextValue: CartCountContextType = {
    cartCount,
    setCartCount,
    isBuyNow,
    setIsBuyNow,
    cartData,
  };

  return (
    <CartCountContext.Provider value={contextValue}>
      {children}
    </CartCountContext.Provider>
  );
};

export const useCartCount = (): CartCountContextType => {
  const context = useContext(CartCountContext);
  if (!context) {
    throw new Error("useCount must be used within an CartCountProvider");
  }
  return context;
};
