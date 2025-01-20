import React from 'react'

const page = () => {
  return (
    <>
        <div className="card shadow detail-box">
                        <div className="card-header bg-white justify-content-between">
                            <h5 className="mb-0">Address</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                                    <div className="p-2 profile-address mb-2">
                                        <h6 className="mb-2">Billing Address</h6>
                                        <p className="mb-2">B107, Sai Sanman CHSL, Guru Nanak Nagar, Vasai, Maharashtra
                                            401202
                                            India</p>
                                        <p className="mb-0">Phone : 8888782613</p>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-saawree-outline">Edit</button>
                                        <button className="btn btn-saawree-outline ml-1">Delet</button>
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-12 mb-3">
                                    <div className="p-2 profile-address mb-2">
                                        <h6 className="mb-2">Shipping Address</h6>
                                        <p className="mb-2">B107, Sai Sanman CHSL, Guru Nanak Nagar, Vasai, Maharashtra
                                            401202
                                            India</p>
                                        <p className="mb-0">Phone : 8888782613</p>
                                    </div>
                                    <div className="text-right">
                                        <button className="btn btn-saawree-outline">Edit</button>
                                        <button className="btn btn-saawree-outline ml-1">Delet</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-right">
                            <button className="btn btn-saawree">Add new address</button>
                        </div>
                    </div>
    </>
  )
}

export default page
