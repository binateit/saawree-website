/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { getReadyStockRecomendedProducts, getRSProductDetails } from "@/core/requests/productsRequests";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import Image from "next/image";
import { BsWhatsapp } from "react-icons/bs";
import InnerImageZoom from "react-inner-image-zoom";
import { createCart } from "@/core/requests/cartRequests";
import { toast } from "react-toastify";
import { useCartCount } from "@/core/context/useCartCount";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import customLoader from "@/core/component/shared/image-loader";
import Loading from "@/app/loading";
import { TabPanel, TabView } from "primereact/tabview";
import { Galleria } from "primereact/galleria";
import { ProductColor, ProductImage } from "@/core/models/productModel";

type StockError = {
  productId: number;
  message: string;
};
const Page = () => {
  const { data: session, status: authStatus } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get("productId"));

  const [stockErrors, setStockErrors] = useState<StockError[]>([]);
  const [selectedColors, setSelectedColors] = useState<ProductColor[]>([]);
  const { setIsBuyNow } = useCartCount();

  /** Fetch Product Details */
  const { data: response, isLoading } = useQuery({
    queryKey: ["getRSProductDetailsData", productId],
    queryFn: () => getRSProductDetails(productId),
    enabled: !!productId,
    placeholderData: keepPreviousData,
  });

  const polishTypeList = response?.polishingTypeList?.map(ptype => ({
    name: ptype.polishingTypeName,
    value: ptype.productId,
  })) || [];

  const selectedPolishType = polishTypeList.find(p => p.value === productId)?.value;


  /** Handle Redirect */
  const handleRedirect = (id: number) => router.push(`/readystock/details?productId=${id}`);

  /** Handle Quantity Change */
  const handleQuantityChange = (productId: number, colorId: number, quantity: number) => {
    if (quantity < 1) return toast.error("Quantity must be at least 1");

    setSelectedColors(prevColors => {
      const updatedColors = prevColors.map(color =>
        color.colorId === colorId ? { ...color, quantity, productId } : color
      );
      return updatedColors.find(color => color.colorId === colorId) ? updatedColors : [...prevColors, { colorId, quantity, productId }];
    });
  };

  /** Handle Add to Cart */
  const handleAddToCart = async (isBuyNow: boolean) => {
    if (authStatus === "unauthenticated") return router.push("/auth/login");

    if (authStatus === "authenticated" && response && selectedColors.length > 0) {
      try {
        const updatedItems = selectedColors.map(color => ({
          productId: color.productId,
          quantity: color.quantity,
        }));

        const result = await createCart({ orderType: 1, items: updatedItems, isFromBuyNow: isBuyNow });
        if (result.succeeded) {
          // setCartCount(prev => prev + 1);
          toast.success("Items added to cart successfully");
          setIsBuyNow(isBuyNow);
          router.push(isBuyNow ? "/checkout" : "/cart");
          queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
        } else {
          setStockErrors(result.data || []);
          toast.error(result.messages?.[0] || "Failed to add items to cart");
        }
      } catch {
        toast.error("An error occurred while adding item to cart");
      }
    } else {
      toast.error("Please select the quantity");
    }
  };

  if (isLoading) return <Loading />;


  const collectionSettings = {
    dots: false,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const productImagesThumbnails = {
    dots: false,
    swipeToSlide: true,
    draggable: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  const itemTemplate = (item: ProductImage) => {
    return (
      // <InnerImageZoom
      //   src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.imagePath}`}
      //   zoomSrc={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.zoomImagePath}`}
      //   zoomType='hover'
      //   hideHint
      //   width={600}
      //   zoomScale={2}
      //   hasSpacer={true}
      //   zoomPreload={true}
      // />

      <img src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.imagePath}`} alt={response?.name} style={{ width: '100%' }} />

    )
    // return <img src={item.itemImageSrc} alt={response?.name} style={{ width: '100%' }} />
  }

  const thumbnailTemplate = (item: ProductImage) => {
    return <img src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${item?.thumbnailImagePath}`} alt={response?.name} />
  }

  if (isLoading) return <Loading />;
  return (
    <section className='product-details'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <Galleria value={response?.productImages} responsiveOptions={responsiveOptions} circular numVisible={5} style={{ maxWidth: '800px' }}
              item={itemTemplate} thumbnail={thumbnailTemplate} />


          </div>
          <div className='col-md-6'>
            <div className='product-details-wrapper'>
              <h1 className='product-name-title'>{response?.name}</h1>
              <div className='product-price'>
                <span className='selling-price'>
                  {formatCurrency(response?.productPrice)}
                </span>{" "}
                {/* <p className='instruction'>(Tax included)</p> */}
              </div>
              <ul className='list-unstyled'>
                <li className='product-dimension'>
                  <b>Design number:</b>{" "}
                  <span>{response?.productGroupName}</span>
                </li>
                <li className='product-upc'>
                  <b>Polish type:</b> <span>{response?.polishingTypeName}</span>
                </li>
                <li className='product-ean'>
                  <b>Category:</b> <span>{response?.categoryName}</span>
                </li>
                <li className='product-isbn'>
                  <b>Color:</b> <span>{response?.colorName}</span>
                </li>
              </ul>

              <div className='options-wrapper mb-3'>
                <p className='opiton-label'>Polishing Type :</p>
                <div className='product-options search-category-dropdown'>
                  <Dropdown
                    value={selectedPolishType}
                    onChange={(e) => handleRedirect(e.value)}
                    options={polishTypeList}
                    optionLabel='name'
                    placeholder='Select options'
                    className='w-full md:w-14rem'
                    panelClassName='custom-dropDown-panel'
                  />
                </div>

                {response?.colorList?.length ? (
                  <div className="product-color-options mt-4">
                    <div className="row option-heading">
                      <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6">
                        <div className="d-flex">
                          <div className="moti-color options-title">Colors</div>
                          {authStatus === "authenticated" && (
                            <>
                              <div className="stock options-title">Stock</div>
                              <div className="color-quntity options-title text-center">Qty</div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {response.colorList.map((color, index) => (
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6 mb-4" key={color.colorId}>
                          <div className="d-flex">
                            {/* Color Image & Name */}
                            <div className="moti-color">
                              <Image
                                loader={customLoader}
                                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${color.imagePath}`}
                                alt="color"
                                width={20}
                                height={20}
                              />
                              <span onClick={() => handleRedirect(color.productId)} className="cursor-pointer color-name">
                                {color.colorName}
                              </span>
                            </div>

                            {/* Stock & Quantity Input for Authenticated Users */}
                            {authStatus === "authenticated" && (
                              <>
                                <div className="stock">{color.avaliableQuantity}</div>
                                <div className="color-quntity">
                                  <input
                                    type="number"
                                    className="quntity-input"
                                    id={`qty-${index}`}
                                    defaultValue={0}
                                    min={1}
                                    max={color.avaliableQuantity}
                                    onChange={(e) => {
                                      const qty = parseInt(e.target.value);
                                      if (qty < 1 || qty > (color?.avaliableQuantity ?? 0)) {
                                        e.target.value = "0";
                                        toast.error("Quantity should be between 1 and available stock");
                                      } else {
                                        handleQuantityChange(color.productId, color.colorId, qty);
                                      }
                                    }}
                                  />
                                </div>
                              </>
                            )}
                          </div>

                          {/* Stock Errors */}
                          {stockErrors
                            ?.filter((se) => se.productId === color.productId)
                            .map((err, i) => (
                              <p className="text-danger mb-0" key={i}>
                                {err.message}
                              </p>
                            ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}


                {authStatus === "authenticated" &&
                  session?.user?.userType === "customer" && (
                    <div className='action-btn-wrapper'>
                      <button
                        className='btn btn-saawree-outline'
                        onClick={() => handleAddToCart(false)}
                      >
                        Add to cart
                      </button>
                      <div
                        onClick={() => {
                          handleAddToCart(true);
                        }}
                        className='btn btn-saawree'
                      >
                        Buy now
                      </div>
                      {/* <button className="btn btn-saawree-outline"><i className="bi bi-heart"></i></button>  */}
                      <a href='#' className='whatsapp'>
                        <BsWhatsapp fontSize={25} color='green' />
                      </a>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='des-sec'>
              <TabView>
                <TabPanel header="Description">
                  {
                    (response?.description == undefined || response?.description == '') ?
                      <>
                        <ul className='list-unstyled'>
                          <li className='product-dimension'>
                            <b>Design number:</b>{" "}
                            <span>{response?.productGroupName}</span>
                          </li>
                          <li className='product-upc'>
                            <b>Polish type:</b> <span>{response?.polishingTypeName}</span>
                          </li>
                          <li className='product-ean'>
                            <b>Category:</b> <span>{response?.categoryName}</span>
                          </li>
                          <li className='product-isbn'>
                            <b>Color:</b> <span>{response?.colorName}</span>
                          </li>
                        </ul>
                      </> : (
                        response?.description
                      )
                  }

                  {response?.description}
                </TabPanel>
                <TabPanel header="Shipping Policy">
                  <h4>Shipping policy for our store</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                    iriure dolor in hendrerit in vulputate
                  </p>
                  <ul>
                    <li>1-2 business days (Typically by end of day)</li>
                    <li>30 days money back guaranty</li>
                    <li>24/7 live support</li>
                    <li>odio dignissim qui blandit praesent</li>
                    <li>luptatum zzril delenit augue duis dolore</li>
                    <li>te feugait nulla facilisi.</li>
                  </ul>
                  <p>
                    Nam liber tempor cum soluta nobis eleifend option congue
                    nihil imperdiet doming id quod mazim placerat facer possim
                    assum. Typi non habent claritatem insitam; est usus legentis
                    in iis qui facit eorum
                  </p>
                  <p>
                    claritatem. Investigationes demonstraverunt lectores legere
                    me lius quod ii legunt saepius. Claritas est etiam processus
                    dynamicus, qui sequitur mutationem consuetudium lectorum.
                    Mirum est notare quam littera gothica, quam nunc putamus
                    parum claram, anteposuerit litterarum formas humanitatis per
                  </p>
                  <p>
                    seacula quarta decima et quinta decima. Eodem modo typi, qui
                    nunc nobis videntur parum clari, fiant sollemnes in futurum.
                  </p>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
