"use client";
import React from 'react'
import { useState } from 'react'

const page = () => {
    const [editMode, setEditMode] = useState<boolean>();
    return (
        <>
            {!editMode ?
                <div className="card shadow  detail-box">
                    <div className="card-header bg-white justify-content-between">
                        <h5 className="mb-0">Accounting Details</h5>
                        <button className="btn btn-saawree open-edit-form" onClick={() => { setEditMode(!editMode) }}>Edit Account</button>
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
                :
                <div className="card shadow edit-form">
                    <div className="card-header bg-white">
                        <h5>Edit Account Details</h5>
                    </div>
                    <form className="account-dtls">
                        <div className="card-body">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                        <label htmlFor="">LST Number</label>
                                        <input type="text" className="form-control" id="" placeholder="LST Number" value="" />
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                        <label htmlFor="">CST Numbere</label>
                                        <input type="text" className="form-control" id="" placeholder="CST Number" value="" />
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                        <label htmlFor="">GST Number</label>
                                        <input type="text" className="form-control" id="" placeholder="GST Number" value="" />
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                        <label htmlFor="">Pan Number</label>
                                        <input type="text" className="form-control" id="" placeholder="Pan Number" value="" />
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                        <label htmlFor="">Aadhar card Number</label>
                                        <input type="text" className="form-control" id="" placeholder="Aadhar card Number" value="" />
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                        <label htmlFor="">GST Registered Type</label>
                                        <input type="text" className="form-control" id="" placeholder="GST Registered Type" value="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-right">
                            <div className="btn btn-saawree close-edit-form" onClick={() => { setEditMode(!editMode) }}>Update</div>
                        </div>
                    </form>
                </div>
            }
        </>
    )
}

export default page
