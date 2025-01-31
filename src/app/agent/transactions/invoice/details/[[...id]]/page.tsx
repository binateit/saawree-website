"use client";
// import { FileResult } from "@/core/models/saleOrderModel";
import {
  // GeneratePdf,
  getInvoiceById,
} from "@/core/requests/customerRoutes";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
// import { toast } from "react-toastify";
// import { saveAs } from "file-saver";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { formatDate } from "date-fns";

const Page = () => {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoiceId");

  const { data: invoiceDetails, isLoading: isInvoiceDetailsLoading } = useQuery(
    {
      queryKey: ["invoiceDetailsById"],
      queryFn: () => getInvoiceById(Number(invoiceId)),
      enabled: !!invoiceId,
    }
  );
  // const Invoice_Download_URL = "invoices/downloadpdf";
  // const challanpdf = () => {
  //   GeneratePdf(Number(invoiceId), Invoice_Download_URL).then((file) => {
  //     const output = file as FileResult;

  //     if (output.data) {
  //       const url = window.URL.createObjectURL(output.data);
  //       saveAs(url, output.name);
  //     } else {
  //       toast.error(file.exception);
  //     }
  //   });
  // };
  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column footer='SubTotal:' footerStyle={{ textAlign: "right" }} />
        <Column
          footer={invoiceDetails?.itemList?.reduce(
            (acc, item) => acc + (item?.quantity || 0),
            0
          )}
        />
        <Column
          footer={formatCurrency(
            invoiceDetails?.itemList?.reduce(
              (acc, item) => acc + (item?.productPrice || 0),
              0
            )
          )}
        />
        <Column
          footer={formatCurrency(
            invoiceDetails?.itemList?.reduce(
              (acc, item) => acc + (item?.discountAmount || 0),
              0
            )
          )}
        />
        <Column
          footer={formatCurrency(
            invoiceDetails?.itemList?.reduce(
              (acc, item) => acc + (item?.subTotal || 0),
              0
            )
          )}
        />
      </Row>
      {invoiceDetails?.otherCharges?.map((ocitem) => (
        <Row key={ocitem.id}>
          <Column
            colSpan={invoiceDetails.totalTaxAmount !== 0 ? 4 : 3}
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
        <Column footer={formatCurrency(invoiceDetails?.roundOff)} />
      </Row>
      <Row>
        <Column
          colSpan={4}
          footer='Total Discount:'
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(invoiceDetails?.totalDiscountedPrice)} />
      </Row>
      <Row>
        <Column
          colSpan={4}
          footer='Grand Total:'
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={formatCurrency(invoiceDetails?.orderTotal)} />
      </Row>
    </ColumnGroup>
  );

  if (isInvoiceDetailsLoading) return <p>Loading....</p>;

  return (
    <>
      <div className='card mb-3'>
        <div className='card-header'>
          <h6 className='mb-0'>Invoice Details</h6>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
              <div className=''>
                <h6 className='mb-2 font-weight-bold'>Recipient Information</h6>
                <p className='mb-0'>{invoiceDetails?.customerName}</p>
                <p className='mb-2'>
                  {invoiceDetails?.shipAddressLine1},
                  {invoiceDetails?.shipAddressLine2},
                  {invoiceDetails?.shipCityName},{invoiceDetails?.shipStateName}
                  {invoiceDetails?.shipCountryName},{" "}
                  {invoiceDetails?.shipZipCode}{" "}
                </p>
                <p className='mb-2'>Phone : {invoiceDetails?.mobileNumber}</p>
              </div>
            </div>

            <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
              <div className=''>
                <h6 className='mb-2 font-weight-bold'>Billing Address</h6>
                <p className='mb-2'>
                  {invoiceDetails?.billAddressLine1},
                  {invoiceDetails?.billAddressLine2},
                  {invoiceDetails?.billCityName},{invoiceDetails?.billStateName}
                  {invoiceDetails?.billCountryName},{" "}
                  {invoiceDetails?.billZipCode}{" "}
                </p>
                <p className='mb-2'>Phone : {invoiceDetails?.mobileNumber}</p>
              </div>
            </div>

            <div className='col-xl-4 col-lg-12 col-md-12 col-sm-12'>
              <div className='row'>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>Date Added</label>
                  <p>
                    {formatDate(
                      invoiceDetails?.invoiceDate as string,
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>
                    Invoice Status
                  </label>
                  <p>{invoiceDetails?.invoiceStatusName}</p>
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>
                    Payment Status
                  </label>
                  <p>{invoiceDetails?.paymentStatusName} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card mb-3'>
        <div className='card-header'>
          <h6 className='mb-0'>Order Summary</h6>
        </div>
        <div className='card-body'>
          <DataTable
            stripedRows
            tableClassName='table table-bordered table-hover mb-0'
            value={invoiceDetails?.itemList}
            tableStyle={{ minWidth: "60rem" }}
            footerColumnGroup={footerGroup}
            emptyMessage='No Items found.'
          >
            <Column field='productName' header='Product'></Column>
            <Column field='quantity' header='Quantity'></Column>
            <Column
              field='productPrice'
              header='Unit Price'
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
