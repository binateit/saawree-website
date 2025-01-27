"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const page = () => {
const [isFilter, setIsFilter] = useState();
  return (
    <>
            <div className="card mb-2">
                <div className="card-header align-items-center justify-content-between bg-white">
                    <h5>Filter</h5>
                    {!isFilter ? <BsChevronDown fontSize={20} onClick={()=>{setIsFilter(!isFilter)}}/> : <BsChevronUp fontSize={20} onClick={()=>{setIsFilter(!isFilter)}}/>}
                    
                </div>
                {isFilter ? <div className='card-body'>
                    <form>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="date">By Date</label>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="all-status">All Status</label>
                                    <div className="search-category-dropdown">
                                        <select className="form-control">
                                            <option>Status 01</option>
                                            <option>Status 02</option>
                                            <option>Status 03</option>
                                        </select>
                                        <BsChevronDown className="drop-down-icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="all-payment-status">All Payment Status</label>
                                    <div className="search-category-dropdown">
                                        <select className="form-control">
                                            <option>Payment Status 01</option>
                                            <option>Payment Status 02</option>
                                            <option>Payment Status 03</option>
                                        </select>
                                        <BsChevronDown className="drop-down-icon" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div> : ""}
                
            </div>
        <div className="card shadow">
            <div className="card-header bg-white">
                <h5>Customers</h5>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped mb-0">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th>Jitendra Bhargava</th>
                            <td>8888782613</td>
                            <td>jitendra@binateit.com</td>
                            <td>Active</td>
                            <td><Link href="/agent/transactions/customers/details" className="btn btn-saawree">View</Link></td>
                        </tr>
                        <tr>
                            <th>Jitendra Bhargava</th>
                            <td>8888782613</td>
                            <td>jitendra@binateit.com</td>
                            <td>Active</td>
                            <td><Link href="/agent/transactions/customers/details" className="btn btn-saawree">View</Link></td>
                        </tr>
                        <tr>
                            <th>Jitendra Bhargava</th>
                            <td>8888782613</td>
                            <td>jitendra@binateit.com</td>
                            <td>Active</td>
                            <td><Link href="/agent/transactions/customers/details" className="btn btn-saawree">View</Link></td>
                        </tr>
                        <tr>
                            <th>Jitendra Bhargava</th>
                            <td>8888782613</td>
                            <td>jitendra@binateit.com</td>
                            <td>Active</td>
                            <td><Link href="/agent/transactions/customers/details" className="btn btn-saawree">View</Link></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
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
    </>
  )
}

export default page
