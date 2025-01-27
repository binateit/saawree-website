"use client"
import { useState } from 'react';
import React from 'react'

const page = () => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
        {!isEdit? <div className="card shadow detail-box">
                <div className="card-header bg-white justify-content-between">
                    <h5 className="mb-0">Profile</h5>
                    <button className="btn btn-saawree open-edit-form" onClick={()=>setIsEdit(!isEdit)}>Edit Profile</button>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">First Name :</label>
                                <span className="ml-xl-2">Vikas</span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Last Name :</label>
                                <span className="ml-xl-2">Patel</span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Agent Code :</label>
                                <span className="ml-xl-2">BIT25</span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Status :</label>
                                <span className="ml-xl-2">Active</span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Company Name :</label>
                                <span className="ml-xl-2">
                                    Binate IT Services Private Limited
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">E-mail Address :</label>
                                <span className="ml-xl-2">
                                    vikas.patel@binateitservices.com
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Mobile Number :</label>
                                <span className="ml-xl-2">
                                    +91 885485547
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Whatsapp Number :</label>
                                <span className="ml-xl-2">
                                    +91 885485547
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Commission Percent
                                    :</label>
                                <span className="ml-xl-2">
                                    25
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Date of Birth :</label>
                                <span className="ml-xl-2">
                                    10 June 1995
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Date of Anniversary
                                    :</label>
                                <span className="ml-xl-2">
                                    8 May 2005
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Rate Applicable :</label>
                                <span className="ml-xl-2">
                                    NA
                                </span>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 mb-3">
                            <div className="profile-data d-flex">
                                <label className="font-weight-bold custome-lg-label mb-0">Address :</label>
                                <span className="ml-xl-2">
                                    B107, Sai Sanman CHSL, Guru Nanak Nagar, Maharashtra, Vasai, 401202
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="card shadow edit-form">
                <div className="card-header bg-white">
                    <h5>Update Profile</h5>
                </div>
                <form className="account-dtls">
                <div className="card-body">
                    
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">First Name</label>
                                    <input type="text" className="form-control" id="" placeholder="First Name" value="Vikas"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" className="form-control" id="" placeholder="Last Name" value="Patel"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Agent Code</label>
                                    <input type="text" className="form-control" id="" placeholder="Agent Code" disabled={true} value="BIT25"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Status</label>
                                    <input type="text" className="form-control" id="" placeholder="Status" disabled={true} value="Active"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Company Name</label>
                                    <input type="text" className="form-control" id="" placeholder="Company Name" value="Binate IT Services Private Limited"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">E-mail Address</label>
                                    <input type="text" className="form-control" id="" placeholder="E-mail Address" value="vikas.patel@binateitservices.com"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Mobile Number</label>
                                    <input type="text" className="form-control" id="" placeholder="Mobile Number" value="+91 885485547"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Whatsapp Number</label>
                                    <input type="text" className="form-control" id="" placeholder="Whatsapp Number" value="+91 885485547"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Commission Percent</label>
                                    <input type="text" className="form-control" id="" placeholder="Commission" value="25"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Date of Birth</label>
                                    <input type="text" className="form-control" id="" placeholder="Date of Birth" value="10 June 1995"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Date of Anniversary</label>
                                    <input type="text" className="form-control" id="" placeholder="Date of Anniversary" value="8 May 2005"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Rate Applicable</label>
                                    <input type="text" className="form-control" id="" placeholder="Rate Applicable" value="NA"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Address Line1</label>
                                    <input type="text" className="form-control" id="" placeholder="Address Line1" value="B107, Sai Sanman CHSL"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Address Line2</label>
                                    <input type="text" className="form-control" id="" placeholder="Address Line2" value="Guru Nanak Nagar"/>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">State</label>
                                    <select className="form-control">
                                        <option>Maharashtra</option>
                                        <option>Uttar Pradesh</option>
                                        <option>Delhi</option>
                                    </select>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">City</label>
                                    <select className="form-control">
                                        <option>Vasai</option>
                                        <option>Mumbai</option>
                                        <option>Lucknow</option>
                                    </select>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                    <label htmlFor="">Zip Code</label>
                                    <input type="text" className="form-control" id="" placeholder="Zip Code" value="401202"/>
                                </div>
                            </div>
                            
                        </div>
                   
                </div>
                <div className="card-footer text-right">           
                    <div className="btn btn-saawree close-edit-form" onClick={()=>setIsEdit(!isEdit)}>Update</div>                            
                </div>
                </form>
        </div>}
            

            
        </>
    )
}

export default page
