"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { Filter, PaginationFilter } from "@/core/models/model";
import { FilterOption, SaleOrderDto } from "@/core/models/saleOrderModel";
import {
  getPaymentStatus,
  getSaleOrdersOfCustomer,
  getSaleOrderStatus,
} from "@/core/requests/saleOrderRequests";
import { useQuery } from "@tanstack/react-query";
import { format, formatDate } from "date-fns";
import Link from "next/link";
import { Column } from "primereact/column";
import { toZonedTime } from "date-fns-tz";
import {
  DataTable,
  DataTableStateEvent,
  SortOrder,
} from "primereact/datatable";
import React, { useState } from "react";
import { useImmer } from "use-immer";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Calendar } from "primereact/calendar";

const page = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filterOption, updateFilterOption] = useState<FilterOption>({
    filterDates: undefined,
    filterOrderStatusId: undefined,
    filterPaymentStatusId: undefined,
  });
  const [filterQuery, setFilterQuery] = useState({});

  // const [isCustomDate, setIsCustomDate] = useState(false);
  const [isFilter, setIsFilter] = useState<boolean>();
  const [paginationModel, setPaginationModel] = useImmer<PaginationFilter>({
    first: 0,
    pageNumber: 1,
    pageSize: 3,
    sortField: "",
    sortOrder: -1,
    orderBy: [],
  });

  const {
    data: saleOrderResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sales-order-list", paginationModel, filterQuery],
    queryFn: () => {
      return getSaleOrdersOfCustomer({ ...filterQuery, ...paginationModel });
    },
  });

  const { data: statusList } = useQuery({
    queryKey: ["statusList"],
    queryFn: () => getSaleOrderStatus(),
    refetchOnWindowFocus: false,
  });
  const { data: paymentStatusList } = useQuery({
    queryKey: ["paymentStatusList"],
    queryFn: () => getPaymentStatus(),
    refetchOnWindowFocus: false,
  });

  const updateSearchFilters = () => {
    let filters: Filter[] = [];

    if (filterOption?.filterOrderStatusId != undefined) {
      filters.push({
        field: "SaleOrderStatusId",
        operator: "eq",
        value: Number(filterOption?.filterOrderStatusId),
      });
    }

    if (filterOption?.filterPaymentStatusId != undefined) {
      filters.push({
        field: "PaymentStatusId",
        operator: "eq",
        value: Number(filterOption?.filterPaymentStatusId),
      });
    }

    if (filterOption?.filterDates != undefined) {
      let orderDateFilters: Filter[] = [];
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
        <div className='card-header bg-white'>
          <div className='d-flex justify-content-between w-100 align-items-center'>
            <h5 className='mb-0'>Filter</h5>
            {!isFilter ? (
              <BsChevronDown
                fontSize={20}
                onClick={() => {
                  setIsFilter(!isFilter);
                }}
                className='cursor-pointer'
              />
            ) : (
              <BsChevronUp
                fontSize={20}
                onClick={() => {
                  setIsFilter(!isFilter);
                }}
                className='cursor-pointer'
              />
            )}
          </div>
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
                <div className='col-md-4'>
                  <div className='form-group'>
                    <label htmlFor='all-status'>All Status</label>
                    <div className='search-category-dropdown'>
                      <select
                        className='form-control'
                        onChange={(e) =>
                          updateFilterOption({
                            ...filterOption,
                            filterOrderStatusId: Number(e.target.value),
                          })
                        }
                      >
                        <option value={undefined}>order status</option>
                        {statusList?.map((status) => (
                          <option value={status?.id} key={status?.id}>
                            {status?.name}
                          </option>
                        ))}
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
                      <select
                        className='form-control'
                        onChange={(e) =>
                          updateFilterOption({
                            ...filterOption,
                            filterPaymentStatusId: Number(e.target.value),
                          })
                        }
                      >
                        <option value={undefined}>payment status</option>
                        {paymentStatusList?.map((status) => (
                          <option value={status?.id} key={status?.id}>
                            {status?.name}
                          </option>
                        ))}
                      </select>
                      <BsChevronDown className='drop-down-icon' />
                    </div>
                  </div>
                </div>
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
          <h5>Sale Order</h5>
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
            totalRecords={saleOrderResponse?.pagination?.totalCount}
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
              body={(rowData) => (
                <Link
                  href={`/customer/transactions/sales-order/details?saleOrderId=${rowData?.id}`}
                  className='btn btn-saawree'
                >
                  View
                </Link>
              )}
            />
          </DataTable>
        </div>
      </div>

      {/* <CustomDateSelectModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        updateSearchFilters={updateSearchFilters}
      /> */}
    </>
  );
};

export default page;
