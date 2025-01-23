import { formatCurrency } from "@/core/helpers/helperFunctions";
import { MakeToOrderProduct, ProductList } from "@/core/models/productModel";
import Link from "next/link";
import React from "react";
import { BsBag, BsBoxArrowInUpRight, BsCart, BsHeart } from "react-icons/bs";

interface ProductsProps {
  product: ProductList | MakeToOrderProduct;
  session?: any;
  type: string;
}

const ProductGridCard = ({ product, session, type }: ProductsProps) => {
  console.log(product)
  return (
    <>
      <div className='category-prod-box border'>
        <div className='prod-img-bx1'>
          <img
            src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${product?.imagePath}`}
            className='auto-fit'
            alt={product?.productName || "Product"}
          />

        </div>
        <div className="p-2">
          <div className='prod-name2'>
            <p className="mb-0">{product?.productName}</p>
            <p className="mb-0"><small>Design Number: {product?.name}</small></p>
          </div>
          <div className='prod-price2'>
            <div className='prc'>
              {session?.user ? (
                <>
                  {/* <span className='seling-price'>
                    {formatCurrency(product?.productPrice)}
                  </span>{" "} */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                      {/* <span className='mrp'>
                        <s>₹200.00</s>
                      </span> */}
                      <span className='seling'>₹150.00</span>
                    </div>


                    <div className='cart-link'>
                      <Link
                        href='#'
                        className='act-btn'
                      >
                        <BsCart fontSize={20}/>
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}


            </div>
          </div>
          <div className='disc'>
            {/* <span>{`${product?.discountPercent} % Off`}</span> */}
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductGridCard;
