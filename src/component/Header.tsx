"use client";
import React, { useEffect, useState } from "react";
import finalLogo from "@/assets/images/finalLogo.png";
import appleStore from "@/assets/images/appleStore.png";
import playStore from "@/assets/images/playStore.png";
import {
  BsApple,
  BsBoxArrowRight,
  BsCart,
  BsChevronDown,
  BsGooglePlay,
  BsList,
  BsSearch,
  BsSpeedometer2,
} from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Offcanvas } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getMenuCategories } from "@/core/requests/homeRequests";

const Header = () => {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
  const [closeSubMenu, setCloseSubMenu] = useState(false);
  const [openDropDown, setOpenDropDown] = useState({
    display: false,
    name: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useRouter();
  const handleLogout = async () => {
    signOut();
    navigate.push("/auth/login");
  };

  const { data: menuCategoryData } = useQuery({
    queryKey: ["menuCategoryData"],
    queryFn: () => getMenuCategories(),
  });

  return (
    <>
      <div className='top-header-bar'>
        <div className='container header-container text-right'>
          {session?.user ? (
            <div className='d-flex justify-content-end'>
              Welcome {session?.user?.firstName} -{" "}
              <Link href={`/${session.user.userType}`} className='pl-2'>
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
            <Link href='/auth/login'>
              <i className='bi bi-box-arrow-in-right'></i> Login as User /Login
              as Agent
            </Link>
          )}
        </div>
      </div>
      <div className='container header-container'>
        <div className='middle-header-bar'>
          <div className='row align-items-center'>
            <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3 order-1 order-md-1'>
              <div className='brand-log'>
                <span className='res-nav-btn'>
                  <i className='fas fa-bars fa-1x'></i>
                </span>
                <Link href='/'>
                  <img src={finalLogo.src} className='img-logo' alt='Saawree' />
                </Link>
              </div>
            </div>
            <div
              className='col-xl-8 col-lg-7 col-md-8 col-sm-12 d-none d-md-block order-3 order-md-2'
              id='product-search-bar'
            >
              <form className='search-form'>
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
                    <select className='form-control search-box search-category'>
                      <option disabled>Category</option>
                      <option>Category one</option>
                      <option>Larger Cartegory is here</option>
                    </select>
                    <i className='fas fa-angle-down'></i>
                  </div>
                  <input
                    type='search'
                    placeholder='Search Products...'
                    className='form-control search-box'
                    name=''
                  />
                  <input
                    type='submit'
                    className='search-btn'
                    value='search'
                    name=''
                  />
                </div>
              </form>
            </div>
            <div className='col-xl-2 col-lg-3 col-md-2 col-sm-9 col-9 order-2 order-md-3 pl-md-0'>
              <div className='rs-m-header'>
                <div
                  className='header-icons d-md-none'
                  id='product-search-icon'
                >
                  <BsSearch fontSize={25} />
                </div>

                <Link href='/cart' className='cart-widget header-icons'>
                  <BsCart fontSize={25} />
                  <span className='badge badge-danger'>3</span>
                </Link>
                {session?.user && (
                  <div className='header-icons dashboard-menu-icon'>
                    <BsList fontSize={25} onClick={handleShow} />
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
                    <li className='has_dropdown'>
                      <a href='#'>
                        Make to Order <i className='fas fa-angle-down'></i>
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
                                  href={`/maketoorder/products?category=${cat.n}&categoryId=${cat?.id}`}
                                  onClick={() => setCloseSubMenu(!closeSubMenu)}
                                >
                                  {cat.n}
                                  <i className='fas fa-angle-right' />
                                </Link>
                                <ul
                                  className={
                                    closeSubMenu ? "sub_menu open" : "sub_menu "
                                  }
                                >
                                  {menuCategoryData?.mtoc
                                    .filter((subCat) => subCat.pcid === cat.id)
                                    .map((subCat, index) => (
                                      <li key={index} className='has_dropdown'>
                                        <Link
                                          href={`/maketoorder/products?categoryId=${subCat.n}&categoryId=${cat?.id}`}
                                          onClick={() => {
                                            setIsHamburgerClicked(false);
                                            setCloseSubMenu(!closeSubMenu);
                                          }}
                                        >
                                          {subCat.n}{" "}
                                          <i className='fas fa-angle-right' />
                                        </Link>
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
                                                  href={`/maketoorder/products?categoryId=${ssubCat.n}&categoryId=${cat?.id}`}
                                                  onClick={() => {
                                                    setIsHamburgerClicked(
                                                      false
                                                    );
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
                                      </li>
                                    ))}
                                </ul>
                              </li>
                            </React.Fragment>
                          ))}
                      </ul>
                    </li>
                    <li className='mega_menu_dropdown mega_menu_demo_2 has_dropdown'>
                      <a href='#'>
                        Ready Stock <i className='fas fa-angle-down'></i>
                      </a>
                      <div className='mega_menu sub_menu'>
                        <div className='mega_menu_item'>
                          <h3>Jewellery</h3>
                          <a href='#'>Traditional</a>
                          <a href='#'>Pakistani</a>
                          <a href='#'>Store</a>
                        </div>
                        <div className='mega_menu_item'>
                          <h3>Jewellery 02</h3>
                          <a href='#'>Traditional</a>
                          <a href='#'>Pakistani</a>
                          <a href='#'>Store</a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <Link href='/track-order'>Track Order</Link>
                    </li>
                    <li>
                      <Link href='/contact-us'>Contact</Link>
                    </li>
                    <li>
                      <a href='ordering-process.html'>Order Process</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className='hb-right'>
              {/* <span>Download App</span> */}
              <a href='#'>
                <img src={appleStore.src} className='app-icon' alt='appstore' />
              </a>
              <a href=''>
                <img src={playStore.src} className='app-icon' alt='playstore' />
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
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <div className='dashboard-menu shadow'>
          <div className='panel-menu py-2'>
            <ul className='nav flex-column nav-pills nav-pills-custom'>
              <li className='nav-link mb-2 active'>
                <a
                  href='overview.html'
                  className='font-weight-bold small text-uppercase nav-link-item  py-1 px-3 d-block'
                >
                  Overview
                </a>
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
                  Profile <BsChevronDown fontSize={18} />
                </div>
                {openDropDown.display && openDropDown.name === "profile" && (
                  <div className='nav flex-column nav-pills nav-pills-custom-dropdown'>
                    <a
                      className='nav-link pl-0 py-2 px-3'
                      href='profile-details.html'
                    >
                      Profile Details
                    </a>
                    <a
                      className='nav-link pl-0 py-2 px-3'
                      href='accounting-details.html'
                    >
                      Accounting Details
                    </a>
                    <a className='nav-link pl-0 py-2 px-3' href='address.html'>
                      Address
                    </a>
                    <a
                      className='nav-link pl-0 py-2 px-3'
                      href='change-password.html'
                    >
                      Change Password
                    </a>
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
                  <BsChevronDown fontSize={18} />
                </div>
                {openDropDown.display &&
                  openDropDown.name === "transaction" && (
                    <div className='nav flex-column nav-pills nav-pills-custom-dropdown'>
                      <Link
                        className='nav-link py-2 px-3'
                        href='sale-order.html'
                      >
                        Sales Order
                      </Link>
                      <Link className='nav-link py-2 px-3' href='invoice.html'>
                        Invoice
                      </Link>
                      <Link className='nav-link py-2 px-3' href='payment.html'>
                        Payment
                      </Link>
                    </div>
                  )}
              </li>
            </ul>
          </div>
        </div>
      </Offcanvas>
    </>
  );
};

export default Header;
