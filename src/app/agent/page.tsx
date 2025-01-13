"use client";
import React, { useState } from "react";
import Overview from "./overview";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getRecordById } from "@/core/requests/agentRequests";

const page = () => {
  const { data: session } = useSession();
  const [showRightPanel, setShowRightPanel] = useState("overview");
  const [showDropDown, setShowDropDown] = useState({
    display: false,
    name: "",
  });

  const { data: agentOverview, isLoading: agentOverviewLoading } = useQuery({
    queryKey: ["agentOverviewRec"],
    queryFn: () => getRecordById(session?.user?.id),
    refetchOnWindowFocus: false,
  });

  return (
    <section className='dashboard-wrap'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-3 col-lg-3 d-none d-lg-block'>
            <div className='panel-menu'>
              <ul className='nav flex-column nav-pills nav-pills-custom'>
                <li
                  className={`nav-link mb-2 ${
                    showRightPanel == "overview" ? "shadow active" : ""
                  }`}
                  onClick={() => setShowRightPanel("overview")}
                >
                  <div className='font-weight-bold small text-uppercase nav-link-item  py-3 px-3 d-block'>
                    Overview
                  </div>
                </li>
                <li className='mb-2 shadow tab-has-dropdown nav-link cursor-pointer'>
                  <div
                    className={`font-weight-bold small text-uppercase py-3 px-3 nav-link-item ${
                      showRightPanel == "profile" ? "shadow active" : ""
                    }`}
                    onClick={() => setShowRightPanel("profile")}
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
                        <a
                          className='nav-link pl-0 py-2 px-3'
                          href='address.html'
                        >
                          Address
                        </a>
                        <a
                          className='nav-link pl-0 py-2 px-3'
                          href='change-password.html'
                        >
                          Change Password
                        </a>
                      </div>
                    </div>
                  )}
                </li>
                <li className='mb-2 shadow tab-has-dropdown nav-link cursor-pointer'>
                  <div
                    className='font-weight-bold small text-uppercase py-3 px-3'
                    onClick={() => setShowRightPanel("transaction")}
                  >
                    Transaction
                  </div>
                  <div className='tab-dropdown'>
                    <div
                      className='nav flex-column nav-pills nav-pills-custom-dropdown'
                      id='v-pills-tab'
                      role='tablist'
                      aria-orientation='vertical'
                    >
                      <a className='nav-link py-2 px-3' href='sale-order.html'>
                        Sales Order
                      </a>
                      <a className='nav-link py-2 px-3' href='invoice.html'>
                        Invoice
                      </a>
                      <a className='nav-link py-2 px-3' href='payment.html'>
                        Payment
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='col-xl-9 col-lg-9'>
            {showRightPanel === "overview" && (
              <Overview overview={agentOverview} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
