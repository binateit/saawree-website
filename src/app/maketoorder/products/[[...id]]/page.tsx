/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FilterSection from "@/core/component/FilterSection";
import ProductGridCard from "@/core/component/Products/ProductGridCard";
import ProductListCard from "@/core/component/Products/ProductListCard";
import { CategoryList } from "@/core/models/productModel";
import {
  getMaketoOrderProducts,
  getMTOCategoryList,
} from "@/core/requests/productsRequests";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { BsFilter, BsGrid, BsListUl, BsXCircle } from "react-icons/bs";
import noProductImage from "@/assets/images/no-products-available.png";
import { useImmer } from "use-immer";
import pageTitleBgImage from "../../../../assets/images/page-title-bg2.jpg";
import Image from "next/image";
import Loading from "@/app/loading";
import { Session } from "next-auth";
import {
  Paginator,
  PaginatorPageChangeEvent,
  PaginatorRowsPerPageDropdownOptions,
} from "primereact/paginator";
import customLoader from "@/core/component/shared/image-loader";

const Page = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subCategoryName = searchParams.get("subCategoryName");
  const { data: session } = useSession();

  const [viewType, setViewType] = useState<string>("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [categoryFilterList, setCategoryFilterList] = useState<CategoryList[]>(
    []
  );

  const [selectedFilters, setSelectedFilters] = useState<any>();

  const [paginationFilters, setPaginationFilters] = useImmer<{
    pageNumber: number;
    pageSize: number;
    orderBy: string[];
    first: number;
  }>({
    pageNumber: 1,
    pageSize: 12,
    orderBy: [],
    first: 0,
  });

  const sortOptions = [
    { name: "Alphabetically A-Z", value: "Name asc", show: "always" },
    { name: "Alphabetically Z-A", value: "Name desc", show: "always" },
    {
      name: "Price low to high",
      value: "ProductPrice asc",
      show: "onlyLoggedin",
    },
    {
      name: "Price high to low",
      value: "ProductPrice desc",
      show: "onlyLoggedin",
    },
  ];

  const sortList =
    session?.user !== undefined
      ? sortOptions
      : sortOptions?.filter((item) => item.show === "always");

  const { data: response, isLoading } = useQuery({
    queryKey: [
      "geMakeToOrderProductRecords",
      paginationFilters,
      selectedFilters,
    ],
    queryFn: async () => {
      return await getMaketoOrderProducts({
        ...selectedFilters,
        ...paginationFilters,
        categoryIds:
          selectedFilters?.categoryIds?.length >= 1
            ? selectedFilters?.categoryIds
            : undefined,
        orderBy:
          paginationFilters?.orderBy?.length >= 1 &&
          paginationFilters?.orderBy[0] !== undefined
            ? paginationFilters?.orderBy
            : undefined,
      });
    },
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const { data: categoryList, isLoading: isCategoryListLoading } = useQuery({
    queryKey: ["categoryList", categoryId],
    queryFn: () => getMTOCategoryList(),
  });

  useEffect(() => {
    const mulitiFilter: any = [];
    categoryList?.map((t) =>
      mulitiFilter.push({
        id: t?.id,
        name: t?.name,
        isParent: t?.isParent,
        parentCategoryId: t?.parentCategoryId,
        hasChild: t?.hasChild,
      })
    );
    setCategoryFilterList(mulitiFilter);

    const parentCategorySelected = mulitiFilter?.filter(
      (cat: CategoryList) =>
        cat?.id === Number(categoryId) && cat?.hasChild === true
    );

    if (parentCategorySelected.length > 0) {
      const allSubCat = mulitiFilter
        ?.filter(
          (item: CategoryList) => item?.parentCategoryId === Number(categoryId)
        )
        ?.map((cat: CategoryList) => cat?.id);
      setSelectedFilters({
        categoryIds: [...allSubCat, Number(categoryId)],
      });
    } else {
      setSelectedFilters({
        categoryIds: [categoryId ? Number(categoryId) : undefined],
      });
    }
  }, [categoryList, isCategoryListLoading]);

  const handleCategoryChange = (id: number, status: any) => {
    const catList = selectedFilters?.categoryIds;
    const parentCategorySelected = categoryFilterList?.filter(
      (cat) => cat?.id === id && cat?.hasChild === true
    );

    if (status) {
      if (parentCategorySelected.length == 0) {
        catList.push(id);
        return setSelectedFilters({
          ...selectedFilters,
          categoryIds: catList,
        });
      } else {
        catList.push(id);
        categoryFilterList
          ?.filter((item) => item?.parentCategoryId === id)
          ?.map((cat) => catList.push(cat?.id));

        return setSelectedFilters({
          ...selectedFilters,
          categoryIds: catList,
        });
      }
    } else {
      if (parentCategorySelected.length == 0) {
        return setSelectedFilters({
          ...selectedFilters,
          categoryIds: catList.filter((x: number) => x != id),
        });
      } else {
        const parentCategoryIndex = catList.indexOf(id);
        if (parentCategoryIndex > -1) catList.splice(parentCategoryIndex, 1);

        categoryFilterList
          ?.filter((item) => item?.parentCategoryId === id)
          ?.map((cat) => {
            const a = catList.indexOf(cat?.id);
            if (a > -1) {
              catList.splice(a, 1);
            }
          });

        return setSelectedFilters({
          ...selectedFilters,
          categoryIds: catList,
        });
      }
    }
  };

  const onPageOrSortChange = (event: PaginatorPageChangeEvent) => {
    setPaginationFilters((draft) => {
      draft.pageNumber =
        event.page === undefined ? 1 : (event.page as number) + 1;
      draft.pageSize = event.rows;
      draft.first = event.first;
    });
  };

  const paginatorTemplate = {
    layout:
      "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
      const dropdownOptions = [
        { label: 12, value: 12 },
        { label: 20, value: 20 },
      ];
      return (
        <div className='flex align-items-center'>
          <>
            <span className='mx-1'>Products per page: </span>
            <Dropdown
              value={options.value}
              options={dropdownOptions}
              onChange={options.onChange}
            />
          </>
        </div>
      );
    },
  };

  const onSort = (value: string) => {
    const newOrderBy: string[] = [];
    newOrderBy.push(value);
    setPaginationFilters(() => {
      return {
        ...paginationFilters,
        orderBy: newOrderBy,
      };
    });
  };

  if (isCategoryListLoading) return <Loading />;

  return (
    <>
      <section
        className='page-title-box'
        style={{
          backgroundColor: "rgb(0, 0, 0, 0.5)",
          backgroundImage: `url(${pageTitleBgImage.src})`,
        }}
      >
        <div className='container'>
          <h1 className='page-title'>{subCategoryName}</h1>
        </div>
      </section>
      <section className='category-page'>
        <div className='container'>
          <div className='category-wraper row'>
            <div
              className={`filter-side-bar col-xl-4 col-lg-4 col-md-6 mt-4 ${
                showFilters ? "show" : ""
              }`}
            >
              <div className='sidebar-inner'>
                <div className='close-filter'>
                  <BsXCircle
                    fontSize={18}
                    onClick={() => setShowFilters(false)}
                  />
                </div>
                {categoryFilterList
                  ?.filter((cat) => cat?.parentCategoryId === null)
                  .map((category) => (
                    <FilterSection
                      key={category?.id}
                      title={`Filter by ${category?.name}`}
                      type='multi'
                      multiFilter={categoryFilterList?.filter(
                        (c) => c.parentCategoryId === category?.id
                      )}
                      categoryList={categoryFilterList}
                      onChange={handleCategoryChange}
                      selectedFilter={selectedFilters?.categoryIds || []}
                      parentCategoryId={Number(categoryId)}
                    />
                  ))}
              </div>
            </div>
            <div className='products-bar col-xl-8 col-lg-8 col-md-12 mt-4 mb-4'>
              <div className='categ-top-bar d-flex align-items-center justify-content-between'>
                <div className='left-side-content'>
                  <div
                    className='only-for-responsive'
                    onClick={() => setShowFilters(true)}
                  >
                    <BsFilter fontSize={18} />
                  </div>
                  {(response?.data?.length || 0) > 0
                    ? `Showing ${paginationFilters?.first + 1} to${" "}
                  ${
                    paginationFilters?.first + (response?.data?.length || 0)
                  } of${" "}
                  ${response?.pagination?.totalCount} products`
                    : ""}
                </div>
                <div className='d-flex'>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <div className='right-side-bar'>
                        <label className='mr-2'>Sort by </label>
                        <Dropdown
                          value={
                            paginationFilters?.orderBy?.[0] ||
                            sortList[0]?.value
                          }
                          onChange={(e) => onSort(e.value)}
                          options={sortList}
                          optionLabel='name'
                          placeholder='Select options'
                          panelClassName='custom-dropDown-panel'
                        />
                      </div>
                      <div className='list-grid d-flex'>
                        <div
                          onClick={() => setViewType("grid")}
                          className='list-grid-link'
                        >
                          <BsGrid cursor={"pointer"} />
                        </div>
                        <div
                          onClick={() => setViewType("list")}
                          className='list-grid-link'
                        >
                          <BsListUl cursor={"pointer"} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {response?.data?.length === 0 ? (
                <div className='empty-list text-center py-10'>
                  {/* <BsPatchExclamationFill size={60} className='img-fluid text-muted' /> */}
                  <Image
                    loader={customLoader}
                    src={noProductImage.src}
                    width={300}
                    height={300}
                    alt='noProduct'
                  />
                  <h4 className='mt-2 text-muted'>No Products Found.</h4>
                  <p>Your search did not match any products</p>
                  <p>Please ty again.</p>
                  <button
                    className='btn btn-saawree mt-2'
                    onClick={() => setSelectedFilters({})}
                  >
                    Clear Filter
                  </button>
                </div>
              ) : (
                <>
                  {viewType === "grid" && (
                    <>
                      <div className='row'>
                        {response?.data?.map((product) => (
                          <div
                            className='col-6 col-sm-6 col-md-4 col-lg-4 mb-4'
                            key={product?.productId}
                          >
                            <ProductGridCard
                              product={product}
                              session={session as Session}
                              type={"mto"}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {viewType === "list" && (
                    <div className='products-list-wrap'>
                      {response?.data?.map((product) => (
                        <div key={product?.productId}>
                          <ProductListCard
                            product={product}
                            session={session as Session}
                            type={"mto"}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <Paginator
                    template={paginatorTemplate}
                    first={paginationFilters?.first}
                    rows={paginationFilters?.pageSize}
                    totalRecords={response?.pagination?.totalCount}
                    rowsPerPageOptions={[12, 20, 30]}
                    onPageChange={onPageOrSortChange}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
