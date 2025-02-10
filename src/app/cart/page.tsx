/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { CartDetails, Item, UpdateCartPayload } from "@/core/models/cartModel";
import underlineIcon from "@/assets/images/underlineIcon.png";
import emptyCart from "@/assets/images/empty-cart.png";
import {
  clearCart,
  removeCartItem,
  updateCartItems,
} from "@/core/requests/cartRequests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
const Page = () => {
  // const { status: authStatus } = useSession();
  // const router = useRouter();
  const { setCartCount, cartCount, cartData } = useCartCount();
  const queryClient = useQueryClient();
  const [cartDetails, setCartDetails] = useState<CartDetails | undefined>(
    undefined
  );
  // if (authStatus === "unauthenticated") {
  //   router.push("/auth/login");
  //   toast.error("Please login to view your cart.");
  // }

  const [isDirty, setIsDirty] = useState(false);

  const {
    attemptNavigation,
    isNavigating,
    confirmNavigation,
    cancelNavigation,
    navigationType,
  } = usePreventNavigation({
    isDirty,
    onConfirmNavigation: () => {
      // Optional: Reset form or perform cleanup
      console.log("Navigation confirmed");
    },
  });

  const { mutate: handleRemoveCartItem } = useMutation({
    mutationKey: ["removeItem"],
    mutationFn: (id: number) => removeCartItem(id),
    onSuccess: () => {
      toast.success("Item removed from cart successfully.");
      queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
      setCartCount((cartCount as number) - 1);
    },
  });
  console.log("navigationType ", navigationType);
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
      setCartDetails(undefined);
      setCartCount(0);
    },
  });

  useEffect(() => {
    if (cartData) {
      setCartDetails(cartData);
    }
  }, [cartData]);

  const handleCartItemsUpdate = async () => {
    const result: { cartId: number; quantity: number }[] = [];
    cartDetails?.items?.map((item) => {
      result.push({
        cartId: item.cartId,
        quantity: item.quantity,
      });
    });
    updateCart(result);
  };

  const handleQtyUpdate = async (item: Item, newQuantity: number) => {
    if (isNaN(newQuantity) || newQuantity < 1) {
      toast.error("Quantity must be a number greater than or equal to 1.");
      return;
    }

    try {
      const updatedCart = cartDetails?.items?.map((cartItem) => {
        if (cartItem.cartId === item?.cartId) {
          return {
            ...cartItem,
            quantity: newQuantity,
            subTotal: cartItem.productPrice * newQuantity,
          };
        }
        return cartItem;
      });
      setCartDetails((prevCartDetails: any) => ({
        ...prevCartDetails,
        items: updatedCart,
        orderTotal: updatedCart?.reduce((acc, item) => acc + item.subTotal, 0),
        orderTotalTaxInclusive: updatedCart?.reduce(
          (acc, item) => acc + item.subTotal,
          0
        ),
        totalTaxAmount: updatedCart?.reduce(
          (acc, item) => acc + item.taxAmount,
          0
        ),
      }));
    } catch (error) {
      toast.error("Error updating product quantity. Please try again.");
      console.log(error);
    }
  };
  const decreaseQuantity = async (item: Item) => {
    if ((item.quantity ?? 1) > 1) {
      const updatedCartDetails = cartDetails?.items?.map((cartItem) =>
        cartItem.cartId === item.cartId
          ? {
              ...cartItem,
              quantity: (cartItem?.quantity ?? 0) - 1,
              subTotal:
                (cartItem.productPrice ?? 0) * ((cartItem.quantity ?? 0) - 1),
              discountAmount:
                ((cartItem?.subTotal ?? 0) * (cartItem?.discountPercent ?? 0)) /
                100,
              taxAmount:
                ((cartItem?.subTotal ?? 0) * (cartItem?.taxPercent ?? 0)) / 100,
            }
          : cartItem
      );
      setCartDetails((prevCartDetails: any) => ({
        ...prevCartDetails,
        items: updatedCartDetails,
        orderTotal: updatedCartDetails?.reduce(
          (acc, item) => acc + item?.subTotal,
          0
        ),
        orderTotalTaxInclusive: updatedCartDetails?.reduce(
          (acc, item) => acc + item?.totalInclusiveTax,
          0
        ),
        totalTaxAmount: updatedCartDetails?.reduce(
          (acc, item) => acc + item.taxAmount,
          0
        ),
      }));
    }
    setIsDirty(true);
  };

  const increaseQuantity = async (item: Item) => {
    const updatedCartDetails = cartDetails?.items?.map((cartItem) =>
      cartItem.cartId === item.cartId
        ? {
            ...cartItem,
            quantity: (cartItem.quantity ?? 0) + 1,
            subTotal:
              (cartItem.productPrice ?? 0) * ((cartItem?.quantity ?? 0) + 1),
            discountAmount:
              ((cartItem?.subTotal ?? 0) * (cartItem?.discountPercent ?? 0)) /
              100,
            taxAmount:
              ((cartItem?.subTotal ?? 0) * (cartItem?.taxPercent ?? 0)) / 100,
          }
        : cartItem
    );
    setCartDetails((prevCartDetails: any) => ({
      ...prevCartDetails,
      items: updatedCartDetails,
      orderSubTotal: updatedCartDetails?.reduce(
        (acc, item) => acc + item.subTotal,
        0
      ),
      orderTotal: updatedCartDetails?.reduce(
        (acc, item) => acc + item?.subTotal - item?.discountAmount,
        0
      ),
      orderTotalTaxInclusive: updatedCartDetails?.reduce(
        (acc, item) => acc + item?.totalInclusiveTax,
        0
      ),
      totalTaxAmount: updatedCartDetails?.reduce(
        (acc, item) => acc + item?.taxAmount,
        0
      ),
    }));
    setIsDirty(true);
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

        {(cartDetails?.items?.length as number) > 0 ? (
          <>
            <div className='cart-wraper'>
              <div className='cart-wrapper-for-mobile d-md-none'>
                {cartDetails?.items?.map((item) => (
                  <div
                    className='cart-item-mobile border mb-2'
                    key={item?.cartId}
                  >
                    <div className='d-flex border'>
                      <div
                        className='cart-product-image-mobile'
                        style={{ flex: "0 0 100px" }}
                      >
                        <ProductImage
                          url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.imagePath}`}
                          className='fit-cover'
                        />
                      </div>
                      <div className='cart-product-details-mobile p-2'>
                        <Link
                          href={
                            item?.orderType === 2
                              ? `/maketoorder/details?productId=${item?.productId}`
                              : `/readystock/details?productId=${item?.productId}`
                          }
                        >
                          <h6 className='mb-2'>{item?.productName}</h6>
                        </Link>
                        <p className='mb-0'>
                          Unit : {formatCurrency(item?.productPrice)}
                        </p>
                        <p className='mb-0 font-weight-bold'>
                          Total : {formatCurrency(item?.subTotal)}
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
                          onClick={() => decreaseQuantity(item)}
                        >
                          <BsDash />
                        </button>
                        <input
                          type='number'
                          className='input-box'
                          value={item?.quantity}
                          min='1'
                          max='10'
                          onChange={(e) => {
                            const data = parseInt(e.target.value);
                            if (data < 10000) {
                              const value =
                                e.target.value === undefined
                                  ? 0
                                  : parseInt(e.target.value);
                              handleQtyUpdate(item, value);
                            }
                          }}
                        />
                        <button
                          className='plus'
                          aria-label='Increase'
                          onClick={() => {
                            increaseQuantity(item);
                          }}
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
                    {cartDetails?.items?.map((item) => (
                      <tr key={item?.cartId}>
                        <td>
                          <div className='selected-prod-img'>
                            <ProductImage
                              url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.imagePath}`}
                            />
                          </div>
                        </td>
                        <td>
                          <div className='selected-product'>
                            <Link
                              href={
                                item?.orderType === 2
                                  ? `/maketoorder/details?productId=${item?.productId}`
                                  : `/readystock/details?productId=${item?.productId}`
                              }
                            >
                              {item?.productName}
                            </Link>
                          </div>
                        </td>
                        <td>{formatCurrency(item?.productPrice)}</td>
                        <td>
                          <div className='quantity'>
                            <button
                              type='button'
                              className='minus'
                              aria-label='Decrease'
                              onClick={() => decreaseQuantity(item)}
                            >
                              <BsDash />
                            </button>
                            <input
                              type='number'
                              className='input-box'
                              value={item?.quantity}
                              min='1'
                              max='10'
                              onChange={(e) => {
                                const data = parseInt(e.target.value);
                                if (data < 10000) {
                                  const value =
                                    e.target.value === undefined
                                      ? 0
                                      : parseInt(e.target.value);
                                  handleQtyUpdate(item, value);
                                }
                              }}
                            />
                            <button
                              className='plus'
                              aria-label='Increase'
                              onClick={() => {
                                increaseQuantity(item);
                              }}
                            >
                              <BsPlus />
                            </button>
                          </div>
                        </td>
                        <td>{formatCurrency(item?.subTotal)}</td>
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
                      onClick={() => handleCartItemsUpdate()}
                    >
                      Update Cart
                    </button>
                    <button
                      className='btn btn-saawree'
                      onClick={() => handleClearCart()}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className='row justify-content-end mt-4'>
                <div className='col-md-6'>
                  <div className='cart-total'>
                    <h4>Cart Totals</h4>
                    <table className='table table-bordered cart-btn2'>
                      <tbody>
                        <tr className='cart-subtotal'>
                          <th>Subtotal</th>
                          <td>
                            <span className='amount'>
                              <span id='bk-cart-subtotal-price'>
                                <span className='money'>
                                  {formatCurrency(cartDetails?.orderSubTotal)}
                                </span>
                              </span>
                            </span>
                          </td>
                        </tr>
                        <tr className='cart-subtotal'>
                          <th>Discount</th>
                          <td>
                            <span className='amount'>
                              <span id='bk-cart-subtotal-price'>
                                <span className='money'>
                                  {cartDetails?.totalDiscountedPrice || 0 > 0
                                    ? ` - ${formatCurrency(
                                        cartDetails?.totalDiscountedPrice
                                      )}`
                                    : formatCurrency(
                                        cartDetails?.totalDiscountedPrice
                                      )}
                                </span>
                              </span>
                            </span>
                          </td>
                        </tr>
                        <tr className='cart-subtotal'>
                          <th>Tax</th>
                          <td>
                            <span className='amount'>
                              <span id='bk-cart-subtotal-price'>
                                <span className='money'>
                                  {formatCurrency(cartDetails?.totalTaxAmount)}
                                </span>
                              </span>
                            </span>
                          </td>
                        </tr>

                        <tr className='order-total'>
                          <th>Grand Total</th>
                          <td>
                            <strong>
                              <span className='amount'>
                                <span id='bk-cart-subtotal-price'>
                                  <span className='money'>
                                    {formatCurrency(
                                      cartDetails?.orderTotalTaxInclusive
                                    )}
                                  </span>
                                </span>
                              </span>
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='proceed-to-checkout'>
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
