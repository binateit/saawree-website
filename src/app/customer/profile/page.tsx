"use client";
import CalendarInput from "@/core/component/CalenderInput";
import { formatDate } from "@/core/helpers/helperFunctions";
import { EditCustomerProfile } from "@/core/models/customerModel";
import { toast } from "react-toastify";
import { updateCustomerProfile } from "@/core/requests/customerRoutes";
import { Field, FormikProvider, useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileByToken } from "@/core/requests/authRequests";
import CustomSelect from "@/core/component/CustomSelect";
import { User } from "next-auth";

const ProfileDetails = () => {
  const [editMode, setEditMode] = useState<boolean>();
  const [combinations, setCombinations] = useState<string[]>([]);
  const { data: session } = useSession();
  const editProfileSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    companyName: Yup.string(),
    mobileNumber: Yup.number(),
    emailAddress: Yup.string(),
    website: Yup.string(),
    dateOfBirth: Yup.string(),
    faxNumber: Yup.string(),
    dateOfAnniversary: Yup.string(),
  });
  const sessionData = session?.user as User;

  const {
    data: customerProfile,
    isLoading: customerProfileLoading,
    refetch: customerProfileRefetch,
  } = useQuery({
    queryKey: ["userByToken"],
    queryFn: () => getUserProfileByToken(sessionData?.token),
    refetchOnWindowFocus: false,
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: customerProfile?.firstName || undefined,
      lastName: customerProfile?.lastName || undefined,
      companyName: customerProfile?.companyName || undefined,
      mobileNumber: customerProfile?.mobileNumber,
      emailAddress: customerProfile?.emailAddress || undefined,
      website: customerProfile?.website || undefined,
      whatsappNumber: customerProfile?.whatsappNumber || undefined,
      dateOfBirth: customerProfile?.dateOfBirth || undefined,
      faxNumber: customerProfile?.faxNumber || undefined,
      printName: customerProfile?.printName || undefined,
      contactPerson: customerProfile?.contactPerson || undefined,
      dateOfAnniversary: customerProfile?.dateOfAnniversary || undefined,
    },
    validationSchema: editProfileSchema,

    onSubmit: async (formValues, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const profilePayload: EditCustomerProfile = {
          firstName: formValues.firstName as string,
          lastName: formValues.lastName as string,
          companyName: formValues.companyName as string,
          mobileNumber: formValues.mobileNumber as string,
          emailAddress: formValues.emailAddress as string,
          website: formValues.website as string,
          faxNumber: formValues?.faxNumber as string,
          whatsappNumber: formValues.whatsappNumber as string,
          dateOfBirth: formValues.dateOfBirth as string,
          printName: (formValues?.firstName +
            " " +
            formValues?.lastName) as string,
          contactPerson: (formValues?.firstName +
            " " +
            formValues?.lastName) as string,
          dateOfAnniversary: formValues.dateOfAnniversary as string,
        };

        const result = await updateCustomerProfile(profilePayload);

        if (result.succeeded) {
          toast.success("Customer is updated successfully.");
          customerProfileRefetch();
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  function generateCombinations() {
    const combinations: string[] = [];
    if (formik.values.firstName && formik.values.lastName) {
      combinations.push(`${formik.values.firstName} ${formik.values.lastName}`);
      combinations.push(`${formik.values.lastName} ${formik.values.firstName}`);
      formik.setFieldValue(
        "contactPerson",
        customerProfile?.contactPerson !== null
          ? customerProfile?.contactPerson
          : `${formik.values.lastName} ${formik.values.firstName}`
      );

      formik.setFieldValue(
        "contactPerson",
        customerProfile?.printName !== null
          ? customerProfile?.printName
          : `${formik.values.firstName} ${formik.values.lastName}`
      );
    }
    if (formik.values.companyName) {
      combinations.push(`${formik.values.companyName}`);
    }
    setCombinations(combinations);
  }

  useEffect(() => {
    generateCombinations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formik.values.firstName,
    formik.values.lastName,
    formik.values.companyName,
  ]);

  if (customerProfileLoading) return <p>Loading....</p>;

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
                  <span className='ml-xl-2'>{customerProfile?.firstName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Last Name :
                  </label>
                  <span className='ml-xl-2'>{customerProfile?.lastName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Company Name :
                  </label>
                  <span className='ml-xl-2'>
                    {customerProfile?.companyName}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Print Name :
                  </label>
                  <span className='ml-xl-2'>{customerProfile?.printName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Fax Number :
                  </label>
                  <span className='ml-xl-2'>{customerProfile?.faxNumber}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    E-mail Address :
                  </label>
                  <span className='ml-xl-2'>
                    {customerProfile?.emailAddress}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Contact Person :
                  </label>
                  <span className='ml-xl-2'>
                    {customerProfile?.contactPerson}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Website :
                  </label>
                  <span className='ml-xl-2'>{customerProfile?.website}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Mobile Number :
                  </label>
                  <span className='ml-xl-2'>
                    {customerProfile?.mobileNumber}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Whatsapp Number :
                  </label>
                  <span className='ml-xl-2'>
                    {customerProfile?.whatsappNumber}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Date of Birth :
                  </label>
                  <span className='ml-xl-2'>
                    {customerProfile?.dateOfBirth &&
                      formatDate(customerProfile?.dateOfBirth, "dd MMM yyyy")}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Date of Anniversary :
                  </label>
                  <span className='ml-xl-2'>
                    {customerProfile?.dateOfAnniversary &&
                      formatDate(
                        customerProfile?.dateOfAnniversary,
                        "dd MMM yyyy"
                      )}
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
          <FormikProvider value={formik}>
            <form
              onSubmit={formik.handleSubmit}
              noValidate
              className='account-dtls'
            >
              <div className='card-body'>
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
                        className='form-select-solid'
                        component={CustomSelect}
                        {...formik.getFieldProps("printName")}
                        // value={formik.values.printName}
                        name={"printName"}
                        options={combinations.map((value) => ({
                          label: value,
                          value,
                        }))}
                      ></Field>
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
                        disabled
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Contact Person</label>
                      <Field
                        className='form-select-solid'
                        component={CustomSelect}
                        {...formik.getFieldProps("contactPerson")}
                        // value={formik.values.printName}
                        name={"contactPerson"}
                        options={combinations.map((value) => ({
                          label: value,
                          value,
                        }))}
                      ></Field>
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
                      <div className='w-100 p-calendar-wraper'>
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
                      <div className='w-100 p-calendar-wraper'>
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
                </div>
              </div>
              <div className='card-footer text-right'>
                <button
                  className='btn btn-saawree close-edit-form mr-3'
                  onClick={() => setEditMode(false)}
                >
                  <span className='indicator-label'>Cancel</span>
                </button>
                <button
                  type='submit'
                  className='btn btn-saawree close-edit-form'
                  disabled={formik.isSubmitting || !formik.isValid}
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
            </form>
          </FormikProvider>
        </div>
      )}
    </>
  );
};

export default ProfileDetails;
