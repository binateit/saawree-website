"use client";
import { dateOptions, formatCurrency } from "@/core/helpers/helperFunctions";
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
import CustomDateSelectModal from "@/core/component/modal/CustomDateSelectModal";

const page = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [showDropDown, setShowDropDown] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterOption, updateFilterOption] = useState<FilterOption>({
    filterDates: undefined,
    filterOrderStatusId: undefined,
    filterPaymentStatusId: undefined,
  });
  const [filterQuery, setFilterQuery] = useState({});

  const [isCustomDate, setIsCustomDate] = useState(false);
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
  // const handleDateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   if (e.target.value === "custom") {
  //     setIsCustomDate(true);
  //     return;
  //   } else {
  //     setIsCustomDate(false);
  //   }
  //   const selectedDate = JSON.parse(e.target.value);

  //   const startDate = toZonedTime(new Date(selectedDate.from), "Asia/Kolkata");
  //   const endDate = toZonedTime(new Date(selectedDate.to), "Asia/Kolkata");
  //   updateFilterOption({
  //     ...filterOption,
  //     filterDates: {
  //       format(startDate, "yyyy-MM-dd"),
  //      format(endDate, "yyyy-MM-dd"),
  //     },
  //   });
  // };

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const handleDateChange = async (dateValue: any) => {
    if (dateValue === "custom") {
      setIsCustomDate(true);
      openModal();
      return;
    } else {
      setIsCustomDate(false);
      const selectedDate = dateValue;

      const startDate = toZonedTime(
        new Date(selectedDate.from),
        "Asia/Kolkata"
      );
      const endDate = toZonedTime(new Date(selectedDate.to), "Asia/Kolkata");
      updateFilterOption({
        ...filterOption,
        filterDates: [
          format(startDate, "yyyy-MM-dd"),
          format(endDate, "yyyy-MM-dd"),
        ],
      });
      setShowDropDown("");
    }
  };

  const handleCustomDateChange = (dates: any) => {
    // if (dates.length !== 2) return;

    const startDate = toZonedTime(dates.from, "Asia/Kolkata");
    const endDate = toZonedTime(dates.end, "Asia/Kolkata");
    updateFilterOption({
      ...filterOption,
      filterDates: [
        format(startDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd"),
      ],
    });
    setShowDropDown("");
  };

  console.log(filterQuery);
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
                className='btn-group relative'
                aria-label='Button group with nested dropdown'
              >
                <div className='btn-group d-flex flex-column'>
                  <div
                    className='btn btn-saawree-outline dropdown-toggle'
                    onClick={() => setShowDropDown("dates")}
                  >
                    By Date
                  </div>
                  <div className='button-group-dropdown'>
                    {showDropDown === "dates" && (
                      <>
                        {dateOptions?.map((date) => (
                          <div
                            className='dropdown-item'
                            onClick={() => {
                              handleDateChange(date?.value);
                              updateSearchFilters();
                              setShowDropDown("");
                            }}
                          >
                            {date?.label}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className='btn-group' role='group'>
                  <div
                    className='btn btn-saawree-outline dropdown-toggle'
                    onClick={() => setShowDropDown("status")}
                  >
                    Status
                  </div>
                  <div className='dropdown-menu'>
                    {showDropDown === "status" && (
                      <>
                        {statusList?.map((status) => (
                          <div
                            onClick={() => {
                              updateFilterOption({
                                ...filterOption,
                                filterOrderStatusId: status?.id,
                              });
                              updateSearchFilters();
                              setShowDropDown("");
                            }}
                          >
                            {status.name}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className='btn-group' role='group'>
                  <div
                    className='btn btn-saawree-outline dropdown-toggle'
                    onClick={() => setShowDropDown("payment-status")}
                  >
                    Payment Status
                  </div>
                  <div className='dropdown-menu'>
                    {showDropDown === "payment-status" && (
                      <>
                        {paymentStatusList?.map((paymentStatus) => (
                          <div
                            className='dropdown-item'
                            onClick={() => {
                              updateFilterOption({
                                ...filterOption,
                                filterOrderStatusId: paymentStatus?.id,
                              });
                              updateSearchFilters();
                              setShowDropDown("");
                            }}
                          >
                            {paymentStatus.name}
                          </div>
                        ))}
                      </>
                    )}
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

      <CustomDateSelectModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleCustomDateChange={handleCustomDateChange}
        updateSearchFilters={updateSearchFilters}
      />
    </>
  );
};

export default page;
