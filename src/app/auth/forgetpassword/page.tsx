"use client";
import React, { useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { camelize } from "@/core/helpers/helperFunctions";
import {
  forgotAgentPassword,
  forgotPassword,
} from "@/core/requests/authRequests";
import Link from "next/link";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/, {
      message: "Please enter valid email address.",
    })
    .required("Please enter Email Address"),
});
const ForgotPassword = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const userType = searchParams.get("userType");
  const [selectUserType, setSelectUserType] = useState<string | null>(userType);

  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (formValues, { setFieldError, setSubmitting }) => {
      setSubmitting(true);
      try {
        const result =
          selectUserType === "customer"
            ? await forgotPassword(formValues)
            : await forgotAgentPassword(formValues);
        if (result.succeeded) {
          setSubmitting(true);
          setAlertMessage(
            "Link to reset password is been sent to your registered email address"
          );
        } else {
          if (result.statusCode === 400) {
            result.propertyResults.map(
              (error) =>
                setFieldError(camelize(error.propertyName), error.errorMessage),
              toast.error("Error while reseting password link")
            );
          }
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  });
  return (
    <FormikProvider value={formik}>
      <section className='login-page'>
        <div className='container'>
          <h3 className='form-heading1'>Forgot Password</h3>
          <form className='login-form' onSubmit={formik.handleSubmit}>
            <div className='d-flex align-items-center justify-content-center'>
              <div className='form-group d-flex align-items-center  mr-3'>
                <input
                  type='radio'
                  id='customer'
                  name='role'
                  value={"customer"}
                  checked={selectUserType === "customer"}
                  onChange={() => setSelectUserType("customer")}
                />
                <label htmlFor='customer' className='mb-0 ml-1 cursor-pointer'>
                  Customer
                </label>
              </div>
              <div className='form-group d-flex align-items-center'>
                <input
                  type='radio'
                  id='agent'
                  name='role'
                  value={"agent"}
                  checked={selectUserType === "agent"}
                  onChange={() => setSelectUserType("agent")}
                />
                <label htmlFor='agent' className='mb-0 ml-1 cursor-pointer'>
                  Agent
                </label>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='username'>
                Please enter your registered email to reset your password
              </label>
              <Field
                type='text'
                className='form-control checkout-input'
                name='email'
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
            {alertMessage && (
              <div className='alert alert-success' role='alert'>
                {alertMessage}
              </div>
            )}
            <div className='flex-dv'>
              <Link href='/auth/login' className='return-link'>
                <i className='bi bi-chevron-left'></i> Return to Login
              </Link>
              <input type='submit' className='btn btn-saawree' value='Submit' />
            </div>
          </form>
        </div>
      </section>
    </FormikProvider>
  );
};

export default ForgotPassword;
