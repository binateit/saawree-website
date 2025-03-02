"use client";
import AddressModal from "@/core/component/modal/AddressModal";
import { useCartCount } from "@/core/context/useCartCount";
import { PlaceOrderPayload } from "@/core/models/cartModel";
import { CustomerAddress } from "@/core/models/customerModel";
import { Result } from "@/core/models/model";
import {
  createRazorPay,
  placeOrderMTO,
  placeOrderRS,
} from "@/core/requests/cartRequests";
import {
  getCustomerAddress,
  getCutsomerAddressById,
} from "@/core/requests/customerRoutes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";
import { toast } from "react-toastify";
import paylater_icon from "@/assets/images/paylater_icon.jpg";
import razorpay from "@/assets/images/razorpay.jpg";
import { Session } from "next-auth";
import customLoader from "@/core/component/shared/image-loader";
import Link from "next/link";
import emptyCart from "@/assets/images/empty-cart.png";

const CheckoutPage = () => {
  const { data: session } = useSession();
  const userSession = session as Session;
  const { Razorpay } = useRazorpay();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<CustomerAddress>();
  const [shipAddressId, setShipAddressId] = useState<number | null>(null);
  const { setCartCount, cartData, isBuyNow } = useCartCount();
  const [isRazorPaySelected, setIsRazorPaySelected] = useState(true);
  const [paymentMode, setPaymentMode] = useState<number>();

  const router = useRouter();
  // if (authStatus === "unauthenticated") {
  //   router.push("/auth/login");
  // }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const onCustomerAddressChange = (e: number) => {
    getCutsomerAddressById(e).then((v) => {
      const result = v;
      if (result) {
        setEditAddress(result as CustomerAddress);
        setIsEditMode(true);
        openModal();
      } else {
        console.error("Invalid address data:", result);
      }
    });
    setIsEditMode(true);
    openModal();
  };

  const { data: customerAddressList } = useQuery({
    queryKey: ["customerAddressList"],
    queryFn: () => getCustomerAddress(),
    refetchOnWindowFocus: false,
  });

  const addNewCustomerAdress = () => {
    setEditAddress({
      address: {
        addressLine1: "",
        addressLine2: "",
        countryId: undefined,
        stateId: undefined,
        city: "",
        zipCode: "",
        phoneNumber: "",
      },
    });
    setIsEditMode(false);
    setModalOpen(true);
  };

  useEffect(() => {
    if (customerAddressList && customerAddressList.length > 0) {
      const defaultAddress = customerAddressList.filter(
        (address) => address?.addressTypeId === 2
      );
      setShipAddressId(defaultAddress[0]?.customerAddressId as number);
    }
  }, [customerAddressList]);

  useEffect(() => {
    if (isRazorPaySelected) {
      setPaymentMode(1);
    } else {
      setPaymentMode(2);
    }
  }, [isRazorPaySelected]);

  const handlePayment = async (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => {
    console.log(response);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      response;
    const razorpayData = {
      razorPayPaymentId: razorpay_payment_id,
      razorPayOrderId: razorpay_order_id,
      razorPaySignature: razorpay_signature,
    };

    const result = await createRazorPay(razorpayData);
    if (result.succeeded) {
      const orderData = result.data;
      router.push(`/thankyou?orderNumber=${orderData}`);
      setCartCount(0);
    }
  };

  const handleRazorPayment = (orderData: {
    razorpayOrderId: string;
    orderNumber: string;
  }) => {
    const options: RazorpayOrderOptions = {
      description: "Payment towrads Order",
      currency: "INR",
      key: process.env.NEXT_PUBLIC_APP_RAZORPAY_API_KEY as string,
      name: "Saawree",
      order_id: orderData?.razorpayOrderId,
      handler: handlePayment,
      prefill: {
        email: userSession?.user?.emailAddress,
        name: userSession?.user?.firstName + " " + userSession?.user?.lastName,
        contact: userSession?.user?.mobileNumber,
      },
      theme: { color: "blue" },
      amount: (cartData?.orderTotalTaxInclusive || 0) * 100,
      modal: {
        escape: false,
        ondismiss: function () {
          // setCartCount(0);
          router.push(`/payment-failed?orderNumber=${orderData?.orderNumber}`);
          queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
        },
      },
    };
    setCartCount(0);
    const rzpay = new Razorpay(options);
    rzpay.open();

    rzpay.on("payment.failed", () => {
      setCartCount(0);
      router.push(`/payment-failed?orderNumber=${orderData?.orderNumber}`);
      queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
    });
  };
  const queryClient = useQueryClient();

  const { mutate: placeOrder, isPending: pendingMTO } = useMutation({
    mutationKey: ["placeMakeToOrder"],
    mutationFn: (result: PlaceOrderPayload) => placeOrderMTO(result),
    onSuccess: (data: Result) => {
      if (data.succeeded) {
        if (isRazorPaySelected) {
          console.log(data?.data);
          handleRazorPayment(data?.data);
        } else {
          const orderData = data.data;
          router.push(`/thankyou?orderNumber=${orderData?.orderNumber}`);
          setCartCount(0);
          queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
        }
      } else {
        toast.error(data.messages[0]);
      }
    },
  });

  const { mutate: placeOrderReadyStock, isPending: pendingRS } = useMutation({
    mutationKey: ["placeReadyStockOrder"],
    mutationFn: (result: PlaceOrderPayload) => placeOrderRS(result),
    onSuccess: (data: Result) => {
      if (data.succeeded) {
        if (isRazorPaySelected) {
          handleRazorPayment(data?.data);
        } else {
          const orderData = data.data;
          router.push(`/thankyou?orderNumber=${orderData?.orderNumber}`);
          setCartCount(0);
          queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
        }
      } else {
        toast.error(data.messages[0]);
      }
    },
  });

  const handleConfirmOrder = () => {
    const orderData: PlaceOrderPayload = {
      isFromBuyNow: isBuyNow,
      shippingAddressId: shipAddressId as number,
      paymentModeId: paymentMode as number,
    };
    return cartData?.items[0]?.orderType === 1
      ? placeOrderReadyStock(orderData)
      : placeOrder(orderData);
  };
  return pendingMTO || pendingRS ? (
    <>
      <p>Processing...</p>
    </>
  ) : (
    <>
      {(cartData?.items?.length as number) > 0 ? (
        <div className='address-box'>
          <h3>Select a delivery address</h3>
          <div className='all-address'>
            {customerAddressList
              ?.filter((address) => address?.addressTypeId === 2)
              .map((address) => (
                <div className='address-list-item' key={address?.addressId}>
                  <input
                    type='radio'
                    className='address-radio'
                    id='add1'
                    name='address'
                    checked={shipAddressId === address?.customerAddressId}
                    onChange={() => {
                      setShipAddressId(address?.customerAddressId as number);
                    }}
                  />
                  <label className='address-label' htmlFor='add1'>
                    <p className='select-add'>
                      {address?.displayAddress}{" "}
                      <span
                        onClick={() => {
                          onCustomerAddressChange(
                            address.customerAddressId as number
                          );
                        }}
                        className='add-link'
                      >
                        Edit Address
                      </span>
                    </p>
                  </label>
                </div>
              ))}
            <div className='add-new-address' onClick={addNewCustomerAdress}>
              <span data-toggle='modal' data-target='#add-address'>
                <i className='bi bi-plus'></i> Add new address
              </span>
            </div>
          </div>
          <h3 className='mt-4'>Select payment option</h3>
          <div className='payment-options'>
            <label>
              <input
                type='radio'
                value={1}
                checked={isRazorPaySelected}
                onChange={() => {
                  setIsRazorPaySelected(true);
                }}
              />
              <Image
                loader={customLoader}
                src={razorpay?.src}
                alt='razorpay'
                className='img-fluid'
                width={100}
                height={50}
              />
            </label>
            {/* {session?.user?.enableCredit && (
          <> */}
            {userSession?.user?.isPayLaterEnabled && (
              <label>
                <input
                  type='radio'
                  value={2}
                  checked={!isRazorPaySelected}
                  onChange={() => setIsRazorPaySelected(false)}
                />
                <Image
                  loader={customLoader}
                  src={paylater_icon?.src}
                  alt='paylater'
                  width={100}
                  height={50}
                />
              </label>
            )}
            {/* </>
        )} */}
          </div>

          <button className='btn btn-saawree mt-4' onClick={handleConfirmOrder}>
            Confirm Order
          </button>
          <AddressModal
            isModalOpen={isModalOpen}
            initialValues={editAddress as CustomerAddress}
            isEditMode={isEditMode}
            closeModal={closeModal}
          />
        </div>
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
    </>
  );
};
export default CheckoutPage;
