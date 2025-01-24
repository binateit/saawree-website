"use client";
import { useSession } from "next-auth/react";
import underlineIcon from "@/assets/images/underlineIcon.png";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "@/core/requests/homeRequests";
import Image from "next/image";
import { BsCart } from "react-icons/bs";
import { Galleria } from "primereact/galleria";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import ProductImage from "@/core/component/Products/ProductImage";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: homePageData, isLoading: homePageLoading } = useQuery({
    queryKey: ["homePageData"],
    queryFn: () => getHomePage(),
  });

  if (homePageLoading)
    return (
      <div className='full-page-loader'>
        <div className='loader_box'>
          <div className='loader-logo'>
            <img
              src='https://saawree.com/images/logo4.png'
              alt='Loader Logo'
              width='100%'
            />
          </div>
          {/* <p className="loding-content text-center">Loading...</p> */}
          <div className='progress mt-5'>
            <div className='progress-value'></div>
          </div>
        </div>
      </div>
    );

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

  var newArrivalsSettings = {
    dots: false,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
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

  return (
    <>
      {/* <!----------- Top Banner Section ----------> */}
      <section className='banner-slider'>
        <Galleria
          value={homePageData?.bl?.filter((t) => t.sid == 1)}
          numVisible={1}
          style={{ maxWidth: "100%" }}
          showIndicators={
            (homePageData?.bl?.filter((t) => t.sid == 1)?.length || 0) > 1
              ? true
              : false
          }
          showThumbnails={false}
          showItemNavigators={
            (homePageData?.bl?.filter((t) => t.sid == 1)?.length || 0) > 1
              ? true
              : false
          }
          circular
          item={(prodData) => (
            <>
              <ProductImage
                url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.wip}`}
                className={"w-100 desk"}
              />
              <ProductImage
                url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.mip}`}
                className={"w-100 mob"}
              />
              <div className='carousel-caption center-content'>
                <h2>{prodData?.t}</h2>
                <h4>{prodData?.sdesc}</h4>
                <button className='btn btn-saawree mt-2'>Shop Now</button>
              </div>
            </>
          )}
        />
      </section>

      {/* <!----------- Category Section ----------> */}
      <section className='category-sec'>
        <div className='container'>
          <div className='titlehome'>
            <h1>OUR CATEGORY</h1>
          </div>
          <div className='title-septer'>
            <img src={underlineIcon.src} alt='' />
          </div>
          <div className='categ-bar d-flex flex-wrap justify-content-center'>
            {homePageData?.fc?.map((cat) => (
              <div className='categ-items' key={cat?.id}>
                <Link
                  href={`readystock/products?categoryId=${cat?.id}&categoryName=${cat?.n}`}
                >
                  <div className='catg-img'>
                    <ProductImage
                      url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${cat?.cip}`}
                      className={"auto-fit"}
                    />
                  </div>
                  <div className='cat-name'>{cat?.n}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <!------New Arrivals-------> */}
      <section className='new-arrivals'>
        <div className='container'>
          <div className='titlehome'>
            <h1>NEW ARRIVALS</h1>
          </div>
          <div className='title-septer'>
            <img src={underlineIcon?.src} alt='' />
          </div>
          {homePageData?.nal?.map((newArraival, index) => (
            <div className='row mt-2' key={index}>
              <div
                className={`col-md-6 col-lg-6 mb-2 mt-2 mt-md-0 mb-md-0 ${
                  index / 2 == 0 ? "order-1" : "order-2"
                }`}
              >
                <Slider {...newArrivalsSettings}>
                  {newArraival?.prods?.map((prodData) => (
                    <Link
                      href={`/readystock/details?productId=${prodData?.pi}`}
                      key={prodData?.pi}
                    >
                      <div className='products-box h-100'>
                        <div className='inner-box-wraper new-arrival-box h-100'>
                          <div className='prod-img1'>
                            <ProductImage
                              url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.ip}`}
                              className={"auto-fit"}
                            />
                          </div>
                          <div className='prod-name1 text-dark'>
                            {prodData?.pn} <br />{" "}
                            <small className='text-dark'>
                              Design Number :{prodData?.pgn}
                            </small>
                          </div>
                          {/* <p>{JSON.stringify(prodData)}</p> */}
                          <div className='prod-rate1 '>
                            {status === "authenticated" ? (
                              <>
                                <div className='d-flex justify-content-between align-items-center'>
                                  <div className=''>
                                    {/* <span className='mrp'>
                                    <s>₹200.00</s>
                                  </span> */}
                                    <span className='seling'>₹150.00</span>
                                  </div>

                                  <div
                                    className='cart-link'
                                    onClick={() =>
                                      `/readystock/details?productId=${prodData?.pi}`
                                    }
                                  >
                                    <div className='act-btn'>
                                      <BsCart fontSize={20} />
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              // <a href='#'>
                              //   <button className='btn btn-small btn-saawree'>
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

                {/* <Carousel
                  value={newArraival?.prods}
                  numVisible={3}
                  numScroll={3}
                  showIndicators={false}
                  circular
                  itemTemplate={(prodData) => (
                    <div className='products-box'>
                      <div className='inner-box-wraper'>
                        <div className='prod-img1'>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.ip}`}
                            width={500}
                            height={500}
                            className='auto-fit'
                            alt=''
                          />
                        </div>
                        <div className='prod-name1'>{prodData?.pn}</div>
                        <div className='prod-rate1'>
                          {!!session?.user ? (
                            <>
                              <span className='mrp'>
                                <s>Rs. 200.00</s>
                              </span>
                              <span className='seling'>Rs. 150.00</span>{" "}
                            </>
                          ) : (
                            <a href='#'>
                              <button className='btn btn-small btn-saawree mt-2 w-100'>
                                Login
                              </button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                /> */}
              </div>
              <div
                className={`col-md-6 col-lg-6  ${
                  index / 2 == 0 ? "order-2" : "order-1"
                }`}
              >
                <div className='shine h-100 mb-2 md-pb-0'>
                  <ProductImage
                    url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${newArraival?.ip}`}
                    className={"product-banner"}
                  />
                  {/* <Image
                    width={500}
                    height={500}
                    src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${newArraival?.ip}`}
                    className='product-banner'
                    alt={`product-banner ${index + 1}`}
                  /> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <!----------- Middle Banner Section ----------> */}
      <section className='banner-slider'>
        <Galleria
          value={homePageData?.bl?.filter((t) => t.sid == 2)}
          numVisible={1}
          style={{ maxWidth: "100%" }}
          // showIndicators={
          //   (homePageData?.bl?.filter((t) => t.sid == 1)?.length || 0) > 1
          //     ? true
          //     : false
          // }
          showIndicators={false}
          showThumbnails={false}
          showItemNavigators={
            (homePageData?.bl?.filter((t) => t.sid == 1)?.length || 0) > 1
              ? true
              : false
          }
          circular
          item={(prodData) => (
            <>
              <ProductImage
                url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.wip}`}
                className={"w-100 desk"}
              />
              <ProductImage
                url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.mip}`}
                className={"w-100 mob"}
              />
              <div className='carousel-caption center-content'>
                <h2>{prodData?.t}</h2>
                <h4>{prodData.sid}</h4>
                <button className='btn btn-saawree mt-2'>Shop Now</button>
              </div>
            </>
          )}
        />
      </section>

      {/* <!----------- Collections Section ----------> */}
      {homePageData?.col?.map((collection) => (
        <section className='collections' key={collection?.id}>
          <div className='container'>
            <div className='titlehome'>
              <h1>{collection?.n}</h1>
            </div>
            <div className='title-septer'>
              <img src={underlineIcon?.src} alt='' />
            </div>

            <div className='kada-collections'>
              {/* {JSON.stringify(collection?.prods)} */}

              <Slider {...collectionSettings}>
                {collection?.prods?.map((prodData) => (
                  <Link
                    href={`/readystock/details?productId=${prodData?.pi}`}
                    key={prodData?.pi}
                  >
                    <div className='products-box'>
                      <div className='inner-box-wraper'>
                        <div className='prod-img1'>
                          <ProductImage
                            url={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.ip}`}
                            className={"auto-fit"}
                          />
                        </div>
                        <div className='prod-name1 text-dark'>
                          {prodData?.pn} <br />{" "}
                          <small className='text-dark'>
                            Design Number: {prodData?.pgn}
                          </small>
                        </div>
                        <div className='prod-rate1 d-flex justify-content-between align-items-center'>
                          {!!session?.user ? (
                            <>
                              <div className='value'>
                                <span className='seling'>
                                  {formatCurrency(prodData?.pp)}
                                </span>
                              </div>
                              <div
                                className='cart-link'
                                onClick={() =>
                                  router.push(
                                    `/readystock/details?productId=${prodData?.pi}`
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

              {/* <Carousel
                value={collection?.prods}
                numVisible={5}
                numScroll={5}
                circular
                showIndicators={false}
                itemTemplate={(prodData) => (
                  <div className='products-box'>
                    <div className='inner-box-wraper'>
                      <div className='prod-img1'>
                        <Image
                          width={500}
                          height={500}
                          src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.ip}`}
                          className='auto-fit'
                          alt=''
                        />
                      </div>
                      <div className='prod-name1'>{prodData?.pn}</div>
                      <div className='prod-rate1'>
                        {!!session?.user ? (
                          <>
                            <span className='seling'>
                              {formatCurrency(prodData?.pp)}
                            </span>{" "}
                          </>
                        ) : (
                          <a href='#'>
                            <button className='btn btn-small btn-saawree mt-2 w-100'>
                              Login
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              /> */}
            </div>
          </div>
        </section>
      ))}

      <section>
        <div className='container'></div>
      </section>

      {/* <!----------- Testimonials Section ----------> */}
      <section className='testimonials'>
        <div className='container'>
          <div className='titlehome'>
            <h1>Testimonials</h1>
          </div>
          <div className='title-septer'>
            <img src={underlineIcon?.src} alt='' />
          </div>

          <div className='testimonials-box'>
            {homePageData?.tt?.map((testimonial, index) => (
              <div className='clients-list' key={index}>
                <div className='clients-img'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${testimonial?.ip}`}
                    width={200}
                    height={200}
                    alt=''
                  />
                </div>
                <div className='clients-feedback'>{testimonial?.desc}</div>
                <div className='clients-name-post'>
                  <p className='cl-nme'>{testimonial?.n}</p>
                  <p className='cl-post'>{testimonial?.desi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
