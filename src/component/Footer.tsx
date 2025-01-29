"use client";
import React, { useState } from "react";
import logo4 from "@/assets/images/logo4.png";
import paymentOpt from "@/assets/images/paymentOpt.png";
import {
  BsArrowBarUp,
  BsEnvelope,
  BsGeoAlt,
  BsTelephone,
} from "react-icons/bs";

const Footer = () => {
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
                        <a href='index.html'>Home</a>
                      </li>
                      <li className='footer-list'>
                        <a href='#'>Shop</a>
                      </li>
                      <li className='footer-list'>
                        <a href='#'>Contact us</a>
                      </li>
                      <li className='footer-list'>
                        <a href='privacy-policy.html'>Privacy Policy</a>
                      </li>
                      <li className='footer-list'>
                        <a href='cancellation-policy.html'>
                          cancellation-policy
                        </a>
                      </li>
                      <li className='footer-list'>
                        <a href='terms-conditions.html'>Terms & Condition</a>
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
                        <a href='#'>My Account</a>
                      </li>
                      <li className='footer-list'>
                        <a href='checkout.html'>Checkout</a>
                      </li>
                      <li className='footer-list'>
                        <a href='#'>My Order</a>
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
