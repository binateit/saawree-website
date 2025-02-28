"use client";
import { useDebounce } from "use-debounce";
import React, { useEffect, useState } from "react";
import finalLogo from "@/assets/images/finalLogo.png";
import appleStore from "@/assets/images/appleStore.png";
import playStore from "@/assets/images/playStore.png";
import clsx from 'clsx'
import {
  BsBoxArrowRight,
  BsCart,
  BsChevronDown,
  BsChevronRight,
  BsList,
  BsSearch,
  BsSpeedometer2,
} from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "@/core/requests/homeRequests";
import { useCartCount } from "@/core/context/useCartCount";
import { Sidebar } from "primereact/sidebar";
import Image from "next/image";
import { Session } from "next-auth";
import customLoader from "@/core/component/shared/image-loader";
import { getReadyStockProducts } from "@/core/requests/productsRequests";
import NestedDropdown from "@/core/component/NestedDropdown";
import { Mtoc } from "@/core/models/homeModel";

const renderSubCategories = (categories: Mtoc[], parentId: number | null) => {
  return categories
    ?.filter((subCat) => subCat?.pcid === parentId)
    .map((subCat) => (
      <React.Fragment key={subCat?.id}>
        <option value={subCat?.id}>{subCat?.n}</option>
        {renderSubCategories(categories, subCat?.id)}
      </React.Fragment>
    ));
};

