import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { CategoryList, CheckBoxFilter } from "../models/productModel";
// import { CategoryAnonymous } from "../models/productModel";

interface FilterProps {
  title: string;
  filterList?: CheckBoxFilter[];
  //   anonymous?: CategoryAnonymous[];
  onChange: (id: number, status: boolean) => void;
  multiFilter?: CategoryList[];
  selectedFilter: number[];
  categoryList?: CategoryList[];
  type: string;
  parentCategoryId?: number;
}

const FilterSection = ({
  title,
  filterList,
  onChange,
  selectedFilter,
  multiFilter,
  categoryList,
  //   anonymous,
  type,
}: FilterProps) => {
  return (
    <div className='card mb-3'>
      <div className='card-header'>
        <p className='filter-title'>{title}</p>
      </div>
      <div className='card-body p-0'>
        {type == "multi" && (
          <div className='filters'>
            <ul className='category-option list-group list-group-flush'>
              {multiFilter
                ?.filter((cat) => cat.parentCategoryId !== null)
                .map((cat) => (
                  <li className='list-group-item p-0' key={cat?.id}>
                    <div className='category-item d-flex justify-content-between list-group-item-action cursor-pointer bg-light'>
                      <div className='form-group mb-0'>
                        <input
                          type='checkbox'
                          id={`${cat.name} - ${cat?.id}`}
                          className='filter-chekbox'
                          onChange={(e) => {
                            onChange(cat?.id, e.target.checked);
                          }}
                          checked={selectedFilter.includes(cat.id as number)}
                        />
                        <label
                          htmlFor={`${cat.name} - ${cat?.id}`}
                          className='filter-label d-flex align-items-start mb-0'
                        >
                          {cat?.name}
                        </label>
                      </div>
                      <BsChevronDown />
                    </div>
                    <div className='filters-inner'>
                      {categoryList
                        ?.filter(
                          (subCat: CategoryList) =>
                            subCat.parentCategoryId === cat.id
                        )
                        .map((subCat: CategoryList) => (
                          <div className='form-group' key={subCat.id}>
                            <input
                              type='checkbox'
                              id={`${subCat.name} - ${subCat?.id}`}
                              className='filter-chekbox'
                              onChange={(e) =>
                                onChange(subCat?.id, e.target.checked)
                              }
                              checked={
                                selectedFilter.includes(subCat.id as number) ||
                                selectedFilter.includes(cat?.id)
                              }
                            />
                            <label
                              htmlFor={`${subCat.name} - ${subCat?.id}`}
                              className='filter-label d-flex align-items-start'
                            >
                              {subCat?.name}{" "}
                            </label>
                          </div>
                        ))}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {type == "single" && (
          <div className='filters'>
            <div className='filters-inner'>
              {filterList?.map((item: { id: number; name: string }) => (
                <div className='form-group' key={item?.id}>
                  <input
                    type='checkbox'
                    id={`${item.name} - ${item?.id}`}
                    className='filter-chekbox'
                    onChange={(e) => onChange(item?.id, e.target.checked)}
                    checked={selectedFilter?.includes(item?.id as number)}
                  />
                  <label
                    htmlFor={`${item?.name} - ${item?.id}`}
                    className='filter-label d-flex align-items-start'
                  >
                    {item?.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* {type == "tags" && (
          <div className='filters'>
            <div className='filters-inner'>
              <div className='tags-filters'>
                {filterList?.map((item: { id: number; name: string }) => (
                  <div className='form-group'>
                    <input
                      type='checkbox'
                      id={`${item.name} - ${item?.id}`}
                      className='tag-box'
                      onChange={onChange}
                      checked={selectedFilter.includes(item.id as number)}
                    />
                    <label
                      htmlFor={`${item.name} - ${item?.id}`}
                      className='filter-label d-flex align-items-start'
                    >
                      {item?.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FilterSection;
