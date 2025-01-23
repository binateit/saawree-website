import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";

import { toast } from "react-toastify";
import { Address, CustomerAddress } from "@/core/models/customerModel";
import { camelize, isNotEmpty } from "@/core/helpers/helperFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Country, SelectOptionProps, State } from "@/core/models/model";
import { getCountryList, getStateList } from "@/core/requests/requests";
import {
  createCustomerAddress,
  updateCustomerAddress,
} from "@/core/requests/customerRoutes";
import CustomSelect from "../CustomSelect";

interface Props {
  isModalOpen: boolean;
  isEditMode: boolean;
  initialValues: CustomerAddress;
  closeModal: () => void;
}

const AddressModal: React.FC<Props> = ({
  isModalOpen,
  isEditMode,
  initialValues,
  closeModal,
}) => {
  const [stateList, setStateList] = useState<SelectOptionProps[]>([]);
  const [countryList, setCountryList] = useState<SelectOptionProps[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number>();

  const addressSchema = Yup.object().shape({
    addressLine1: Yup.string().required("Please enter addressLine 1"),
    stateId: Yup.string().required("Please select state"),
    city: Yup.string().required("Please enter city"),
    phoneNumber: Yup.string()
      .matches(/^[7-9]\d{9}$/, {
        message: "Please enter valid phone number.",
        excludeEmptyString: false,
      })
      .required("Please enter Phone Number"),
    zipCode: Yup.string()
      .required("Zip code is required")
      .matches(/^\d{6}$/, "Zip code must be numeric and exactly 6 digits"),
  });

  const editValues = {
    addressLine1: initialValues?.address?.addressLine1,
    addressLine2: initialValues?.address?.addressLine2,
    countryId: initialValues?.address?.countryId,
    city: initialValues?.address?.city,
    stateId: initialValues?.address?.stateId,
    zipCode: initialValues?.address?.zipCode,
    addressTypeId: initialValues?.addressTypeId,
    phoneNumber: initialValues?.address?.phoneNumber,
  };

  const queryClient = useQueryClient();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editValues,
    validationSchema: addressSchema,

    onSubmit: async (formValues, { setFieldError, setSubmitting }) => {
      const addressArray: Address = {
        addressId: initialValues?.addressId,
        addressLine1: formValues.addressLine1 as string,
        addressLine2: formValues.addressLine2 as string,
        city: formValues.city as string,
        countryId: formValues.countryId,
        stateId: formValues.stateId,
        zipCode: formValues.zipCode as string,
        phoneNumber: formValues.phoneNumber as string,
      };

      setSubmitting(true);
      try {
        let result;
        debugger;
        if (isNotEmpty(initialValues?.id) && isEditMode) {
          const updateAddressPayload = {
            customerAddressId: initialValues?.id as number,
            addressTypeId: initialValues?.addressTypeId as number,
            address: addressArray,
          };

          let newAddress = updateAddressPayload?.address;
          newAddress.stateName = stateList.find(
            (x) => x.value === newAddress.stateId
          )?.label;
          newAddress.countryName = countryList.find(
            (x) => x.value === newAddress.countryId
          )?.label;
          newAddress.addressId = initialValues?.address?.addressId as number;

          result = await updateCustomerAddress(updateAddressPayload);

          if (result.data.succeeded) {
            setSubmitting(true);
            toast.success("Customer edited updated successfully!");
            closeModal();
            queryClient.invalidateQueries({
              queryKey: ["customerAddressList"],
            });
          } else {
            if (result.statusCode === 400) {
              result.propertyResults.forEach((error: any) =>
                setFieldError(camelize(error.propertyName), error.errorMessage)
              );
              toast.error(result.exception);
            }
          }
        } else {
          const createAddressPayload = {
            addressType: 3,
            address: addressArray,
            isDefault: false,
          };

          let newAddress = createAddressPayload?.address;
          newAddress.stateName = stateList.find(
            (x) => x.value === newAddress.stateId
          )?.label;
          newAddress.countryName = countryList.find(
            (x) => x.value === newAddress.countryId
          )?.label;

          result = await createCustomerAddress(createAddressPayload);

          if (result.data.succeeded) {
            setSubmitting(true);
            toast.success("New address created successfully.");
            closeModal();
            formik.resetForm();
            queryClient.invalidateQueries({
              queryKey: ["customerAddressList"],
            });
          } else {
            if (result.statusCode === 400) {
              result.propertyResults.forEach((error) =>
                setFieldError(camelize(error.propertyName), error.errorMessage)
              );
            }
          }
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
    let stateResult: any;
    let countryResult: any;
    if (states) {
      stateResult = states as State[];
      let stateArray: any[] = [];
      stateResult.map((item: any) => {
        return stateArray.push({ value: item.id, label: item.name });
      });
      setStateList(stateArray);
    }

    if (country) {
      countryResult = country as Country[];
      let countryArray: any[] = [];
      countryResult?.map((item: any) => {
        return countryArray.push({ value: item.id, label: item.name });
      });
      setCountryList(countryArray);
    }
  }, [states, country]);

  return (
    <FormikProvider value={formik}>
      <Modal show={isModalOpen}>
        <Modal.Header>
          <Modal.Title>
            {isEditMode ? "Edit Address" : "Add New Address"}
          </Modal.Title>
          <span onClick={closeModal} style={{ cursor: "pointer" }}>
            X
          </span>
        </Modal.Header>

        <form
          className='form fv-plugins-bootstrap5 fv-plugins-framework'
          onSubmit={formik.handleSubmit}
          noValidate
          id='kt_modal_new_address_form'
        >
          <Modal.Body>
            <div
              className='scroll-y me-n7 pe-7'
              id='kt_modal_new_address_scroll'
            >
              <div className='d-flex flex-column mb-2 fv-row fv-plugins-icon-container '>
                <label className='required fs-5 fw-semibold mb-2'>
                  Address Line 1
                </label>

                <Field
                  type={"text"}
                  className='form-control form-control-solid ms-2'
                  {...formik.getFieldProps("addressLine1")}
                  name='addressLine1'
                />
                {formik.touched.addressLine1 && formik.errors.addressLine1 && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert' className='text-danger'>
                        {formik.errors.addressLine1}
                      </span>
                    </div>
                  </div>
                )}

                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>

              <div className='d-flex flex-column mb-2 fv-row fv-plugins-icon-container'>
                <label className=' fs-5 fw-semibold mb-2'>Address Line 2</label>

                <Field
                  className='form-control form-control-solid ms-2'
                  type='text'
                  {...formik.getFieldProps("addressLine2")}
                  name='addressLine2'
                />

                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>
              <div className='d-flex flex-column mb-2 fv-row fv-plugins-icon-container'>
                <label className='required fs-5 fw-semibold mb-2'>
                  Country
                </label>

                <Field
                  name={"countryId"}
                  className='search-category-dropdown'
                  options={countryList}
                  component={CustomSelect}
                  placeholder='country'
                  onDropDownChange={(e: any) => {
                    setSelectedCountry(e.value);
                    formik.setFieldValue("countryId", e.value);
                  }}
                ></Field>
                {formik.touched.countryId && formik.errors.countryId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert' className='text-danger'>
                        {formik.errors.countryId}
                      </span>
                    </div>
                  </div>
                )}

                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>

              <div className='d-flex flex-column mb-2 fv-row fv-plugins-icon-container'>
                <label className='required fs-5 fw-semibold mb-2'>State</label>

                <Field
                  className='form-select-solid'
                  options={stateList}
                  component={CustomSelect}
                  placeholder='state'
                  name={"stateId"}
                ></Field>
                {formik.touched.stateId && formik.errors.stateId && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert' className='text-danger'>
                        {formik.errors.stateId}
                      </span>
                    </div>
                  </div>
                )}

                <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
              </div>

              <div className='row g-9 mb-2'>
                <div className='col-md-6 fv-row fv-plugins-icon-container'>
                  <label className='required fs-5 fw-semibold mb-2'>City</label>

                  <Field
                    type={"text"}
                    className='form-control form-control-solid ms-2'
                    {...formik.getFieldProps("city")}
                    name='city'
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {formik.errors.city}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
                </div>

                <div className='col-md-6 fv-row fv-plugins-icon-container'>
                  <label className='fs-5 fw-semibold mb-2'>Zip Code</label>

                  <Field
                    type={"text"}
                    className='form-control form-control-solid ms-2'
                    {...formik.getFieldProps("zipCode")}
                    name='zipCode'
                  />
                  {formik.touched.zipCode && formik.errors.zipCode && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {formik.errors.zipCode}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
                </div>
              </div>

              <div className='row g-9 mb-2'>
                <div className='col-md-6 fv-row fv-plugins-icon-container'>
                  <label className='required fs-5 fw-semibold mb-2'>
                    Phone Number
                  </label>

                  <Field
                    type={"text"}
                    className='form-control form-control-solid ms-2'
                    {...formik.getFieldProps("phoneNumber")}
                    name='phoneNumber'
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>
                          {formik.errors.phoneNumber}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className='fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback' />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              //data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Discard
            </Button>
            <Button
              variant='primary'
              type='submit'
              disabled={
                formik.isSubmitting || !formik.isValid || !formik.touched
              }
            >
              Save
              {formik.isSubmitting && (
                <span className='indicator-progress'>
                  Please wait...{" "}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </FormikProvider>
  );
};

export default AddressModal;