const Header = () => {
  const { data: session, status: authStatus } = useSession();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  const UserSession = session as Session;

  const [show, setShow] = useState(false);
  const [showMobileSearchBar, setShowMobileSearch] = useState<boolean>(false);
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(false);
  const [showSearchDropDown, setShowDropDown] = useState(false);
  const [readyStockSubCategories, setReadyStockSubCategory] = useState<Mtoc[]>(
    []
  );
  const [selctedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const { cartCount } = useCartCount();

  const [closeSubMenu, setCloseSubMenu] = useState(false);
  const [openDropDown, setOpenDropDown] = useState({
    display: false,
    name: "",
  });
  const navigate = useRouter();
  const handleLogout = async () => {
    signOut();
    navigate.push("/");
  };

  const { data: menuCategoryData } = useQuery({
    queryKey: ["menuCategoryData", authStatus],
    queryFn: () => getMenuCategories(),
    refetchOnWindowFocus: false,

  });

  const queryResult = useQuery({
    queryKey: ["search-product", debouncedQuery],
    queryFn: async () => {
      if (!debouncedQuery) return [];
      const rows = await getReadyStockProducts({
        advancedFilter: {
          field: "name",
          operator: "contains",
          value: debouncedQuery,
        },
        categoryIds: selctedCategory ? [selctedCategory] : undefined,
      });
      return rows?.data;
    },
    staleTime: 300,
    placeholderData: keepPreviousData,
  });
  const handleNavgation = (productId: number): void => {
    navigate.push(`/readystock/details?productId=${productId}`);
    setShowDropDown(false);
    setShowMobileSearch(false);
    setQuery("");
  };

  useEffect(() => {
    const readyStockCategories: Mtoc[] = [];

    const getSubCategories = (categories: Mtoc[], parentId: number | null) => {
      return categories
        ?.filter((srsc) => srsc?.pcid === parentId)
        ?.map((srsc) => {
          readyStockCategories.push({
            id: srsc?.id,
            hc: srsc?.hc,
            isp: srsc?.isp,
            n: srsc?.n,
            o: srsc?.o,
            pcid: srsc?.pcid,
          });
          getSubCategories(categories, srsc?.id);
        });
    };
    menuCategoryData?.rsc
      ?.filter((rs) => rs?.pcid === null)
      ?.map((rs) => getSubCategories(menuCategoryData?.rsc, rs?.id));
    setReadyStockSubCategory(readyStockCategories);
  }, [menuCategoryData]);

  return (
    <>
      <div className='top-header-bar'>
        <div className='container header-container text-right'>
          {authStatus === "authenticated" ? (
            <div className='d-flex justify-content-end'>
              Welcome {UserSession?.user?.firstName} -{" "}
              <Link href={`/${UserSession?.user?.userType}`} className='pl-2'>
                <BsSpeedometer2 fontSize={18} /> Dashboard
              </Link>{" "}
              <div
                onClick={() => handleLogout()}
                className='pl-2 cursor-pointer'
              >
                <BsBoxArrowRight fontSize={18} /> Logout
              </div>
            </div>
          ) : (
            <>
              <Link href='/auth/login'>
                <i className='bi bi-box-arrow-in-right'></i> Login
              </Link>{" "}
              <Link href='/auth/registrationprocess'>
                <i className='bi bi-box-arrow-in-right'></i> Register
              </Link>
            </>
          )}
        </div>
      </div>
      <div className='container header-container'>
        <div className='middle-header-bar'>
          <div className='row align-items-center'>
            <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3 order-1 order-md-1'>
              <div className='brand-log'>
                <span className='res-nav-btn'>
                  <BsList
                    fontSize={25}
                    onClick={() => setShowResponsiveMenu(true)}
                  // onClick={handleShow}
                  />
                </span>
                <Link href='/'>
                  <Image
                    loader={customLoader}
                    src={finalLogo.src}
                    className='img-logo img-fluid'
                    alt='Saawree'
                    height={200}
                    width={200}
                  />
                </Link>
              </div>
            </div>
            <div
              className={`col-xl-8 col-lg-7 col-md-8 col-sm-12 d-none d-md-block order-3 order-md-2 ${showMobileSearchBar ? "show" : " "
                }`}
              id='product-search-bar'
            >
              <form className='search-form position-relative'>
                {/* <div className='up-in-toggle text-center mb-3'>
                  <span className='switch-btn'>
                    <input
                      type='radio'
                      id='switch_left'
                      name='stock'
                      value='make-to-order'
                      checked
                    />
                    <label className='mb-0' htmlFor='switch_left'>
                      Make to Order
                    </label>
                    <input
                      type='radio'
                      id='switch_right'
                      name='stock'
                      value='ready-stock'
                    />
                    <label className='mb-0' htmlFor='switch_right'>
                      Ready Stock
                    </label>
                  </span>
                </div> */}
                <div className='d-flex w-100'>
                  <div className='search-category-dropdown'>
                    <select
                      className='form-control search-box search-category'
                      onChange={(e) =>
                        setSelectedCategory(Number(e.target?.value))
                      }
                    >
                      <option value={undefined}>All Categories</option>
                      {menuCategoryData?.rsc
                        ?.filter((item) => item?.pcid === null)
                        .map((cat) => (
                          <optgroup label={cat?.n} key={cat?.id}>
                            {renderSubCategories(
                              menuCategoryData?.rsc,
                              cat?.id
                            )}
                          </optgroup>
                        ))}
                    </select>
                    <i className='fas fa-angle-down'></i>
                  </div>
                  <input
                    type='search'
                    placeholder='Search Products...'
                    className='form-control search-box'
                    value={query}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setQuery(newValue);
                      setShowDropDown(newValue?.length > 1 ? true : false);
                    }}
                    name='product-search'
                  />
                  <input
                    type='submit'
                    className='search-btn'
                    value='search'
                    name=''
                  />
                </div>

                <div
                  className={`global-search-results ${(queryResult?.data?.length || 0) > 0 ? "border shadow" : ""
                    } position-absolute w-100 bg-white`}
                >
                  {showSearchDropDown &&
                    ((queryResult?.data?.length || 0) > 0 ? (
                      <div className='d-flex flex-column'>
                        {queryResult?.data?.map((res) => (
                          <div
                            key={res?.productId}
                            onClick={() => handleNavgation(res?.productId)}
                            className='text-dark mb-0 border-bottom py-2 px-3 global-result-item'
                          >
                            {res?.productName}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='global-empty-result text-center p-4'>
                        <p className='mb-0'>No Result Found</p>
                      </div>
                    ))}
                </div>
              </form>
            </div>
            <div className='col-xl-2 col-lg-3 col-md-2 col-sm-9 col-9 order-2 order-md-3 pl-md-0'>
              <div className='rs-m-header'>
                <div
                  className='header-icons d-md-none'
                  id='product-search-icon'
                  onClick={() => setShowMobileSearch(!showMobileSearchBar)}
                >
                  <BsSearch fontSize={20} />
                </div>

                <Link href='/cart' className='cart-widget header-icons'>
                  <BsCart fontSize={20} />
                  <span className='badge badge-danger'>{cartCount}</span>
                </Link>
                {authStatus === "authenticated" && (
                  <div className='header-icons dashboard-menu-icon'>
                    <BsList
                      fontSize={20}
                      onClick={() => setShow(true)}
                    // onClick={handleShow}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='over-lay-box'></div>
      <div className='header-navbar'>
        <div className='container'>
          <div className='header-bottom'>
            <nav>
              <div className='res-row-block'>
                <div className='main_menu'>
                  <ul>
                    <li>
                      <Link href='/' className='active'>
                        Home
                      </Link>
                    </li>
                    {UserSession?.user?.isMakeToOrderEnabled && (
                      <li className='has_dropdown'>
                        <a href='#'>
                          Make to Order <BsChevronDown />
                        </a>
                        <ul className='sub_menu'>
                          {menuCategoryData?.mtoc
                            ?.filter(
                              (cat) => cat.isp === true && cat.pcid === null
                            )
                            .map((cat) => (
                              <React.Fragment key={cat.id}>
                                <li className='has_dropdown'>
                                  <Link
                                    href={`/maketoorder/products?subCategoryName=${cat.n}&categoryId=${cat?.id}`}
                                    onClick={() =>
                                      setCloseSubMenu(!closeSubMenu)
                                    }
                                  >
                                    {cat.n}
                                    <BsChevronRight fontSize={10} className='ml-2' />
                                  </Link>
                                  <ul
                                    className={
                                      closeSubMenu
                                        ? "sub_menu open"
                                        : "sub_menu "
                                    }
                                  >
                                    {menuCategoryData?.mtoc
                                      .filter(
                                        (subCat) => subCat.pcid === cat.id
                                      )
                                      .map((subCat, index) => (
                                        <li
                                          key={index}
                                          className={clsx({
                                            'has_dropdown': subCat.hc
                                          })}
                                        >
                                          <Link
                                            href={`/maketoorder/products?subCategoryName=${subCat.n}&categoryId=${subCat?.id}`}
                                            onClick={() => {
                                              setCloseSubMenu(!closeSubMenu);
                                            }}
                                          >
                                            {subCat.n}{" "}
                                            {subCat?.hc && <BsChevronRight fontSize={10} className='ml-2' />}
                                            {/* <BsChevronRight fontSize={10} className='ml-2' /> */}
                                          </Link>
                                          {subCat?.hc &&
                                            <ul
                                              className={
                                                closeSubMenu
                                                  ? "sub_menu row category-menu open"
                                                  : "sub_menu row category-menu "
                                              }
                                            >
                                              {menuCategoryData?.mtoc
                                                .filter(
                                                  (ssubCat) =>
                                                    ssubCat.pcid === subCat.id
                                                )
                                                .map((ssubCat, index) => (
                                                  <li
                                                    key={index}
                                                    className='sub-menu-col'
                                                  >
                                                    <Link
                                                      href={`/maketoorder/products?subCategoryName=${ssubCat.n}&categoryId=${ssubCat?.id}`}
                                                      onClick={() => {
                                                        setCloseSubMenu(
                                                          !closeSubMenu
                                                        );
                                                      }}
                                                    >
                                                      {ssubCat.n}
                                                    </Link>
                                                  </li>
                                                ))}
                                            </ul>
                                          }
                                        </li>
                                      ))}
                                  </ul>
                                </li>
                              </React.Fragment>
                            ))}
                        </ul>
                      </li>
                    )}
                    {menuCategoryData?.rsc
                      ?.filter((cat) => cat?.pcid === null)
                      .map((cat) => (
                        <React.Fragment key={cat?.id}>
                          <li className='has_dropdown'>
                            <a href='#'>
                              {cat?.n}
                              <BsChevronDown fontSize={16} className='ml-2' />
                            </a>
                            <ul className='sub_menu'>
                              {menuCategoryData?.rsc
                                ?.filter(
                                  (item) =>
                                    // item?.isp === true &&
                                    item?.pcid === cat?.id
                                )
                                .map((subCat) => (
                                  <React.Fragment key={subCat?.id}>
                                    <li
                                      className={clsx({
                                        'has_dropdown': subCat.hc
                                      })}>
                                      <Link
                                        href={`/readystock/products?categoryName=${subCat.n}&categoryId=${subCat?.id}`}
                                        onClick={() => {
                                          setCloseSubMenu(!closeSubMenu);
                                        }}
                                      >
                                        {subCat?.n}
                                        {subCat?.hc && <BsChevronRight fontSize={10} className='ml-2' />}
                                      </Link>
                                      <ul className='sub_menu'>
                                        {menuCategoryData?.rsc
                                          ?.filter(
                                            (ssubCat) =>
                                              // ssubCat?.isp === true &&
                                              ssubCat?.pcid === subCat?.id
                                          )
                                          .map((ssubCat) => (
                                            <li
                                              className='has_dropdown'
                                              key={ssubCat?.id}
                                            >
                                              <Link
                                                href={`/readystock/products?categoryName=${ssubCat.n}&categoryId=${ssubCat?.id}`}
                                                onClick={() => {
                                                  setCloseSubMenu(
                                                    !closeSubMenu
                                                  );
                                                }}
                                              >
                                                {ssubCat?.n}
                                                {/* <BsChevronRight fontSize={10} className='ml-2' /> */}
                                              </Link>
                                            </li>
                                          ))}
                                      </ul>
                                    </li>
                                  </React.Fragment>
                                ))}
                            </ul>
                          </li>
                        </React.Fragment>
                      ))}
                    <li>
                      <Link href='/track-order'>Track Order</Link>
                    </li>
                    <li>
                      <Link href='/contact-us'>Contact</Link>
                    </li>
                    <li>
                      <Link href='/order-process'>Order Process</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className='hb-right'>
              {/* <span>Download App</span> */}
              <a href='#'>
                <Image
                  loader={customLoader}
                  src={appleStore.src}
                  className='app-icon'
                  alt='appstore'
                  width={25}
                  height={25}
                />
              </a>
              <a href=''>
                <Image
                  loader={customLoader}
                  src={playStore.src}
                  className='app-icon'
                  alt='playstore'
                  width={20}
                  height={25}
                />
              </a>

              {/* <a href=''>
                <BsApple size={25} />
              </a>
              <a href=''>
                <BsGooglePlay />
              </a> */}
            </div>
            <div className='close-icon-btn'>
              <i className='bi bi-x'></i>
            </div>
          </div>
        </div>
      </div>

      <Sidebar
        visible={show}
        position='right'
        onHide={() => setShow(false)}
        className='offcanvas-panel-menu'
        showCloseIcon={false}
        blockScroll={true}
      >
        <div className='py-2'>
          <ul className='nav flex-column nav-pills nav-pills-custom'>
            <li className='nav-link mb-2 active'>
              <Link
                href={`/${UserSession?.user?.userType}`}
                className='font-weight-bold small text-uppercase nav-link-item  py-1 px-3 d-block'
              >
                Overview
              </Link>
            </li>
            <li className='mb-2 tab-has-dropdown nav-link cursor-pointer'>
              <div
                className='font-weight-bold small text-uppercase py-1 px-3 nav-link-item'
                onClick={() =>
                  setOpenDropDown({
                    display: !openDropDown.display,
                    name: "profile",
                  })
                }
              >
                Profile <BsChevronDown fontSize={14} />
              </div>
              {openDropDown.display && openDropDown.name === "profile" && (
                <div className='nav flex-column nav-pills nav-pills-custom-dropdown'>
                  <Link
                    className='nav-link pl-0 py-2 px-3'
                    href={`/${UserSession?.user?.userType}/profile`}
                    onClick={() => setShow(false)}
                  >
                    Profile Details
                  </Link>
                  {UserSession?.user?.userType !== "agent" && (
                    <>
                      <Link
                        className='nav-link pl-0 py-2 px-3'
                        href={`/${UserSession?.user?.userType}/profile/accounting-details`}
                        onClick={() => setShow(false)}
                      >
                        Accounting Details
                      </Link>
                      <Link
                        className='nav-link pl-0 py-2 px-3'
                        href={`/${UserSession?.user?.userType}/profile/address`}
                        onClick={() => setShow(false)}
                      >
                        Address
                      </Link>
                    </>
                  )}
                  <Link
                    className='nav-link pl-0 py-2 px-3'
                    href={`/${UserSession?.user?.userType}/profile/change-password`}
                    onClick={() => setShow(false)}
                  >
                    Change Password
                  </Link>
                </div>
              )}
            </li>
            <li className='mb-2 tab-has-dropdown nav-link cursor-pointer'>
              <div
                className='font-weight-bold small text-uppercase py-1 px-3'
                onClick={() =>
                  setOpenDropDown({
                    display: !openDropDown.display,
                    name: "transaction",
                  })
                }
              >
                Transaction
                <BsChevronDown fontSize={14} />
              </div>
              {openDropDown.display && openDropDown.name === "transaction" && (
                <div className='nav flex-column nav-pills nav-pills-custom-dropdown'>
                  <Link
                    className='nav-link py-2 px-3'
                    href={`/${UserSession?.user?.userType}/transactions/sales-order`}
                    onClick={() => setShow(false)}
                  >
                    Sales Order
                  </Link>
                  <Link
                    className='nav-link py-2 px-3'
                    href={`/${UserSession?.user?.userType}/transactions/invoice`}
                    onClick={() => setShow(false)}
                  >
                    Invoice
                  </Link>
                  <Link
                    className='nav-link py-2 px-3'
                    href={`/${UserSession?.user?.userType}/transactions/payment`}
                    onClick={() => setShow(false)}
                  >
                    Payment
                  </Link>
                  {UserSession?.user?.userType === "agent" && (
                    <>
                      <Link
                        className='nav-link py-2 px-3'
                        href='/agent/transactions/commissions'
                        onClick={() => setShow(false)}
                      >
                        Commission
                      </Link>
                      <Link
                        className='nav-link py-2 px-3'
                        href='/agent/transactions/customers'
                        onClick={() => setShow(false)}
                      >
                        Customers
                      </Link>
                      <Link
                        className='nav-link py-2 px-3'
                        href='/agent/transactions/payout'
                        onClick={() => setShow(false)}
                      >
                        Payout
                      </Link>
                    </>
                  )}
                </div>
              )}
            </li>
          </ul>
        </div>
      </Sidebar>
      <Sidebar
        visible={showResponsiveMenu}
        position='left'
        onHide={() => setShowResponsiveMenu(false)}
        className='offcanvas-panel-menu'
        showCloseIcon={false}
        blockScroll={true}
      >
        <div className='py-2'>
          <ul className='nav flex-column nav-pills nav-pills-custom'>
            <li className='nav-link mb-2 active'>
              <div
                onClick={() => {
                  navigate.push("/");
                  setShowResponsiveMenu(false);
                }}
                className='font-weight-bold small text-uppercase nav-link-item  py-1 px-3 d-block'
              >
                Home
              </div>
            </li>
            {UserSession?.user?.isMakeToOrderEnabled && (
              <li className='mb-2 tab-has-dropdown nav-link cursor-pointer'>
                <div
                  className='font-weight-bold small text-uppercase py-1 px-3 nav-link-item'
                  onClick={() =>
                    setOpenDropDown({
                      display: !openDropDown.display,
                      name: "mtc",
                    })
                  }
                >
                  Make to Order <BsChevronDown fontSize={14} />
                </div>
                {openDropDown.display && openDropDown.name === "mtc" && (
                  <NestedDropdown
                    menuCategoryData={menuCategoryData?.mtoc || []}
                    categoryType={"mtc"}
                    setShowResponsiveMenu={setShowResponsiveMenu}
                  />
                )}
              </li>
            )}
            {menuCategoryData?.rsc
              ?.filter((rs) => rs?.pcid === null)
              .map((rs) => (
                <li
                  className='mb-2 tab-has-dropdown nav-link cursor-pointer'
                  key={rs?.id}
                >
                  <div
                    className='font-weight-bold small text-uppercase py-1 px-3 nav-link-item'
                    onClick={() =>
                      setOpenDropDown({
                        display: !openDropDown.display,
                        name: "rs",
                      })
                    }
                  >
                    {rs?.n} <BsChevronDown fontSize={14} />
                  </div>
                  {openDropDown.display && openDropDown.name === "rs" && (
                    <NestedDropdown
                      menuCategoryData={readyStockSubCategories || []}
                      categoryType={"rs"}
                      setShowResponsiveMenu={setShowResponsiveMenu}
                    />
                  )}
                </li>
              ))}
            <li className='nav-link mb-2'>
              <div
                onClick={() => {
                  navigate.push("/track-order");
                  setShowResponsiveMenu(false);
                }}
                className='font-weight-bold small text-uppercase nav-link-item  py-1 px-3 d-block'
              >
                Track Order
              </div>
            </li>
            <li className='nav-link mb-2'>
              <div
                onClick={() => {
                  navigate.push("/order-process");
                  setShowResponsiveMenu(false);
                }}
                className='font-weight-bold small text-uppercase nav-link-item  py-1 px-3 d-block'
              >
                Order Process
              </div>
            </li>
            <li className='nav-link mb-2'>
              <div
                onClick={() => {
                  navigate.push("/contact-us");
                  setShowResponsiveMenu(false);
                }}
                className='font-weight-bold small text-uppercase nav-link-item py-1 px-3 d-block'
              >
                Contact
              </div>
            </li>
            {authStatus === "authenticated" && (
              <>
                <li className='ml-3 mt-2 mb-2 font-weight-bold small text-uppercase'>My Account</li>
                <li className='nav-link mb-2'>
                  <Link
                    href={`/${UserSession?.user?.userType}`}
                    className='font-weight-bold small text-uppercase nav-link-item  py-1 px-3 d-block'
                    onClick={() => setShowResponsiveMenu(false)}
                  >
                    <span>Overview</span>
                  </Link>
                </li>
                <li className='mb-2 tab-has-dropdown nav-link cursor-pointer'>
                  <div
                    className='font-weight-bold small text-uppercase py-1 px-3 nav-link-item'
                    onClick={() =>
                      setOpenDropDown({
                        display: !openDropDown.display,
                        name: "profile",
                      })
                    }
                  >
                    Profile <BsChevronDown fontSize={14} />
                  </div>
                  {openDropDown.display && openDropDown.name === "profile" && (
                    <div className='nav flex-column nav-pills nav-pills-custom-dropdown'>
                      <Link
                        className='nav-link pl-0 py-2 px-3'
                        href={`/${UserSession?.user?.userType}/profile`}
                        onClick={() => setShowResponsiveMenu(false)}
                      >
                        Profile Details
                      </Link>
                      {UserSession?.user?.userType !== "agent" && (
                        <>
                          <Link
                            className='nav-link pl-0 py-2 px-3'
                            href={`/${UserSession?.user?.userType}/profile/accounting-details`}
                            onClick={() => setShowResponsiveMenu(false)}
                          >
                            Accounting Details
                          </Link>
                          <Link
                            className='nav-link pl-0 py-2 px-3'
                            href={`/${UserSession?.user?.userType}/profile/address`}
                            onClick={() => setShowResponsiveMenu(false)}
                          >
                            Address
                          </Link>
                        </>
                      )}
                      <Link
                        className='nav-link pl-0 py-2 px-3'
                        href={`/${UserSession?.user?.userType}/profile/change-password`}
                        onClick={() => setShowResponsiveMenu(false)}
                      >
                        Change Password
                      </Link>
                    </div>
                  )}
                </li>
                <li className='mb-2 tab-has-dropdown nav-link cursor-pointer'>
                  <div
                    className='font-weight-bold small text-uppercase py-1 px-3'
                    onClick={() =>
                      setOpenDropDown({
                        display: !openDropDown.display,
                        name: "transaction",
                      })
                    }
                  >
                    Transaction
                    <BsChevronDown fontSize={14} />
                  </div>
                  {openDropDown.display &&
                    openDropDown.name === "transaction" && (
                      <div className='nav flex-column nav-pills nav-pills-custom-dropdown'>
                        <Link
                          className='nav-link py-2 px-3'
                          href={`/${UserSession?.user?.userType}/transactions/sales-order`}
                          onClick={() => setShowResponsiveMenu(false)}
                        >
                          Sales Order
                        </Link>
                        <Link
                          className='nav-link py-2 px-3'
                          href={`/${UserSession?.user?.userType}/transactions/invoice`}
                          onClick={() => setShowResponsiveMenu(false)}
                        >
                          Invoice
                        </Link>
                        <Link
                          className='nav-link py-2 px-3'
                          href={`/${UserSession?.user?.userType}/transactions/payment`}
                          onClick={() => setShowResponsiveMenu(false)}
                        >
                          Payment
                        </Link>
                        {UserSession?.user?.userType === "agent" && (
                          <>
                            <Link
                              className='nav-link py-2 px-3'
                              href='/agent/transactions/commissions'
                              onClick={() => setShowResponsiveMenu(false)}
                            >
                              Commission
                            </Link>
                            <Link
                              className='nav-link py-2 px-3'
                              href='/agent/transactions/customers'
                              onClick={() => setShowResponsiveMenu(false)}
                            >
                              Customers
                            </Link>
                            <Link
                              className='nav-link py-2 px-3'
                              href='/agent/transactions/payout'
                              onClick={() => setShowResponsiveMenu(false)}
                            >
                              Payout
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                </li>
              </>
            )}
          </ul>
        </div>
      </Sidebar>
    </>
  );
};

export default Header;
