"use client";
import React, { useState } from "react";
import logo4 from "@/assets/images/logo4.png";
import paymentOpt from "@/assets/images/paymentOpt.png";
import { BsArrowBarUp } from "react-icons/bs";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session, status: authStatus } = useSession();
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  // document.addEventListener("scroll", toggleVisible);

  return (
    <>
      <footer>
        <div className='footer-top'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-3 col-lg-3'>
                <div className='footer-widget'>
                  <img src={logo4.src} className='footer-logo' alt='Saawree' />
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
                        {authStatus === "authenticated" ? <Link href={`/${session?.user?.userType}`}>My Account</Link>
                          : <Link href='/auth/login'>My Account</Link>
                        }

                      </li>
                      <li className='footer-list'>
                        <a href='checkout.html'>Checkout</a>
                      </li>
                      <li className='footer-list'>
                        {authStatus === "authenticated" ? <Link href={`/${session?.user?.userType}/transactions/sales-order`}>My Order</Link>
                          : <Link href='/auth/login'>My Order</Link>
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='col-md-3 col-lg-3'>
                <div className='footer-widget'>
                  <div className='footer-widget-header'>Contact</div>
                  <div className='footer-widget-menu'>
                    <p className='footer-contact'>
                      <i className='bi bi-geo-alt'></i> Head Office Address Gala
                      No. 1A,2A & 3A, 1st Floor Israni, Industrial Estate Penkar
                      Pada, Mira Road (East)-401107
                    </p>
                    <p className='footer-contact'>
                      <i className='bi bi-envelope'></i>{" "}
                      <a href='mailto:info@saawree.com'>info@saawree.com</a>
                    </p>
                    <p className='footer-contact'>
                      <i className='bi bi-phone'></i>{" "}
                      <a href='tell:+919082813196'>+91 90828 13196</a>
                    </p>
                  </div>
                  <div className='payment-opt'>
                    <img src={paymentOpt.src} alt='' />
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
      <div
        className='backtotop'
        id='myBtn'
        onClick={() => scrollToTop()}
        style={{ display: visible ? "block" : "none" }}
      >
        <BsArrowBarUp />
      </div>
    </>
  );
};

export default Footer;
