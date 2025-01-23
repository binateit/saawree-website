import React from "react";

const Loading = () => {
  return (
    <div className='full-page-loader'>
      <div className='loader_box'>
        <div className='loader-logo'>
          <img
            src='https://saawree.com/images/logo4.png'
            alt='Loader Logo'
            width='100%'
          />
        </div>
        {/* <p className="loding-content text-center">Loading...</p> */}
        <div className='progress mt-5'>
          <div className='progress-value'></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
