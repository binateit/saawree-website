"use client";
import OrderTracking from "@/core/component/OrderTracking";
import { getOrderTrackingByTracker } from "@/core/requests/saleOrderRequests";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import Image from "next/image";
import noProductImage from "@/assets/images/no-products-available.png";
import customLoader from "@/core/component/shared/image-loader";
import { useSearchParams } from "next/navigation";
// import { formatDate } from "date-fns";

const Page = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get("orderId");
  const {
    data: orderDetails,
    // isLoading,
    isError,
  } = useQuery({
    queryKey: ["order-tracking"],
    queryFn: () => getOrderTrackingByTracker(orderId || ""),
    enabled: !!orderId,
    refetchOnWindowFocus: false,
  });
  // if (!isLoading) return <Loading />;
  return (
    <>
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
                <h6 className='mb-2 font-weight-bold'>Recipient Information</h6>
                <p className='mb-0'>{orderDetails?.customerName}</p>
                <p className='mb-2'>
                  {orderDetails?.shipAddressLine1},
                  {orderDetails?.shipAddressLine2},{orderDetails?.shipCityName},
                  {orderDetails?.shipStateName}
                  {orderDetails?.shipCountryName}, {orderDetails?.shipZipCode}{" "}
                </p>
                <p className='mb-2'>Phone : {orderDetails?.mobileNumber}</p>
              </div>

              <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
                <h6 className='mb-2 font-weight-bold'>Billing Address</h6>
                <p className='mb-2'>
                  {orderDetails?.billAddressLine1},
                  {orderDetails?.billAddressLine2},{orderDetails?.billCityName},
                  {orderDetails?.billStateName}
                  {orderDetails?.billCountryName}, {orderDetails?.billZipCode}{" "}
                </p>
                <p className='mb-2'>Phone : {orderDetails?.mobileNumber}</p>
              </div>

              <div className='col-xl-4 col-lg-12 col-md-12 col-sm-12'>
                <div className='row'>
                  <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                    <label className='mb-0 font-weight-bold'>Order Date</label>
                    <p>
                      {" "}
                      {/* {formatDate(
                        orderDetails?.orderDate as unknown as string,
                        "dd MMM yyyy"
                      )} */}
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
      </div>

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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
