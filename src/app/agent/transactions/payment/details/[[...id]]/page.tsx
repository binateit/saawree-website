"use client";
import { FileResult } from "@/core/models/saleOrderModel";
import {
  GeneratePdf,
  getPaymentDetailsById,
} from "@/core/requests/customerRoutes";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { formatDate } from "date-fns";
const Page = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");

  const { data: paymentDetails, isLoading: isPaymentDetailsLoading } = useQuery(
    {
      queryKey: ["paymentDetailsById"],
      queryFn: () => getPaymentDetailsById(Number(paymentId)),
      enabled: !!paymentId,
    }
  );

  const Payment_Download_URL = "saleorders/saleorderpayment/downloadpdf";
  const challanpdf = () => {
    GeneratePdf(Number(paymentId), Payment_Download_URL).then((file) => {
      const output = file as FileResult;

      if (output?.data) {
        const url = window.URL.createObjectURL(output?.data);
        saveAs(url, output.name);
      } else {
        toast.error(file.exception);
      }
    });
  };

  if (isPaymentDetailsLoading) return <p>Loading...</p>;
  return (
    <>
      <div className='card mb-3'>
        <div className='card-header justify-content-between'>
          <h6 className='mb-0'>Payment Details </h6>
          <button className='btn btn-saawree' onClick={() => challanpdf()}>
            Download
          </button>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xl-4 col-lg-6 col-md-6 col-sm-12'>
              <div className='row'>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>Customer</label>
                  <p>
                    {paymentDetails?.customerDetailForPaymentDto?.customerName}
                  </p>
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>
                    Customer Email
                  </label>
                  <p>{paymentDetails?.customerDetailForPaymentDto?.email}</p>
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>
                    Customer Phone
                  </label>
                  <p>
                    {paymentDetails?.customerDetailForPaymentDto?.mobileNumber}{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className='col-xl-4 col-lg-12 col-md-12 col-sm-12'>
              <div className='row'>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>
                    Payment Number
                  </label>
                  <p>{paymentDetails?.paymentNumber}</p>
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>Date Added</label>
                  <p>
                    {formatDate(
                      paymentDetails?.paymentDate as string,
                      "dd MMM yyyy"
                    )}
                  </p>
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>
                    Amount Received
                  </label>
                  <p>{formatCurrency(paymentDetails?.amountReceived)}</p>
                </div>
                <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                  <label className='mb-0 font-weight-bold'>
                    Amount Received Mode
                  </label>
                  <p>{paymentDetails?.paymentModeName} </p>
                </div>
              </div>
            </div>
            {paymentDetails?.paymentModeId === 2 && (
              <div className='col-xl-4 col-lg-12 col-md-12 col-sm-12'>
                <div className='row'>
                  <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                    <label className='mb-0 font-weight-bold'>
                      Cheque Bank name
                    </label>
                    <p>{paymentDetails?.chequeBankName}</p>
                  </div>
                  <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                    <label className='mb-0 font-weight-bold'>
                      Check Number
                    </label>
                    <p>{paymentDetails?.chequeNumber}</p>
                  </div>
                  <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                    <label className='mb-0 font-weight-bold'>
                      Amount Received Mode
                    </label>
                    <p>{paymentDetails?.chequeDate} </p>
                  </div>
                </div>
              </div>
            )}
            {(paymentDetails?.paymentModeId === 4 ||
              paymentDetails?.paymentModeId === 3 ||
              paymentDetails?.paymentModeId === 6 ||
              paymentDetails?.paymentModeId === 5) && (
              <div className='col-xl-4 col-lg-12 col-md-12 col-sm-12'>
                <div className='row'>
                  <div className='col-xl-6 col-lg-3 col-md-3 col-sm-4'>
                    <label className='mb-0 font-weight-bold'>Bank name</label>
                    <p>{paymentDetails?.bankName}</p>
                  </div>
                </div>
              </div>
            )}
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
            value={paymentDetails?.saleOrderPayments}
            tableStyle={{ minWidth: "60rem" }}
            emptyMessage='No Items found.'
          >
            <Column field='saleOrderNumber' header='Sale Order Number'></Column>
            <Column
              field='amountReceived'
              header='Amount Received'
              body={(rowData) => formatCurrency(rowData?.amountReceived)}
            ></Column>
            <Column
              field='paymentDate'
              header='Payment Date'
              body={(rowData) =>
                formatDate(rowData?.paymentDate, "dd MMM yyyy")
              }
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Page;
