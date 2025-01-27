"use client";
import Link from "next/link";
import React, { useState } from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [showRightPanel, setShowRightPanel] = useState("overview");
  const [showDropDown, setShowDropDown] = useState({
    display: false,
    name: "",
  });
  return (
    <section className='dashboard-wrap'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-3 col-lg-3 d-none d-lg-block'>
            <div className='panel-menu'>
              <ul className='nav flex-column nav-pills nav-pills-custom'>
                <li
                  className={`nav-link mb-2 ${showRightPanel == "overview" ? "shadow active" : ""
                    }`}
                  onClick={() => setShowRightPanel("overview")}
                >
                  <Link
                    href={"/customer"}
                    className='font-weight-bold small text-uppercase nav-link-item  py-3 px-3 d-block'
                  >
                    Overview
                  </Link>
                </li>
                <li className='mb-2 shadow tab-has-dropdown nav-link cursor-pointer'>
                  <div
                    className={`font-weight-bold small text-uppercase py-3 px-3 nav-link-item ${showRightPanel == "profile" ? "shadow active" : ""
                      }`}
                    onClick={() =>
                      setShowDropDown({ name: "profile", display: true })
                    }
                  >
                    Profile
                  </div>
                  {showDropDown.display && showDropDown.name == "profile" && (
                    <div className=''>
                      <div
                        className='nav flex-column nav-pills nav-pills-custom-dropdown'
                        id='v-pills-tab'
                        role='tablist'
                        aria-orientation='vertical'
                      >
                        <Link
                          className='nav-link pl-0 py-2 px-3'
                          href='/customer/profile'
                        >
                          Profile Details
                        </Link>
                        <Link
                          className='nav-link pl-0 py-2 px-3'
                          href='/customer/profile/accounting-details'
                        >
                          Accounting Details
                        </Link>
                        <Link
                          className='nav-link pl-0 py-2 px-3'
                          href='/customer/profile/address'
                        >
                          Address
                        </Link>
                        <Link
                          className='nav-link pl-0 py-2 px-3'
                          href='/customer/profile/change-password'
                        >
                          Change Password
                        </Link>
                      </div>
                    </div>
                  )}
                </li>
                <li className='mb-2 shadow tab-has-dropdown nav-link cursor-pointer'>
                  <div
                    className='font-weight-bold small text-uppercase py-3 px-3'
                    onClick={() =>
                      setShowDropDown({ name: "transaction", display: true })
                    }
                  >
                    Transaction
                  </div>
                  {showDropDown.display &&
                    showDropDown.name == "transaction" && (

                      <div
                        className='nav flex-column nav-pills nav-pills-custom-dropdown'
                        id='v-pills-tab'
                        role='tablist'
                        aria-orientation='vertical'
                      >
                        <Link
                          className='nav-link py-2 px-3'
                          href='/customer/transactions/sales-order'
                        >
                          Sales Order
                        </Link>
                        <Link
                          href='/customer/transactions/invoice'
                          className='nav-link py-2 px-3'
                        >
                          Invoice
                        </Link>
                        <Link
                          href='/customer/transactions/payment'
                          className='nav-link py-2 px-3'
                        >
                          Payment
                        </Link>
                      </div>

                    )}
                </li>
              </ul>
            </div>
          </div>
          <div className='col-xl-9 col-lg-9'>{children}</div>
        </div>
      </div>
    </section>
  );
};

export default layout;
