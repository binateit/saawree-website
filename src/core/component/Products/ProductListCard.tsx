import { formatCurrency } from "@/core/helpers/helperFunctions";
import { MakeToOrderProduct, ProductList } from "@/core/models/productModel";
import Link from "next/link";
import React from "react";
import { BsCart } from "react-icons/bs";
import ProductImage from "./ProductImage";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";


interface ProductsProps {
  product: ProductList | MakeToOrderProduct;
  session?: Session;
  type: string;
}

const ProductListCard = ({ product, session, type }: ProductsProps) => {
  const router = useRouter();
  return (
    <Link
      href={
        type === "mto"
          ? `/maketoorder/details?productId=${product?.productId}`
          : `/readystock/details?productId=${product?.productId}`
      }
      className='mb-3 border d-block'
      key={product?.productId}
    >
      <div className='category-prod-box mb-0 d-flex'>
        <div className='products-list-image'>
          <ProductImage
            url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${product?.imagePath}`}
          />
        </div>
        <div className='pt-3'>
          <span className='text-dark'>{product?.categoryName}</span>
          <div className='prod-name2'>
            <p className='mb-0'>{product?.productName}</p>
            <p className='mb-0'>
              <small>Design Number: {product?.productGroupName}</small>
            </p>
          </div>
          <div className='prod-price2'>
            <div className='prc'>
              {session?.user ? (
                <>
                  <div className=''>
                    <span className='seling'>
                      {formatCurrency(product?.productPrice || 0)}
                    </span>{" "}
                  </div>
                  <div className='cart-link'>
                    <div
                      onClick={() =>
                        router.push(
                          type === "mto"
                            ? `/maketoorder/details?productId=${product?.productId}`
                            : `/readystock/details?productId=${product?.productId}`
                        )
                      }
                      className='act-btn d-inline-block w-auto px-2'
                    >
                      <div className='d-flex align-items-center'>
                        <BsCart fontSize={20} className='mr-2' />{" "}
                        <small>Add to Cart</small>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // <a href='#'>
                //   <button className='btn btn-saawree'>
                //     Login to view price
                //   </button>
                // </a>
                ""
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
