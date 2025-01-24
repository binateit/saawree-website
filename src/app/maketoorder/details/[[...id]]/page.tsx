"use client";
import { formatCurrency, urlExists } from "@/core/helpers/helperFunctions";
import { SelectOptionProps } from "@/core/models/model";
import underlineIcon from "@/assets/images/underlineIcon.png";
import {
  getMaketoOrderProductDetails,
  getRecomendedMaketoOrderProducts,
} from "@/core/requests/productsRequests";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsCart, BsDownload, BsHeart } from "react-icons/bs";
import { Carousel } from "primereact/carousel";
import InnerImageZoom from "react-inner-image-zoom";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Dialog } from "primereact/dialog";
import { ProductColor } from "@/core/models/productModel";
import { Items } from "@/core/models/cartModel";
import { createCart } from "@/core/requests/cartRequests";
import { toast } from "react-toastify";
import { useCartCount } from "@/core/context/useCartCount";
import productImagePlaceholder from "@/assets/images/productImagePlaceHolder.jpg";
import ProductImage from "@/core/component/Products/ProductImage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setCartCount, cartCount, setIsBuyNow } = useCartCount();
  const [visible, setVisible] = useState(false);
  const searchParams = useSearchParams();
  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [selectedColors, setSelectedColors] = useState<ProductColor[]>([]);
  const productId = searchParams.get("productId");
  const [mainProductImage, setMainProductImage] = useState<{
    mainImage: string | undefined;
    zoomedImage: string | undefined;
  }>({
    mainImage: undefined,
    zoomedImage: undefined,
  });
  const [polishType, setPolishType] = useState<string>("");
  const [polishTypeList, setPolishTypeList] = useState<SelectOptionProps[]>([]);
  const [visibleTab, setVisibleTab] = useState<string>("description");

  const { data: response, isLoading: isProductDetailsLoading } = useQuery({
    queryKey: ["getMTOProductDetails"],
    queryFn: () => getMaketoOrderProductDetails(Number(productId)),
  });
  const queryClient = useQueryClient();
  useEffect(() => {
    let polishTypes: any = [];
    response?.polishingTypeList?.map((ptype) => {
      return polishTypes.push({
        name: ptype?.polishingTypeName,
        value: ptype?.polishingTypeId,
      });
    });
    setPolishTypeList(polishTypes);
    setPolishType(
      polishTypes.filter(
        (p: { name: string }) => p.name === response?.polishingTypeName
      )[0]?.value
    );

    setMainProductImage({
      mainImage: response?.productImages?.[0]?.mediumImagePath || "",
      zoomedImage: response?.productImages?.[0]?.zoomImagePath || "",
    });

    urlExists(
      `${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${response?.productImages?.[0]?.mediumImagePath}`,
      function (status: any) {
        if (status === 200) {
          console.log("image found");
        } else {
          setMainProductImage({ mainImage: undefined, zoomedImage: undefined });
        }
      }
    );
  }, [response]);

  const { data: recomendedProducts } = useQuery({
    queryKey: ["geRecomendedMakeToOrderProductRecords", response],
    queryFn: async () => {
      return await getRecomendedMaketoOrderProducts({
        categoryIds: [Number(response?.categoryId)],
      });
    },
    enabled: !!response,
  });

  const downloadImage = async () => {
    try {
      const imageUrl = `${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${mainProductImage?.mainImage}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = imageUrl.split("/").pop() || "";
      link.click();

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const handleQuantityChange = (
    productId: number,
    colorId: number,
    quantity: number
  ) => {
    setSelectedColors((prevColors) => {
      const existingColor = prevColors.find(
        (color) => color.colorId === colorId
      );
      if (existingColor) {
        return prevColors.map((color) =>
          color.colorId === colorId ? { ...color, quantity, productId } : color
        );
      } else {
        return [...prevColors, { colorId, quantity, productId }];
      }
    });
  };
  const handleAddToCart = async (isBuyNow: boolean) => {
    try {
      if (session?.user?.token === undefined) {
        router.push("/auth/login");
      } else {
        if (session?.user?.token && response && selectedColors.length > 0) {
          let updatedItems: Items[] = selectedColors.map((color) => ({
            productId: color.productId as number,
            quantity: color.quantity as number,
          }));
          const carts = {
            orderType: 2,
            items: updatedItems,
            isFromBuyNow: isBuyNow,
          };

          const result = await createCart(carts);
          if (result.succeeded) {
            setCartCount((cartCount as number) + updatedItems.length);
            toast.success("Items added to cart successfully");
            router.push(isBuyNow ? "/checkout" : "/cart");
            setIsBuyNow(isBuyNow);
            queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
            return true;
          } else {
            toast.error("Failed to add items to cart");
            return false;
          }
        } else {
          toast.error("Please select the quantity");
          return false;
        }
      }
    } catch (error) {
      toast.error("An error occurred while adding item to cart");
    }
  };

  var collectionSettings = {
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

  var productImagesThumbnails = {
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

  return (
    <section className='product-details'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div id='js-gallery' className='gallery sticky-layer'>
              <div className='gallery__hero'>
                <div
                  onClick={() =>
                    mainProductImage?.mainImage && setVisible(true)
                  }
                >
                  {mainProductImage?.mainImage === undefined ? (
                    <Image
                      src={productImagePlaceholder?.src}
                      width={600}
                      height={600}
                      alt='product image'
                      className='w-100 h-100'
                    />
                  ) : (
                    <InnerImageZoom
                      src={
                        `${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${mainProductImage?.mainImage}` ||
                        productImagePlaceholder?.src
                      }
                      zoomSrc={
                        `${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${mainProductImage?.zoomedImage}` ||
                        productImagePlaceholder?.src
                      }
                      zoomType='hover'
                      hideHint
                      width={600}
                      zoomScale={2}
                      hasSpacer={true}
                      zoomPreload={true}
                      className='w-100 h-100'
                    />
                  )}
                </div>
                <div className='icons-wrap'>
                  <div className='icon-1 down-btn'>
                    <BsDownload onClick={() => downloadImage()} />
                  </div>
                </div>
              </div>
              <div>
                <Slider {...productImagesThumbnails}>
                  {response?.productImages?.map((pi, index) => (
                    <div
                      data-gallery='thumb'
                      className='is-active'
                      onClick={() => {
                        mainProductImage?.mainImage &&
                          setMainProductImage({
                            mainImage: pi?.mediumImagePath,
                            zoomedImage: pi?.zoomImagePath,
                          });
                      }}
                      key={index}
                    >
                      <ProductImage
                        url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${pi?.thumbnailImagePath}`}
                        className={"img-responsive"}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              {/* <div className='gallery__thumbs'>
                {response?.productImages?.map((pi, index) => (
                  <div
                    data-gallery='thumb'
                    className='is-active'
                    onClick={() => {
                      setMainProductImage({
                        mainImage: pi?.mediumImagePath,
                        zoomedImage: pi?.zoomImagePath,
                      });
                    }}
                    key={index}
                  >
                    <ProductImage
                      url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${pi?.thumbnailImagePath}`}
                      className={"img-responsive"}
                    />

                  </div>
                ))}





              </div> */}
            </div>
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

              <p className='short-des'>{response?.description}</p>

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
                    value={polishType}
                    onChange={(e) => setPolishType(e.value)}
                    options={polishTypeList}
                    optionLabel='name'
                    placeholder='Select options'
                    className=''
                    panelClassName='custom-dropDown-panel'
                  />
                </div>

                {(response?.colorList?.length as number) > 1 ? (
                  <div className='product-color-options mt-4'>
                    <div className='row option-heading'>
                      <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6'>
                        <div className='d-flex'>
                          <div className='moti-color options-title'>Colors</div>
                          {/* <div className='stock options-title'>Stock</div> */}
                          <div className='color-quntity  options-title text-center'>
                            Qty
                          </div>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 d-none d-sm-block d-md-none d-lg-block'>
                        <div className='d-flex'>
                          <div className='moti-color options-title'>Colors</div>

                          <div className='color-quntity  options-title text-center'>
                            Qty
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      {response?.colorList?.map((color, index) => (
                        <div
                          className='col-xl-6 col-lg-6 col-md-12 col-sm-6 mb-2'
                          key={color?.colorId}
                        >
                          <div className='d-flex'>
                            <div className='moti-color'>
                              <img
                                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${color?.imagePath}`}
                                alt=''
                              />
                              <span
                                className='color-name'
                                onClick={() =>
                                  setSelectedProductId(color.productId)
                                }
                              >
                                {color.colorName}{" "}
                              </span>
                            </div>

                            <div className='color-quntity'>
                              <input
                                type='text'
                                className='quntity-input'
                                id={index.toString()}
                                defaultValue={0}
                                min={1}
                                max={99999}
                                onChange={(e) => {
                                  let qty = parseInt(e.target.value);
                                  if (qty < 0) {
                                    e.target.value = "";
                                  } else if (qty > 99999) {
                                    e.target.value = "";
                                  } else {
                                    handleQuantityChange(
                                      color.productId as number,
                                      color.colorId as number,
                                      qty
                                    );
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='product-color-options mt-4'>
                        <div className='row option-heading'>
                          <div className='col-md-12'>
                            <div className='d-flex'>
                              <div className='moti-color options-title'>
                                Colors
                              </div>

                              <div className='color-quntity  options-title text-center'>
                                Qty
                              </div>
                            </div>
                          </div>
                        </div>

                        {response?.colorList?.map((color, index) => (
                          <div className='d-flex' key={color?.colorId}>
                            <div className='moti-color'>
                              <img
                                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${color?.imagePath}`}
                                alt=''
                              />
                              <span className='color-name'>
                                {color.colorName}{" "}
                              </span>
                            </div>

                            <div className='color-quntity'>
                              <div className='color-quntity'>
                                <input
                                  type='text'
                                  className='quntity-input'
                                  id={index.toString()}
                                  defaultValue={0}
                                  min={1}
                                  max={99999}
                                  onChange={(e) => {
                                    let qty = parseInt(e.target.value);
                                    if (qty < 0) {
                                      e.target.value = "";
                                    } else if (qty > 99999) {
                                      e.target.value = "";
                                    } else {
                                      handleQuantityChange(
                                        color.productId as number,
                                        color.colorId as number,
                                        qty
                                      );
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {session?.user && (
                  <div className='action-btn-wrapper mt-10'>
                    <button
                      className='btn btn-saawree-outline'
                      onClick={() => {
                        handleAddToCart(false);
                      }}
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
                      <img src='img/whats-aap.png' alt='' />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            {/* <div className="titlehome">
                     <h1>OUR CATEGORY</h1>
                 </div>
                 <div className="title-septer">
                     <img src="img/underline-icon.png" />
                 </div>  */}
            <div className='des-sec'>
              <ul className='nav nav-tabs' id='myTab' role='tablist'>
                <li
                  className='nav-item'
                  role='presentation'
                  onClick={() => setVisibleTab("description")}
                >
                  <button
                    className={`nav-link ${
                      visibleTab == "description" ? "active" : ""
                    }`}
                    id='description-tab'
                    data-toggle='tab'
                    data-target='#description'
                    type='button'
                    role='tab'
                    aria-controls='description'
                    aria-selected={
                      visibleTab == "description" ? "true" : "false"
                    }
                  >
                    Description
                  </button>
                </li>
                <li
                  className='nav-item'
                  role='presentation'
                  onClick={() => setVisibleTab("policy")}
                >
                  <button
                    className={`nav-link ${
                      visibleTab == "policy" ? "active" : ""
                    }`}
                    id='policy-tab'
                    data-toggle='tab'
                    data-target='#policy'
                    type='button'
                    role='tab'
                    aria-controls='policy'
                    aria-selected={visibleTab == "policy" ? "true" : "false"}
                  >
                    Shipping Policy
                  </button>
                </li>
              </ul>
              <div className='tab-content' id='myTabContent'>
                <div
                  className={`tab-pane fade ${
                    visibleTab == "description" ? "show active" : ""
                  } `}
                  id='description'
                  role='tabpanel'
                  aria-labelledby='description-tab'
                >
                  {response?.description}
                </div>
                <div
                  className={`tab-pane fade ${
                    visibleTab == "policy" ? "show active" : ""
                  } `}
                  id='policy'
                  role='tabpanel'
                  aria-labelledby='policy-tab'
                >
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='titlehome'>
              <h1>YOU MAY ALSO LIKE THIS</h1>
            </div>
            <div className='title-septer'>
              <img src={underlineIcon.src} alt='underlineIcon' />
            </div>
            <div className='kada-collections'>
              {/* <Carousel
                value={recomendedProducts?.data || []}
                numVisible={5}
                numScroll={5}
                circular
                showIndicators={false}
                itemTemplate={(prodData) => (
                  <div className='products-box' key={prodData?.id}>
                    <div className='inner-box-wraper'>
                      <div className='prod-img1'>
                        <Image
                          width={500}
                          height={500}
                          src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.imagePath}`}
                          className='auto-fit'
                          alt=''
                        />
                      </div>
                      <div className='prod-name1'>{prodData?.productName}</div>
                      <div className='prod-rate1'>
                        {!!session?.user ? (
                          <>
                            <span className='seling'>
                              {formatCurrency(prodData?.productPrice)}
                            </span>{" "}
                          </>
                        ) : (
                          <a href='#'>
                            <button className='btn btn-small btn-saawree-outline'>
                              Login to view price
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              /> */}

              <Slider {...collectionSettings}>
                {recomendedProducts?.data?.map((prodData) => (
                  <Link
                    href={`/maketoorder/details?productId=${prodData?.id}`}
                    key={prodData?.id}
                  >
                    <div className='products-box'>
                      <div className='inner-box-wraper'>
                        <div className='prod-img1'>
                          <ProductImage
                            url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.id}`}
                            className={"auto-fit"}
                          />
                        </div>
                        <div className='prod-name1 text-dark'>
                          {prodData?.productName} <br />{" "}
                          <small className='text-dark'>
                            Design Number: {prodData?.productGroupName}
                          </small>
                        </div>
                        <div className='prod-rate1 d-flex justify-content-between align-items-center'>
                          {!!session?.user ? (
                            <>
                              <div className='value'>
                                <span className='seling'>
                                  {formatCurrency(
                                    prodData?.productPrice as number
                                  )}
                                </span>
                              </div>
                              <div
                                className='cart-link'
                                onClick={() =>
                                  router.push(
                                    `/maketoorder/details?productId=${prodData?.id}`
                                  )
                                }
                              >
                                <div className='act-btn'>
                                  <BsCart fontSize={20} />
                                </div>
                              </div>
                            </>
                          ) : (
                            // <a href='#'>
                            //   <button className='btn btn-small btn-saawree mt-2'>
                            //     Login
                            //   </button>
                            // </a>
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <InnerImageZoom
          src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${mainProductImage?.mainImage}`}
          zoomSrc={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${mainProductImage?.zoomedImage}`}
          zoomType='hover'
          hideHint
          width={650}
          zoomScale={2}
          hasSpacer={true}
          zoomPreload={true}
        />
      </Dialog>
    </section>
  );
};

export default page;
