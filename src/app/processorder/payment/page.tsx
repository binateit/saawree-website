import { useCartCount } from "@/core/context/useCartCount";
import { PlaceOrderPayload } from "@/core/models/cartModel";
import { ResultStatus } from "@/core/models/model";
import { Result } from "@/core/models/model";
import { createRazorPay, placeOrderMTO } from "@/core/requests/cartRequests";
import { getCutsomerAddressById } from "@/core/requests/customerRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { RazorpayOrderOptions, useRazorpay } from "react-razorpay";

interface Props {
  shipAddressId: number;
  updateStep: (step: number) => void;
  setOrderData: (orderData: any) => void;
}

const Payment: FC<Props> = ({ shipAddressId, updateStep, setOrderData }) => {
  const { Razorpay } = useRazorpay();
  const { data: session } = useSession();
  const navigate = useRouter();
  const { setCartCount, cartData } = useCartCount();
  const [isRazorPaySelected, setIsRazorPaySelected] = useState(true);
  const [paymentMode, setPaymentMode] = useState<Number>();
  useEffect(() => {
    if (isRazorPaySelected) {
      setPaymentMode(1);
    } else {
      setPaymentMode(2);
    }
  }, [isRazorPaySelected]);
  const { data: selectedAddress } = useQuery({
    queryKey: ["selectedAddress"],
    queryFn: () => getCutsomerAddressById(shipAddressId),
  });

  const handlePayment = async (response: any) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      response;
    const razorpayData = {
      razorPayPaymentId: razorpay_payment_id,
      razorPayOrderId: razorpay_order_id,
      razorPaySignature: razorpay_signature,
    };

    let result: Result;
    result = await createRazorPay(razorpayData);
    console.log("result", result);
    if (result.succeeded) {
      setOrderData(result.data);
      setCartCount(0);
      updateStep(3);
    }
  };

  const handleRazorPayment = (orderid: string) => {
    const options: RazorpayOrderOptions = {
      description: "Payment towrads Order",
      currency: "INR",
      key: "rzp_live_KQQun3Vu4PO6ht",
      name: "Saawree",
      order_id: orderid,
      handler: handlePayment,
      prefill: {
        email: session?.user?.emailAddress,
        // contact: session?.user?.m,
        name: session?.user?.firstName + " " + session?.user?.lastName,
      },
      theme: { color: "blue" },
      amount: cartData?.orderTotalTaxInclusive as number,
      modal: {
        escape: false,
        ondismiss: function () {
          setCartCount(0);
        },
      },
    };
    setCartCount(0);
    const rzpay = new Razorpay(options);
    rzpay.open();

    rzpay.on("payment.failed", (response: any) => {
      setCartCount(0);
    });
  };

  const { mutate: placeOrder } = useMutation({
    mutationKey: ["placeMakeToOrder"],
    mutationFn: (result: PlaceOrderPayload) => placeOrderMTO(result),
    onSuccess: (data: Result) => {
      if (data.succeeded) {
        if (isRazorPaySelected) {
          handleRazorPayment(data?.data?.orderId as string);
        } else {
          setOrderData(data.data);
          setCartCount(0);
          updateStep(3);
        }
      }
    },
  });

  const handleConfirmOrder = () => {
    const orderData: PlaceOrderPayload = {
      isFromBuyNow: false,
      shipAddressId: shipAddressId,
      paymentModeId: paymentMode as number,
    };
    placeOrder(orderData);
  };

  return (
    <div className='address-box'>
      <h3>Selected address</h3>
      <div className='all-address1'>
        <p className='select-add'>
          {selectedAddress?.displayAddress}{" "}
          <div className='add-link' onClick={() => updateStep(1)}>
            Change Address
          </div>{" "}
        </p>
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
            src='/images/razorpay.jpg'
            alt='razorpay'
            width={100}
            height={50}
          />
        </label>
        {session?.user?.enableCredit && (
          <>
            <label>
              <input
                type='radio'
                value={2}
                checked={!isRazorPaySelected}
                onChange={() => setIsRazorPaySelected(false)}
              />
              <Image
                src='/images/paylater_icon.jpg'
                alt='paylater'
                width={100}
                height={50}
              />
            </label>
          </>
        )}
      </div>

      <button className='btn btn-saawree mt-4' onClick={handleConfirmOrder}>
        Confirm Order
      </button>
    </div>
  );
};

export default Payment;
