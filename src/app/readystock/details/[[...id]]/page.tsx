"use client";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import { SelectOptionProps } from "@/core/models/model";
import underlineIcon from "@/assets/images/underlineIcon.png";
import {
  getMaketoOrderProductDetails,
  getMaketoOrderProducts,
  getReadyStockRecomendedProducts,
  getRecomendedMaketoOrderProducts,
  getRSProductDetails,
} from "@/core/requests/productsRequests";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsDownload, BsHeart } from "react-icons/bs";
import { Carousel } from "primereact/carousel";
import InnerImageZoom from "react-inner-image-zoom";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Dialog } from "primereact/dialog";

const page = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [mainProductImage, setMainProductImage] = useState({
    mainImage: "",
    zoomedImge: "",
  });
  const [polishType, setPolishType] = useState<string>("");
  const [visible, setVisible] = useState(false);

  const [polishTypeList, setPolishTypeList] = useState<SelectOptionProps[]>([]);
  const [visibleTab, setVisibleTab] = useState<string>("description");

  const { data: response, isLoading: isProductDetailsLoading } = useQuery({
    queryKey: ["getRSProductDetailsData"],
    queryFn: () => getRSProductDetails(Number(productId)),
  });
  useEffect(() => {
    let polishTypes: any = [];
    response?.polishingTypeList?.map((ptype) => {
      return polishTypes.push({
        name: ptype?.polishingTypeName,
        value: ptype?.polishingTypeId,
      });
    });
    setPolishTypeList(polishTypes);

    setMainProductImage({
      mainImage: response?.productImages[0]?.mediumImagePath || "",
      zoomedImge: response?.productImages[0]?.zoomImagePath || "",
    });
  }, [response]);

  const { data: recomendedProducts } = useQuery({
    queryKey: ["geRecomendedRSProductRecords"],
    queryFn: async () => {
      return await getReadyStockRecomendedProducts({
        categoryIds: [response?.categoryId ?? 0],
      });
    },
    enabled: !!response,
  });

  function download() {
    const a = document.createElement("a");
    a.href = mainProductImage?.mainImage;
    a.download = mainProductImage?.mainImage?.split("/").pop() || "";
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
  }

  return (
    <section className='product-details'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div id='js-gallery' className='gallery sticky-layer'>
              <div className='gallery__hero'>
                <div onClick={() => setVisible(true)}>
                  <InnerImageZoom
                    src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${mainProductImage?.mainImage}`}
                    zoomSrc={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${mainProductImage?.zoomedImge}`}
                    zoomType='hover'
                    hideHint
                    width={600}
                    zoomScale={2}
                    hasSpacer={true}
                    zoomPreload={true}
                  />
                </div>
                <div className='icons-wrap'>
                  <div className='icon-1 down-btn'>
                    <BsDownload onClick={() => download()} />
                  </div>
                </div>
              </div>
              <div className='gallery__thumbs'>
                {response?.productImages?.map((pi, index) => (
                  <div
                    data-gallery='thumb'
                    className='is-active'
                    onClick={() =>
                      setMainProductImage({
                        mainImage: pi?.mediumImagePath,
                        zoomedImge: pi?.zoomImagePath,
                      })
                    }
                    key={index}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${pi?.thumbnailImagePath}`}
                      className='img-responsive'
                      alt={`thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
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
                  <b>Group:</b> <span>{response?.productGroupName}</span>
                </li>
                <li className='product-upc'>
                  <b>Plating:</b> <span>{response?.polishingTypeName}</span>
                </li>
                <li className='product-ean'>
                  <b>Category:</b> <span>{response?.categoryName}</span>
                </li>
                <li className='product-jan'>
                  <b>Design Number:</b>{" "}
                  <span>{response?.designNumberName}</span>
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
                    className='w-full md:w-14rem'
                  />
                </div>
                <div className='product-color-options mt-4'>
                  <div className='row option-heading'>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6'>
                      <div className='d-flex'>
                        <div className='moti-color options-title'>Colors</div>
                        <div className='stock options-title'>Stock</div>
                        <div className='color-quntity  options-title text-center'>
                          Qty
                        </div>
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-6 d-none d-sm-block d-md-none d-lg-block'>
                      <div className='d-flex'>
                        <div className='moti-color options-title'>Colors</div>
                        <div className='stock options-title'>Stock</div>
                        <div className='color-quntity  options-title text-center'>
                          Qty
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    {response?.colorList?.map((color) => (
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
                            <span className='color-name'>
                              {color.colorName}{" "}
                            </span>
                          </div>

                          <div className='color-quntity'>
                            <input type='text' className='quntity-input' />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {session?.user && (
                    <div className='action-btn-wrapper'>
                      <button className='btn btn-saawree-outline'>
                        Add to cart
                      </button>
                      <a href='cart.html' className='btn btn-saawree'>
                        Buy now
                      </a>
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
              <img src='img/underline-icon.png' alt='' />
            </div>
            <div className='kada-collections'>
              <Carousel
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
                      <div className='prod-name1'>{prodData?.pn}</div>
                      <div className='prod-rate1'>
                        {!!session?.user ? (
                          <>
                            {/* <span className='mrp'>
                              <s></s>
                            </span> */}
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
                      {!!session?.user && (
                        <div className='action-btns'>
                          <button className='btn btn-saawree'>
                            Add to Cart
                          </button>
                          <button className='btn btn-saawree'>
                            <BsHeart />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
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
          zoomSrc={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${mainProductImage?.zoomedImge}`}
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
