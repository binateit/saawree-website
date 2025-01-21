import React from 'react'

const page = () => {
  return (
    <>
     <div className="card mb-3">
                <div className="card-header">
                    <h6 className="mb-0">Invoice Details</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <div className="">
                                <h6 className="mb-2 font-weight-bold">Recipient Information</h6>
                                <p className="mb-0">Jitendra Bhargava</p>
                                <p className="mb-2">B107, Sai Sanman CHSL, Guru Nanak Nagar, Vasai, Maharashtra 401202
                                    India <small>(Shipping Address)</small></p>
                                <p className="mb-2">Phone : 8888782613</p>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <div className="">
                                <h6 className="mb-2 font-weight-bold">Billing Address</h6>
                                <p className="mb-2">B107, Sai Sanman CHSL, Guru Nanak Nagar, Vasai, Maharashtra 401202
                                    India</p>
                                <p className="mb-2">Phone : 8888782613</p>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col-xl-6 col-lg-3 col-md-3 col-sm-4">
                                    <label className="mb-0 font-weight-bold">Date Added</label>
                                    <p>05 Dec 2024</p>
                                </div>
                                <div className="col-xl-6 col-lg-3 col-md-3 col-sm-4">
                                    <label className="mb-0 font-weight-bold">Invoice Status</label>
                                    <p>Confirmed</p>
                                </div>
                                <div className="col-xl-6 col-lg-3 col-md-3 col-sm-4">
                                    <label className="mb-0 font-weight-bold">Payment Status</label>
                                    <p>Not Paid </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-header">
                    <h6 className="mb-0">Order Summary</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Qty</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Tax Amount </th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Earring Tikka PET1 MD D Purple</th>
                                    <td>5 </td>
                                    <td>₹495.00</td>
                                    <td>₹247.50 (10% ) </td>
                                    <td>₹0 </td>
                                    <td>₹2,227.50</td>
                                </tr>
                                <tr>
                                    <th>Earring Tikka PET1 MD Gajri</th>
                                    <td>5 </td>
                                    <td>₹495.00</td>
                                    <td>₹247.50 (10% )</td>
                                    <td>₹0</td>
                                    <td>₹2,227.50</td>
                                </tr>
                                <tr>
                                    <th>Earring Tikka PET1 MD Black</th>
                                    <td>5 </td>
                                    <td>₹495.00</td>
                                    <td>₹247.50 (10% ) </td>
                                    <td>₹0 </td>
                                    <td>₹2,227.50</td>
                                </tr>
                                <tr>
                                    <th colSpan={3}>SubTotal</th>
                                    <td>₹1,42,350.00</td>
                                    <td>₹0</td>
                                    <td>₹1,28,115.00</td>
                                </tr>
                                <tr>
                                    <th colSpan={5}>Round Off</th>
                                    <td>₹0.00</td>
                                </tr>
                                <tr>
                                    <th colSpan={5}>Grand Total</th>
                                    <td>₹1,35,099.00</td>
                                </tr>
                                <tr>
                                    <th colSpan={5}>Out Standing Amount</th>
                                    <td>₹1,35,099.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> 
    </>
  )
}

export default page
