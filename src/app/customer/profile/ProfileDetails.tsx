import React from "react";

const ProfileDetails = () => {
  return (
    <>
      <div className='card shadow detail-box'>
        <div className='card-header bg-white justify-content-between'>
          <h5 className='mb-0'>Profile</h5>
          <button className='btn btn-saawree open-edit-form'>
            Edit Profile
          </button>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  First Name :
                </label>
                <span className='ml-xl-2'>Vikas</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Last Name :
                </label>
                <span className='ml-xl-2'>Patel</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Company Name :
                </label>
                <span className='ml-xl-2'>
                  Binate IT Services Private Limited
                </span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Print Name :
                </label>
                <span className='ml-xl-2'>Vikas Patel</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Fax Number :
                </label>
                <span className='ml-xl-2'>Not Available</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  E-mail Address :
                </label>
                <span className='ml-xl-2'>
                  vikas.patel@binateitservices.com
                </span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Contact Person :
                </label>
                <span className='ml-xl-2'>Jitendra Bhargava</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Website :
                </label>
                <span className='ml-xl-2'>www.binateitservices.com</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Mobile Number :
                </label>
                <span className='ml-xl-2'>+91 885485547</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Whatsapp Number :
                </label>
                <span className='ml-xl-2'>+91 885485547</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Date of Birth :
                </label>
                <span className='ml-xl-2'>10 June 1995</span>
              </div>
            </div>
            <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
              <div className='profile-data d-flex'>
                <label className='font-weight-bold custome-lg-label mb-0'>
                  Date of Anniversary :
                </label>
                <span className='ml-xl-2'>8 May 2005</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card shadow d-none edit-form'>
        <div className='card-header bg-white'>
          <h5>Update Profile</h5>
        </div>
        <div className='card-body'>
          <form className='account-dtls'>
            <div className='form-group'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>First Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='First Name'
                    value='Vikas'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Last Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Last Name'
                    value='Patel'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Company Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Company Name'
                    value='Binate IT Services Private Limited'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Print Name</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Print Name'
                    value='Vikas Patel'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Fax Number</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Fax Number'
                    value=''
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>E-mail Address</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='E-mail Address'
                    value='vikas.patel@binateitservices.com'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Contact Person</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Contact Person'
                    value='Jitendra Bhargava'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Website</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Website'
                    value='www.binateitservices.com'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Mobile Number</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Mobile Number'
                    value='+91 885485547'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Whatsapp Number</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Whatsapp Number'
                    value='+91 885485547'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Date of Birth</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Date of Birth'
                    value='10 June 1995'
                  />
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                  <label htmlFor=''>Date of Anniversary</label>
                  <input
                    type='text'
                    className='form-control'
                    id=''
                    placeholder='Date of Anniversary'
                    value='8 May 2005'
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 text-right'>
                  <div className='btn btn-saawree close-edit-form'>Update</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
