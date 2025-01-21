import React from 'react'

const page = () => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-header">
                    <h6 className="mb-0">Payout Details</h6>
                </div>
                <div className="card-body">

                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4">
                            <label className="mb-0 font-weight-bold">Payout Reference No.</label>
                            <p>SO025</p>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4">
                            <label className="mb-0 font-weight-bold">Amount</label>
                            <p>₹2,227.50</p>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4">
                            <label className="mb-0 font-weight-bold">Account Name</label>
                            <p>Account Name</p>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4">
                            <label className="mb-0 font-weight-bold">Payment Date</label>
                            <p>15 Jan 2023 </p>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-4">
                            <label className="mb-0 font-weight-bold">Payment Mode</label>
                            <p>BHIM UPI </p>
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
                                    <th scope="col">Amount</th>
                                    <th scope="col">Earned Commission</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>SW520</th>
                                    <td>₹49500.00</td>
                                    <td>₹4000.00</td>
                                    <td>Recived</td>
                                </tr>
                                <tr>
                                    <th>SW520</th>
                                    <td>₹49500.00</td>
                                    <td>₹4000.00</td>
                                    <td>Recived</td>
                                </tr>
                                <tr>
                                    <th>SW520</th>
                                    <td>₹49500.00</td>
                                    <td>₹4000.00</td>
                                    <td>Recived</td>
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
