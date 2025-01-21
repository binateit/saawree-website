import { formatCurrency } from "@/core/helpers/helperFunctions";
import { MakeToOrderProduct, ProductList } from "@/core/models/productModel";
import Link from "next/link";
import React from "react";
import { BsBag, BsBoxArrowInUpRight, BsHeart } from "react-icons/bs";

interface ProductsProps {
  product: ProductList | MakeToOrderProduct;
  session?: any;
  type: string;
}

const ProductGridCard = ({ product, session, type }: ProductsProps) => {
  return (
    <>
      <div className='category-prod-box'>
        <div className='prod-img-bx1'>
          <img
            src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${product?.imagePath}`}
            className='auto-fit'
            alt={product?.productName || "Product"}
          />
          <div className='pro-act-btn'>
            <Link
              href={
                type === "mto"
                  ? `/maketoorder/details?productId=${product?.productId}`
                  : `/readystock/details?productId=${product?.productId}`
              }
              className='act-btn'
            >
              <BsBoxArrowInUpRight />
            </Link>
          </div>
        </div>
        <div className='prod-name2'>
          <p>{product?.productName}</p>
        </div>
        <div className='prod-price2'>
          <div className='prc'>
            {session?.user ? (
              <>
                {" "}
                <span className='seling-price'>
                  {formatCurrency(product?.productPrice)}
                </span>{" "}
              </>
            ) : (
              <Link href={"/auth/login"} className='btn btn-saawree-outline'>
                Login to view price
              </Link>
            )}
          </div>
        </div>
        <div className='disc'>
          {/* <span>{`${product?.discountPercent} % Off`}</span> */}
        </div>
      </div>
    </>
  );
};

export default ProductGridCard;
