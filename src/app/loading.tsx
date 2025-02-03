import Image from "next/image";
import React from "react";
import logo4 from "@/assets/images/logo4.png";
const Loading = () => {
  return (
    <div className='full-page-loader'>
      <div className='loader_box'>
        <div className='loader-logo'>
          <Image
            src={logo4.src}
            className='img-fluid'
            alt='Loader Logo img-fluid'
            width={150}
            height={150}
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
