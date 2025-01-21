import React from 'react'

const page = () => {
    return (
        <>
           <div className="card mb-3">
                <div className="card-header justify-content-between">
                    <h6 className="mb-0">Payment Details</h6>
                    <button className="btn btn-saawree">Download</button>
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
                                    <label className="mb-0 font-weight-bold">Amount Received</label>
                                    <p>₹9,135.00</p>
                                </div>
                                <div className="col-xl-6 col-lg-3 col-md-3 col-sm-4">
                                    <label className="mb-0 font-weight-bold">Amount Received Mode</label>
                                    <p>Cash </p>
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
                                    <th scope="col">Order Number</th>
                                    <th scope="col">Payment Date </th>
                                    <th scope="col">Amount Received </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>SOT18</th>
                                    <td>05 Dec 2024</td>
                                    <td>₹9,135.00</td>
                                </tr>
                                <tr>
                                    <th>SOT18</th>
                                    <td>05 Dec 2024</td>
                                    <td>₹9,135.00</td>
                                </tr>
                                <tr>
                                    <th>SOT18</th>
                                    <td>05 Dec 2024</td>
                                    <td>₹9,135.00</td>
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
