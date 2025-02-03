"use client";
import React, { ReactHTMLElement, useState } from "react";

interface TrackOrderPayload {
  orderId: string;
  mobileNumber: string;
}

const Page = () => {
  const [trackerInput, setTrackerInput] = useState<TrackOrderPayload>({
    orderId: "",
    mobileNumber: "",
  });

  return (
    <>
      <div className='bg-light-cream track-order pt-5 pb-5'>
        <h3 className='form-heading1'>Fill the details to track your order</h3>
        <form className='login-form mt-3'>
          <div className='form-group'>
            <label htmlFor='username'>Order ID</label>
            <input
              type='text'
              className='form-control checkout-input'
              onChange={(e) =>
                setTrackerInput({ ...trackerInput, orderId: e.target.value })
              }
            />
          </div>
          <div className='form-group'>
            <div className='frg-lbl'>
              <label htmlFor='password'>Email Id / Mobile No.</label>{" "}
            </div>
            <input
              type='text'
              className='form-control checkout-input'
              id=''
              onChange={(e) =>
                setTrackerInput({
                  ...trackerInput,
                  mobileNumber: e.target.value,
                })
              }
            />
          </div>
          <a href='verify-number.html' className='submit-btn btn btn-saawree'>
            Next
          </a>
        </form>
      </div>
    </>
  );
};

export default Page;
