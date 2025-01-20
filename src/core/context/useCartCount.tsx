"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartCountContextType {
  cartCount: number | null;
  setCartCount: (data: number | null) => void;
  isBuyNow: boolean;
  setIsBuyNow: (isBuy: boolean) => void;
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
  const [cartCount, setCount] = useState<number | null>(0);
  const [isBuyNow, setIsBuy] = useState<boolean>(false);

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
