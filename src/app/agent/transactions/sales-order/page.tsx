import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <div className="row justify-content-between">
                        <div className="col-xl-5 col-lg-5 col-md-6 mb-3 mb-md-0">
                            <div className="dashboard-common-search">
                                <div className="common-seacrch-box d-flex">
                                    <input type="text" className="form-control" placeholder="Search" />
                                    <button className="btn btn-saawree">Search </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-7 col-md-6 text-right">
                            <div className="btn-group" aria-label="Button group with nested dropdown">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-saawree-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        By Date
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Last 7 Days</a>
                                        <a className="dropdown-item" href="#">Last 15 Days</a>
                                        <a className="dropdown-item" href="#">Last Month</a>
                                        <a className="dropdown-item cursor-pointer" href="#" data-toggle="modal" data-target="#dateSelector">Custom</a>
                                    </div>
                                </div>

                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-saawree-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Status
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Confirmed</a>
                                        <a className="dropdown-item" href="#">Pending</a>
                                    </div>
                                </div>

                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-saawree-outline dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Payment Status
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Done</a>
                                        <a className="dropdown-item" href="#">Pending</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card shadow">
                        <div className="card-header bg-white">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <h5>Sale Order</h5>
                                <Link href="/agent/transactions/sales-order/add-sale-order" className="btn btn-saawree btn-small">Add Sale Order</Link>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sale Order Number</th>
                                            <th scope="col">Customer</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>SOT15</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT16</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT17</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT18</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT18</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT18</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT18</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT18</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT18</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                        <tr>
                                            <th>SOT18</th>
                                            <td>Jitendra Bhargava</td>
                                            <td>30 Nov 2024</td>
                                            <td>₹1,19,591.00</td>
                                            <td>Confirmed</td>
                                            <td><Link href="/agent/transactions/sales-order/details" className="btn btn-saawree">View</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="paginator mt-3 d-flex align-items-center justify-content-between">
                                    <div className="paginaton-showing">
                                        Showing 10 Out of 100
                                    </div>
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination mb-0">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">«</span>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                            </li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">»</span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default page
