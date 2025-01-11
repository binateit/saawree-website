import React from "react";

const Overview = () => {
  return (
    <div className='card shadow rounded'>
      <div className='card-header bg-white'>
        <h5 className='mb-0'>Overview</h5>
      </div>

      <div className='card-body'>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>15</p>
              <p className='mb-0 text-muted'>Sales Order Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>₹3,67,736.00</p>
              <p className='mb-0 text-muted'>Sales Order Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>₹1,000.00</p>
              <p className='mb-0 text-muted'>Sales Order Paid Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>₹3,66,736.00</p>
              <p className='mb-0 text-muted'>Sales Order Pending Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>26</p>
              <p className='mb-0 text-muted'>Invoice Count</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>₹61,57,940.00</p>
              <p className='mb-0 text-muted'>Invoice Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>₹0.00</p>
              <p className='mb-0 text-muted'>Invoice Paid Amount</p>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
            <div className='p-3 border text-center'>
              <p className='mb-0 h5'>₹61,57,940.00</p>
              <p className='mb-0 text-muted'>Invoice Pending Amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
