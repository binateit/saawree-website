"use client";
import * as Yup from "yup";
import {
  getCustomerAccountingDetails,
  updateCustomerAccounting,
} from "@/core/requests/customerRoutes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { CustomerAccounting } from "@/core/models/customerModel";
import { toast } from "react-toastify";
import CustomSelect from "@/core/component/CustomSelect";

const Page = () => {
  const [editMode, setEditMode] = useState<boolean>();
  const editCustomerSchema = Yup.object().shape({
    lstNumber: Yup.string().nullable(),
    cstNumber: Yup.string().nullable(),
    gstNumber: Yup.string().nullable(),
    panNumber: Yup.string().nullable(),
    aadharNumber: Yup.string().nullable(),
    gstRegistrationTypeId: Yup.string().nullable(),
    gstRegistrationTypeName: Yup.string().nullable(),
  });
  const gstRegisteredTypeOptions = [
    { value: 1, label: "RegisteredBusinessRegular" },
    { value: 2, label: "RegisteredBusinessComposition" },
    { value: 3, label: "UnregisteredBusiness" },
    { value: 4, label: "Consumer" },
    { value: 5, label: "Overseas" },
    { value: 6, label: "SpecialEconomicZoneSEZ" },
    { value: 7, label: "DeemedExport" },
    { value: 8, label: "TaxDeductor" },
    { value: 9, label: "SEZDeveloper" },
  ];
  const { data: customerAcounting, refetch: customerAccountingRefetch } =
    useQuery({
      queryKey: ["getCustomerAccounting"],
      queryFn: () => getCustomerAccountingDetails(),
    });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lstNumber: customerAcounting?.lstNumber,
      cstNumber: customerAcounting?.cstNumber,
      gstNumber: customerAcounting?.gstNumber,
      panNumber: customerAcounting?.panNumber,
      aadharNumber: customerAcounting?.aadharNumber,
      gstRegistrationTypeId: customerAcounting?.gstRegistrationTypeId,
      gstRegistrationTypeName: customerAcounting?.gstRegistrationTypeName,
    },
    validationSchema: editCustomerSchema,

    onSubmit: async (formValues, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const profilePayload: CustomerAccounting = {
          lstNumber: formValues?.lstNumber || undefined,
          cstNumber: formValues?.cstNumber || undefined,
          gstNumber: formValues?.gstNumber || undefined,
          panNumber: formValues?.panNumber || undefined,
          aadharNumber: formValues?.aadharNumber || undefined,
          gstRegistrationTypeId: formValues?.gstRegistrationTypeId || undefined,
          gstRegistrationTypeName: gstRegisteredTypeOptions?.filter(
            (type) => type?.value === formValues?.gstRegistrationTypeId
          )?.[0]?.label,
        };

        const result = await updateCustomerAccounting(profilePayload);
        if (result.succeeded) {
          toast.success("Customer is updated successfully.");
          customerAccountingRefetch();
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  });
  console.log(formik?.errors);
  return (
    <>
      {!editMode ? (
        <div className='card shadow  detail-box'>
          <div className='card-header bg-white justify-content-between'>
            <h5 className='mb-0'>Accounting Details</h5>
            <button
              className='btn btn-saawree open-edit-form'
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              Edit Account
            </button>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    LST Number :
                  </label>
                  <span className='ml-xl-2'>
                    {customerAcounting?.lstNumber !== null
                      ? customerAcounting?.lstNumber
                      : "Not Available"}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    CST Number :
                  </label>
                  <span className='ml-xl-2'>
                    {" "}
                    {customerAcounting?.cstNumber !== null
                      ? customerAcounting?.cstNumber
                      : "Not Available"}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    GST Number :
                  </label>
                  <span className='ml-xl-2'>
                    {" "}
                    {customerAcounting?.gstNumber !== null
                      ? customerAcounting?.gstNumber
                      : "Not Available"}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Pan Number :
                  </label>
                  <span className='ml-xl-2'>
                    {" "}
                    {customerAcounting?.panNumber !== null
                      ? customerAcounting?.panNumber
                      : "Not Available"}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    Aadhar card Number :
                  </label>
                  <span className='ml-xl-2'>
                    {" "}
                    {customerAcounting?.aadharNumber !== null
                      ? customerAcounting?.aadharNumber
                      : "Not Available"}
                  </span>
                </div>
              </div>
              <div className='col-xl-6 col-lg-12 col-md-12 mb-3'>
                <div className='profile-data d-flex'>
                  <label className='font-weight-bold custome-lg-label mb-0'>
                    GST Registered Type :
                  </label>
                  <span className='ml-xl-2'>
                    {" "}
                    {customerAcounting?.gstRegistrationTypeName !== null
                      ? customerAcounting?.gstRegistrationTypeName
                      : "Not Available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='card shadow edit-form'>
          <div className='card-header bg-white'>
            <h5>Edit Account Details</h5>
          </div>
          <FormikProvider value={formik}>
            <form
              className='account-dtls'
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className='card-body'>
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>LST Number</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("lstNumber")}
                        name='lstNumber'
                        placeholder='LST Number'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>CST Numbere</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("cstNumber")}
                        name='cstNumber'
                        placeholder='CST Numbere'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>GST Number</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("gstNumber")}
                        name='gstNumber'
                        placeholder='GST Number'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Pan Number</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("panNumber")}
                        name='panNumber'
                        placeholder='Pan Number'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>Aadhar card Number</label>
                      <Field
                        type='text'
                        className='form-control'
                        {...formik.getFieldProps("aadharNumber")}
                        name='aadharNumber'
                        placeholder='Aadhar card Number'
                      />
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 mb-3'>
                      <label htmlFor=''>GST Registered Type</label>
                      <Field
                        name={"gstRegistrationTypeId"}
                        className='search-category-dropdown'
                        options={gstRegisteredTypeOptions}
                        component={CustomSelect}
                        placeholder='GST Registration Type'
                        onDropDownChange={(e: { value: number }) => {
                          formik.setFieldValue(
                            "gstRegistrationTypeId",
                            e.value
                          );
                        }}
                      ></Field>
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

export default Page;
