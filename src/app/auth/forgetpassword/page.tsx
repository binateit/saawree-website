"use client";
import React, { useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Result } from "@/core/models/model";
import { camelize } from "@/core/helpers/helperFunctions";
import {
  forgotAgentPassword,
  forgotPassword,
} from "@/core/requests/authRequests";

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
  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (formValues, { setFieldError, setSubmitting }) => {
      setSubmitting(true);
      try {
        let result: Result;
        result =
          userType === "customer"
            ? await forgotPassword(formValues)
            : await forgotAgentPassword(formValues);

        console.log(result);
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
            <div className='form-group'>
              <label htmlFor='username'>Email</label>
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
            <input
              type='submit'
              className='submit-btn btn btn-saawree'
              value='Submit'
            />
          </form>
        </div>
      </section>
    </FormikProvider>
  );
};

export default ForgotPassword;
