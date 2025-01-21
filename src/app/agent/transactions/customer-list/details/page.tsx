import React from 'react'

const page = () => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-header">
                    <h6 className="mb-0">Customer Details</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">First Name :</label>
                                <span className="ml-xl-2">Jitendra</span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Last Name :</label>
                                <span className="ml-xl-2">Bhargava</span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Company Name :</label>
                                <span className="ml-xl-2">
                                    Binate IT Services Private Limited
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Print Name :</label>
                                <span className="ml-xl-2">
                                    Vikas Patel
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Fax Number :</label>
                                <span className="ml-xl-2">
                                    Not Available
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">E-mail Address :</label>
                                <span className="ml-xl-2">
                                    vikas.patel@binateitservices.com
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Contact Person :</label>
                                <span className="ml-xl-2">
                                    Jitendra Bhargava
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Website :</label>
                                <span className="ml-xl-2">
                                    www.binateitservices.com
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Mobile Number :</label>
                                <span className="ml-xl-2">
                                    +91 885485547
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Whatsapp Number :</label>
                                <span className="ml-xl-2">
                                    +91 885485547
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Date of Birth :</label>
                                <span className="ml-xl-2">
                                    10 June 1995
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Date of Anniversary :</label>
                                <span className="ml-xl-2">
                                    8 May 2005
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label className="font-weight-bold custome-lg-label mb-0">Billing Address</label>
                            <p className="mb-2">B107, Sai Sanman CHSL, Guru Nanak Nagar, Vasai, Maharashtra 401202
                                India</p>
                            <p className="mb-2">Phone : 8888782613</p>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <label className="font-weight-bold custome-lg-label mb-0">Shipping Address</label>
                            <p className="mb-2">B107, Sai Sanman CHSL, Guru Nanak Nagar, Vasai, Maharashtra 401202
                                India</p>
                            <p className="mb-2">Phone : 8888782613</p>
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
                                    <th scope="col">Status </th>
                                    <th scope="col">Amount </th>
                                    <th scope="col">Date </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>SOT18</th>
                                    <td>Confirmed</td>
                                    <td>₹9,135.00</td>
                                    <td>5 Dec 2024</td>
                                </tr>
                                <tr>
                                    <th>SOT18</th>
                                    <td>Confirmed</td>
                                    <td>₹9,135.00</td>
                                    <td>5 Dec 2024</td>
                                </tr>
                                <tr>
                                    <th>SOT18</th>
                                    <td>Confirmed</td>
                                    <td>₹9,135.00</td>
                                    <td>5 Dec 2024</td>
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
