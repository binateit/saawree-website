"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { PaginationFilter } from "@/core/models/model";
import { SaleOrderDto } from "@/core/models/saleOrderModel";
import { getSaleOrdersOfCustomer } from "@/core/requests/saleOrderRequests";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import Link from "next/link";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableStateEvent,
  SortOrder,
} from "primereact/datatable";
import React, { useState } from "react";
import { useImmer } from "use-immer";

const page = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

  const [paginationModel, setPaginationModel] = useImmer<PaginationFilter>({
    first: 0,
    pageNumber: 1,
    pageSize: 3,
    sortField: "orderDate",
    sortOrder: -1,
    orderBy: ["orderDate desc"],
  });

  const {
    data: saleOrderResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sales-order-list", paginationModel],
    queryFn: () => {
      return getSaleOrdersOfCustomer({ ...paginationModel });
    },
  });

  const onPageOrSortChange = (event: DataTableStateEvent) => {
    setPaginationModel((draft) => {
      draft.pageNumber =
        event.page === undefined ? 1 : (event.page as number) + 1;
      draft.pageSize = event.rows;
      draft.first = event.first;
      draft.sortField = event.sortField;
      draft.sortOrder = event.sortOrder as SortOrder;
      draft.orderBy = [
        `${event.sortField} ${event.sortOrder === 1 ? "asc" : "desc"}`,
      ];
    });
  };

  const filteredData = saleOrderResponse?.data?.filter((item: SaleOrderDto) =>
    Object.values(item).some((value: any) => {
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(globalFilterValue.toLowerCase())
      );
    })
  );

  const leftContent = (
    <div className='paginaton-showing'>
      {`Showing ${
        (saleOrderResponse?.pagination?.totalCount as number) > 0
          ? (paginationModel.first as number) + 1
          : 0
      } to 
            ${Math.min(
              (saleOrderResponse?.pagination?.currentPage as number) *
                (saleOrderResponse?.pagination?.pageSize as number),
              saleOrderResponse?.pagination?.totalCount as number
            )} 
            out of ${saleOrderResponse?.pagination?.totalCount} Records`}
    </div>
  );

  return (
    <>
      <div className='card mb-2'>
        <div className='card-body'>
          <div className='row justify-content-between'>
            <div className='col-xl-5 col-lg-5 col-md-6 mb-3 mb-md-0'>
              <div className='dashboard-common-search'>
                <div className='common-seacrch-box d-flex'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search'
                    value={globalFilterValue}
                    onChange={(e) => setGlobalFilterValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='col-xl-7 col-lg-7 col-md-6 text-right'>
              <div
                className='btn-group'
                aria-label='Button group with nested dropdown'
              >
                <div className='btn-group' role='group'>
                  <button
                    type='button'
                    className='btn btn-saawree-outline dropdown-toggle'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    By Date
                  </button>
                  <div className='dropdown-menu'>
                    <a className='dropdown-item' href='#'>
                      Last 7 Days
                    </a>
                    <a className='dropdown-item' href='#'>
                      Last 15 Days
                    </a>
                    <a className='dropdown-item' href='#'>
                      Last Month
                    </a>
                    <a
                      className='dropdown-item cursor-pointer'
                      href='#'
                      data-toggle='modal'
                      data-target='#dateSelector'
                    >
                      Custom
                    </a>
                  </div>
                </div>

                <div className='btn-group' role='group'>
                  <button
                    type='button'
                    className='btn btn-saawree-outline dropdown-toggle'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Status
                  </button>
                  <div className='dropdown-menu'>
                    <a className='dropdown-item' href='#'>
                      Confirmed
                    </a>
                    <a className='dropdown-item' href='#'>
                      Pending
                    </a>
                  </div>
                </div>

                <div className='btn-group' role='group'>
                  <button
                    type='button'
                    className='btn btn-saawree-outline dropdown-toggle'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Payment Status
                  </button>
                  <div className='dropdown-menu'>
                    <a className='dropdown-item' href='#'>
                      Done
                    </a>
                    <a className='dropdown-item' href='#'>
                      Pending
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='card shadow'>
        <div className='card-header bg-white'>
          <h5>Sale Order</h5>
        </div>
        <div className='card-body'>
          {/* <div className="table-responsive">
                                <table className="table table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">SO Number</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>SOT15</th>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/customer/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="paginator mt-3 d-flex align-items-center justify-content-between">
                                    <div className="paginaton-showing">
                                        Showing 10 Out of 100
                                    </div>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination mb-0">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">«</span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">»</span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div> */}
          <DataTable
            value={filteredData}
            stripedRows
            lazy
            loading={isLoading}
            showGridlines
            dataKey='id'
            responsiveLayout='stack'
            rows={paginationModel.pageSize}
            sortMode='single'
            emptyMessage='No Sales Order found.'
            tableClassName='table table-bordered table-hover mb-0'
            paginator
            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} records'
            paginatorClassName='dataTables_paginate paging_bootstrap_full_number mt-0'
            paginatorLeft={leftContent}
            onSort={onPageOrSortChange}
            onPage={onPageOrSortChange}
            first={paginationModel.first}
            totalRecords={saleOrderResponse?.pagination?.totalCount}
            // rowsPerPageOptions={pageSizeOption}
            sortField={paginationModel.sortField}
            sortOrder={paginationModel.sortOrder as SortOrder}
          >
            <Column
              field='orderNumber'
              header='Order No.'
              sortable
              sortField='orderNumber'
            />
            <Column
              field='orderDate'
              header='Order Date'
              sortable
              sortField='orderDate'
              body={(rowData) => formatDate(rowData?.orderDate, "dd MMM yyyy")}
            />
            <Column
              field='orderTotal'
              header='Total Amount'
              sortable
              sortField='orderTotal'
              body={(rowData) => formatCurrency(rowData?.orderTotal)}
            />
            <Column
              field='totalAmountReceived'
              header='Amount Received'
              sortable
              sortField='totalAmountReceived'
              body={(rowData) => formatCurrency(rowData?.totalAmountReceived)}
            />
            <Column
              field='saleOrderStatusName'
              header='Order Status'
              sortable
              sortField='saleOrderStatusId'
            />
            <Column
              field='paymentStatusName'
              header='Payment Status'
              sortable
              sortField='paymentStatusId'
            />
            <Column
              header='Action'
              sortable
              sortField='paymentStatusId'
              body={(rowData) => (
                <Link
                  href={`/customer/transactions/sales-order/details?saleOrderId=${rowData.id}`}
                  className='btn btn-saawree'
                >
                  View
                </Link>
              )}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default page;
