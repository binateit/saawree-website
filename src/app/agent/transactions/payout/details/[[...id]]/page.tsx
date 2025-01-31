"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { getAgentPayoutDetails } from "@/core/requests/agentRequests";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { useSearchParams } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const payoutId = searchParams.get("payoutId");

  const { data: payoutDetails, isLoading: isPayoutDetailsLoading } = useQuery({
    queryKey: ["payoutDetailsById"],
    queryFn: () => getAgentPayoutDetails(Number(payoutId)),
    enabled: !!payoutId,
  });

  if (isPayoutDetailsLoading) return <p>Loading...</p>;
  return (
    <>
      <div className='card mb-3'>
        <div className='card-header'>
          <h6 className='mb-0'>Payout Details</h6>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-4'>
              <label className='mb-0 font-weight-bold'>
                Payout Reference No.
              </label>
              <p>{payoutDetails?.referenceNumber}</p>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-4'>
              <label className='mb-0 font-weight-bold'>Amount</label>
              <p>{formatCurrency(payoutDetails?.totalAmountPaid)}</p>
            </div>
            {/* <div className='col-xl-3 col-lg-3 col-md-3 col-sm-4'>
              <label className='mb-0 font-weight-bold'>Account Name</label>
              <p>{payoutDetails?.}</p>
            </div> */}
            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-4'>
              <label className='mb-0 font-weight-bold'>Payment Date</label>
              <p>
                {formatDate(
                  payoutDetails?.paymentDate as string,
                  "dd MMM yyyy"
                )}{" "}
              </p>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-4'>
              <label className='mb-0 font-weight-bold'>Payment Mode</label>
              <p>{payoutDetails?.paymentModeName} </p>
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
            value={payoutDetails?.commissions}
            tableStyle={{ minWidth: "60rem" }}
            emptyMessage='No Items found.'
          >
            <Column field='saleOrderNumber' header='Sale Order Number'></Column>
            <Column
              field='saleOrderAmount'
              header='Sale Order Amount'
              body={(rowData) => formatCurrency(rowData?.saleOrderAmount)}
            ></Column>
            <Column
              field='amountPaid'
              header='Paid Amount'
              body={(rowData) => formatCurrency(rowData?.amountPaid)}
            ></Column>
            <Column
              field='saleOrderDate'
              header='Payment Date'
              body={(rowData) =>
                formatDate(rowData?.saleOrderDate, "dd MMM yyyy")
              }
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Page;
