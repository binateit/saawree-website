import React from 'react'
import { BsChevronDown, BsSearch } from "react-icons/bs";
const page = () => {
    return (
        <>
            <div className="container">

                <div className="card shadow mb-2">
                    <div className="card-header bg-white">
                        <div className="card-title">
                            <h5>Order Details</h5>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col-xl-3 col-lg-3 col-md-3">
                                <label>Customer<span className="required">*</span></label>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9">
                                <div className="relative">
                                    <select name="" id="" className="form-control">
                                        <option>Customer 01</option>
                                        <option>Customer 02</option>
                                        <option>Customer 03</option>
                                    </select>
                                    <BsChevronDown className='select-dropdown-icon' />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-xl-3 col-lg-3 col-md-3">

                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <label className="">Billing Address</label>
                                        <div className="address-wraper">
                                            <p className="mb-0">B107, Sai Sanman CHSL</p>
                                            <p className="mb-0">Guru Nanak Nagar</p>
                                            <p className="mb-0">Vasai West, 401202, India</p>
                                            <p className="mb-0">Phone: 8888782613</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <label className="">Shipping Address</label>
                                        <div className="address-wraper">
                                            <p className="mb-0">B107, Sai Sanman CHSL</p>
                                            <p className="mb-0">Guru Nanak Nagar</p>
                                            <p className="mb-0">Vasai West, 401202, India</p>
                                            <p className="mb-0">Phone: 8888782613</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-xl-3 col-lg-3 col-md-3">
                                <label>Order Date</label>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="relative">
                                    <input type="text" className="form-control" name="order-date" value="07-01-2025" disabled={true} />
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-xl-3 col-lg-3 col-md-3">
                                <label>Expected Shippment Date</label>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <p>30-03-2025</p>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-xl-3 col-lg-3 col-md-3">
                                <label>Discount</label>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                ₹ 4522.00
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow mb-2">
                    <div className="card-header bg-white">
                        <div className="card-title">
                            <h5>Item Details</h5>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="search-items relative">
                            <input type="text" className="form-control pl-5" placeholder="Scan / Search Products by name and code" />
                            <BsSearch className='search-icon' />
                        </div>
                        <div className="row mt-4 align-items-end">
                            <div className="col-xl-3 col-lg-3 col-md-6 mb-3 md-pr-0">
                                <label>Select Category</label>
                                <div className="relative">
                                    <select name="" id="" className="form-control">
                                        <option>Category 01</option>
                                        <option>Category 02</option>
                                        <option>Category 03</option>
                                    </select>
                                    <BsChevronDown className='select-dropdown-icon' />
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                <label>Product Group</label>
                                <div className="relative">
                                    <select name="" id="" className="form-control">
                                        <option>Product Group 01</option>
                                        <option>Product Group 02</option>
                                        <option>Product Group 03</option>
                                    </select>
                                    <BsChevronDown className='select-dropdown-icon' />
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                <label>Polishing Type</label>
                                <div className="relative">
                                    <select name="" id="" className="form-control">
                                        <option>Polishing Type 01</option>
                                        <option>Polishing Type 02</option>
                                        <option>Polishing Type 03</option>
                                    </select>
                                    <BsChevronDown className='select-dropdown-icon' />
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                <input type="button" className="btn btn-saawree" value="Search" />
                            </div>
                        </div>
                        <div className="sales-order-select-colors mt-4 border p-4">
                            <div className="row">
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0">
                                            <span className="mr-2 sales-order-color-options" >
                                                <img src="../img/colors/Black.jpg" alt='' />
                                            </span>
                                            Black
                                        </label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0">
                                            <span className="mr-2 sales-order-color-options">
                                                <img src="../img/colors/D-Purple.jpg" alt='' />
                                            </span>D Purple
                                        </label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0">
                                            <span className="mr-2 sales-order-color-options">
                                                <img src="../img/colors/Gajri.jpg" alt='' />
                                            </span>Gajri</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options">
                                            <img src="../img/colors/gray.jpg" alt='' />
                                        </span>Gray
                                        </label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options">
                                            <img src="../img/colors/Green.jpg" alt='' />
                                        </span>Green
                                        </label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options">
                                            <img src="../img/colors/Light-Firogi.jpg" alt='' />
                                        </span>Light Firoji
                                        </label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options">
                                            <img src="../img/colors/Light-Firogi.jpg" alt='' />
                                        </span>Light Purple
                                        </label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0">
                                            <span className="mr-2 sales-order-color-options">
                                                <img src="../img/colors/LCT.jpg" alt='' />
                                            </span>LCT
                                        </label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0">
                                            <span className="mr-2 sales-order-color-options">
                                                <img src="../img/colors/Montara.jpg" alt='' />
                                            </span>Maroon
                                        </label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Montara.jpg" alt='' /></span>Maroon Green</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Metal.jpg" alt='' /></span>Metal</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Mint.jpg" alt='' /></span>Mint</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Gajari-and-mint.jpg" alt='' /></span>Mint Gajri</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Montara.jpg" alt='' /></span>Montana</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Montara.jpg" alt='' /></span>Multi</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Orange.jpg" alt='' /></span>Orange</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Peach.jpg" alt='' /></span>Peach</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Pink.jpg" alt='' /></span>Pink</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Pink.jpg" alt='' /></span>Pink Light Firogi</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Pista.jpg" alt='' /></span>Pista</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Rama.jpg" alt='' /></span>Rama</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Royal-Blue.jpg" alt='' /></span>Royal Blue</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="mb-0"><span className="mr-2 sales-order-color-options"><img src="../img/colors/Royal-Blue.jpg" alt='' /></span>Ruby</label>
                                        <input type="text" className="form-control color-qnty-input" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive mt-4">
                            <table className="table table-bordered table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Unit Price</th>
                                        <th scope="col">Dsicount</th>
                                        <th scope="col">Sub Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Earring Tikka PET1 MD Black</th>
                                        <td><input type="text" className="form-control qnty-input" value="5" /></td>
                                        <td><input type="text" className="form-control unit-price-input" value="₹495.00" /></td>
                                        <td>₹495.00</td>
                                        <td>₹2475.00</td>
                                        <td><a href="sale-order-details.html" className="remove-item-link"><i className="bi bi-x"></i></a></td>
                                    </tr>
                                    <tr>
                                        <th>Earring Tikka PET1 MD Black</th>
                                        <td><input type="text" className="form-control qnty-input" value="5" /></td>
                                        <td><input type="text" className="form-control unit-price-input" value="₹495.00" /></td>
                                        <td>₹495.00</td>
                                        <td>₹2475.00</td>
                                        <td><a href="sale-order-details.html" className="remove-item-link"><i className="bi bi-x"></i></a></td>
                                    </tr>
                                    <tr>
                                        <th>Earring Tikka PET1 MD Black</th>
                                        <td><input type="text" className="form-control qnty-input" value="5" /></td>
                                        <td><input type="text" className="form-control unit-price-input" value="₹495.00" /></td>
                                        <td>₹495.00</td>
                                        <td>₹2475.00</td>
                                        <td><a href="sale-order-details.html" className="remove-item-link"><i className="bi bi-x"></i></a></td>
                                    </tr>
                                    <tr>
                                        <th>Earring Tikka PET1 MD Black</th>
                                        <td><input type="text" className="form-control qnty-input" value="5" /></td>
                                        <td><input type="text" className="form-control unit-price-input" value="₹495.00" /></td>
                                        <td>₹495.00</td>
                                        <td>₹2475.00</td>
                                        <td><a href="sale-order-details.html" className="remove-item-link"><i className="bi bi-x"></i></a></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="row mt-4">
                            <div className="col-xxl-6 col-lg-6 col-md-12 order-lg-2">
                                <div className="bg-gray p-3">
                                    <div className="d-flex align-items-center justify-content-between border-bottom mb-2">
                                        <h6>Sub Total</h6>
                                        <h6>₹4245.00</h6>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6>Discount</h6>
                                        <h6>₹1856.25</h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6>Round Of</h6>
                                        <h6>₹0.25</h6>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6>Grand Total</h6>
                                        <h6>₹5526.50</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 order-lg-1">
                                <label>Notes</label>
                                <textarea className="form-control" name="notes" rows={5}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="text-right">
                            <button className="btn btn-light border mr-2">Discart</button>
                            <button className="btn btn-saawree btn-small">Submit</button>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default page
