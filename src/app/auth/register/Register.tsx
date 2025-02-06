/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Field, FormikProvider, useFormik } from "formik";
import Head from "next/head";
import * as Yup from "yup";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Country, SelectOptionProps, State } from "@/core/models/model";
// import { camelize } from "@/core/helpers/helperFunctions";
import { getCountryList, getStateList } from "@/core/requests/requests";
import { registerCustomer } from "@/core/requests/authRequests";
import CustomSelect from "@/core/component/CustomSelect";
import { toCamelCase } from "@/core/helpers/helperFunctions";
import { Register } from "@/core/models/authModel";

interface Props {
  updateStep: (step: number) => void;
  setUserId: (userId: string) => void;
}

const Registration = ({ updateStep, setUserId }: Props) => {
  const [stateList, setStateList] = useState<SelectOptionProps[]>([]);
  const [countryList, setCountryList] = useState<SelectOptionProps[]>([]);
  const router = useRouter();

  const registerSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(
        /^[A-Za-z0-9\-_', .]*$/,
        "Only alphanumeric, _, -, ' and space are allowed for this field"
      )
      .required("Please enter First name"),
    lastName: Yup.string()
      .matches(
        /^[A-Za-z0-9\-_', .]*$/,
        "Only alphanumeric, _, -, ' and space are allowed for this field"
      )
      .required("Please enter Last name"),
    companyName: Yup.string().matches(
      /^[A-Za-z0-9\-_', .]*$/,
      "Only alphanumeric, _, -, ' and space are allowed for this field"
    ),

    mobileNumber: Yup.string()
      .matches(/^[7-9]\d{9}$/, {
        message: "Please enter valid phone number.",
        excludeEmptyString: false,
      })
      .required("Please enter Phone Number"),
    emailAddress: Yup.string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/, {
        message: "Please enter valid email address.",
      })
      .required("Please enter Email Address"),

    password: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .required("Please enter Password"),
    confirmPassword: Yup.string()
      .min(6, "Password is too short - should be 6 chars minimum.")
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Please confirm your password"),

    zipCode: Yup.string()
      .required("Zip code is required")
      .matches(/^\d{6}$/, "Zip code must be numeric and exactly 6 digits"),
    countryId: Yup.number().required("Please select Country"),
    stateId: Yup.number().required("Please select State"),
    addressLine1: Yup.string().required("Please enter address"),
    city: Yup.string().required("Please enter city"),
    agentCode: Yup.string(),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    mobileNumber: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    stateId: undefined,
    countryId: undefined,
    zipCode: "",
    city: "",
    addressLine1: "",
    agentCode: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,

    onSubmit: async (formValues, { setSubmitting, setFieldError }) => {
      setSubmitting(true);
      try {
        const result = await registerCustomer(formValues);
        if (result?.succeeded) {
          setUserId(result?.data?.userId);
          updateStep(2);
          router.push("/auth/registrationprocess");
        } else {
          if (result?.data?.statusCode === 400) {
            result?.data?.propertyResults?.forEach((error: any) => {
              const propertyName = toCamelCase(
                error?.propertyName
              ) as keyof Register;
              setFieldError(propertyName, error?.errorMessage);
            });
            console.log(result);
          }
        }
      } catch (error) {
        toast.error("Error while creating registration");
        console.log(error);
      }
    },
  });
  const { data: country, isLoading: isCountryListLoading } = useQuery({
    queryKey: ["getCountryList", formik.values.countryId],
    queryFn: () => getCountryList(),
  });

  const { data: states, isLoading: isStatesLoading } = useQuery({
    queryKey: ["getStateList", formik.values.countryId],
    queryFn: () => getStateList(Number(formik.values.countryId)),
    enabled: !!formik.values.countryId,
  });

  useEffect(() => {
    let stateResult: any;
    let countryResult: any;
    if (states) {
      stateResult = states as State[];
      const stateArray: any[] = [];
      stateResult.map((item: any) => {
        return stateArray.push({ value: item.id, label: item.name });
      });
      setStateList(stateArray);
    }

    if (country) {
      countryResult = country as Country[];
      const countryArray: any[] = [];
      countryResult?.map((item: any) => {
        return countryArray.push({ value: item.id, label: item.name });
      });
      setCountryList(countryArray);
    }
  }, [country, isCountryListLoading, isStatesLoading, states]);

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <FormikProvider value={formik}>
        <section className='register-page'>
          <div className='container'>
            <h3 className='form-heading1 mb-4'>Signup with Saawree</h3>
            <form className='register-form' onSubmit={formik.handleSubmit}>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-md-6 pr-md-1'>
                    <Field
                      type='text'
                      className='form-control checkout-input'
                      placeholder='First Name'
                      name={"firstName"}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <span className=' text-danger'>
                        {formik.errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className='col-md-6 pl-md-1'>
                    <Field
                      type='text'
                      className='form-control checkout-input'
                      placeholder='Last Name'
                      name={"lastName"}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <span className='text-danger'>
                        {formik.errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <Field
                  type='text'
                  className='form-control checkout-input'
                  name='companyName'
                  placeholder='Company (Optional)'
                />
              </div>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-md-6  pr-md-1'>
                    <Field
                      type='text'
                      className='form-control checkout-input'
                      name={"emailAddress"}
                      placeholder='Email'
                    />
                    {formik.touched.emailAddress &&
                      formik.errors.emailAddress && (
                        <span className='text-danger'>
                          {formik.errors.emailAddress}
                        </span>
                      )}
                  </div>
                  <div className='col-md-6  pl-md-1'>
                    <Field
                      type='text'
                      className='form-control checkout-input'
                      placeholder='Mobile No.'
                      name={"mobileNumber"}
                    />
                    {formik.touched.mobileNumber &&
                      formik.errors.mobileNumber && (
                        <span className='text-danger'>
                          {formik.errors.mobileNumber}
                        </span>
                      )}
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-md-6 pr-md-1'>
                    <Field
                      type='password'
                      className='form-control checkout-input'
                      name={"password"}
                      placeholder='Password'
                    />
                    {formik.touched.password && formik.errors.password && (
                      <span className='text-danger'>
                        {formik.errors.password}
                      </span>
                    )}
                  </div>
                  <div className='col-md-6 pl-md-1'>
                    <Field
                      type='password'
                      className='form-control checkout-input'
                      name={"confirmPassword"}
                      placeholder='Confirm Password'
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <span className='text-danger'>
                          {formik.errors.confirmPassword}
                        </span>
                      )}
                  </div>
                </div>
              </div>

              <div className='form-group'>
                <Field
                  type='text'
                  className='form-control checkout-input'
                  name={"addressLine1"}
                  placeholder='Address Line 1'
                />
                {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                  <span className='text-danger'>
                    {formik.errors.addressLine1}
                  </span>
                )}
              </div>
              <div className='form-group'>
                <Field
                  type='text'
                  className='form-control checkout-input'
                  name={"addressLine2"}
                  placeholder='Address Line 2'
                />
              </div>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-md-4'>
                    <div className='select-field'>
                      {/* <label className='country-label' htmlFor='country-option'>
                        Countr/region
                      </label> */}
                      <Field
                        name={"countryId"}
                        className='search-category-dropdown'
                        options={countryList}
                        component={CustomSelect}
                        placeholder='country'
                        onDropDownChange={(e: any) => {
                          formik.setFieldValue("countryId", e.value);
                        }}
                      ></Field>
                      {formik.touched.countryId && formik.errors.countryId && (
                        <span className='text-danger'>
                          {formik.errors.countryId}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <div className='select-field'>
                      {/* <label className='country-label' htmlFor='country-option'>
                        State
                      </label> */}
                      <Field
                        className='form-select-solid'
                        options={stateList}
                        component={CustomSelect}
                        placeholder='state'
                        name={"stateId"}
                      ></Field>
                      {formik.touched.stateId && formik.errors.stateId && (
                        <span className='text-danger'>
                          {formik.errors.stateId}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-4'>
                    <div className='select-field'>
                      <Field
                        type='text'
                        className='form-control'
                        name={"city"}
                        placeholder={"city"}
                      />
                      {formik.touched.city && formik.errors.city && (
                        <span className='text-danger'>
                          {formik.errors.city}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-md-6 pr-md-1'>
                    <Field
                      type='text'
                      className='form-control checkout-input'
                      name={"zipCode"}
                      placeholder='ZIP code'
                    />
                    {formik.touched.zipCode && formik.errors.zipCode && (
                      <span className='text-danger'>
                        {formik.errors.zipCode}
                      </span>
                    )}
                  </div>
                  <div className='col-md-6 pl-md-1'>
                    <Field
                      type='text'
                      className='form-control checkout-input'
                      name={"agentCode"}
                      placeholder='Agent code'
                    />
                    {formik.touched.agentCode && formik.errors.agentCode && (
                      <span className='text-danger'>
                        {formik.errors.agentCode}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex-dv'>
                <Link href='/' className='return-link'>
                  <i className='bi bi-chevron-left'></i> Return to store
                </Link>
                <button className='btn btn-saawree'>Register</button>
              </div>
            </form>
            <p className='arha'>
              Already have an account?{" "}
              <Link href={"/auth/login"} className='frg-psd'>
                Login!
              </Link>
            </p>
          </div>
        </section>
      </FormikProvider>
    </>
  );
};

export default Registration;
