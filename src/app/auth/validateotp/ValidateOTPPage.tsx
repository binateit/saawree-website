"use client";

import React, { useEffect, useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";
import Link from "next/link";
import { EmailConfirmation, ResendOTP } from "@/core/models/authModel";
import { Result } from "@/core/models/model";
import {
  customerEmailConfirmation,
  resendOTP,
} from "@/core/requests/authRequests";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
  updateStep: (step: number) => void;
}

const validateSchema = Yup.object().shape({
  emailOTP: Yup.string()
    .required("Please enter an email access code.")
    .matches(/^\d+$/, "Only digits are allowed for email access code."),
});
const ValidateOTPPage = ({ userId, updateStep }: Props) => {
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const navigate = useRouter();
  const initialValues = {
    emailOTP: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validateSchema,

    onSubmit: async (formValues, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const emailData: EmailConfirmation = {
          userId: userId,
          emailCode: parseInt(formValues.emailOTP as string),
        };

        const result: Result = await customerEmailConfirmation(emailData);

        if (result.succeeded) {
          // toast.success('Your password has been reset. Please log in now.')
          updateStep(3);
          navigate.push("/auth/registrationprocess");
          //navigate.push('/login')
        } else {
          toast.error("Invalid reset link");
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval); // Stop the timer when it reaches 0
          // setTimeup(true); // Set timeUp to true
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []);

  // Function to format time as MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const sendResendOTP = () => {
    setTimeRemaining(300);
    // Start the timer again
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval); // Stop the timer when it reaches 0
          return 0; // Ensure the timer stays at 0:00
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
    const resendOTPData: ResendOTP = {
      userId: userId,
    };
    resendOTP(resendOTPData);
  };

  return (
    <FormikProvider value={formik}>
      <section className='login-page'>
        <div className='container'>
          <h3 className='form-heading1'>Verification</h3>
          <p className='text-center mb-0'>
            OTP access codes have been sent to your registered email for
            verification purposes.
          </p>
          <p className='text-center mb-0'>
            Enter the code in the box below to proceed. OTP Must be validated
            before your account can be activated
          </p>
          <p className='text-center'>
            If you don&apos;t receive your access codes after 5 minutes then
            click on resend
          </p>
          <form className='login-form' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <label htmlFor='emailOTP'>Email (OTP)</label>
              <Field
                type='text'
                className='form-control checkout-input'
                name='emailOTP'
              />
              {formik.touched.emailOTP && formik.errors.emailOTP && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert' className='text-danger'>
                      {formik.errors.emailOTP}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className='code margin-top-10'>
              <span id='timer'>Time Remaining {formatTime(timeRemaining)}</span>
              {timeRemaining === 0 && (
                <span>
                  <Link href='#' onClick={sendResendOTP}>
                    Resend Code
                  </Link>
                </span>
              )}
            </div>

            <button
              className='submit-btn btn btn-saawree'
              type='submit'
              disabled={
                formik.isSubmitting || !formik.isValid || !formik.touched
              }
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </FormikProvider>
  );
};

export default ValidateOTPPage;
