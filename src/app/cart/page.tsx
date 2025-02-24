/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { UpdateCartPayload } from "@/core/models/cartModel";
import underlineIcon from "@/assets/images/underlineIcon.png";
import emptyCart from "@/assets/images/empty-cart.png";
import {
  clearCart,
  getCartDetails,
  removeCartItem,
  updateCartItems,
} from "@/core/requests/cartRequests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useCartCount } from "@/core/context/useCartCount";
import Link from "next/link";
import ProductImage from "@/core/component/Products/ProductImage";
import Image from "next/image";
import customLoader from "@/core/component/shared/image-loader";
import usePreventNavigation from "@/core/context/usePreventNavigation";
import ConfirmationChangesModal from "@/core/component/modal/ConfirmChangesModal";
import Loading from "../loading";

const Page = () => {
  const queryClient = useQueryClient();
  const [cartItems, setCartItems] = useState<{ cartId: number; quantity: number }[]>([]);
  const [isDirty] = useState(false);

  const {
    attemptNavigation,
    isNavigating,
    confirmNavigation,
    cancelNavigation,
  } = usePreventNavigation({
    isDirty,
    onConfirmNavigation: () => {
    },
  });

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cartDetails"],
    queryFn: () => getCartDetails(false),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (cartData?.items) {
      setCartItems(
        cartData.items.map((item) => ({
          cartId: item.cartId,
          quantity: item.quantity,
        }))
      );
    }
  }, [cartData]);

  const { mutate: handleRemoveCartItem } = useMutation({
    mutationKey: ["removeItem"],
    mutationFn: (id: number) => removeCartItem(id),
    onSuccess: () => {
      toast.success("Item removed from cart successfully.");
      queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
      setCartCount((cartCount as number) - 1);
    },
  });

  const { mutate: updateCart } = useMutation({
    mutationKey: ["updateItem"],
    mutationFn: (cart: UpdateCartPayload) => updateCartItems(cart),
    onSuccess: () => {
      toast.success("Cart is updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
    },
  });

  const { mutate: handleClearCart } = useMutation({
    mutationKey: ["clearFullCart"],
    mutationFn: () => clearCart(),
    onSuccess: () => {
      toast.success("Cart cleared successfully.");
      setCartItems([]);
      setCartCount(0);
    },
  });

  if(isLoading) return <Loading />;

 


  const handleQtyUpdate = (cartId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /** Increment & Decrement Quantity */
  const updateQuantity = (cartId: number, increment: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity + (increment ? 1 : -1) }
          : item
      )
    );
  };

  /** Update Cart API Call */
  const handleCartUpdate = () => {
    const payload: UpdateCartPayload = cartItems.map(({ cartId, quantity }) => ({
      cartId,
      quantity,
    }));

    updateCart(payload);
  };


  return (
    <section className='cart-page'>
      <div className='container'>
        <div className='titlehome'>
          <h1>YOUR SHIPPING CART</h1>
        </div>
        <div className='title-septer'>
          <Image
            loader={customLoader}
            src={underlineIcon.src}
            alt=''
            width={120}
            height={20}
          />
        </div>

        {(cartItems?.length as number) > 0 ? (
          <>
            <div className='cart-wraper'>
              <div className='cart-wrapper-for-mobile d-md-none'>
                {cartItems.map((item) => (
                  <div
                    className='cart-item-mobile border mb-2'
                    key={item?.cartId}
                  >
                    <div className='d-flex border'>
                      <div
                        className='cart-product-image-mobile'
                        style={{ flex: "0 0 100px" }}
                      >
                        <ProductImage className='fit-cover' url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${cartData?.items.find(i => i.cartId === item.cartId)?.imagePath}`} />
                      </div>
                      <div className='cart-product-details-mobile p-2'>
                        <Link
                          href={
                            cartData?.items.find(i => i.cartId === item.cartId)?.orderType === 2
                              ? `/maketoorder/details?productId=${cartData?.items.find(i => i.cartId === item.cartId)?.productId}`
                              : `/readystock/details?productId=${cartData?.items.find(i => i.cartId === item.cartId)?.productId}`
                          }
                        >
                          <h6 className='mb-2'>{cartData?.items.find(i => i.cartId === item.cartId)?.productName}</h6>
                        </Link>
                        <p className='mb-0'>
                          Unit : {formatCurrency(cartData?.items.find(i => i.cartId === item.cartId)?.productPrice)}
                        </p>
                        <p className='mb-0 font-weight-bold'>
                          Total : {formatCurrency(cartData?.items.find(i => i.cartId === item.cartId)?.subTotal)}
                        </p>
                      </div>
                    </div>
                    <div className='d-flex p-2 align-items-center justify-content-between'>
                      <button
                        className='btn btn-saawree'
                        onClick={() => handleRemoveCartItem(item?.cartId)}
                      >
                        Remove
                      </button>
                      <div className='quantity'>
                        <button
                          type='button'
                          className='minus'
                          aria-label='Decrease'
                          onClick={() => updateQuantity(item.cartId, false)}
                        >
                          <BsDash />
                        </button>
                        <input
                          type='number'
                          className='input-box'
                          value={item?.quantity}
                          min="1"
                          onChange={(e) => handleQtyUpdate(item.cartId, Number(e.target.value))}
                        />
                        <button
                          className='plus'
                          aria-label='Increase'
                          onClick={() => updateQuantity(item.cartId, true)}
                        >
                          <BsPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='cart-wraper-for-desktop d-none d-md-block'>
                <table className='table table-bordered cart-btn'>
                  <thead>
                    <tr>
                      <th scope='col'>Image</th>
                      <th scope='col'>Product</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Total</th>
                      <th scope='col'>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item?.cartId}>
                        <td>
                          <div className='selected-prod-img'>
                            <ProductImage
                              url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${cartData?.items.find(i => i.cartId === item.cartId)?.imagePath}`}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='selected-product'>
                            <Link
                              href={
                                cartData?.items.find(i => i.cartId === item.cartId)?.orderType === 2
                                  ? `/maketoorder/details?productId=${cartData?.items.find(i => i.cartId === item.cartId)?.productId}`
                                  : `/readystock/details?productId=${cartData?.items.find(i => i.cartId === item.cartId)?.productId}`
                              }
                            >
                              {cartData?.items.find(i => i.cartId === item.cartId)?.productName}
                            </Link>
                          </div>
                        </td>
                        <td>{formatCurrency(cartData?.items.find(i => i.cartId === item.cartId)?.productPrice)}</td>
                        <td>
                          <div className='quantity'>
                            <button
                              type='button'
                              className='minus'
                              aria-label='Decrease'
                              onClick={() => updateQuantity(item.cartId, false)}
                            >
                              <BsDash />
                            </button>
                            <input
                              type='number'
                              className='input-box'
                              value={item?.quantity}
                              min='1'
                              onChange={(e) => handleQtyUpdate(item.cartId, Number(e.target.value))}
                            />
                            <button
                              className='plus'
                              aria-label='Increase'
                              onClick={() => updateQuantity(item.cartId, true)}
                            >
                              <BsPlus />
                            </button>
                          </div>
                        </td>
                        <td>{formatCurrency(cartData?.items.find(i => i.cartId === item.cartId)?.subTotal)}</td>
                        <td className='trash-box'>
                          <BsTrash
                            cursor={"pointer"}
                            onClick={() => handleRemoveCartItem(item?.cartId)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='cart-pg-btn'>
                    <Link href={"/"} className='btn btn-saawree'>
                      Continue Shopping
                    </Link>
                    <button
                      className='btn btn-saawree'
                      onClick={() => handleCartUpdate()}
                    >
                      Update Cart
                    </button>
                    <button
                      className='btn btn-saawree'
                      onClick={() => handleClearCart()}
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => attemptNavigation("/checkout")}
                      className='btn btn-saawree'
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </>
        ) : (
          <div className='titlehome'>
            <div className='empty-cart text-center py-5'>
              <Image
                loader={customLoader}
                src={emptyCart.src}
                width={100}
                height={100}
                className='img-fluid'
                alt='cart'
              />
              <h4 className='mt-2'>Your cart is currently empty.</h4>
              <Link href='/' className='btn btn-saawree mt-2'>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      {isNavigating && (
        <ConfirmationChangesModal
          isNavigating={isNavigating}
          cancelNavigation={cancelNavigation}
          confirmNavigation={confirmNavigation}
        />
      )}
    </section>
  );
};

export default Page;
