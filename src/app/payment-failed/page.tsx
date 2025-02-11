"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { getSalesOrderByNumber } from "@/core/requests/saleOrderRequests";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { BsShieldFillX } from "react-icons/bs";

const Page = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");

  const { data: orderDetails } = useQuery({
    queryKey: ["orderDetails", orderNumber],

    queryFn: () => getSalesOrderByNumber(orderNumber as string),
    enabled: !!orderNumber,
  });
  return (
    <>
      <section className='thankyou-page'>
        <div className='container'>
          <div className='inner-wrap-th'>
            <BsShieldFillX fontSize={60} className='text-danger' />
            <h2 className='thank-title text-danger mt-3 mb-2'>
              Payment Failed
            </h2>
            <p className='h5 font-weight-bold text-muted mb-2'>
              Order Amount : {formatCurrency(orderDetails?.orderTotal)}
            </p>
            <p className='text-center mb-2 ord-txt'>
              It&apos;s Seems like there was some trouble
            </p>
            <p className='text-center ord-txt'>
              Payment ID : {orderDetails?.orderNumber}{" "}
            </p>
            <Link href='#' className='btn btn-saawree'>
              Try Again
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
