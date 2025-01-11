import CalendarInput from "@/core/component/CalenderInput";
import { formatDate, isNotEmpty } from "@/core/helpers/helperFunctions";
import { EditCustomerProfile } from "@/core/models/customerModel";
import { toast } from "react-toastify";
import { userToken } from "@/core/models/model";
import { updateCustomerProfile } from "@/core/requests/customerRoutes";
import { Field, FormikProvider, useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import * as Yup from "yup";

const ProfileDetails = ({
  data,
  customerProfileRefetch,
}: {
  data: any;
  customerProfileRefetch: () => void;
}) => {
  const [editMode, setEditMode] = useState<boolean>();
  const { data: session } = useSession();
  const editProfileSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    companyName: Yup.string(),
    mobileNumber: Yup.number(),
    emailAddress: Yup.string(),
    website: Yup.string(),
    dateOfBirth: Yup.string(),
    dateOfAnniversary: Yup.string(),
  });
  const sessionData = session?.user as userToken;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      companyName: data.companyName || undefined,
      mobileNumber: data.mobileNumber,
      emailAddress: data.emailAddress || undefined,
      website: data.website || undefined,
      whatsappNumber: data.whatsappNumber || undefined,
      dateOfBirth: data.dateOfBirth || undefined,
      dateOfAnniversary: data.dateOfAnniversary || undefined,
    },
    validationSchema: editProfileSchema,

    onSubmit: async (formValues, { setFieldError, setSubmitting }) => {
      setSubmitting(true);
      try {
        const profilePayload: EditCustomerProfile = {
          userId: sessionData?.userId,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          companyName: formValues.companyName,
          mobileNumber: formValues.mobileNumber,
          emailAddress: formValues.emailAddress,
          website: formValues.website,
          whatsappNumber: formValues.whatsappNumber,
          dateOfBirth: formValues.dateOfBirth,
          dateOfAnniversary: formValues.dateOfAnniversary,
        };

        let result;
        result = await updateCustomerProfile(profilePayload);
        console.log(result);
        if (result.succeeded) {
          toast.success("Customer is updated successfully.");
          customerProfileRefetch();
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  return (
    <>
      {!editMode && (
        <div className='card shadow detail-box'>
          <div className='card-header bg-white justify-content-between'>
            <h5 className='mb-0'>Profile</h5>
            <button
              className='btn btn-saawree open-edit-form'
              onClick={() => setEditMode(!editMode)}
            >
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
                  <span className='ml-xl-2'>{data?.firstName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Last Name :
                  </label>
                  <span className='ml-xl-2'>{data?.lastName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Company Name :
                  </label>
                  <span className='ml-xl-2'>{data?.companyName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Print Name :
                  </label>
                  <span className='ml-xl-2'>{data?.printName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Fax Number :
                  </label>
                  <span className='ml-xl-2'>{data?.faxNumber}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    E-mail Address :
                  </label>
                  <span className='ml-xl-2'>{data?.emailAddress}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Contact Person :
                  </label>
                  <span className='ml-xl-2'>{data?.contactPerson}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Website :
                  </label>
                  <span className='ml-xl-2'>{data?.website}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Mobile Number :
                  </label>
                  <span className='ml-xl-2'>{data?.mobileNumber}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Whatsapp Number :
                  </label>
                  <span className='ml-xl-2'>{data?.whatsappNumber}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Date of Birth :
                  </label>
                  <span className='ml-xl-2'>
                    {data?.dateOfBirth &&
                      formatDate(data?.dateOfBirth, "dd MMM yyyy")}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Date of Anniversary :
                  </label>
                  <span className='ml-xl-2'>
                    {data?.dateOfAnniversary &&
                      formatDate(data?.dateOfAnniversary, "dd MMM yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {editMode && (
        <div className='card shadow edit-form'>
          <div className='card-header bg-white'>
            <h5>Update Profile</h5>
          </div>
          <div className='card-body'>
            <FormikProvider value={formik}>
              <form
                onSubmit={formik.handleSubmit}
                className='account-dtls'
                noValidate
              >
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>First Name</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("firstName")}
                        name='firstName'
                        placeholder='First Name'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Last Name</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("lastName")}
                        name='lastName'
                        placeholder='Last Name'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Company Name</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("companyName")}
                        name='companyName'
                        placeholder='Company Name'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Print Name</label>
                      <Field
                        type='text'
                        className='form-control'
                        Readonly
                        value={`${formik.values.firstName} ${formik.values.lastName}`}
                        placeholder='Print Name'
                        name='printName'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Fax Number</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("faxNumber")}
                        placeholder='Fax Number'
                        name='faxNumber'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>E-mail Address</label>
                      <Field
                        type='text'
                        className='form-control'
                        placeholder='E-mail Address'
                        {...formik.getFieldProps("emailAddress")}
                        name='emailAddress'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Contact Person</label>
                      <Field
                        type='text'
                        className='form-control'
                        Readonly
                        value={`${formik.values.firstName} ${formik.values.lastName}`}
                        placeholder='Contact Person'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Website</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("website")}
                        name='website'
                        placeholder='Website'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Mobile Number</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("mobileNumber")}
                        name='mobileNumber'
                        placeholder='Mobile Number'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Whatsapp Number</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("whatsappNumber")}
                        name='whatsappNumber'
                        placeholder='Whatsapp Number'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Date of Birth</label>
                      <div className='w-100'>
                        <CalendarInput
                          name='dateOfBirth'
                          placeholder='Date of Birth'
                          className='form-control'
                          value={
                            formik.values.dateOfBirth &&
                            !isNaN(
                              Date.parse(
                                formik.values.dateOfBirth as unknown as string
                              )
                            )
                              ? new Date(formik.values.dateOfBirth)
                              : null
                          }
                          setFieldValue={formik.setFieldValue}
                        />
                      </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Date of Anniversary</label>
                      <div className='w-100'>
                        <CalendarInput
                          name='dateOfAnniversary'
                          placeholder='Date of Anniversary'
                          className='form-control'
                          value={
                            formik.values.dateOfAnniversary &&
                            !isNaN(
                              Date.parse(
                                formik.values
                                  .dateOfAnniversary as unknown as string
                              )
                            )
                              ? new Date(formik.values.dateOfAnniversary)
                              : null
                          }
                          setFieldValue={formik.setFieldValue}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 text-right'>
                      <button
                        type='submit'
                        className='btn btn-saawree close-edit-form'
                        disabled={
                          formik.isSubmitting ||
                          !formik.isValid ||
                          !formik.touched
                        }
                      >
                        <span className='indicator-label'>Update</span>
                        {formik.isSubmitting && (
                          <span className='indicator-progress'>
                            Please wait...{" "}
                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </FormikProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
