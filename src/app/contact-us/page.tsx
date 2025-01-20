
import { BsFillGeoAltFill, BsEnvelopeFill } from "react-icons/bs";
import React from 'react'

const page = () => {
    return (
        <>
            <div className="container">
                <div className="row mt-5 justify-center">
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <BsFillGeoAltFill className="contact-us-icons" />
                                    <div className="contact-wraper">
                                        <h5>Head Office Address</h5>
                                        <p className="mb-0">Gala No. 1A,2A &amp; 3A,</p>
                                        <p className="mb-0">1st Floor Israni,</p>
                                        <p className="mb-0">Industrial Estate Penkar Pada,</p>
                                        <p className="mb-0">Mira Road (East)-401107</p>
                                        <p className="mb-0">Mobile: <a href="tel:9082813196" className="text-saawree">90828
                                            13196</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <BsFillGeoAltFill className="contact-us-icons" />
                                    <div className="contact-wraper">
                                        <h5>Sale Office Address</h5>
                                        <p className="mb-0">25- Near Hanuman Mandir,</p>
                                        <p className="mb-0">Penkar Pada,</p>
                                        <p className="mb-0">Mira Road (East)-401107</p>
                                        <p className="mb-0">Mobile: <a href="tel:9988115477" className="text-saawree">99881 15477</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="text-center">
                                    <BsEnvelopeFill className="contact-us-icons" />
                                    <div className="contact-wraper">
                                        <h5>Contact</h5>
                                        <p className="mb-0"><a href="mailto:info@saawree.com" className="text-saawree">info@saawree.com</a></p>
                                        <p className="mb-0"><a href="mailto:sales@saawree.com" className="text-saawree">sales@saawree.com</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 order-md-2 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-2">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="contact">Contact</label>
                                        <input type="text" className="form-control" id="contact" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="message">Message</label>
                                        <textarea className="form-control" id="message" cols={7}></textarea>
                                    </div>
                                    <div className="text-right">
                                        <button type="submit" className="btn btn-saawree">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 order-md-1 mb-3">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d965076.6982423303!2d72.866353!3d19.115075!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1a03fe1e95b%3A0xa809cb6f42a1dc9e!2sSaawree!5e0!3m2!1sen!2sin!4v1736249530282!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }}></iframe>
                    </div>
                </div>
                <div className="text-center">
                    <h4><strong>Saawree Jewellers, The Leading Imitation Jewellery Manufacturers In India</strong></h4>
                    <p><i>An elegant piece of jewellery never fails to catch the eye!</i></p>
                    <p>Jewellery has a different significance for a woman and is much more than a small piece of beauty worn for personal adornment; it reflects who she is. Mangalmani Jewellers strives to give this emotion a voice via our fantastic collection of Imitation Jewellery Manufacturers &amp; Artificial Jewellery Manufacturers Online.</p>
                </div>
            </div>
        </>
    )
}

export default page
