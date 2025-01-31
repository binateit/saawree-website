"use client";
import React from "react";
import logo4 from "@/assets/images/logo4.png";
import paymentOpt from "@/assets/images/paymentOpt.png";
import { BsEnvelope, BsGeoAlt, BsTelephone } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Session } from "@/core/models/model";

const Footer = () => {
  const { data: session, status: authStatus } = useSession();
  const userSession = session as Session;
  // const [visible, setVisible] = useState(false);

  // const toggleVisible = () => {
  //   const scrolled = document.documentElement.scrollTop;
  //   if (scrolled > 300) {
  //     setVisible(true);
  //   } else if (scrolled <= 300) {
  //     setVisible(false);
  //   }
  // };
  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",

  //   });
  // };
  // document.addEventListener("scroll", toggleVisible);

  return (
    <>
      <footer>
        <div className='footer-top'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-3 col-lg-3'>
                <div className='footer-widget'>
                  <Image
                    src={logo4.src}
                    className='footer-logo img-fluid'
                    alt='Saawree'
                    height={100}
                    width={100}
                  />
                  <p className='footer-dec'>
                    Saawree Jewellers, The Leading Imitation Jewellery
                    Manufacturers In India An elegant piece of jewellery never
                    fails to catch the eye!
                  </p>
                  <div className='social-media-box'>
                    <a href='#'>
                      <i className='fab fa-facebook-square'></i>
                    </a>
                    <a href='#'>
                      <i className='fab fa-instagram'></i>
                    </a>
                    <a href='#'>
                      <i className='fab fa-linkedin'></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className='col-md-3 col-lg-3'>
                <div className='footer-widget'>
                  <div className='footer-widget-header'>Customer Services</div>
                  <div className='footer-widget-menu'>
                    <ul>
                      <li className='footer-list'>
                        <Link href='/'>Home</Link>
                      </li>
                      <li className='footer-list'>
                        <Link href='/contact-us'>Contact us</Link>
                      </li>
                      <li className='footer-list'>
                        <Link href='privacy-policy'>Privacy Policy</Link>
                      </li>
                      <li className='footer-list'>
                        <Link href='cancellation-policy'>
                          cancellation-policy
                        </Link>
                      </li>
                      <li className='footer-list'>
                        <Link href='terms-conditions'>Terms & Condition</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-md-3 col-lg-3'>
                <div className='footer-widget'>
                  <div className='footer-widget-header'>My Account</div>
                  <div className='footer-widget-menu'>
                    <ul>
                      <li className='footer-list'>
                        {authStatus === "authenticated" ? (
                          <Link href={`/${userSession?.user?.userType}`}>
                            My Account
                          </Link>
                        ) : (
                          <Link href='/auth/login'>My Account</Link>
                        )}
                      </li>
                      <li className='footer-list'>
                        <a href='checkout.html'>Checkout</a>
                      </li>
                      <li className='footer-list'>
                        {authStatus === "authenticated" ? (
                          <Link
                            href={`/${userSession?.user?.userType}/transactions/sales-order`}
                          >
                            My Order
                          </Link>
                        ) : (
                          <Link href='/auth/login'>My Order</Link>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-md-3 col-lg-3'>
                <div className='footer-widget'>
                  <div className='footer-widget-header'>Contact</div>
                  <div className='footer-widget-menu'>
                    <div className='d-flex'>
                      <BsGeoAlt fontSize={40} />{" "}
                      <p className='footer-contact'>
                        Head Office Address Gala No. 1A,2A & 3A, 1st Floor
                        Israni, Industrial Estate Penkar Pada, Mira Road
                        (East)-401107
                      </p>
                    </div>
                    <div className='d-flex'>
                      <BsEnvelope fontSize={16} />{" "}
                      <p className='footer-contact'>
                        <a href='mailto:info@saawree.com'>info@saawree.com</a>
                      </p>
                    </div>
                    <div className='d-flex'>
                      <BsTelephone fontSize={16} />{" "}
                      <p className='footer-contact'>
                        <a href='tel:+919082813196'>+91 90828 13196</a>
                      </p>
                    </div>
                  </div>
                  <div className='payment-opt'>
                    <Image
                      src={paymentOpt.src}
                      alt='paymentOptions'
                      className='img-fluid'
                      width={200}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-footer'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 left-side'>
                Copyright &copy; 2024 Saawree. All rights reserved.
              </div>

              <div className='col-md-6 right-side'>
                Design & Developed by{" "}
                <a href='https://binateit.com/' target='_blank'>
                  Binate IT Services Pvt. Ltd.
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <div
        className='backtotop'
        id='myBtn'
        onClick={() => scrollToTop()}
        style={{ display: visible ? "block" : "none" }}
      >
        <BsArrowBarUp />
      </div> */}
    </>
  );
};

export default Footer;
