"use client";
import { CustomersOfAgent } from "@/core/models/agentModel";
import { CustomerFilters } from "@/core/models/customerModel";
import { Filter, PaginationFilter } from "@/core/models/model";
import { getCustomerOfAgent } from "@/core/requests/agentRequests";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
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
  const [isFilter, setIsFilter] = useState<boolean>();
  const [filterQuery, setFilterQuery] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [filterOption, updateFilterOption] = useState<CustomerFilters>({
    filterPrintName: undefined,
    filterEmailAddress: undefined,
    filterMobileNumber: undefined,
  });
  const [paginationModel, setPaginationModel] = useImmer<PaginationFilter>({
    first: 0,
    pageNumber: 1,
    pageSize: 3,
    sortField: "",
    sortOrder: -1,
    orderBy: [],
    order: "" as "asc" | "desc",
  });

  const {
    data: customersListResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agent-customers-list", filterQuery, paginationModel],
    queryFn: () => {
      return getCustomerOfAgent({ ...filterQuery, ...paginationModel });
    },
  });

  const updateSearchFilters = () => {
    const filters: Filter[] = [];

    if (filterOption?.filterPrintName != undefined) {
      filters.push({
        field: "printName",
        operator: "contains",
        value: filterOption?.filterPrintName,
      });
    }

    if (filterOption?.filterEmailAddress != undefined) {
      filters.push({
        field: "emailAddress",
        operator: "contains",
        value: filterOption?.filterEmailAddress,
      });
    }
    if (filterOption?.filterMobileNumber != undefined) {
      filters.push({
        field: "mobileNumber",
        operator: "contains",
        value: filterOption?.filterMobileNumber,
      });
    }

    // if (filterOption?.filterPaymentStatusId != undefined) {
    //   filters.push({
    //     field: "PaymentStatusId",
    //     operator: "eq",
    //     value: Number(filterOption?.filterPaymentStatusId),
    //   });
    // }

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
      filterPrintName: "",
      filterEmailAddress: "",
      filterMobileNumber: "",
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
      draft.order = event?.sortField && event.sortOrder === 1 ? "asc" : "desc";
      draft.orderBy = [
        event.sortField &&
          `${event.sortField} ${event.sortOrder === 1 ? "asc" : "desc"}`,
      ];
    });
  };

  const filteredData = customersListResponse?.data?.filter(
    (item: CustomersOfAgent) =>
      Object.values(item).some((value) => {
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
        (customersListResponse?.pagination?.totalCount as number) > 0
          ? (paginationModel.first as number) + 1
          : 0
      } to 
              ${Math.min(
                (customersListResponse?.pagination?.currentPage as number) *
                  (customersListResponse?.pagination?.pageSize as number),
                customersListResponse?.pagination?.totalCount as number
              )} 
              out of ${customersListResponse?.pagination?.totalCount} Records`}
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
              <form>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor='all-status'>Customer Name</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Customer Name'
                        value={filterOption?.filterPrintName}
                        onChange={(e) =>
                          updateFilterOption({
                            ...filterOption,
                            filterPrintName: e?.target?.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor='all-status'>Customer Email</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Customer Email'
                        value={filterOption?.filterEmailAddress}
                        onChange={(e) =>
                          updateFilterOption({
                            ...filterOption,
                            filterEmailAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='form-group'>
                      <label htmlFor='all-status'>Customer Mobile</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='Customer Mobile'
                        value={filterOption?.filterMobileNumber}
                        onChange={(e) =>
                          updateFilterOption({
                            ...filterOption,
                            filterMobileNumber: e?.target?.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
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
          <h5>Customers</h5>
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
            emptyMessage='No Payment Order found.'
            tableClassName='table table-bordered table-hover mb-0'
            paginator
            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} records'
            paginatorClassName='dataTables_paginate paging_bootstrap_full_number mt-0'
            paginatorLeft={leftContent}
            onSort={onPageOrSortChange}
            onPage={onPageOrSortChange}
            first={paginationModel.first}
            totalRecords={customersListResponse?.pagination?.totalCount}
            sortField={paginationModel.sortField}
            sortOrder={paginationModel.sortOrder as SortOrder}
          >
            <Column
              field='printName'
              header='Customer Name'
              sortable
              sortField='printName'
            />
            <Column
              field='mobileNumber'
              header='Mobile Number'
              sortable
              sortField='mobileNumber'
            />
            <Column
              field='emailAddress'
              header='Email Address'
              sortable
              sortField='emailAddress'
            />
            <Column
              field='accountStatusName'
              header='Status'
              sortable
              sortField='accountStatusName'
            />
            <Column
              header='Action'
              body={(rowData) => (
                <Link
                  href={`/agent/transactions/customers/details?customerId=${rowData?.id}`}
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
