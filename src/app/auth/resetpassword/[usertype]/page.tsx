"use client";

import React from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ResetPassword } from "@/core/models/authModel";
import {
  resetAgentPassword,
  resetPassword,
} from "@/core/requests/authRequests";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const passwordSchema = Yup.object().shape({
  password: Yup.string().required("Please enter password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Please confirm your password"),
});
const ResetPasswordPage = () => {
  const navigate = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: passwordSchema,

    onSubmit: async (formValues, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const tokenFromURL = decodeURIComponent(token as string).replace(
          /\s/g,
          "+"
        );

        const resetData: ResetPassword = {
          password: formValues.password,
          confirmPassword: formValues.confirmPassword,
          token: tokenFromURL as string,
        };

        const result = pathname.includes("customer")
          ? await resetPassword(resetData)
          : await resetAgentPassword(resetData);

        if (result.succeeded) {
          toast.success("Your password has been reset. Please log in now.");
          navigate.push("/auth/login");
        } else if (result.succeeded === false) {
          toast.error("Invalid reset link");
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
          <h3 className='form-heading1'>Reset Password</h3>
          <form className='login-form' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Field
                type='password'
                className='form-control checkout-input'
                name='password'
              />
              {formik.touched.password && formik.errors.password && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.password}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <Field
                type='password'
                className='form-control checkout-input'
                name='confirmPassword'
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert' className='text-danger'>
                        {formik.errors.confirmPassword}
                      </span>
                    </div>
                  </div>
                )}
            </div>

            <button
              className='btn-crt'
              type='submit'
              disabled={
                formik.isSubmitting || !formik.isValid || !formik.touched
              }
            >
              Reset Password
            </button>
          </form>
        </div>
      </section>
    </FormikProvider>
  );
};

export default ResetPasswordPage;
