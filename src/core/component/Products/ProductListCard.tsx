import { formatCurrency } from "@/core/helpers/helperFunctions";
import { MakeToOrderProduct, ProductList } from "@/core/models/productModel";
import Link from "next/link";
import React from "react";

interface ProductsProps {
  product: ProductList | MakeToOrderProduct;
  session?: any;
  type: string;
}

const ProductListCard = ({ product, session, type }: ProductsProps) => {
  return (
    <Link
      href={
        type === "mto"
          ? `/maketoorder/details?productId=${product?.productId}`
          : `/readystock/details?productId=${product?.productId}`
      }
      className='mb-2'
      key={product?.productId}
    >
      <div className='category-prod-box d-flex'>
        <div className='products-list-image'>
          <img
            src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${product?.imagePath}`}
            alt=''
          />
        </div>
        <div>
          <span>{product?.categoryName}</span>
          <div className='list-view-product-name'>
            <a href='product-details.html'>{product?.productName}</a>
          </div>
          <div className='prod-price2'>
            <div className='prc'>
              {session?.user ? (
                <>
                  <span className='seling-price'>
                    {formatCurrency(product?.productPrice || 0)}
                  </span>{" "}
                </>
              ) : (
                <a href='#'>
                  <button className='btn btn-saawree'>
                    Login to view price
                  </button>
                </a>
              )}
            </div>
            <div className='disc'>
              {/* <span>{`${product?.productDiscount} % Off`}</span> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListCard;
