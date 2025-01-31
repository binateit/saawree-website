import React from "react";
import underlineIcon from "@/assets/images/underlineIcon.png";
// import { Accordion, Button, Card } from 'react-bootstrap';
import { Accordion, AccordionTab } from "primereact/accordion";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <section className='order-process pb-5'>
        <div className='container'>
          <div className='titlehome mt-5'>
            <h1>Order Process</h1>
            <div className='title-septer'>
              <Image src={underlineIcon.src} alt='underline' />
            </div>
          </div>
          <p className='text-center'>
            <i>We make serious measures to quickly process your order.</i>
          </p>

          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <div className='d-flex align-items-stretch border shadow mb-3'>
                <div className='time-line-number bg-light-cream px-4 d-flex align-items-center'>
                  01
                </div>
                <div className='time-line-text p-3'>
                  <p className='mb-1 text-uppercase text-saawree'>
                    <strong>Step 01</strong>
                  </p>
                  Then place your order by selecting your desired design with
                  size &amp; colour from our Ready Stock &amp; Make to Order
                  with Qty.
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <div className='d-flex align-items-stretch border shadow mb-3'>
                <div className='time-line-number bg-light-cream px-4 d-flex align-items-center'>
                  02
                </div>
                <div className='time-line-text p-3'>
                  <p className='mb-1 text-uppercase text-saawree'>
                    <strong>Step 02</strong>
                  </p>
                  Then place your order by selecting your desired design with
                  size &amp; colour from our Ready Stock &amp; Make to Order
                  with Qty.
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <div className='d-flex align-items-stretch border shadow mb-3'>
                <div className='time-line-number bg-light-cream px-4 d-flex align-items-center'>
                  03
                </div>
                <div className='time-line-text p-3'>
                  <p className='mb-1 text-uppercase text-saawree'>
                    <strong>Step 03</strong>
                  </p>
                  Then place your order by selecting your desired design with
                  size &amp; colour from our Ready Stock &amp; Make to Order
                  with Qty.
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <div className='d-flex align-items-stretch border shadow mb-3'>
                <div className='time-line-number bg-light-cream px-4 d-flex align-items-center'>
                  04
                </div>
                <div className='time-line-text p-3'>
                  <p className='mb-1 text-uppercase text-saawree'>
                    <strong>Step 04</strong>
                  </p>
                  Then place your order by selecting your desired design with
                  size &amp; colour from our Ready Stock &amp; Make to Order
                  with Qty.
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <div className='d-flex align-items-stretch border shadow mb-3'>
                <div className='time-line-number bg-light-cream px-4 d-flex align-items-center'>
                  05
                </div>
                <div className='time-line-text p-3'>
                  <p className='mb-1 text-uppercase text-saawree'>
                    <strong>Step 05</strong>
                  </p>
                  Then place your order by selecting your desired design with
                  size &amp; colour from our Ready Stock &amp; Make to Order
                  with Qty.
                </div>
              </div>
            </div>
            <div className='col-xl-6 col-lg-6 col-md-6'>
              <div className='d-flex align-items-stretch border shadow mb-3'>
                <div className='time-line-number bg-light-cream px-4 d-flex align-items-center'>
                  06
                </div>
                <div className='time-line-text p-3'>
                  <p className='mb-1 text-uppercase text-saawree'>
                    <strong>Step 06</strong>
                  </p>
                  Then place your order by selecting your desired design with
                  size &amp; colour from our Ready Stock &amp; Make to Order
                  with Qty.
                </div>
              </div>
            </div>
          </div>

          <div className='titlehome mt-5'>
            <h1>FAQs</h1>
            <div className='title-septer'>
              <Image src={underlineIcon.src} alt='underline' />
            </div>
          </div>

          <div className='faq'>
            <Accordion activeIndex={0}>
              <AccordionTab
                header='WHAT IS READY STOCK & MAKE TO ORDER ?'
                headerClassName='text-dark'
              >
                <p> WHAT IS READY STOCK</p>
                <p>
                  Ready stock are the product which are available in stock with
                  us in form of colour &amp; size, you can select the number of
                  pieces you want.
                </p>
                <p> WHAT IS MAKE TO ORDER</p>
                <p>
                  Make to order products are basically if you want to order in
                  more colour, size & quantity, we can take orders and make the
                  products as per your desired colour, size & quantity, There is
                  minimum quantity & time duration for different products
                  (Please refer product page while selecting product for MOQ &
                  Dispatching Time duration) .
                </p>
              </AccordionTab>
              <AccordionTab
                header='IS THERE ANY MINIMUM ORDER AMOUNT?'
                headerClassName='text-dark'
              >
                <p>Yes we have minimum order Amount of ₹ 35,000.</p>
              </AccordionTab>
              <AccordionTab
                header='IS THERE ANY MINIMUM ORDER QUANTITY?'
                headerClassName='text-dark'
              >
                <p>
                  Yes, we have MOQ, MOQ differ for every design, (you will find
                  the MOQ details on product page).
                </p>
              </AccordionTab>
              <AccordionTab
                header='ARE THE PACKAGE INSURED?'
                headerClassName='text-dark'
              >
                <p>
                  No the package is not insured for any Shipments, for any
                  further queries email us.
                </p>
              </AccordionTab>
              <AccordionTab
                header='ARE THERE ANY DISCOUNTS?'
                headerClassName='text-dark'
              >
                <p>
                  We always offer the best value price by providing the lowest
                  possible price in the industry.
                </p>
              </AccordionTab>
              <AccordionTab
                header='CAN I PLACE ORDER ON WHATSAPP?'
                headerClassName='text-dark'
              >
                <p>
                  No, we do not accept orders on whatsapp, it is not possible
                  for us to manage all our customer orders on whatsapp.
                </p>
              </AccordionTab>
              <AccordionTab
                header='DO YOU HAVE WHATSAPP BROADCAST BY WHICH I CAN GET REGULAR UPDATES?'
                headerClassName='text-dark'
              >
                <p>Yes, we have whatsapp broadcast.</p>
              </AccordionTab>
              <AccordionTab
                header='HOW DO I RECEIVE REGULAR UPDATES OF NEW COLLECTION?'
                headerClassName='text-dark'
              >
                <p>
                  You can visit our Website &amp; can join our whatsapp
                  broadcast group for regular updates. Website is updated daily
                  with 10-15 new designs.
                </p>
              </AccordionTab>
              <AccordionTab
                header='CAN I USE YOUR PRODUCT IMAGES TO CIRCULATE TO MY CUSTOMERS ONLINE/OFFLINE?'
                headerClassName='text-dark'
              >
                <p>
                  Yes, you can use our images online / offline only if you are
                  our customer else you may invite legal action.
                </p>
              </AccordionTab>
              <AccordionTab
                header='CAN I TAKE ORDER ON IMAGES & FORWARD YOU?'
                headerClassName='text-dark'
              >
                <p>
                  You can take order on images but we cannot guarantee
                  availability of the product when you take order, there will be
                  instances when you will have to say no to your customers,
                  since while you are seeing a product is in stock at the same
                  time other customers are booking the same product.
                </p>
              </AccordionTab>
              <AccordionTab
                header='IS THERE ANY MINIMUM ORDER AMOUNT ?'
                headerClassName='text-dark'
              >
                <p>
                  Cancellation can be done before payment is made. If you cancel
                  the order after payment is made we will deduct payment
                  processing charges as applicable. If the goods are already
                  shipped, then both side shipping charges will also be deducted
                  along with payment processing charges and the refund will be
                  done within 7 days of the return goods received by us.
                  Cancellation not allowed for Make to Order in any case.
                </p>
              </AccordionTab>
              <AccordionTab
                header='HOW DO I RETURNS, EXCHANGE THE COMPLETED ORDER AND HOW LONG WILL I HAVE TO
                                            WAIT FOR A REFUND?'
                headerClassName='text-dark'
              >
                <p>
                  Sorry, But we don&apos;t take product return, exchange unless
                  it is damaged in transit or the design is not what you have
                  ordered and you have to confirm the same in 3 days of receipt
                  of the goods. In case we have to issue a refund it will be
                  issued within 7 days of receipt of the returned goods.
                </p>
              </AccordionTab>
              <AccordionTab
                header='DO I HAVE TO PAY SHIPPING CHARGES EXTRA?'
                headerClassName='text-dark'
              >
                <p>
                  Yes, you have to pay shipping charges extra apart from order
                  amount. We offer the best prices and we also negotiate with
                  shipping company to get you the lowest shipping charges.
                </p>
              </AccordionTab>
            </Accordion>
          </div>

          <div className='text-center mt-4'>
            <h4>
              <strong>
                Saawree Jewellers, The Leading Imitation Jewellery Manufacturers
                In India
              </strong>
            </h4>
            <p>
              <i>An elegant piece of jewellery never fails to catch the eye!</i>
            </p>
            <p>
              Jewellery has a different significance for a woman and is much
              more than a small piece of beauty worn for personal adornment; it
              reflects who she is. Mangalmani Jewellers strives to give this
              emotion a voice via our fantastic collection of Imitation
              Jewellery Manufacturers &amp; Artificial Jewellery Manufacturers
              Online.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
