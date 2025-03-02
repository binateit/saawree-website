import { formatCurrency } from "@/core/helpers/helperFunctions";
import { MakeToOrderProduct, ProductList } from "@/core/models/productModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BsCart } from "react-icons/bs";
import ProductImage from "./ProductImage";
import { Session } from "next-auth";

interface ProductsProps {
  product: ProductList | MakeToOrderProduct;
  session?: Session;
  type: string;
}

const ProductGridCard = ({ product, session, type }: ProductsProps) => {
  const router = useRouter();
  return (
    <>
      <Link
        href={
          type === "mto"
            ? `/maketoorder/details?productId=${product?.productId}`
            : `/readystock/details?productId=${product?.productId}`
        }
        className="h-100"
        style={{width: '100%', display: 'inline-block'}}
      >
        <div className='category-prod-box border h-100'>
          <div className='prod-img-bx1'>
            <ProductImage
              url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${product?.imagePath}`}
              className={"auto-fit"}
            />
          </div>
          <div className='p-2'>
            <div className='prod-name2'>
              <p className='mb-0 text-ellips-2'>{product?.productName}</p>
              <p className='mb-0'>
                <small>Design Number: {product?.productGroupName}</small>
              </p>
            </div>
            <div className='prod-price2'>
              <div className='prc'>
                {session?.user ? (
                  <>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className=''>
                        <span className='seling'>
                          {formatCurrency(product?.productPrice as number)}
                        </span>
                      </div>

                      <div
                        className='cart-link'
                        onClick={() =>
                          router.push(
                            type === "mto"
                              ? `/maketoorder/details?productId=${product?.productId}`
                              : `/readystock/details?productId=${product?.productId}`
                          )
                        }
                      >
                        <div className='act-btn'>
                          <BsCart fontSize={20} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* <div className='disc'>
            <span>{`${product?.discountPercent} % Off`}</span>
          </div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductGridCard;
