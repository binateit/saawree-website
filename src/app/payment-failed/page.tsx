import Link from "next/link";
import React from "react";
import { BsShieldFillX } from "react-icons/bs";

const Page = () => {
  return (
    <>
      <section className='thankyou-page'>
        <div className='container'>
          <div className='inner-wrap-th'>
            <BsShieldFillX fontSize={60} className='text-danger' />
            <h2 className='thank-title text-danger mt-3 mb-2'>
              Payment Failed
            </h2>
            <p className='h5 font-weight-bold text-muted mb-2'>
              Order Amount : ₹ 4,556
            </p>
            <p className='text-center mb-2 ord-txt'>
              It&apos;s Seems like there was some trouble
            </p>
            <p className='text-center ord-txt'>Payment ID : 452SDS </p>
            <Link href='#' className='btn btn-saawree'>
              Try Again
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
