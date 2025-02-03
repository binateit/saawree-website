"use client";

import * as Yup from "yup";
import {
  getAgentByToken,
  updateAgentProfile,
} from "@/core/requests/agentRequests";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { useEffect, useState } from "react";
import React from "react";
import { EditAgentProfile } from "@/core/models/agentModel";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import CalendarInput from "@/core/component/CalenderInput";
import CustomSelect from "@/core/component/CustomSelect";
import { getCountryList, getStateList } from "@/core/requests/requests";
import {
  Country,
  SelectOptionProps,
  State,
} from "@/core/models/model";

const Page = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [stateList, setStateList] = useState<SelectOptionProps[]>([]);
  const [countryList, setCountryList] = useState<SelectOptionProps[]>([]);
  const editProfileSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    companyName: Yup.string(),
    mobileNumber: Yup.string()
      .matches(/^[7-9]\d{9}$/, {
        message: "Please enter valid phone number.",
        excludeEmptyString: false,
      })
      .required("Please enter phone number"),
    emailAddress: Yup.string(),
    whatsappNumber: Yup.string()
      .matches(/^[7-9]\d{9}$/, {
        message: "Please enter valid phone number.",
        excludeEmptyString: false,
      })
      .required("Please enter whatsapp number"),
    dateOfBirth: Yup.string(),
    dateOfAnniversary: Yup.string(),
    addressLine1: Yup.string(),
    addressLine2: Yup.string(),
    city: Yup.string(),
    stateId: Yup.number(),
    countryId: Yup.number(),
    zip: Yup.string().matches(
      /^\d{6}$/,
      "Zip code must be numeric and exactly 6 digits"
    ),
  });
  const {
    data: agentProfile,
    isLoading: agentProfileLoading,
    refetch: agentProfileRefetch,
  } = useQuery({
    queryKey: ["agentByToken"],
    queryFn: () => getAgentByToken(),
    refetchOnWindowFocus: false,
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: agentProfile?.firstName || undefined,
      lastName: agentProfile?.lastName || undefined,
      companyName: agentProfile?.companyName || undefined,
      mobileNumber: agentProfile?.mobileNumber,
      emailAddress: agentProfile?.emailAddress || undefined,
      whatsappNumber: agentProfile?.whatsappNumber || undefined,
      dateOfBirth: agentProfile?.dateOfBirth || undefined,
      dateOfAnniversary: agentProfile?.dateOfAnniversary || undefined,
      addressLine1: agentProfile?.addressLine1,
      addressLine2: agentProfile?.addressLine2,
      city: agentProfile?.city,
      stateId: agentProfile?.stateId,
      stateName: agentProfile?.stateName,
      countryId: agentProfile?.countryId,
      countryName: agentProfile?.countryName,
      zipCode: agentProfile?.zipCode,
    },
    validationSchema: editProfileSchema,

    onSubmit: async (formValues, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const profilePayload: EditAgentProfile = {
          firstName: formValues?.firstName as string,
          lastName: formValues?.lastName as string,
          companyName: formValues?.companyName as string,
          mobileNumber: formValues?.mobileNumber as string,
          emailAddress: formValues?.emailAddress as string,
          whatsappNumber: formValues?.whatsappNumber as string,
          dateOfBirth: formValues?.dateOfBirth as string,
          dateOfAnniversary: formValues?.dateOfAnniversary as string,
          addressLine1: formValues?.addressLine1 as string,
          addressLine2: formValues?.addressLine2 as string,
          city: formValues?.city as string,
          stateId: formValues?.stateId as number,
          countryId: formValues?.countryId as number,
          zipCode: formValues?.zipCode as string,
        };
        profilePayload.stateName = stateList.find(
          (x) => x.value === formValues.stateId
        )?.label as string;
        profilePayload.countryName = countryList.find(
          (x) => x.value === formValues.countryId
        )?.label as string;

        const result = await updateAgentProfile(profilePayload);

        if (result.succeeded) {
          toast.success("Agent is updated successfully.");
          setIsEdit(false);
          agentProfileRefetch();
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  const { data: country } = useQuery({
    queryKey: ["getCountryList", formik.values.countryId],
    queryFn: () => getCountryList(),
  });

  const { data: states } = useQuery({
    queryKey: ["getStateList", formik.values.countryId],
    queryFn: () => getStateList(Number(formik.values.countryId)),
    enabled: !!formik.values.countryId,
  });

  useEffect(() => {
    let stateResult;
    let countryResult;
    if (states) {
      stateResult = states as State[];
      const stateArray: SelectOptionProps[] = [];
      stateResult.map((item: State) => {
        return stateArray.push({
          value: item.id as number,
          label: item.name as string,
        });
      });
      setStateList(stateArray);
    }
    if (country) {
      countryResult = country as Country[];
      const countryArray: SelectOptionProps[] = [];
      countryResult?.map((item: Country) => {
        return countryArray.push({
          value: item.id as number,
          label: item.name as string,
        });
      });
      setCountryList(countryArray);
    }
  }, [states, country]);

  if (agentProfileLoading) return <p>Loading...</p>;

  return (
    <>
      {!isEdit ? (
        <div className='card shadow detail-box'>
          <div className='card-header bg-white justify-content-between'>
            <h5 className='mb-0'>Profile</h5>
            <button
              className='btn btn-saawree open-edit-form'
              onClick={() => setIsEdit(!isEdit)}
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
                  <span className='ml-xl-2'>{agentProfile?.firstName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Last Name :
                  </label>
                  <span className='ml-xl-2'>{agentProfile?.lastName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Agent Code :
                  </label>
                  <span className='ml-xl-2'>{agentProfile?.agentCode}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Status :
                  </label>
                  <span className='ml-xl-2'>
                    {agentProfile?.isActive ? "Active" : "De-activated"}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Company Name :
                  </label>
                  <span className='ml-xl-2'>{agentProfile?.companyName}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    E-mail Address :
                  </label>
                  <span className='ml-xl-2'>{agentProfile?.emailAddress}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Mobile Number :
                  </label>
                  <span className='ml-xl-2'>{`+91 ${agentProfile?.mobileNumber}`}</span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Whatsapp Number :
                  </label>
                  <span className='ml-xl-2'>{`+91 ${agentProfile?.whatsappNumber}`}</span>
                </div>
              </div>
              {/* <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Commission Percent :
                  </label>
                  <span className='ml-xl-2'>
                    {agentProfile?.commissionPercent}
                  </span>
                </div>
              </div> */}
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Date of Birth :
                  </label>
                  <span className='ml-xl-2'>
                    {formatDate(
                      agentProfile?.dateOfBirth as unknown as string,
                      "dd MMM yyyy"
                    )}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Date of Anniversary :
                  </label>
                  <span className='ml-xl-2'>
                    {" "}
                    {formatDate(
                      agentProfile?.dateOfAnniversary as unknown as string,
                      "dd MMM yyyy"
                    )}
                  </span>
                </div>
              </div>
              {/* <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Rate Applicable :
                  </label>
                  <span className='ml-xl-2'>{agentProfile?.rateTypeName}</span>
                </div>
              </div> */}
              <div className='col-xl-12 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Address :
                  </label>
                  <span className='ml-xl-2'>
                    {agentProfile?.addressLine1} {agentProfile?.addressLine2}{" "}
                    {agentProfile?.city} {agentProfile?.stateName}{" "}
                    {agentProfile?.countryName} {agentProfile?.zipCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Address Line1</label>
                      <Field
                        type={"text"}
                        className='form-control form-control-solid ms-2'
                        {...formik.getFieldProps("addressLine1")}
                        name='addressLine1'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Address Line2</label>
                      <Field
                        className='form-control form-control-solid ms-2'
                        type='text'
                        {...formik.getFieldProps("addressLine2")}
                        name='addressLine2'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>State</label>

                      <Field
                        name={"countryId"}
                        className='search-category-dropdown'
                        options={countryList}
                        component={CustomSelect}
                        placeholder='country'
                        onDropDownChange={(e: { value: number }) => {
                          formik.setFieldValue("countryId", e.value);
                        }}
                      ></Field>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>State</label>

                      <Field
                        className='form-select-solid'
                        options={stateList}
                        component={CustomSelect}
                        placeholder='state'
                        name={"stateId"}
                      ></Field>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>City</label>
                      <Field
                        type={"text"}
                        className='form-control form-control-solid ms-2'
                        {...formik.getFieldProps("city")}
                        name='city'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Zip Code</label>
                      <Field
                        type={"text"}
                        className='form-control form-control-solid ms-2'
                        {...formik.getFieldProps("zipCode")}
                        name='zipCode'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-footer text-right'>
                <button
                  className='btn btn-saawree close-edit-form mr-3'
                  onClick={() => setIsEdit(false)}
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

export default Page;
