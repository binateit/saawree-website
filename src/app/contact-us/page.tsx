"use client";
import { BsFillGeoAltFill, BsEnvelopeFill } from "react-icons/bs";
import React from "react";
import * as Yup from "yup";
import { camelize } from "@/core/helpers/helperFunctions";
import { Field, FormikProvider, useFormik } from "formik";
import { ContactUsPayload, Result } from "@/core/models/model";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { contactUsRequest } from "@/core/requests/requests";

const page = () => {
  const router = useRouter();

  const contactSchema = Yup.object().shape({
    fullName: Yup.string()
      .matches(
        /^[A-Za-z0-9\-_', .]*$/,
        "Only alphanumeric, _, -, ' and space are allowed for this field"
      )
      .required("Please enter First name"),
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
    message: Yup.string(),
  });

  const initialValues = {
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    message: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: contactSchema,

    onSubmit: async (formValues, { setFieldError, setSubmitting }) => {
      setSubmitting(true);
      try {
        let result: Result;
        const payload: ContactUsPayload = {
          name: formValues?.fullName,
          mobileNumber: formValues?.mobileNumber,
          email: formValues?.emailAddress,
          message: formValues?.message,
        };
        result = await contactUsRequest(payload);
        if (result?.succeeded) {
          toast.success(
            "Thank you for contacting us. Our team will shortly get back to you"
          );
        } else {
          if (result.data.statusCode === 400) {
            result.data.propertyResults.map(
              (error: any) =>
                setFieldError(camelize(error.propertyName), error.errorMessage),
              toast.error("Error while creating registration")
            );
          }
        }
      } catch (ex) {
        toast.error("Error while creating registration");
      }
    },
  });
  return (
    <>
      <div className='container'>
        <div className='row mt-5 justify-center'>
          <div className='col-xl-4 col-lg-4 col-md-6 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='text-center'>
                  <BsFillGeoAltFill className='contact-us-icons' />
                  <div className='contact-wraper'>
                    <h5>Head Office Address</h5>
                    <p className='mb-0'>Gala No. 1A,2A &amp; 3A,</p>
                    <p className='mb-0'>1st Floor Israni,</p>
                    <p className='mb-0'>Industrial Estate Penkar Pada,</p>
                    <p className='mb-0'>Mira Road (East)-401107</p>
                    <p className='mb-0'>
                      Mobile:{" "}
                      <a href='tel:9082813196' className='text-saawree'>
                        90828 13196
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-6 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='text-center'>
                  <BsFillGeoAltFill className='contact-us-icons' />
                  <div className='contact-wraper'>
                    <h5>Sale Office Address</h5>
                    <p className='mb-0'>25- Near Hanuman Mandir,</p>
                    <p className='mb-0'>Penkar Pada,</p>
                    <p className='mb-0'>Mira Road (East)-401107</p>
                    <p className='mb-0'>
                      Mobile:{" "}
                      <a href='tel:9988115477' className='text-saawree'>
                        99881 15477
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-4 col-lg-4 col-md-6 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='text-center'>
                  <BsEnvelopeFill className='contact-us-icons' />
                  <div className='contact-wraper'>
                    <h5>Contact</h5>
                    <p className='mb-0'>
                      <a
                        href='mailto:info@saawree.com'
                        className='text-saawree'
                      >
                        info@saawree.com
                      </a>
                    </p>
                    <p className='mb-0'>
                      <a
                        href='mailto:sales@saawree.com'
                        className='text-saawree'
                      >
                        sales@saawree.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 order-md-2 mb-3'>
            <div className='card h-100'>
              <div className='card-body'>
                <FormikProvider value={formik}>
                  <form onSubmit={formik.handleSubmit}>
                    <div className='form-group mb-2'>
                      <label htmlFor='name'>Name</label>
                      <Field
                        type='text'
                        className='form-control checkout-input'
                        placeholder='First Name'
                        name={"fullName"}
                      />
                      {formik.touched.fullName && formik.errors.fullName && (
                        <span className=' text-danger'>
                          {formik.errors.fullName}
                        </span>
                      )}
                    </div>
                    <div className='form-group mb-2'>
                      <label htmlFor='email'>Email</label>
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
                    <div className='form-group mb-2'>
                      <label htmlFor='contact'>Contact</label>
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

                    <div className='form-group mb-2'>
                      <label htmlFor='message'>Message</label>
                      <textarea
                        {...formik.getFieldProps("message")}
                        className='form-control'
                        name='message'
                        rows={5}
                        autoComplete='off'
                        disabled={formik.isSubmitting}
                      ></textarea>
                    </div>
                    <div className='text-right'>
                      <button type='submit' className='btn btn-saawree'>
                        Submit
                      </button>
                    </div>
                  </form>
                </FormikProvider>
              </div>
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 order-md-1 mb-3'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d965076.6982423303!2d72.866353!3d19.115075!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b1a03fe1e95b%3A0xa809cb6f42a1dc9e!2sSaawree!5e0!3m2!1sen!2sin!4v1736249530282!5m2!1sen!2sin'
              width='100%'
              height='450'
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
        <div className='text-center'>
          <h4>
            <strong>
              Saawree Jewellers, The Leading Imitation Jewellery Manufacturers
              In India
            </strong>
          </h4>
          <p>
            <i>An elegant piece of jewellery never fails to catch the eye!</i>
          </p>
          <p>
            Jewellery has a different significance for a woman and is much more
            than a small piece of beauty worn for personal adornment; it
            reflects who she is. Mangalmani Jewellers strives to give this
            emotion a voice via our fantastic collection of Imitation Jewellery
            Manufacturers &amp; Artificial Jewellery Manufacturers Online.
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
