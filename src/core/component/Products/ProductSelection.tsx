"use client";
import { ColorDetails } from "@/core/models/agentModel";
import {
  PaginationFilter,
  Product,
  SelectOptionProps,
} from "@/core/models/model";
import { Category } from "@/core/models/productModel";
import { PolishingType, ProductGroup } from "@/core/models/saleOrderModel";
import { getProductById } from "@/core/requests/productsRequests";
import {
  getCategoryList,
  getPolishingTypeList,
  getProductColor,
  getProductGroupList,
} from "@/core/requests/saleOrderRequests";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import customLoader from "../shared/image-loader";

const paginationFilter: PaginationFilter = {
  pageNumber: 1,
  pageSize: 500,
  advancedFilter: {
    field: "isActive",
    operator: "eq",
    value: true,
  },
};
interface ProductSelectionProps {
  onSelect: (newValue: Product, quantity: number) => void;
}

const ProductSelection = ({ onSelect }: ProductSelectionProps) => {
  const [categoryList, setCategoryList] = useState<SelectOptionProps[]>([]);
  const [productGroupList, setProductGroupList] = useState<SelectOptionProps[]>(
    []
  );
  const [selectedProductGroup, setSelectedProductGroup] = useState<
    number | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [polishId, setPolishId] = useState<number | null>(null);
  const [colorList, setColorList] = useState<ColorDetails[]>([]);
  const [polishingTypeList, setPolishingTypeList] = useState<
    SelectOptionProps[]
  >([]);
  const [quantities, setQuantities] = useState<{ [colorId: number]: number }>(
    {}
  ); //state to store color quantity

  useEffect(() => {
    const updatedPaginationFilter: PaginationFilter = {
      ...paginationFilter,
      advancedFilter: {
        field: "isActive",
        operator: "eq",
        value: true,
      },
    };
    getCategoryList(updatedPaginationFilter).then((v) => {
      const result = v.data as Category[];
      const categoryArray: SelectOptionProps[] = [];
      result.map((item: Category) => {
        categoryArray.push({
          value: item.id as number,
          label: item?.parentCategoryName as string,
        });
      });
      setCategoryList(categoryArray);
    });

    getPolishingTypeList(paginationFilter).then((v) => {
      const result = v.data as PolishingType[];
      const polishingTypeArray: SelectOptionProps[] = [];
      result
        .filter((x: PolishingType) => x.name != "NA")
        .map((item: PolishingType) => {
          return polishingTypeArray.push({
            value: item.id as number,
            label: item.name as string,
          });
        });
      setPolishingTypeList(polishingTypeArray);
    });
  }, [selectedCategory]);

  const onCategoryChange = (e: number) => {
    const updatedPaginationFilter: PaginationFilter = {
      ...paginationFilter,
      advancedFilter: {
        filters: [
          { field: "isActive", operator: "eq", value: true },

          {
            field: "categoryId",
            operator: "eq",
            value: e,
          },
        ],
        logic: "and",
      },
    };

    getProductGroupList(updatedPaginationFilter)
      .then((response) => {
        const result = response.data as ProductGroup[];
        const pgArray: SelectOptionProps[] = [];
        result.map((item) => {
          return pgArray.push({
            value: item.id as number,
            label: item.name as string,
          });
        });

        setProductGroupList(pgArray);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearch = () => {
    getProductColor(selectedProductGroup as number, polishId as number).then(
      (response) => {
        const result = response as ColorDetails[];
        if (result.length > 0) {
          setColorList(result);
        }
      }
    );
  };

  const handlePolishingChange = (e: number) => {
    setPolishId(e);
  };

  const handleQuantityChange = (colorId: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [colorId]: quantity,
    }));
  };

  const handleAddClick = () => {
    colorList.forEach(async (color) => {
      const quantity = quantities[color.colorId];

      if (quantity != undefined && quantity != null && quantity > 0) {
        try {
          const product = await getProductById(color.productId);
          onSelect(product as Product, quantity);
        } catch (err) {
          console.error(
            `Error fetching product by ID ${color.productId}:`,
            err
          );
        }
      }
    });

    setSelectedProductGroup(null);
    setSelectedCategory(null);
    setPolishId(null);
    setPolishingTypeList([]);
    setColorList([]);
    setQuantities({});
  };

  const clearFilters = () => {
    setSelectedProductGroup(null);
    setSelectedCategory(null);
    setPolishId(null);
    setPolishingTypeList([]);
    setColorList([]);
  };

  return (
    <>
      {/* <div className='search-items relative'>
        <input
          type='text'
          className='form-control pl-5'
          placeholder='Scan / Search Products by name and code'
        />
        <BsSearch className='search-icon' />
      </div> */}
      <div className='row mt-4 align-items-end'>
        <div className='col-xl-3 col-lg-3 col-md-6 mb-3 md-pr-0'>
          <label>Product Category</label>
          <Select
            name='categoryList'
            className='react-select-container'
            options={categoryList}
            placeholder='Select a Category'
            isMulti={false}
            onChange={(selectedOption) => {
              onCategoryChange(Number(selectedOption?.value));
              setSelectedCategory(selectedOption?.value as number);
            }}
            value={
              categoryList.find(
                (option) => option.value === selectedCategory
              ) || null
            }
          />
        </div>
        <div className='col-xl-3 col-lg-3 col-md-6 mb-3'>
          <label>Product Group</label>
          <Select
            name='categoryList'
            className='react-select-container'
            options={productGroupList}
            placeholder='Select a ProductGroup'
            isMulti={false}
            onChange={(selectedOption) => {
              setSelectedProductGroup(selectedOption?.value as number);
            }}
            value={
              productGroupList.find(
                (option) => option.value === selectedProductGroup
              ) || null
            }
          />
        </div>
        <div className='col-xl-3 col-lg-3 col-md-6 mb-3'>
          <label>Polishing Type</label>
          <Select
            className='form-select-solid'
            value={
              polishingTypeList.find((option) => option.value === polishId) ||
              null
            }
            name='polishIds'
            options={polishingTypeList}
            onChange={(selectedPT) =>
              handlePolishingChange(Number(selectedPT?.value))
            }
            placeholder='Select PolishingType'
          ></Select>
        </div>
        <div className='col-xl-3 col-lg-3 col-md-6 mb-3'>
          <button
            type='button'
            className='btn btn-saawree'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {colorList?.length > 0 && (
        <div className='sales-order-select-colors mt-4 border p-4'>
          <div className='row'>
            {colorList?.map((color) => (
              <div
                className='col-xl-3 col-lg-3 col-md-6 mb-3'
                key={color?.colorId}
              >
                <div className='d-flex justify-content-between align-items-center'>
                  <label className='mb-0'>
                    <span className='mr-2 sales-order-color-options'>
                      <Image
                        loader={customLoader}
                        src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${color?.imagePath}`}
                        // alt={color.colorName}
                        width={20}
                        height={20}
                        alt='color'
                      />
                    </span>
                    {color.colorName}
                  </label>
                  <input
                    type='number'
                    min={1}
                    className='form-control color-qnty-input'
                    value={quantities[color.colorId] || ""}
                    onChange={(e) => {
                      const qty = parseInt(e.target.value);
                      if (qty < 0) {
                        e.target.value = "";
                      } else if (qty > 99999) {
                        e.target.value = "";
                      } else {
                        handleQuantityChange(
                          color.colorId,
                          parseInt(e.target.value)
                        );
                      }
                    }}
                  />{" "}
                </div>
              </div>
            ))}
          </div>
          <div className='text-right'>
            <div className='d-flex justify-content-end'>
              <button
                type='button'
                className='btn btn-light border mr-2'
                onClick={clearFilters}
              >
                Clear
              </button>
              <button
                type='button'
                className='btn btn-saawree btn-small'
                onClick={handleAddClick}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSelection;
