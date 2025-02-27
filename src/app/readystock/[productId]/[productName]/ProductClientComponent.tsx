"use client"; // ✅ Marks this as a Client Component

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import { createCart } from "@/core/requests/cartRequests";
import Loading from "@/app/loading";
import { TabPanel, TabView } from "primereact/tabview";
import { Galleria } from "primereact/galleria";
import { ProductColor, ProductImage } from "@/core/models/productModel";

export default function ProductClientComponent({ product }: { product: any }) {
  const router = useRouter();
  const { data: session, status: authStatus } = useSession();
  const [selectedColors, setSelectedColors] = useState<ProductColor[]>([]);

  if (!product) {
    return <Loading />;
  }

  const handleAddToCart = (isBuyNow: boolean) => {
    if (authStatus === "unauthenticated") return router.push("/auth/login");

    toast.success(isBuyNow ? "Proceeding to Checkout" : "Added to cart");
  };

  return (
    <section className="product-details">
      <div className="container">
        <div className="row">
          {/* ✅ Product Image Gallery */}
          <div className="col-md-6">
            <Galleria value={product?.productImages} circular numVisible={5} style={{ maxWidth: "800px" }}
              item={(item: ProductImage) => (
                <img src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.imagePath}`} alt={product?.name} style={{ width: "100%" }} />
              )}
              thumbnail={(item: ProductImage) => (
                <img src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.thumbnailImagePath}`} alt={product?.name} />
              )}
            />
          </div>

          {/* ✅ Product Details */}
          <div className="col-md-6">
            <h1 className="product-name-title">{product?.name}</h1>
            <div className="product-price">
              <span className="selling-price">{product?.productPrice} USD</span>
            </div>
            <ul className="list-unstyled">
              <li><b>Design number:</b> <span>{product?.productGroupName}</span></li>
              <li><b>Polish type:</b> <span>{product?.polishingTypeName}</span></li>
              <li><b>Category:</b> <span>{product?.categoryName}</span></li>
              <li><b>Color:</b> <span>{product?.colorName}</span></li>
            </ul>

            {/* ✅ Add to Cart & Buy Now */}
            {authStatus === "authenticated" && (
              <div className="action-btn-wrapper">
                <button className="btn btn-primary" onClick={() => handleAddToCart(false)}>
                  Add to Cart
                </button>
                <button className="btn btn-success" onClick={() => handleAddToCart(true)}>
                  Buy Now
                </button>
                <a href="#" className="whatsapp"><BsWhatsapp fontSize={25} color="green" /></a>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Product Description */}
        <div className="row">
          <div className="col-md-12">
            <TabView>
              <TabPanel header="Description">
                {product?.description || "No description available"}
              </TabPanel>
              <TabPanel header="Shipping Policy">
                <p>We offer fast and reliable shipping. Check our policies for more details.</p>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </section>
  );
}
