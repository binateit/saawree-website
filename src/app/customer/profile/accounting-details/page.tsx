import React from 'react'

const page = () => {
  return (
    <>
        <div className="card shadow  detail-box">
                        <div className="card-header bg-white justify-content-between">
                            <h5 className="mb-0">Accounting Details</h5>
                            <button className="btn btn-saawree open-edit-form">Edit Account</button>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                                    <div className="profile-data d-flex">
                                        <label className="font-weight-bold custome-lg-label mb-0">LST Number :</label>
                                        <span className="ml-xl-2">Not Available</span>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                                    <div className="profile-data d-flex">
                                        <label className="font-weight-bold custome-lg-label mb-0">CST Number :</label>
                                        <span className="ml-xl-2">Not Available</span>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                                    <div className="profile-data d-flex">
                                        <label className="font-weight-bold custome-lg-label mb-0">GST Number :</label>
                                        <span className="ml-xl-2">
                                            Not Available
                                        </span>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                                    <div className="profile-data d-flex">
                                        <label className="font-weight-bold custome-lg-label mb-0">Pan Number :</label>
                                        <span className="ml-xl-2">
                                            Not Available
                                        </span>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                                    <div className="profile-data d-flex">
                                        <label className="font-weight-bold custome-lg-label mb-0">Aadhar card Number
                                            :</label>
                                        <span className="ml-xl-2">
                                            Not Available
                                        </span>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                                    <div className="profile-data d-flex">
                                        <label className="font-weight-bold custome-lg-label mb-0">GST Registered Type
                                            :</label>
                                        <span className="ml-xl-2">
                                            Consumer
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
    </>
  )
}

export default page
