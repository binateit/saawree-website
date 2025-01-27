import React from 'react'

const page = () => {
    return (
        <>
            <div className="card shadow">
                <div className="card-header bg-white">
                    <h5>Change Password</h5>
                </div>
                <form className="password-change">
                <div className="card-body">                    
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="">Old Password</label>
                                    <input type="password" className="form-control checkout-input" id="" placeholder="Old Password" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="">New Password</label>
                                    <input type="password" className="form-control checkout-input" id="" placeholder="New Password" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="">Re-enter Password</label>
                                    <input type="password" className="form-control checkout-input" id="" placeholder="Re-enter Password" />
                                </div>
                            </div>
                        </div>                       
                    
                </div>
                <div className="card-footer text-right">
                    <button className="btn btn-saawree">Change Password</button>
                </div>
                </form>
            </div>
        </>
    )
}

export default page
