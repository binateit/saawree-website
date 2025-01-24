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
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import React from "react";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

const page = () => {
  const searchParams = useSearchParams();
  const saleOrderId = searchParams.get("saleOrderId");

  const { data: orderDetails } = useQuery({
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
                  {/* {formatDate(orderDetails?.orderDate, "dd MMM yyyy")} */}
                </span>
              </p>
            </div>
            <div className='order-tracking completed'>
              <span className='is-complete'></span>
              <p className='main-status-label'>
                Order Confirmed
                <br />
                {/* <span>{formatDate(orderDetails?.saleOrderStatusHistory.)}</span> */}
              </p>
              <div className='hoverd-details'>
                <ul className='tracker-sublist'>
                  <li>
                    <div className='tracker-more-details'>
                      <p className='naration strong mt-0 mb-0'>
                        Partially Packed
                      </p>
                      <p className='mt-0'>Thu, 14 Sep 24, 10:55</p>
                    </div>
                  </li>
                  <li>
                    <div className='tracker-more-details'>
                      <p className='naration strong mt-0 mb-0'>
                        Partially Packed
                      </p>
                      <p className='mt-0'>Thu, 16 Sep 24, 10:55</p>
                    </div>
                  </li>
                  <li>
                    <div className='tracker-more-details'>
                      <p className='naration strong mt-0 mb-0'>Fully Packed</p>
                      <p className='mt-0'>Thu, 22 Sep 24, 10:55</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className='order-tracking'>
              <span className='is-complete'></span>
              <p>
                Order Packed
                <br />
                <span>Tue, June 25</span>
              </p>
            </div>
            <div className='order-tracking'>
              <span className='is-complete'></span>
              <p>
                Order Shipped
                <br />
                <span>Fri, June 28</span>
              </p>
            </div>
            <div className='order-tracking'>
              <span className='is-complete'></span>
              <p>
                Order Delivered
                <br />
                <span>Fri, June 28</span>
              </p>
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
          {/* <div className='table-responsive'>
            <table className='table table-bordered table-striped mb-0'>
              <thead>
                <tr>
                  <th scope='col'>Product</th>
                  <th scope='col'>Qty</th>
                  <th scope='col'>Unit Price</th>
                  <th scope='col'>Discount</th>
                  <th scope='col'>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Earring Tikka PET1 MD D Purple</th>
                  <td>5 </td>
                  <td>₹495.00</td>
                  <td>₹247.50 (10% ) </td>
                  <td>₹2,227.50</td>
                </tr>
                <tr>
                  <th colSpan={2}>SubTotal</th>
                  <td>₹1,42,350.00</td>
                  <td>₹14,235.00</td>
                  <td>₹1,28,115.00</td>
                </tr>
                <tr>
                  <th colSpan={4}>Out Standing Amount</th>
                  <td>₹1,35,099.00</td>
                </tr>
              </tbody>
            </table>
          </div> */}
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

export default page;
