"use client";
import { useSession } from "next-auth/react";
import underlineIcon from "@/assets/images/underlineIcon.png";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getHomePage } from "@/core/requests/homeRequests";
import Image from "next/image";
import { Carousel } from "primereact/carousel";
import { BsHeart } from "react-icons/bs";
import { Galleria } from "primereact/galleria";
import { createCart } from "@/core/requests/cartRequests";
import { toast } from "react-toastify";
import { formatCurrency } from "@/core/helpers/helperFunctions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { swap } from "formik";


export default function Home() {
  const { data: session } = useSession();
  const { data: homePageData, isLoading: homePageLoading } = useQuery({
    queryKey: ["homePageData"],
    queryFn: () => getHomePage(),
  });

  if (homePageLoading) return (

    <div className="full-page-loader">
      <div className="loader_box">
        <div className="loader-logo">
          <img src="https://saawree.com/images/logo4.png" alt="Loader Logo" width="100%" />
        </div>
        {/* <p className="loding-content text-center">Loading...</p> */}
        <div className="progress mt-5">
          <div className="progress-value"></div>
        </div>
      </div>
    </div>)



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
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }

    ]
  };


  var newArrivalsSettings = {
    dots: false,
    swipeToSlide: true,
    draggable: true,
    arrows: true,
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
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }

    ]
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
              <img
                className='w-100 desk'
                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.wip}`}
                alt='First slide'
              />
              <img
                className='w-100 mob'
                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.mip}`}
                alt='First slide'
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
                <Link href={`readystock/products?categoryId=${cat?.id}`}>
                  <div className='catg-img'>
                    <img
                      src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${cat?.cip}`}
                      className='auto-fit'
                      alt=''
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
                className={`col-md-6 col-lg-6  ${index / 2 == 0 ? "order-1" : "order-2"
                  }`}
              >


                <Slider {...newArrivalsSettings}
                >
                  {newArraival?.prods?.map((prodData) => (
                    <div className='products-box h-100'>
                    <div className='inner-box-wraper h-100'>
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
                            <button className='btn btn-small btn-saawree-outline mt-2 w-100'>
                              Login
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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
                              <button className='btn btn-small btn-saawree-outline mt-2 w-100'>
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
                className={`col-md-6 col-lg-6  ${index / 2 == 0 ? "order-2" : "order-1"
                  }`}
              >
                <div className='shine h-100'>
                  <Image
                    width={500}
                    height={500}
                    src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${newArraival?.ip}`}
                    className='product-banner'
                    alt=''
                  />
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
              <img
                className='w-100 desk'
                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.wip}`}
                alt='First slide'
              />
              <img
                className='w-100 mob'
                src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.mip}`}
                alt='First slide'
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



              <Slider {...collectionSettings}
              >
                {collection?.prods?.map((prodData) => (
                  <div className="products-box">
                    <div className="inner-box-wraper">
                      <div className="prod-img1">
                        <Image
                          width={500}
                          height={500}
                          src={`${process.env.NEXT_PUBLIC_APP_IMAGE_API_URL}/${prodData?.ip}`}
                          className='auto-fit'
                          alt=''
                        />
                      </div>
                      <div className="prod-name1">
                        {prodData?.pn}
                      </div>
                      <div className="prod-rate1">
                        {!!session?.user ? (
                          <>
                            <span className='seling'>
                              {formatCurrency(prodData?.pp)}
                            </span>{" "}
                          </>
                        ) : (
                          <a href='#'>
                            <button className='btn btn-small btn-saawree-outline mt-2 w-100'>
                              Login
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
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
                            <button className='btn btn-small btn-saawree-outline mt-2 w-100'>
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
        <div className="container">

        </div>
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
