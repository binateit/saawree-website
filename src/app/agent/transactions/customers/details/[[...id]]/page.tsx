"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { getCustomerofAgentDetails } from "@/core/requests/agentRequests";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { useSearchParams } from "next/navigation";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");

  const { data: customerDetails, isLoading } = useQuery({
    queryKey: ["customerDetailsById"],
    queryFn: () => getCustomerofAgentDetails(Number(customerId)),
    enabled: !!customerId,
  });
  if (isLoading) return <p>Loading....</p>;

  return (
    <>
      <div className='card mb-3'>
        <div className='card-header'>
          <h6 className='mb-0'>Customer Details</h6>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  First Name :
                </label>
                <span className='ml-xl-2'>{customerDetails?.firstName}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Last Name :
                </label>
                <span className='ml-xl-2'>{customerDetails?.lastName}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Company Name :
                </label>
                <span className='ml-xl-2'>{customerDetails?.companyName}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Print Name :
                </label>
                <span className='ml-xl-2'>{customerDetails?.printName}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Fax Number :
                </label>
                <span className='ml-xl-2'>{customerDetails?.faxNumber}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  E-mail Address :
                </label>
                <span className='ml-xl-2'>{customerDetails?.emailAddress}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Contact Person :
                </label>
                <span className='ml-xl-2'>
                  {customerDetails?.contactPerson}
                </span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Website :
                </label>
                <span className='ml-xl-2'>{customerDetails?.website}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Mobile Number :
                </label>
                <span className='ml-xl-2'>{`+91 ${customerDetails?.mobileNumber}`}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Whatsapp Number :
                </label>
                <span className='ml-xl-2'>{`+91 ${customerDetails?.whatsappNumber}`}</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Date of Birth :
                </label>
                <span className='ml-xl-2'>
                  {formatDate(
                    customerDetails?.dateOfBirth as unknown as string,
                    "dd MMM yyyy"
                  )}
                </span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Date of Anniversary :
                </label>
                <span className='ml-xl-2'>
                  {" "}
                  {formatDate(
                    customerDetails?.dateOfAnniversary as unknown as string,
                    "dd MMM yyyy"
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
              <label className='font-weight-bold custome-lg-label mb-0'>
                Billing Address
              </label>
              <p className='mb-2'>
                {customerDetails?.billingAddress?.displayAddress}
              </p>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
              <label className='font-weight-bold custome-lg-label mb-0'>
                Shipping Address
              </label>
              <p className='mb-2'>
                {customerDetails?.shippingAddress?.displayAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='card mb-3'>
        <div className='card-header'>
          <h6 className='mb-0'>Order Summary</h6>
        </div>
        <div className='card-body'>
          {/* <div className='table-responsive'>
        <table className='table table-bordered table-striped mb-0'>
            <thead>
            <tr>
                <th scope='col'>Order Number</th>
                <th scope='col'>Status </th>
                <th scope='col'>Amount </th>
                <th scope='col'>Date </th>
            </tr>
            </thead>
        </table>
          </div> */}
          <DataTable
            stripedRows
            tableClassName='table table-bordered table-hover mb-0'
            value={customerDetails?.customerSaleOrders}
            tableStyle={{ minWidth: "60rem" }}
            emptyMessage='No Items found.'
          >
            <Column field='orderNumber' header='Sale Order Number'></Column>
            <Column field='orderStatusName' header='Sale Order Status'></Column>
            <Column
              field='orderTotal'
              header='Order Total'
              body={(rowData) => formatCurrency(rowData?.orderTotal)}
            ></Column>
            <Column
              field='orderDate'
              header='Order Date'
              body={(rowData) => formatDate(rowData?.orderDate, "dd MMM yyyy")}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Page;
