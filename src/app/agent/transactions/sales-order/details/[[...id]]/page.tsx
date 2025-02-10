"use client";
import { FileResult } from "@/core/models/saleOrderModel";
import {
  GenerateChallanPdf,
  getSalesOrderById,
} from "@/core/requests/saleOrderRequests";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "react-bootstrap";
import { Column } from "primereact/column";
import { formatCurrency, formatDate } from "@/core/helpers/helperFunctions";
import { DataTable } from "primereact/datatable";
import OrderTracking from "@/core/component/OrderTracking";

const Page = () => {
  const searchParams = useSearchParams();
  const saleOrderId = searchParams.get("saleOrderId");

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["orderDetails"],
    queryFn: () => getSalesOrderById(Number(saleOrderId)),
    enabled: !!saleOrderId,
  });

  const challanpdf = () => {
    GenerateChallanPdf(Number(saleOrderId)).then((file) => {
      const output = file as FileResult;

      if (output.data) {
        const url = window.URL.createObjectURL(output.data);
        saveAs(url, output.name);
      } else {
        toast.error(file.exception);
      }
    });
  };

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer='SubTotal:' footerStyle={{ textAlign: "right" }} />
        <Column
          footer={orderDetails?.itemList?.reduce(
            (acc, item) => acc + (item?.quantity || 0),
            0
          )}
        />
        <Column
          footer={formatCurrency(
            orderDetails?.itemList?.reduce(
              (acc, item) => acc + (item?.productPrice || 0),
              0
            )
          )}
        />
        <Column
          footer={formatCurrency(
            orderDetails?.itemList?.reduce(
              (acc, item) => acc + (item?.discountAmount || 0),
              0
            )
          )}
        />
        <Column
          footer={formatCurrency(
            orderDetails?.itemList?.reduce(
              (acc, item) => acc + (item?.subTotal || 0),
              0
            )
          )}
        />
      </Row>
      {orderDetails?.otherCharges?.map((ocitem) => (
        <Row key={ocitem.id}>
          <Column
            colSpan={orderDetails.totalTaxAmount !== 0 ? 4 : 3}
            footer={ocitem.label}
            footerStyle={{ textAlign: "right" }}
          />
          <Column footer={formatCurrency(ocitem.amount)} />
        </Row>
      ))}
      <Row>
        <Column
          colSpan={4}
          footer='Round off:'
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(orderDetails?.roundOff)} />
      </Row>
      <Row>
        <Column
          colSpan={4}
          footer='Total Discount:'
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(orderDetails?.totalDiscountedPrice)} />
      </Row>
      <Row>
        <Column
          colSpan={4}
          footer='Grand Total:'
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(orderDetails?.orderTotal)} />
      </Row>
      <Row>
        <Column
          colSpan={4}
          footer='Out Standing Amount:'
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(orderDetails?.outStandingAmount)} />
      </Row>
    </ColumnGroup>
  );

  if (isLoading) return <p>Loading....</p>;

  return (
    <>
      <OrderTracking
        orderProgress={orderDetails?.saleOrderStatusHistory || []}
      />

      <div className='card mb-3'>
        <div className='card-header'>
          <h6 className='mb-0'>Order Details </h6>
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
                  <label className='mb-0 font-weight-bold'>Order Number</label>
                  <p>{orderDetails?.orderNumber}</p>
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>Order Date</label>
                  <p>
                    {formatDate(
                      orderDetails?.orderDate as unknown as string,
                      "dd MMM yyyy"
                    )}
                  </p>
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
        {/* <div className='card-footer text-right bg-white'>
          <Link
            href='/agent/transactions/sales-order/add-payment'
            className='btn btn-saawree'
          >
            Add Payment
          </Link>
        </div> */}
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
            footerColumnGroup={footerGroup}
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

export default Page;
