"use client";
import React from "react";

const page = () => {
  return (
    <section className='cart-page'>
      <div className='container'>
        <div className='titlehome'>
          <h1>YOUR SHIPPING CART</h1>
        </div>
        <div className='title-septer'>
          <img src='img/underline-icon.png' alt='' />
        </div>

        <div className='cart-wraper'>
          <table className='table table-bordered cart-btn'>
            <thead>
              <tr>
                <th scope='col'>Image</th>
                <th scope='col'>Product</th>
                <th scope='col'>Price</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Total</th>
                <th scope='col'>Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className='selected-prod-img'>
                    <img src='img/S1.jpg' alt='' />
                  </div>
                </td>
                <td>
                  <div className='selected-product'>
                    <a href='#'>
                      Tahura Oxidized Plated Jhumki Earrings - Silver
                    </a>
                  </div>
                </td>
                <td>₹ 199.0</td>
                <td>
                  <div className='quantity'>
                    <button className='minus' aria-label='Decrease'>
                      &minus;
                    </button>
                    <input
                      type='number'
                      className='input-box'
                      value='1'
                      min='1'
                      max='10'
                    />
                    <button className='plus' aria-label='Increase'>
                      &plus;
                    </button>
                  </div>
                </td>
                <td>₹ 199.0</td>
                <td className='trash-box'>
                  <i className='bi bi-trash'></i>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='selected-prod-img'>
                    <img src='img/S1.jpg' alt='' />
                  </div>
                </td>
                <td>
                  <div className='selected-product'>
                    <a href='#'>
                      Tahura Oxidized Plated Jhumki Earrings - Silver
                    </a>
                  </div>
                </td>
                <td>₹ 199.0</td>
                <td>
                  <div className='quantity'>
                    <button className='minus' aria-label='Decrease'>
                      &minus;
                    </button>
                    <input
                      type='number'
                      className='input-box'
                      value='1'
                      min='1'
                      max='10'
                    />
                    <button className='plus' aria-label='Increase'>
                      &plus;
                    </button>
                  </div>
                </td>
                <td>₹ 199.0</td>
                <td className='trash-box'>
                  <i className='bi bi-trash'></i>
                </td>
              </tr>
            </tbody>
          </table>

          <div className='row'>
            <div className='col-md-6'>
              <div className='cart-pg-btn'>
                <a href='main-category.html'>
                  <button className='btn btn-saawree'>Continue Shopping</button>
                </a>
                <button className='btn btn-saawree'>Clear Cart</button>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='cart-total'>
                <h4>Cart Totals</h4>
                <table className='table table-bordered cart-btn2'>
                  <tbody>
                    <tr className='cart-subtotal'>
                      <th>Subtotal</th>
                      <td>
                        <span className='amount'>
                          <span id='bk-cart-subtotal-price'>
                            <span className='money'>₹ 398.00</span>
                          </span>
                        </span>
                      </td>
                    </tr>
                    <tr className='order-total'>
                      <th>Total</th>
                      <td>
                        <strong>
                          <span className='amount'>
                            <span id='bk-cart-subtotal-price'>
                              <span className='money'>₹ 398.00</span>
                            </span>
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='proceed-to-checkout'>
                  <a href='select-customer.html'>
                    <button
                      type='submit'
                      className='btn btn-saawree'
                      name='checkout'
                    >
                      Proceed to Checkout
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
