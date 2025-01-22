"use client";
import { getCustomerAddress } from "@/core/requests/customerRoutes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();
  const { data: customerAddressList, isLoading: customerAddressLoading } =
    useQuery({
      queryKey: ["customerAddressList"],
      queryFn: () => getCustomerAddress(),
      refetchOnWindowFocus: false,
    });
  console.log(customerAddressList);
  return (
    <div className='address-box'>
      <h3>Select a delivery address</h3>
      <div className='all-address'>
        <div className='address-list-item'>
          <input
            type='radio'
            className='address-radio'
            id='add1'
            name='address'
          />
          <label className='address-label' htmlFor='add1'>
            <p className='select-add'>
              <strong>Vikas Patel </strong>Office No 4, B-15, Sector 11, Shanti
              Nagar, Mira Road (E), Mumbai, MAHARASHTRA, 401107, India |{" "}
              <a
                href='#'
                className='add-link'
                data-toggle='modal'
                data-target='#edit-address'
              >
                Edit Address
              </a>{" "}
            </p>
          </label>
        </div>

        <div className='address-list-item'>
          <input
            type='radio'
            className='address-radio'
            id='add2'
            name='address'
          />
          <label className='address-label' htmlFor='add2'>
            <p className='select-add'>
              <strong>Anuj Pandey </strong>Office No 4, B-15, Sector 11, Shanti
              Nagar, Mira Road (E), Mumbai, MAHARASHTRA, 401107, India |{" "}
              <a href='' className='add-link'>
                Edit Address
              </a>{" "}
            </p>
          </label>
        </div>

        <div className='add-new-address'>
          <span data-toggle='modal' data-target='#add-address'>
            <i className='bi bi-plus'></i> Add new address
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
