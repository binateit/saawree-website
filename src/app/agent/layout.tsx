"use client";
import Link from "next/link";
import React, { useState } from "react";

const Layout = ({
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
                <Link
                  href={"/agent"}
                  className={`nav-link mb-2 ${
                    showRightPanel == "overview" ? "shadow active" : ""
                  }`}
                >
                  <div className='font-weight-bold small text-uppercase nav-link-item  py-3 px-3 d-block'>
                    Overview
                  </div>
                </Link>
                <li className='mb-2 shadow tab-has-dropdown nav-link cursor-pointer'>
                  <div
                    className={`font-weight-bold small text-uppercase py-3 px-3 nav-link-item ${
                      showRightPanel == "profile" ? "shadow active" : ""
                    }`}
                    onClick={() => {
                      setShowDropDown({ name: "profile", display: true });
                      setShowRightPanel("profile");
                    }}
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
                          href='/agent/profile/details'
                        >
                          Profile Details
                        </Link>

                        <Link
                          className='nav-link pl-0 py-2 px-3'
                          href='/agent/profile/change-password'
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
                    onClick={() => {
                      setShowDropDown({ name: "transaction", display: true });
                      setShowRightPanel("transaction");
                    }}
                  >
                    Transaction
                  </div>
                  {showDropDown.display &&
                    showDropDown.name == "transaction" && (
                      <div className=''>
                        <div
                          className='nav flex-column nav-pills nav-pills-custom-dropdown'
                          id='v-pills-tab'
                          role='tablist'
                          aria-orientation='vertical'
                        >
                          <Link
                            className='nav-link py-2 px-3'
                            href='/agent/transactions/sales-order'
                          >
                            Sales Order
                          </Link>
                          <Link
                            className='nav-link py-2 px-3'
                            href='/agent/transactions/invoice'
                          >
                            Invoice
                          </Link>
                          <Link
                            className='nav-link py-2 px-3'
                            href='/agent/transactions/payment'
                          >
                            Payment
                          </Link>
                          <Link
                            className='nav-link py-2 px-3'
                            href='/agent/transactions/commissions'
                          >
                            Commission
                          </Link>
                          <Link
                            className='nav-link py-2 px-3'
                            href='/agent/transactions/customers'
                          >
                            Customers
                          </Link>
                          <Link
                            className='nav-link py-2 px-3'
                            href='/agent/transactions/payout'
                          >
                            Payout
                          </Link>
                        </div>
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

export default Layout;
