"use client";
import OrderTracking from "@/core/component/OrderTracking";
import { getOrderTracking } from "@/core/requests/saleOrderRequests";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatCurrency, formatDate } from "@/core/helpers/helperFunctions";
import Image from "next/image";
import noProductImage from "@/assets/images/no-products-available.png";
import customLoader from "@/core/component/shared/image-loader";

interface TrackOrderPayload {
  orderNumber: string;
  mobileNumber: string;
}

const Page = () => {
  const [trackerInput, setTrackerInput] = useState<TrackOrderPayload>({
    orderNumber: "",
    mobileNumber: "",
  });
  const [showTracker, setShowTracker] = useState<boolean>(false);
  const {
    mutate: trackOrder,
    data: orderDetails,
    isError,
    reset,
  } = useMutation({
    mutationKey: ["track-order"],
    mutationFn: () => getOrderTracking(trackerInput),
    onSuccess: () => {
      // router.push();
      setShowTracker(true);
    },
  });
  // if (!isSuccess) return <Loading />;
  return (
    <>
      {!showTracker && !isError && (
        <div className='bg-light-cream track-order pt-5 pb-5'>
          <h3 className='form-heading1'>
            Fill the details to track your order
          </h3>
          <div className='login-form mt-3'>
            <div className='form-group'>
              <label htmlFor='username'>Order ID</label>
              <input
                type='text'
                className='form-control checkout-input'
                onChange={(e) =>
                  setTrackerInput({
                    ...trackerInput,
                    orderNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className='form-group'>
              <div className='frg-lbl'>
                <label htmlFor='password'>Email Id / Mobile No.</label>{" "}
              </div>
              <input
                type='text'
                className='form-control checkout-input'
                id=''
                onChange={(e) =>
                  setTrackerInput({
                    ...trackerInput,
                    mobileNumber: e.target.value,
                  })
                }
              />
            </div>
            <button
              className='submit-btn btn btn-saawree'
              onClick={() => trackOrder()}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {showTracker && (
        <div className='container my-5'>
          <OrderTracking
            orderProgress={orderDetails?.saleOrderStatusHistory || []}
          />

          <div className='card mb-3'>
            <div className='card-header'>
              <h6 className='mb-0'>Order Details</h6>
            </div>
            <div className='card-body'>
              <div className='row'>
                <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                  <h6 className='mb-2 font-weight-bold'>
                    Recipient Information
                  </h6>
                  <p className='mb-0'>{orderDetails?.customerName}</p>
                  <p className='mb-2'>
                    {orderDetails?.shipAddressLine1},
                    {orderDetails?.shipAddressLine2},
                    {orderDetails?.shipCityName},{orderDetails?.shipStateName}
                    {orderDetails?.shipCountryName}, {orderDetails?.shipZipCode}{" "}
                  </p>
                  <p className='mb-2'>Phone : {orderDetails?.mobileNumber}</p>
                </div>

                <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                  <h6 className='mb-2 font-weight-bold'>Billing Address</h6>
                  <p className='mb-2'>
                    {orderDetails?.billAddressLine1},
                    {orderDetails?.billAddressLine2},
                    {orderDetails?.billCityName},{orderDetails?.billStateName}
                    {orderDetails?.billCountryName}, {orderDetails?.billZipCode}{" "}
                  </p>
                  <p className='mb-2'>Phone : {orderDetails?.mobileNumber}</p>
                </div>

                <div className='col-xl-4 col-lg-12 col-md-12 col-sm-12'>
                  <div className='row'>
                    <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                      <label className='mb-0 font-weight-bold'>
                        Order Date
                      </label>
                      <p>
                        {" "}
                        {formatDate(
                          orderDetails?.orderDate as unknown as string,
                          "dd MMM yyyy"
                        )}
                      </p>
                    </div>
                    <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                      <label className='mb-0 font-weight-bold'>
                        Order Status
                      </label>
                      <p>{orderDetails?.saleOrderStatusName}</p>
                    </div>
                    <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                      <label className='mb-0 font-weight-bold'>
                        Payment Status
                      </label>
                      <p>{orderDetails?.paymentStatusName} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='card-footer text-right bg-white'>
              <a href='payment-options.html' className='btn btn-saawree'>
                Pay Now
              </a>
            </div> */}
          </div>

          <div className='card mb-3'>
            <div className='card-header justify-content-between'>
              <h6 className='mb-0'>Order Summary</h6>
              {/* <button className='btn btn-saawree' onClick={() => challanpdf()}>
                Download
              </button> */}
            </div>
            <div className='card-body'>
              <DataTable
                stripedRows
                tableClassName='table table-bordered table-hover mb-0'
                value={orderDetails?.itemList}
                tableStyle={{ minWidth: "60rem" }}
                // footerColumnGroup={footerGroup}
                emptyMessage='No Items found.'
              >
                <Column field='productName' header='Product'></Column>
                <Column field='quantity' header='Quantity'></Column>
                <Column
                  field='productPrice'
                  header='Product Price'
                  body={(rowData) => formatCurrency(rowData?.productPrice)}
                ></Column>
                <Column
                  field='discountAmount'
                  header='Discount'
                  body={(rowData) => formatCurrency(rowData?.discountAmount)}
                ></Column>
                <Column
                  field='total'
                  header='Total'
                  body={(rowData) => formatCurrency(rowData?.subTotal)}
                ></Column>
              </DataTable>
            </div>
          </div>
          <button
            className='btn btn-saawree mt-2'
            onClick={() => {
              setShowTracker(false);
              reset();
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {isError && (
        <>
          <div className='titlehome'>
            <div className='empty-cart text-center py-5'>
              <Image
                loader={customLoader}
                src={noProductImage.src}
                width={100}
                height={100}
                className='img-fluid'
                alt='cart'
              />
              <h4 className='mt-2'>No Record found for the given data</h4>
              <button
                className='btn btn-saawree mt-2'
                onClick={() => {
                  setShowTracker(false);
                  reset();
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
