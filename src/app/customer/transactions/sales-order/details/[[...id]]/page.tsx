"use client";
import { formatCurrency, formatDate } from "@/core/helpers/helperFunctions";
import { FileResult } from "@/core/models/saleOrderModel";
import {
  GenerateChallanPdf,
  getSalesOrderById,
} from "@/core/requests/saleOrderRequests";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const page = () => {
  const searchParams = useSearchParams();
  const saleOrderId = searchParams.get("saleOrderId");

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["orderDetails"],
    queryFn: () => getSalesOrderById(Number(saleOrderId)),
    enabled: !!saleOrderId,
  });

  const challanpdf = () => {
    GenerateChallanPdf(Number(saleOrderId)).then((file) => {
      let output = file as FileResult;

      if (output.data) {
        let url = window.URL.createObjectURL(output.data);
        saveAs(url, output.name);
      } else {
        toast.error(file.exception);
      }
    });
  };

  const isOrderPlaced = orderDetails?.saleOrderStatusHistory?.filter(
    (status) => status?.saleOrderStatusId === 1
  );

  const isCancelled = orderDetails?.saleOrderStatusHistory?.filter(
    (status) => status?.saleOrderStatusId === 3
  );
  const isPacked = orderDetails?.saleOrderStatusHistory?.filter(
    (status) =>
      status?.saleOrderStatusId === 4 || status?.saleOrderStatusId === 5
  );

  const isShipped = orderDetails?.saleOrderStatusHistory?.filter(
    (status) =>
      status?.saleOrderStatusId === 6 || status?.saleOrderStatusId === 7
  );

  const isDelivered = orderDetails?.saleOrderStatusHistory?.filter(
    (status) =>
      status?.saleOrderStatusId === 8 || status?.saleOrderStatusId === 9
  );

  if (isLoading) return <p>Loading....</p>;
  return (
    <>
      <div className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between flex-colomn-1200'>
            <div className='order-tracking completed'>
              <span className='is-complete'></span>
              <p className='main-status-label'>
                Order Created
                <br />
                <span>
                  {" "}
                  {(isOrderPlaced?.length || 0 > 0) &&
                    formatDate(isOrderPlaced?.[0]?.statusDate, "dd MMM yyyy")}
                </span>
              </p>
            </div>
            <div className='order-tracking completed'>
              <span className='is-complete'></span>
              <p className='main-status-label'>
                Order Confirmed
                <br />
                <span>
                  {" "}
                  {(isOrderPlaced?.length || 0 > 0) &&
                    formatDate(isOrderPlaced?.[0]?.statusDate, "dd MMM yyyy")}
                </span>
              </p>
            </div>
            {(isCancelled?.length || 0 > 0) && (
              <div
                className={`order-tracking ${
                  isCancelled?.length || 0 > 0 ? "completed" : ""
                }`}
              >
                <span className='is-complete'></span>
                <p>
                  Order Cancelled
                  <br />
                  <span>
                    {" "}
                    {(isCancelled?.length || 0 > 0) &&
                      formatDate(isPacked?.[0]?.statusDate, "dd MMM yyyy")}
                  </span>
                </p>
              </div>
            )}
            <div
              className={`order-tracking ${
                isPacked?.length || 0 > 0 ? "completed" : ""
              }`}
            >
              <span className='is-complete'></span>
              <p
                className={`${
                  isPacked?.length || 0 > 0 ? "main-status-label" : ""
                }`}
              >
                Order Packed
                <br />
                <span>
                  {" "}
                  {(isPacked?.length || 0 > 0) &&
                    formatDate(isPacked?.[0]?.statusDate, "dd MMM yyyy")}
                </span>
              </p>
              <div className='hoverd-details'>
                {(isPacked?.length || 0 > 0) && (
                  <ul className='tracker-sublist'>
                    {isPacked
                      ?.sort(
                        (a, b) => a?.saleOrderStatusId - b?.saleOrderStatusId
                      )
                      .map((packing) => (
                        <li key={packing?.saleOrderId}>
                          <div className='tracker-more-details'>
                            <p className='naration strong mt-0 mb-0'>
                              {packing?.saleOrderStatusName}
                            </p>
                            <p className='mt-0'>
                              {formatDate(packing?.statusDate, "dd MMM yyyy")}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
            <div
              className={`order-tracking ${
                (isShipped?.length || 0) > 0 ? "completed" : ""
              }`}
            >
              <span className='is-complete'></span>
              <p
                className={`${
                  (isShipped?.length || 0) > 0 ? "main-status-label" : ""
                }`}
              >
                Order Shipped
                <br />
                <span>
                  {" "}
                  {(isShipped?.length || 0 > 0) &&
                    formatDate(isShipped?.[0]?.statusDate, "dd MMM yyyy")}
                </span>
              </p>
              <div className='hoverd-details'>
                {(isShipped?.length || 0) > 0 && (
                  <ul className='tracker-sublist'>
                    {isShipped
                      ?.sort(
                        (a, b) => a?.saleOrderStatusId - b?.saleOrderStatusId
                      )
                      .map((shipping) => (
                        <li key={shipping?.saleOrderId}>
                          <div className='tracker-more-details'>
                            <p className='naration strong mt-0 mb-0'>
                              {shipping?.saleOrderStatusName}
                            </p>
                            <p className='mt-0'>
                              {formatDate(shipping?.statusDate, "dd MMM yyyy")}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
            <div
              className={`order-tracking ${
                (isDelivered?.length || 0) > 0 ? "completed" : ""
              }`}
            >
              <span className='is-complete'></span>
              <p
                className={`${
                  (isDelivered?.length || 0) > 0 ? "main-status-label" : ""
                }`}
              >
                Order Delivered
                <br />
                <span>
                  {(isDelivered?.length || 0) > 0 &&
                    formatDate(isDelivered?.[0]?.statusDate, "dd MMM yyyy")}
                </span>
              </p>
              <div className='hoverd-details'>
                {(isDelivered?.length || 0) > 0 && (
                  <ul className='tracker-sublist'>
                    {isDelivered
                      ?.sort(
                        (a, b) => a?.saleOrderStatusId - b?.saleOrderStatusId
                      )
                      .map((deliver) => (
                        <li key={deliver?.saleOrderId}>
                          <div className='tracker-more-details'>
                            <p className='naration strong mt-0 mb-0'>
                              {deliver?.saleOrderStatusName}
                            </p>
                            <p className='mt-0'>
                              {formatDate(deliver?.statusDate, "dd MMM yyyy")}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <label className='mb-0 font-weight-bold'>Date Added</label>
                  {/* <p>{formatDate(orderDetails?.orderDate, "dd MMM yyyy")}</p> */}
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>Order Status</label>
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
        <div className='card-footer text-right bg-white'>
          <a href='payment-options.html' className='btn btn-saawree'>
            Pay Now
          </a>
        </div>
      </div>

      <div className='card mb-3'>
        <div className='card-header justify-content-between'>
          <h6 className='mb-0'>Order Summary</h6>
          <button className='btn btn-saawree' onClick={() => challanpdf()}>
            Download
          </button>
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
    </>
  );
};

export default page;
