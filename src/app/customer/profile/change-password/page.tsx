"use client";
import { changePassword } from "@/core/requests/customerRoutes";
import { Field, FormikProvider, useFormik } from "formik";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const Page = () => {
  const navigate = useRouter();

  const passwordSchema = Yup.object().shape({
    password: Yup.string().required("Please enter old password"),
    newPassword: Yup.string().required("Please enter new Password"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Please confirm your password"),
  });

  const initialValues = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: passwordSchema,

    onSubmit: async (formValues, { setSubmitting }) => {
      setSubmitting(true);
      try {
        // const result: Result;
        const result = await changePassword(formValues);
        if (result.succeeded) {
          toast.success("Password changed successfully.");
          signOut();
          navigate.push("/auth/login");
        } else {
          formik.setFieldError("password", "Old password is not correct");
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  console.log(formik?.errors);
  return (
    <>
      <FormikProvider value={formik}>
        <div className='card shadow'>
          <div className='card-header bg-white'>
            <h5>Change Password</h5>
          </div>
          <form className='password-change' onSubmit={formik.handleSubmit}>
            <div className='card-body'>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-md-12'>
                    <label htmlFor=''>Old Password</label>
                    <Field
                      type='password'
                      className='form-control checkout-input'
                      {...formik?.getFieldProps("password")}
                      name='password'
                      placeholder='Old Password'
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
                </div>
              </div>
              <div className='form-group'>
                <div className='row'>
                  <div className='col-md-6'>
                    <label htmlFor=''>New Password</label>
                    <Field
                      type='password'
                      className='form-control checkout-input'
                      {...formik?.getFieldProps("newPassword")}
                      name='newPassword'
                      placeholder='New Password'
                    />
                    {formik.touched.newPassword &&
                      formik.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>
                              {formik.errors.newPassword}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                  <div className='col-md-6'>
                    <label htmlFor=''>Re-enter Password</label>
                    <Field
                      type='password'
                      className='form-control checkout-input'
                      {...formik?.getFieldProps("confirmNewPassword")}
                      name='confirmNewPassword'
                      placeholder='Re-enter Password'
                    />
                    {formik.touched.confirmNewPassword &&
                      formik.errors.confirmNewPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>
                              {formik.errors.confirmNewPassword}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer text-right'>
              <button
                type='submit'
                className='btn btn-saawree'
                // disabled={
                //   formik.isSubmitting || !formik.isValid || !formik.touched
                // }
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </FormikProvider>
    </>
  );
};

export default Page;
