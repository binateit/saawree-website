"use client";
import { formatDate } from "@/core/helpers/helperFunctions";
import { getSalesOrderById } from "@/core/requests/saleOrderRequests";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
interface Props {
  orderData?: {
    saleOrderId: number;
    orderId?: any;
  };
}
const ThankYouPage: FC<Props> = ({ orderData }) => {
  const { data: session } = useSession();
  const navigate = useRouter();

  const { data: orderDetails } = useQuery({
    queryKey: ["orderDetails", orderData?.saleOrderId],
    queryFn: () => getSalesOrderById(orderData?.saleOrderId as number),
    enabled: !!orderData?.saleOrderId,
  });
  return (
    <section className='thankyou-page'>
      <div className='container'>
        <div className='inner-wrap-th'>
          <h2 className='thank-title'>Thank you</h2>
          {/* <!-- <h4 className="ord-n">Order Number : 59198</h4> --> */}
          <p className='ord-txt'>
            We are getting started on your order{" "}
            <span>{orderDetails?.orderNumber}</span> right away. and youm will
            recive an order confirmation email shortly to
            {orderDetails?.email}.{" "}
          </p>
          <p className='btn-th'>
            <a
              href='customer-panel/sale-order-details.html'
              className='btn btn-saawree'
            >
              Track your order
            </a>
            <Link href='/' className='btn btn-saawree'>
              Continue Shoping
            </Link>
          </p>
        </div>
        <h3 className='text-center od'>
          Order Details: {orderDetails?.orderNumber}
        </h3>
        <div className='order-details-box'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='ord-details'>
                <h5 className='th-ttl'>Email</h5>
                <p className='th-dt'>{orderDetails?.email}</p>
              </div>

              <div className='ord-details'>
                <h5 className='th-ttl'>Payment Method</h5>
                <p className='th-dt'>
                  {orderDetails?.paymentList[0]?.paymentModeName}
                </p>
              </div>

              <div className='ord-details'>
                <h5 className='th-ttl'>Order Date</h5>
                <p className='th-dt'>
                  {" "}
                  {formatDate(orderDetails?.orderDate, "MMMM dd, yyyy")}
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
                    {orderDetails?.shipCityName},{orderDetails?.shipStateName}
                    {orderDetails?.shipCountryName}, {orderDetails?.shipZipCode}
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
    </section>
  );
};

export default ThankYouPage;
