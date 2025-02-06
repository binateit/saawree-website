import { useRouter } from "next/navigation";
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
  categoryType,
  setShowResponsiveMenu,
}: {
  menuCategoryData: Category[];
  categoryType: string;
  setShowResponsiveMenu: (status: boolean) => void;
}) => {
  const [openSubMenu, setOpenSubMenu] = useState<{ [key: number]: boolean }>(
    {}
  );
  const navigate = useRouter();
  const toggleSubMenu = (id: number) => {
    setOpenSubMenu((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenu = (parentId: number | null) => {
    const handleNavigation = (id: number, n: string): void => {
      navigate.push(
        categoryType === "mto"
          ? `/maketoorder/products?categoryName=${n}&categoryId=${id}`
          : `/readystock/products?categoryName=${n}&categoryId=${id}`
      );
      setShowResponsiveMenu(false);
    };

    return menuCategoryData
      .filter((cat) => cat.pcid === parentId)
      .map((cat) => (
        <li key={cat.id} className='has_dropdown'>
          <div>
            <span onClick={() => handleNavigation(cat?.id, cat?.n)}>
              {" "}
              {cat.n}
            </span>{" "}
            {cat?.hc && (
              <BsChevronDown
                fontSize={14}
                onClick={() => {
                  toggleSubMenu(cat.id);
                }}
              />
            )}
          </div>
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
      {categoryType === "mto"
        ? renderMenu(null)
        : renderMenu(menuCategoryData[0]?.pcid)}
    </ul>
  );
};

export default NestedDropdown;
