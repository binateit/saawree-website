import React from 'react'

const page = () => {
  return (
    <>
      <div className="card mb-3">
            <div className="card-header">
               <h6 className="mb-0">Order Details</h6>
            </div>
            <div className="card-body">
               <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                     <h6 className="mb-2 font-weight-bold">Recipient Information</h6>
                     <p className="mb-0">Jitendra Bhargava</p>
                     <p className="mb-2">B107, Sai Sanman CHSL, Guru Nanak Nagar, Vasai, Maharashtra 401202
                        India <small>(Shipping Address)</small></p>
                     <p className="mb-2">Phone : 8888782613</p>

                  </div>

                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                     <h6 className="mb-2 font-weight-bold">Billing Address</h6>
                     <p className="mb-2">B107, Sai Sanman CHSL, Guru Nanak Nagar, Vasai, Maharashtra 401202
                        India</p>
                     <p className="mb-2">Phone : 8888782613</p>

                  </div>

                  <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                     <div className="row">
                        <div className="col-xl-6 col-lg-3 col-md-3 col-sm-4">
                           <label className="mb-0 font-weight-bold">Date Added</label>
                           <p>05 Dec 2024</p>
                        </div>
                        <div className="col-xl-6 col-lg-3 col-md-3 col-sm-4">
                           <label className="mb-0 font-weight-bold">Order Status</label>
                           <p>Confirmed</p>
                        </div>
                        <div className="col-xl-6 col-lg-3 col-md-3 col-sm-4">
                           <label className="mb-0 font-weight-bold">Payment Status</label>
                           <p>Not Paid </p>

                        </div>
                     </div>
                  </div>

               </div>
            </div>

         </div>

         <div className="card shadow ">
            <div className="card-header">
                <h6>Add Payment</h6>
            </div>
            <div className="card-body">
                <form className="account-dtls">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                <label htmlFor="">Payment Date<span className="required">*</span></label>
                                <input type="date" className="form-control" id="" placeholder="Payment Date"/>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                <label htmlFor="">Reference Number<span className="required">*</span></label>
                                <input type="text" className="form-control" id=""/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                <label htmlFor="">Payment Mode<span className="required">*</span></label>
                                <div className="d-flex flex-wrap">
                                    <div className="payment-option mr-3">
                                        <input type="radio" name="payment" value="bhim-upi"/> BHIM UPI
                                    </div>
                                    <div className="payment-option mr-3">
                                        <input type="radio" name="payment" value="bhim-upi"/> Cash
                                    </div>
                                    <div className="payment-option mr-3">
                                        <input type="radio" name="payment" value="bhim-upi"/> Cheque
                                    </div>
                                    <div className="payment-option mr-3">
                                        <input type="radio" name="payment" value="bhim-upi"/> Debit/Credit Cards
                                    </div>
                                    <div className="payment-option mr-3">
                                        <input type="radio" name="payment" value="bhim-upi"/> Net Banking
                                    </div>
                                    <div className="payment-option mr-3">
                                        <input type="radio" name="payment" value="bhim-upi"/> RazorPay
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                <label htmlFor="">Cheque Bank Name<span className="required">*</span></label>
                                <input type="text" className="form-control" id=""/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                <label htmlFor="">Cheque Number<span className="required">*</span></label>
                                <input type="text" className="form-control" id=""/>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 mb-3">
                                <label htmlFor="">Cheque Date<span className="required">*</span></label>
                                <input type="date" className="form-control" id=""/>
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 mb-3">
                                <label htmlFor="">Note</label>
                                <textarea className="form-control" rows={5}></textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-right">
                                <div className="btn btn-saawree">Add Payment</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default page
