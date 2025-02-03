"use client";
import FilterSection from "@/core/component/FilterSection";
import ProductGridCard from "@/core/component/Products/ProductGridCard";
import ProductListCard from "@/core/component/Products/ProductListCard";
import { CategoryList, CheckBoxFilter } from "@/core/models/productModel";
import {
  getCategoryList,
  getColorList,
  getPolishingTypeList,
  getReadyStockProducts,
} from "@/core/requests/productsRequests";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { BsFilter, BsGrid, BsListUl } from "react-icons/bs";
import noProductImage from "@/assets/images/no-products-available.png";
import { useImmer } from "use-immer";
import Image from "next/image";
import Loading from "@/app/loading";
import { Session } from "next-auth";

const Page = () => {
  const searchParams = useSearchParams();

  const { data: session } = useSession();

  const [viewType, setViewType] = useState<string>("grid");

  const [categoryFilterList, setCategoryFilterList] = useState<CategoryList[]>(
    []
  );

  const [polishList, setPolishList] = useState<CheckBoxFilter[]>([]);

  const [selectedFilters, setSelectedFilters] = useState<{
    categoryIds: number[] | undefined;
    polishingTypeIds: number[] | undefined;
    colorIds: number[] | undefined;
  }>({
    categoryIds: [],
    polishingTypeIds: [],
    colorIds: [],
  });

  const [colorList, setColorList] = useState<CheckBoxFilter[]>([]);

  const [paginationFilters, setPaginationFilters] = useImmer<{
    pageNumber: number;
    pageSize: number;
    orderBy: string[];
  }>({
    pageNumber: 1,
    pageSize: 12,
    orderBy: [],
  });

  // const categoryId = searchParams.get("categoryId");
  const categoryName = searchParams.get("categoryName");

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
      : sortOptions.filter((item) => item.show === "always");
  const { data: response, isLoading } = useQuery({
    queryKey: [
      "getReadyStockProductRecords",
      paginationFilters,
      selectedFilters,
    ],
    queryFn: async () => {
      return await getReadyStockProducts({
        ...selectedFilters,
        ...paginationFilters,
        colorIds:
          (selectedFilters?.colorIds?.length as number) >= 1
            ? selectedFilters?.colorIds
            : undefined,
        polishingTypeIds:
          (selectedFilters.polishingTypeIds?.length as number) >= 1
            ? selectedFilters?.polishingTypeIds
            : undefined,
        categoryIds:
          (selectedFilters.categoryIds?.length as number) >= 1
            ? selectedFilters?.categoryIds
            : undefined,
        orderBy:
          paginationFilters.orderBy?.length >= 1 &&
          paginationFilters.orderBy[0] !== undefined
            ? paginationFilters?.orderBy
            : undefined,
      });
    },
    refetchOnWindowFocus: false,
  });

  const { data: categoryList, isLoading: isCategoryListLoading } = useQuery({
    queryKey: ["categoryList"],
    queryFn: () => getCategoryList(),
  });
  const { data: polishTypeList, isLoading: isPolishTypeListLoading } = useQuery(
    {
      queryKey: ["polishTypeList"],
      queryFn: () => getPolishingTypeList(),
    }
  );
  const { data: colorTypeList, isLoading: isColorTypeListLoading } = useQuery({
    queryKey: ["colorTypeList"],
    queryFn: () => getColorList(),
  });

  useEffect(() => {
    const result: { id: number; name: string }[] = [];
    polishTypeList?.map((t) =>
      result.push({ ...polishList, id: t.id as number, name: t.name as string })
    );

    const colors: { id: number; name: string }[] = [];
    colorTypeList?.map((t) =>
      colors.push({ ...colorList, id: t.id, name: t.printName })
    );
    const mulitiFilter: CategoryList[] = [];
    categoryList?.map((t) =>
      mulitiFilter.push({
        id: t.id as number,
        name: t.name as string,
        isParent: t.isParent,
        parentCategoryId: t.parentCategoryId,
        hasChild: t.hasChild,
      })
    );
    setColorList(colors);
    setPolishList(result);
    setCategoryFilterList(mulitiFilter);
  }, [
    isPolishTypeListLoading,
    isColorTypeListLoading,
    isCategoryListLoading,
    // polishTypeList,
    // colorTypeList,
    // categoryList,
    // polishList,
    // colorList,
  ]);

  const handleCategoryChange = (id: number) => {
    const catList = selectedFilters?.categoryIds;
    if (catList?.includes(id)) {
      return setSelectedFilters({
        ...selectedFilters,
        categoryIds: catList.filter((item) => item !== id),
      });
    } else {
      categoryFilterList?.map((item: { id: number }) => {
        if (item?.id === id) {
          catList?.push(id);
          return setSelectedFilters({
            ...selectedFilters,
            categoryIds: catList,
          });
        }
      });
    }
  };
  const handlePolishChange = (id: number) => {
    const poList = selectedFilters?.polishingTypeIds;
    if (poList?.includes(id)) {
      return setSelectedFilters({
        ...selectedFilters,
        polishingTypeIds: poList?.filter((item) => item !== id),
      });
    } else {
      polishList?.map((item: { id: number }) => {
        if (item?.id === id) {
          poList?.push(id);
          return setSelectedFilters({
            ...selectedFilters,
            polishingTypeIds: poList,
          });
        }
      });
    }
  };
  const handleColorChange = (id: number) => {
    const cList = selectedFilters?.colorIds;
    if (cList?.includes(id)) {
      return setSelectedFilters({
        ...selectedFilters,
        colorIds: cList?.filter((item) => item !== id),
      });
    } else {
      colorList?.map((item: { id: number }) => {
        if (item?.id === id) {
          cList?.push(id);
          return setSelectedFilters({
            ...selectedFilters,
            colorIds: cList,
          });
        }
      });
    }
  };

  const onLoadMore = () => {
    setPaginationFilters((draft) => {
      draft.pageNumber = paginationFilters?.pageNumber + 1;
      draft.pageSize = 12;
    });
  };

  const onSort = (value: string) => {
    const newOrderBy: string[] = [];
    newOrderBy.push(value);
    setPaginationFilters((draft) => {
      return draft.pageNumber, draft.pageSize, (draft.orderBy = newOrderBy);
    });
  };
  if (
    isCategoryListLoading ||
    isPolishTypeListLoading ||
    isColorTypeListLoading ||
    isLoading
  )
    return <Loading />;

  return (
    <>
      <section className='page-title-box'>
        <div className='container'>
          <h1 className='page-title'>{categoryName}</h1>
        </div>
      </section>
      <section className='category-page'>
        <div className='container'>
          <div className='category-wraper row'>
            <div className='filter-side-bar col-xl-4 col-lg-4 col-md-6 mt-4'>
              <div className='sidebar-inner'>
                <div className='close-filter'>
                  <i className='bi bi-x-circle'></i>
                </div>
                <FilterSection
                  title='Filter by Category'
                  type='multi'
                  multiFilter={categoryFilterList}
                  onChange={handleCategoryChange}
                  selectedFilter={selectedFilters?.categoryIds || []}
                />
                <FilterSection
                  title='Polishing Type'
                  type='single'
                  filterList={polishList}
                  onChange={handlePolishChange}
                  selectedFilter={selectedFilters?.polishingTypeIds || []}
                />
                <FilterSection
                  title='Color Type'
                  type='single'
                  filterList={colorList}
                  onChange={handleColorChange}
                  selectedFilter={selectedFilters?.colorIds || []}
                />
              </div>
            </div>
            <div className='products-bar col-xl-8 col-lg-8 col-md-12 mt-4 mb-4'>
              <div className='categ-top-bar d-flex align-items-center justify-content-between'>
                <div className='left-side-content'>
                  <span className='only-for-responsive'>
                    <BsFilter fontSize={18} />
                  </span>
                  Showing all {response?.data?.length} results
                </div>
                <div className='d-flex'>
                  <div className='right-side-bar'>
                    <label className='mr-2'>Sort by </label>
                    <Dropdown
                      value={
                        paginationFilters?.orderBy?.[0] || sortList[0]?.value
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
                </div>
              </div>

              {response?.data?.length === 0 ? (
                <div className='empty-list text-center py-10'>
                  {/* <BsPatchExclamationFill size={60} className='img-fluid text-muted' /> */}
                  <Image src={noProductImage.src} width={300} alt='noProduct' />
                  <h4 className='mt-2 text-muted'>No Products Found.</h4>
                  <p>Your search did not match any products</p>
                  <p>Please ty again.</p>
                  <Link href='' className='btn btn-saawree mt-2'>
                    Clear Filter
                  </Link>
                </div>
              ) : (
                <>
                  {viewType === "grid" && (
                    <div className='row'>
                      {response?.data?.map((product) => (
                        <div
                          className='col-6 col-sm-6 col-md-4 col-lg-4'
                          key={product?.productId}
                        >
                          <ProductGridCard
                            product={product}
                            session={session as Session}
                            type={"rds"}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {viewType === "list" && (
                    <div className='products-list-wrap'>
                      {response?.data?.map((product) => (
                        <>
                          <ProductListCard
                            product={product}
                            session={session as Session}
                            type={"rds"}
                          />
                        </>
                      ))}
                    </div>
                  )}
                  <div className='load-more w-100 text-center mt-5'>
                    <button
                      className='btn btn-saawree-outline'
                      onClick={onLoadMore}
                    >
                      Load More
                    </button>
                  </div>
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
