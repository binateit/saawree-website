import Link from "next/link";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface Category {
  id: number;
  n: string;
  isp: boolean;
  pcid: number | null;
  hc: boolean;
  o: number;
}

const NestedDropdown = ({
  menuCategoryData,
}: {
  menuCategoryData: Category[];
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleSubMenu = (id: number) => {
    setOpenSubMenu((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenu = (parentId: number | null) => {
    return menuCategoryData
      .filter((cat) => cat.pcid === parentId)
      .map((cat) => (
        <li key={cat.id} className='has_dropdown'>
          <p
          // href={`/maketoorder/products?subCategoryName=${cat.n}&categoryId=${cat.id}`}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleSubMenu(cat.id);
              }}
            >
              {cat.n} <BsChevronDown fontSize={14} />
            </div>
          </p>
          {openSubMenu[cat?.id] && (
            <ul
              className={"nav flex-column nav-pills nav-pills-custom-dropdown"}
            >
              {renderMenu(cat.id)}
            </ul>
          )}
        </li>
      ));
  };

  return (
    <ul className='nav flex-column nav-pills nav-pills-custom-dropdown'>
      {renderMenu(null)}
    </ul>
  );
};

export default NestedDropdown;
