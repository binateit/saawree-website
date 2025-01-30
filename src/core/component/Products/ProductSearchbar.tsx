import { PaginationFilter, Product } from "@/core/models/model";
import { getProductList } from "@/core/requests/productsRequests";
import React, { useEffect, useState, useCallback } from "react";

import { ReactSearchAutocomplete } from "react-search-autocomplete";

interface ProductSearchbarProps {
  onSelect: (newValue: Product) => void;
}

const ProductSearchbar = ({ onSelect }: ProductSearchbarProps) => {
  const [searchString, setSearchString] = useState("");
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [key, setKey] = useState(0); // key state to force re-render

  const formatResult = useCallback(
    (item: Product) => (
      <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
    ),
    []
  );

  const onProductSearch = useCallback(
    (product: Product) => {
      onSelect(product);
      setTimeout(() => {
        setSearchString("");
        setKey((prevKey) => prevKey + 1); // Update key to force re-render
      }, 200);
    },
    [onSelect]
  );

  const handleOnSelect = useCallback(
    (result: Product) => {
      if (searchString.trim()) {
        onProductSearch(result);
      }
    },
    [onProductSearch, searchString]
  );

  const handleOnSearch = useCallback(
    async (searchValue: string) => {
      if (searchValue.trim() === searchString) return;
      if (searchValue.trim() === "") return;

      setSearchString(searchValue);

      const isBarcodeSearch = !isNaN(parseInt(searchValue));
      const paginationFilter: PaginationFilter = {
        pageNumber: 1,
        pageSize: 10,
        advancedFilter: {
          logic: "and",
          filters: [
            { field: "isActive", operator: "eq", value: true },
            {
              logic: "or",
              filters: [
                { field: "name", operator: "contains", value: searchValue },
                { field: "barcode", operator: "contains", value: searchValue },
              ],
            },
          ],
        },
      };

      const response = await getProductList(paginationFilter);
      const products = response.data || [];

      if (
        products.length === 1 &&
        isBarcodeSearch &&
        products[0].barcode === searchValue
      ) {
        handleOnSelect(products[0]);
        setSearchString(""); // Clear the text box when the single product is selected
        setKey((prevKey) => prevKey + 1); // Force re-render
      } else {
        setFilterProducts(products);
      }
    },
    [searchString, handleOnSelect]
  );

  const inputFocus = useCallback(() => {
    const searchInput = document.querySelector<HTMLElement>(
      'input[data-test="search-input"]'
    );
    searchInput?.focus();
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.altKey && event.code === "KeyQ") {
        event.preventDefault();
        inputFocus();
      }
      // else if (event.key === 'Enter') {
      //   event.preventDefault()
      // }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => document.removeEventListener("keydown", keyDownHandler);
  }, [inputFocus]);

  return (
    <>
      <ReactSearchAutocomplete<Product>
        key={key} // Force re-render of component
        placeholder='Scan / Search Product By Name or Code'
        items={filterProducts}
        onSearch={handleOnSearch}
        inputSearchString={searchString} // Controlled input value
        onSelect={handleOnSelect}
        className='form-control'
        formatResult={formatResult}
        showIcon={true}
        showClear={true}
        autoFocus={true}
      />
      {/* <BsSearch className='search-icon' /> */}
    </>
  );
};

export default ProductSearchbar;
