"use client";
import { useState } from "react";
import CheckoutPage from "./checkout/page";
import Payment from "./payment/page";
import ThankYouPage from "../thankyou/page";
const page = () => {
  const [step, setStep] = useState<number>(1);
  const [shipAddressId, setShipAddressId] = useState<number>();
  const [orderData, setOrderData] = useState<{
    saleOrderId: number;
    orderId?: any;
  }>();

  return (
    <>
      {step === 1 && (
        <CheckoutPage updateStep={setStep} setShipAddress={setShipAddressId} />
      )}
      {step === 2 && (
        <Payment
          shipAddressId={shipAddressId as number}
          updateStep={setStep}
          setOrderData={setOrderData}
        />
      )}
      {step === 3 && <ThankYouPage orderData={orderData} />}
    </>
  );
};
export default page;
