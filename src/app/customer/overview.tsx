import { formatCurrency } from "@/core/helpers/helperFunctions";
import { CustomerRecord } from "@/core/models/customerModel";
import React from "react";

const Overview = ({ overview }: { overview: CustomerRecord | undefined }) => {
  console.log(overview);
  return (
    <div className='card shadow rounded'>
      <div className='card-header bg-white'>
        <h5 className='mb-0'>Overview</h5>
      </div>

      <div className='card-body'>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>{overview?.totalSaleOrderCount}</p>
              <p className='mb-0 text-muted'>Sales Order Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(overview?.totalSaleOrderAmount)}
              </p>
              <p className='mb-0 text-muted'>Sales Order Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(overview?.totalPaymentReceived)}
              </p>
              <p className='mb-0 text-muted'>Sales Order Paid Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(overview?.outstandingAmount)}
              </p>
              <p className='mb-0 text-muted'>Sales Order Pending Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>{overview?.totalInvoiceCount}</p>
              <p className='mb-0 text-muted'>Invoice Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(overview?.totalInvoiceAmount)}
              </p>
              <p className='mb-0 text-muted'>Invoice Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(overview?.totalInovicePaymentReceived)}
              </p>
              <p className='mb-0 text-muted'>Invoice Paid Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>
                {formatCurrency(overview?.outstandingInvoiceAmount)}
              </p>
              <p className='mb-0 text-muted'>Invoice Pending Amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
