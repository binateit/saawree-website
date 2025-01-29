"use client";
import ProductImage from "@/core/component/Products/ProductImage";
import { useCartCount } from "@/core/context/useCartCount";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { cartData } = useCartCount();
  console.log("cartData", cartData);
  return (
    <section className='checkout-page'>
      <div className='container'>
        <div className='row'>
          <div
            className={`${cartData ? "col-md-6 left-pd" : "col-md-12 left-pd"}`}
          >
            {children}
          </div>
          {cartData && (
            <div className='col-md-6 left-pd'>
              <div className='order-summerybox'>
                <div className='order-sumry-heading'>
                  <h3 className='form-heading1'>Order Summry</h3>
                  {/* <p className="extr-opt">Have an account? <a href="#">Log in</a></p>  */}
                  {cartData?.items?.map((item, index) => (
                    <div
                      className='order-row d-flex align-items-center justify-content-between'
                      key={item?.cartId}
                    >
                      <div className='order-prod-img'>
                        <div className='ord-prd-wrp'>
                          <ProductImage
                            url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.imagePath}`}
                            className='img-responsive'
                          />
                        </div>
                      </div>
                      <div className='ord-prd-name'>
                        <p>{item?.productName}</p>
                        <p>Unit Price - {formatCurrency(item?.productPrice)}</p>
                        <p>Qnty - {item?.quantity}</p>
                        {/* <p>Discount - 5%</p> */}
                      </div>
                      <div className='ord-prd-amt'>
                        {/* <p className='deletd-amt'>
                        <s>₹ 1500.00</s>
                      </p> */}
                        <p
                          className='selling-amt'
                          style={{ marginBottom: "0px" }}
                        >
                          {formatCurrency(item?.subTotal)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='total-row d-flex align-items-center justify-content-between'>
                  <p className='subt'>Subtotal</p>
                  <p className='subt-amt'>
                    {formatCurrency(cartData?.orderSubTotal)}
                  </p>
                </div>
                {/* <div className='total-row d-flex align-items-center justify-content-between'>
                <p className='subt'>Shipping</p>
                <p className='subt-amt'>₹ 50.00</p>
              </div> */}
                <div className='total-wrap d-flex align-items-center justify-content-between'>
                  <p className='total-t'>
                    Total <br />
                    <span className='incl'> All inclusive</span>
                  </p>
                  <p className='total-a'>
                    {formatCurrency(cartData?.orderTotalTaxInclusive)}
                  </p>
                </div>
              </div>
              <a href='payment-options.html'>
                <button className='btn btn-saawree mt-4 d-md-none'>
                  Continue with this address
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default layout;
