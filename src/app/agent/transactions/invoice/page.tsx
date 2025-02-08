/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { formatCurrency } from "@/core/helpers/helperFunctions";
import { InvoiceRecords } from "@/core/models/agentModel";
import { Filter, PaginationFilter } from "@/core/models/model";
import { FilterOption } from "@/core/models/saleOrderModel";
import { getInvoicesOfAgent } from "@/core/requests/agentRequests";
import { useQuery } from "@tanstack/react-query";
import { format, formatDate } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import Link from "next/link";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableStateEvent,
  SortOrder,
} from "primereact/datatable";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useImmer } from "use-immer";

const Page = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [isFilter, setIsFilter] = useState<boolean>();
  const [filterQuery, setFilterQuery] = useState({});
  const [filterOption, updateFilterOption] = useState<FilterOption>({
    filterDates: undefined,
  });
  const [paginationModel, setPaginationModel] = useImmer<PaginationFilter>({
    first: 0,
    pageNumber: 1,
    pageSize: 10,
    sortField: "",
    sortOrder: -1,
    orderBy: [],
    order: "" as "asc" | "desc",
  });

  const {
    data: invoicesListResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agents-invoice-list", paginationModel, filterQuery],
    queryFn: () => {
      return getInvoicesOfAgent({ ...filterQuery, ...paginationModel });
    },
  });

  const updateSearchFilters = () => {
    const filters: Filter[] = [];

    // if (filterOption?.filterOrderStatusId != undefined) {
    //   filters.push({
    //     field: "SaleOrderStatusId",
    //     operator: "eq",
    //     value: Number(filterOption?.filterOrderStatusId),
    //   });
    // }

    // if (filterOption?.filterPaymentStatusId != undefined) {
    //   filters.push({
    //     field: "PaymentStatusId",
    //     operator: "eq",
    //     value: Number(filterOption?.filterPaymentStatusId),
    //   });
    // }

    if (filterOption?.filterDates != undefined) {
      const orderDateFilters: Filter[] = [];
      if (filterOption?.filterDates?.[0] !== undefined) {
        const fromDate = toZonedTime(
          new Date(filterOption?.filterDates?.[0] as Date),
          "Asia/Kolkata"
        );
        orderDateFilters.push({
          field: "orderDate",
          operator: "gte",
          value: format(fromDate, "yyyy-MM-dd 00:00:00"),
        });
      }

      if (filterOption?.filterDates?.[1] === null) {
        const toDate = toZonedTime(
          new Date(filterOption.filterDates[0] as Date),
          "Asia/Kolkata"
        );

        orderDateFilters.push({
          field: "orderDate",
          operator: "lte",
          value: format(toDate, "yyyy-MM-dd 23:59:59"),
        });
      } else {
        const toDate = toZonedTime(
          new Date(filterOption.filterDates[1] as Date),
          "Asia/Kolkata"
        );

        orderDateFilters.push({
          field: "orderDate",
          operator: "lte",
          value: format(toDate, "yyyy-MM-dd 23:59:59"),
        });
      }

      filters.push({
        filters: orderDateFilters,
        logic: "and",
      });
    }

    if (filters.length > 1) {
      const newFilterQuery = {
        ...filterQuery,
        advancedFilter: {
          filters: filters,
          logic: "and",
        },
      };
      setFilterQuery(newFilterQuery);
    } else if (filters.length === 1) {
      const newFilterQuery = {
        ...filterQuery,
        advancedFilter: filters[0],
      };
      setFilterQuery(newFilterQuery);
    } else {
      const newFilterQuery = {
        ...filterQuery,
        advancedFilter: undefined,
      };
      setFilterQuery(newFilterQuery);
    }
  };

  const clearFilters = () => {
    setFilterQuery({
      keyword: "",
      advancedFilter: undefined,
    });
    updateFilterOption({
      filterDates: undefined,
      filterOrderStatusId: undefined,
      filterPaymentStatusId: undefined,
    });
    refetch();
  };
  const onPageOrSortChange = (event: DataTableStateEvent) => {
    setPaginationModel((draft) => {
      draft.pageNumber =
        event.page === undefined ? 1 : (event.page as number) + 1;
      draft.pageSize = event.rows;
      draft.first = event.first;
      draft.sortField = event.sortField;
      draft.order = event.sortField
        ? event.sortOrder === 1
          ? "asc"
          : "desc"
        : undefined;
      draft.orderBy = event.sortField
        ? [`${event.sortField} ${event.sortOrder === 1 ? "asc" : "desc"}`]
        : undefined;
    });
  };

  const filteredData = invoicesListResponse?.data?.filter(
    (item: InvoiceRecords) =>
      Object.values(item).some((value: any) => {
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(globalFilterValue.toLowerCase())
        );
      })
  );

  const rendorHeader = () => (
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
  );

  const header = rendorHeader();

  const leftContent = (
    <div className='paginaton-showing'>
      {`Showing ${
        (invoicesListResponse?.pagination?.totalCount as number) > 0
          ? (paginationModel.first as number) + 1
          : 0
      } to 
            ${Math.min(
              (invoicesListResponse?.pagination?.currentPage as number) *
                (invoicesListResponse?.pagination?.pageSize as number),
              invoicesListResponse?.pagination?.totalCount as number
            )} 
            out of ${invoicesListResponse?.pagination?.totalCount} Records`}
    </div>
  );
  return (
    <>
      <div className='card mb-2'>
        <div className='card-header align-items-center justify-content-between bg-white'>
          <h5>Filter</h5>
          {!isFilter ? (
            <BsChevronDown
              fontSize={20}
              onClick={() => {
                setIsFilter(!isFilter);
              }}
            />
          ) : (
            <BsChevronUp
              fontSize={20}
              onClick={() => {
                setIsFilter(!isFilter);
              }}
            />
          )}
        </div>
        {isFilter ? (
          <>
            <div className='card-body'>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <label htmlFor='date'>By Date</label>
                    <Calendar
                      value={filterOption?.filterDates as Date[]}
                      onChange={(e) => {
                        updateFilterOption({
                          ...filterOption,
                          filterDates: e.value as Date[],
                        });
                      }}
                      selectionMode='range'
                      placeholder='Select Order Date'
                      formatDateTime={(value) => format(value, "dd/MM/yyyy")}
                      readOnlyInput
                      hideOnRangeSelection
                      style={{ width: "20rem", height: "3rem" }}
                      showButtonBar
                      className='w-100'
                      inputClassName='form-control form-control-solid'
                    />
                  </div>
                </div>
                {/* <div className='col-md-4'>
                  <div className='form-group'>
                    <label htmlFor='all-status'>All Status</label>
                    <div className='search-category-dropdown'>
                      <select className='form-control'>
                        <option>Status 01</option>
                        <option>Status 02</option>
                        <option>Status 03</option>
                      </select>
                      <BsChevronDown className='drop-down-icon' />
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='form-group'>
                    <label htmlFor='all-payment-status'>
                      All Payment Status
                    </label>
                    <div className='search-category-dropdown'>
                      <select className='form-control'>
                        <option>Payment Status 01</option>
                        <option>Payment Status 02</option>
                        <option>Payment Status 03</option>
                      </select>
                      <BsChevronDown className='drop-down-icon' />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className='card-footer bg-white'>
              <div className='d-flex justify-content-end'>
                <button
                  className='btn btn-saawree mr-2'
                  id='btnSearch'
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
                <button
                  className='btn btn-saawree'
                  id='btnSearch'
                  onClick={updateSearchFilters}
                >
                  Search
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className='card shadow'>
        <div className='card-header bg-white'>
          <h5>Invoice</h5>
        </div>
        <div className='card-body'>
          <DataTable
            value={filteredData}
            stripedRows
            lazy
            loading={isLoading}
            showGridlines
            header={header}
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
            rowsPerPageOptions={[10, 20, 50, 100]}
            totalRecords={invoicesListResponse?.pagination?.totalCount}
            sortField={paginationModel.sortField}
            sortOrder={paginationModel.sortOrder as SortOrder}
          >
            <Column
              field='invoiceNumber'
              header='Invoice No.'
              sortable
              sortField='invoiceNumber'
            />
            <Column
              field='customerName'
              header='Customer Name'
              sortable
              sortField='customerName'
            />
            <Column
              field='invoiceDate'
              header='Invoice Date'
              sortable
              sortField='invoiceDate'
              body={(rowData) =>
                formatDate(rowData?.invoiceDate, "dd MMM yyyy")
              }
            />
            <Column
              field='orderTotal'
              header='Total Amount'
              sortable
              sortField='orderTotal'
              body={(rowData) => formatCurrency(rowData?.orderTotal)}
            />
            <Column
              field='invoiceStatusName'
              header='Invoice Status'
              body={(rowData) => formatCurrency(rowData?.invoiceStatusName)}
            />
            <Column
              header='Action'
              body={(rowData) => (
                <Link
                  href={`/agent/transactions/invoice/details?invoiceId=${rowData?.id}`}
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

export default Page;
