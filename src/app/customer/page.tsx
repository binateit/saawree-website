"use client";
import React, { useState } from "react";
import Overview from "./overview";
import ProfileDetails from "./profile/page";
import SaleOrder from "./transactions/SaleOrder";
import { useQuery } from "@tanstack/react-query";
import { getRecordById } from "@/core/requests/customerRoutes";
import { useSession } from "next-auth/react";
import { getUserByToken } from "@/core/requests/authRequests";
import { formatCurrency } from "@/core/helpers/helperFunctions";

const page = () => {
  const { data: session } = useSession();

  const { data: customerOverview, isLoading: customerOverviewLoading } =
    useQuery({
      queryKey: ["customerOverviewRec"],
      queryFn: () => getRecordById(),
      refetchOnWindowFocus: false,
    });

  if (customerOverviewLoading) return <p>Loading....</p>;

  return (
    <div className='card shadow rounded'>
      <div className='card-header bg-white'>
        <h5 className='mb-0'>Overview</h5>
      </div>

      <div className='card-body'>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>{customerOverview?.totalSaleOrderCount}</p>
              <p className='mb-0 text-muted'>Sales Order Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(customerOverview?.totalSaleOrderAmount)}
              </p>
              <p className='mb-0 text-muted'>Sales Order Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(customerOverview?.totalPaymentReceived)}
              </p>
              <p className='mb-0 text-muted'>Sales Order Paid Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(customerOverview?.outstandingAmount)}
              </p>
              <p className='mb-0 text-muted'>Sales Order Pending Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>{customerOverview?.totalInvoiceCount}</p>
              <p className='mb-0 text-muted'>Invoice Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(customerOverview?.totalInvoiceAmount)}
              </p>
              <p className='mb-0 text-muted'>Invoice Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(customerOverview?.totalInovicePaymentReceived)}
              </p>
              <p className='mb-0 text-muted'>Invoice Paid Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(customerOverview?.outstandingInvoiceAmount)}
              </p>
              <p className='mb-0 text-muted'>Invoice Pending Amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
