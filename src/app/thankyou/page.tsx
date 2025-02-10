"use client";
import { getSalesOrderByNumber } from "@/core/requests/saleOrderRequests";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { BsShieldFillCheck } from "react-icons/bs";
import { formatDate } from "date-fns";
import Loading from "../loading";

const ThankYouPage = () => {
  const navigate = useRouter();
  const { status: authStatus } = useSession();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["orderDetails", orderNumber],

    queryFn: () => getSalesOrderByNumber(orderNumber as string),
    enabled: !!orderNumber,
  });

  if (authStatus === "unauthenticated") {
    navigate.push("/auth/login");
    toast.error("Please login to view your cart.");
  }

  const handleOrderTracking = () => {
    const trackingData = {
      orderNumber: orderDetails?.orderNumber,
      mobileNumber: orderDetails?.mobileNumber,
    };

    const encodedUserData = encodeURIComponent(JSON.stringify(trackingData));
    // navigate.push(`/track-order?trackorder=${encodedUserData}`);

    console.log(encodedUserData);
  };

  if (isLoading) return <Loading />;
  return (
    <section className='thankyou-page'>
      <div className='container'>
        <div className='inner-wrap-th'>
          <BsShieldFillCheck fontSize={60} className='text-success' />
          <h2 className='thank-title text-success mt-3'>Thank you</h2>
          <p className='ord-txt'>
            We are getting started on your order{" "}
            <span>{orderDetails?.orderNumber}</span> right away. and youm will
            recive an order confirmation email shortly to
            {orderDetails?.email}.{" "}
          </p>
          <p className='btn-th'>
            <button
              className='btn btn-saawree mr-2'
              onClick={() => handleOrderTracking()}
            >
              Track your order
            </button>
            <Link href='/' className='btn btn-saawree'>
              Continue Shoping
            </Link>
          </p>
        </div>
        <h3 className='text-center od'>
          Order Details: {orderDetails?.orderNumber}
        </h3>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='order-details-box bg-light'>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='ord-details'>
                    <h5 className='th-ttl'>Email</h5>
                    <p className='th-dt'>{orderDetails?.email}</p>
                  </div>

                  <div className='ord-details'>
                    <h5 className='th-ttl'>Payment Status</h5>
                    <p className='th-dt'>{orderDetails?.paymentStatusName}</p>
                  </div>

                  <div className='ord-details'>
                    <h5 className='th-ttl'>Order Date</h5>
                    <p className='th-dt'>
                      {" "}
                      {formatDate(
                        orderDetails?.orderDate as unknown as string,
                        "MMMM dd, yyyy"
                      )}
                    </p>
                  </div>
                </div>

                <div className='col-md-6'>
                  <div className='ord-details'>
                    <h5 className='th-ttl'>Delivery Address</h5>
                    <div className='billing-address'>
                      <p className='con-pe-n'>
                        <strong>{orderDetails?.customerName} </strong>
                      </p>
                      <p className='select-add'>
                        {orderDetails?.shipAddressLine1},
                        {orderDetails?.shipAddressLine2},
                        {orderDetails?.shipCityName},
                        {orderDetails?.shipStateName}
                        {orderDetails?.shipCountryName},{" "}
                        {orderDetails?.shipZipCode}
                      </p>
                    </div>
                  </div>

                  <div className='ord-details'>
                    <h5 className='th-ttl'>Contact Number</h5>
                    <p className='th-dt'>
                      {" "}
                      {orderDetails?.mobileNumber
                        ? `+91 ${orderDetails?.mobileNumber}`
                        : "No Contact available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
