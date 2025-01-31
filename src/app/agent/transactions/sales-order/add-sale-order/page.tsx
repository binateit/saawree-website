"use client";
import CustomSelect from "@/core/component/CustomSelect";
import * as Yup from "yup";
import { Field, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import {
  createSalesOrder,
  getCustomerDetailsForSOById,
  getCustomerList,
} from "@/core/requests/saleOrderRequests";
import {
  CreateSaleOrder,
  CreateSaleOrderItem,
  CreateSaleOrderRequestModel,
  CustomerAddressForSO,
  CustomerDetailforSOModel,
  CustomerListDropdown,
} from "@/core/models/saleOrderModel";
import { Product, SelectOptionProps } from "@/core/models/model";
import { format } from "date-fns";
import ProductSelection from "@/core/component/Products/ProductSelection";
import { useImmer } from "use-immer";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { camelize, formatCurrency } from "@/core/helpers/helperFunctions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProductSearchbar from "@/core/component/Products/ProductSearchbar";

const Page = () => {
  const [saleOrderItems, updateSaleOrderItems] = useImmer<
    CreateSaleOrderItem[]
  >([]);
  const navigate = useRouter();
  const [customerList, setCustomerList] = useState<SelectOptionProps[]>();
  const [customerData, setCustomerData] = useState<CustomerDetailforSOModel>();
  const [errorMessage, updateErrorMessage] = useState<string>("");
  const [shippingAddressOptions, setShippingAddressOptions] = useState<
    SelectOptionProps[]
  >([]);

  const [roundOff, setRoundOff] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const saleOrderSchema = Yup.object().shape({});
  const initialValues = {
    customerId: undefined,
    orderDate: format(new Date(), "yyyy-MM-dd"),
    shippingAddressId: undefined,
    notes: "",
    discountPercent: undefined,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: saleOrderSchema,
    onSubmit: async (
      formValues: CreateSaleOrder,
      { setFieldError, setSubmitting }
    ) => {
      setSubmitting(true);
      console.log(formValues);
      try {
        updateErrorMessage("");
        if (saleOrderItems.filter((item) => !item.isDeleted).length === 0) {
          updateErrorMessage("Alteast one product is required");
          window.scrollTo(0, 0);
          return;
        }
        if (
          saleOrderItems.filter(
            (item) => !item.isDeleted && item.productId == 0
          ).length > 0
        ) {
          updateErrorMessage("Select Valid Product");
          window.scrollTo(0, 0);

          return;
        }
        if (
          saleOrderItems.filter((item) => !item.isDeleted && item.quantity == 0)
            .length > 0
        ) {
          updateErrorMessage("Please ensure that the quantity cannot be zero");
          window.scrollTo(0, 0);

          return;
        }
        if (grandTotal <= 0) {
          updateErrorMessage(
            "Please ensure that the total amount is greater than or equal to zero."
          );
          window.scrollTo(0, 0);

          return;
        }

        const requestData: CreateSaleOrderRequestModel = {
          saleOrderTypeId: 1, // Replace with actual value
          customerId: formik.values.customerId as number, // Taken from Formik or relevant state
          orderDate: formik.values.orderDate as string, // Ensure date is in the correct format
          shippingAddressId: formik.values.shippingAddressId as number,
          notes: formik.values.notes || undefined,
          discountPercent: formik.values.discountPercent as number,
          itemList: saleOrderItems
            .filter((x) => x.isDeleted == false)
            .map((item) => ({
              productId: Number(item.productId), // Ensure productId is a number
              quantity: item.quantity ?? 0,
              productPrice: item.productPrice ?? 0,
              isDeleted: item.isDeleted || false,
            })), // Transform `saleOrderItems` to match API expectations
        };

        const result = await createSalesOrder(requestData);
        if (result.hasOwnProperty("succeeded") && result?.succeeded) {
          setSubmitting(true);
          toast.success("Sale order created successfully!");
          navigate.push("/agent/transactions/sales-order");
        } else {
          if (result.statusCode === 400) {
            result.propertyResults.map((error) =>
              setFieldError(camelize(error.propertyName), error.errorMessage)
            );
          }
          toast.error("An error occurred while saving the Sale order.");
        }
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  const { data: customer, isLoading: isCustomerloading } = useQuery({
    queryKey: ["getCustomersList"],
    queryFn: () => getCustomerList(),
  });

  useEffect(() => {
    if (customer) {
      const customerData = customer as CustomerListDropdown[];
      const customerArray: SelectOptionProps[] = [];
      customerData?.map((item: CustomerListDropdown) => {
        return customerArray.push({ value: item.id, label: item.name });
      });
      setCustomerList(customerArray);
    }
  }, [customer, isCustomerloading]);

  const onCustomerChange = (e: number) => {
    getCustomerDetailsForSOById(e).then((result: CustomerDetailforSOModel) => {
      setCustomerData(result);

      // Update other customer-related fields
      formik.setFieldValue("termId", result.termId);
      formik.setFieldValue("discountPercent", result.discountPercent);
      handleDiscountChange(result.discountPercent);

      // Update shipping address options
      const options =
        result.addressList?.map(
          ({ customerAddressId, displayAddress }: CustomerAddressForSO) => ({
            value: customerAddressId,
            label: displayAddress,
          })
        ) || [];
      setShippingAddressOptions(options);

      // Clear shipping address selection

      // Validate shipping address availability
      if (!result.addressList || result.addressList.length === 0) {
        updateErrorMessage("Shipping address is required");
      } else {
        formik.setFieldValue("shippingAddressId", options[0].value);
        updateErrorMessage("");
      }
    });
  };
  const getPriceForCustomer = (product: Product): number => {
    switch (customerData?.rateTypeId) {
      case 1:
        return product.spWholeSeller ?? 0;
      case 2:
        return product.spSemiWholeSeller ?? 0;
      default:
        return product.spRetail ?? 0;
    }
  };

  const onProductsChange = (product: Product, quantity: number = 1) => {
    updateSaleOrderItems((items) => {
      const existingItem = items.find((item) => item.productId === product.id);

      if (existingItem) {
        // Update existing item
        existingItem.quantity = (existingItem.quantity ?? 0) + quantity;

        const { productPrice, discountPercent } = existingItem;
        const totals = calculateItemTotals(
          productPrice ?? 0,
          existingItem.quantity,
          discountPercent ?? 0
        );

        Object.assign(existingItem, totals);
      } else {
        // Add a new item
        const productPrice = getPriceForCustomer(product);
        const discountPercent = formik.values.discountPercent ?? 0;
        const taxPercent = product.taxRateValue ?? 0;

        const totals = calculateItemTotals(
          productPrice,
          quantity,
          discountPercent
        );

        items.push({
          rowNumber: items.length,
          productId: product.id,
          productName: product.name,
          quantity: quantity,
          productPrice,
          discountPercent,
          taxPercent,
          isDeleted: false,
          ...totals,
        });
      }
    });
  };
  const handleDelete = (rowNumber: number) => {
    updateSaleOrderItems((draft) => {
      return draft.filter((item) => item.rowNumber !== rowNumber);
    });
  };

  const updateSaleOrderItem = (
    rowNumber: number,
    updates: Partial<CreateSaleOrderItem>
  ) => {
    updateSaleOrderItems((items) => {
      const item = items.find((t) => t.rowNumber === rowNumber);
      if (item) {
        Object.assign(item, updates);
      }
    });
  };

  const updateItemTotal = (rowNumber: number) => {
    updateSaleOrderItems((items) => {
      const item = items.find((t) => t.rowNumber === rowNumber);
      if (item) {
        const { productPrice, quantity, discountPercent } = item;

        const totals = calculateItemTotals(
          productPrice ?? 0,
          quantity ?? 0,
          discountPercent ?? 0
        );

        Object.assign(item, totals);
      }
    });
  };

  const calculateItemTotals = (
    unitPrice: number,
    quantity: number,
    discountPercent: number = 0
  ) => {
    const subTotal = parseFloat(
      ((unitPrice || 0) * (quantity || 0)).toFixed(2)
    );
    const discountAmount = parseFloat(
      ((subTotal * discountPercent) / 100).toFixed(2)
    );

    return {
      subTotal,
      discountAmount,
    };
  };

  const handleDiscountChange = (discountPercent: number) => {
    updateSaleOrderItems((items) =>
      items.map((item) => {
        const { productPrice, quantity } = item;

        const totals = calculateItemTotals(
          productPrice ?? 0,
          quantity ?? 0,
          discountPercent
        );

        return {
          ...item,
          ...totals,
          discountPercent,
        };
      })
    );
  };

  const unitPriceBody = (rowData: CreateSaleOrderItem) => {
    return (
      <InputNumber
        inputStyle={{ maxWidth: 100 }}
        value={rowData.productPrice}
        onValueChange={(e) => {
          const productPrice = e.value as number;
          updateSaleOrderItem(rowData.rowNumber, { productPrice });
          updateItemTotal(rowData.rowNumber);
        }}
        mode='currency'
        currency='INR'
        locale='en-IN'
      />
    );
  };

  const quantityBody = (rowData: CreateSaleOrderItem) => {
    return (
      <InputNumber
        inputStyle={{ maxWidth: 80 }}
        value={rowData.quantity}
        onValueChange={(e) => {
          const quantity = e.value as number;
          updateSaleOrderItem(rowData.rowNumber, { quantity });
          updateItemTotal(rowData.rowNumber);
        }}
      />
    );
  };

  const actionBody = (rowData: CreateSaleOrderItem) => {
    return (
      <BsTrash
        fontSize={20}
        cursor={"pointer"}
        onClick={() => {
          handleDelete(rowData.rowNumber);
        }}
      />
    );
  };

  useEffect(() => {
    let tempSubTotal = 0;
    let tempDiscount = 0;

    // Calculate totals from saleOrderItems
    saleOrderItems
      .filter((t) => !t.isDeleted)
      .forEach((item) => {
        tempSubTotal += item.subTotal ?? 0;
        tempDiscount += item.discountAmount ?? 0;
      });

    // Calculate totals from otherCharges

    const tempTotal = tempSubTotal - tempDiscount;
    const roundedTotal = Math.round(tempTotal);

    setSubTotal(tempSubTotal);
    setTotalDiscount(tempDiscount);
    setRoundOff(roundedTotal - tempTotal);
    setGrandTotal(roundedTotal);
  }, [saleOrderItems]);

  return (
    <>
      {errorMessage !== "" && <p>{errorMessage}</p>}
      <FormikProvider value={formik}>
        <form
          id='add_saleorder_form'
          className='form'
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div className='container'>
            <div className='card shadow mb-2'>
              <div className='card-header bg-white'>
                <div className='card-title'>
                  <h5>Order Details</h5>
                </div>
              </div>
              <div className='card-body'>
                <div className='row mb-3'>
                  <div className='col-xl-3 col-lg-3 col-md-3'>
                    <label>
                      Customer<span className='required'>*</span>
                    </label>
                  </div>
                  <div className='col-xl-9 col-lg-9 col-md-9'>
                    <Field
                      name={"customerId"}
                      className='search-category-dropdown'
                      options={customerList}
                      component={CustomSelect}
                      placeholder='customer'
                      onDropDownChange={(e: { value: number }) => {
                        formik.setFieldValue("customerId", e.value);
                        onCustomerChange(e.value);
                      }}
                    ></Field>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-xl-3 col-lg-3 col-md-3'></div>
                  <div className='col-xl-9 col-lg-9 col-md-9'>
                    <div className='row'>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                        <label className=''>Billing Address</label>
                        <div className='address-wraper'>
                          <p className='mb-0'>B107, Sai Sanman CHSL</p>
                          <p className='mb-0'>Guru Nanak Nagar</p>
                          <p className='mb-0'>Vasai West, 401202, India</p>
                          <p className='mb-0'>Phone: 8888782613</p>
                        </div>
                      </div>
                      <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                        <label className=''>Shipping Address</label>
                        <Field
                          className='form-select-solid'
                          options={shippingAddressOptions}
                          {...formik.getFieldProps("shippingAddressId")}
                          component={CustomSelect}
                          name='shippingAddressId'
                          selectedValue={formik.values.shippingAddressId}
                          onChange={(selected: { value: number }) =>
                            formik.setFieldValue(
                              "shippingAddressId",
                              selected?.value || null
                            )
                          }
                          formatOptionLabel={({ label }: { label: string }) => (
                            <div style={{ whiteSpace: "pre-line" }}>
                              {label}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row mb-3'>
                  <div className='col-xl-3 col-lg-3 col-md-3'>
                    <label>Order Date</label>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-6'>
                    {/* <Calendar  onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" /> */}
                    <p>{format(new Date(), "dd MMM yyyy")}</p>
                  </div>
                </div>
                {/* </div> */}
                <div className='row mb-3'>
                  <div className='col-xl-3 col-lg-3 col-md-3'>
                    <label>Discount Percentage</label>
                  </div>
                  <div className='col-xl-4 col-lg-4 col-md-6'>
                    {customerData?.discountPercent &&
                      `${customerData?.discountPercent} %`}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`card ${
                formik.values.customerId == undefined && "disabled"
              }`}
            >
              <div className='card-header bg-white'>
                <div className='card-title'>
                  <h5>Item Details</h5>
                </div>
              </div>
              <div className='card-body'>
                <ProductSearchbar onSelect={onProductsChange} />
              </div>
              <div className='card-body'>
                <ProductSelection onSelect={onProductsChange} />
                <div className='mt-4'>
                  <DataTable
                    value={saleOrderItems}
                    dataKey='id'
                    tableClassName='border'
                    tableStyle={{ minWidth: "50rem" }}
                    stripedRows
                  >
                    <Column
                      field='productName'
                      header='Product'
                      style={{ width: "40%" }}
                    ></Column>
                    <Column
                      field='quantity'
                      header='Quantity'
                      style={{ width: "10%" }}
                      body={quantityBody}
                    ></Column>
                    <Column
                      field='productPrice'
                      header='Unit Price'
                      style={{ width: "10%" }}
                      body={unitPriceBody}
                    ></Column>
                    <Column
                      field='discountAmount'
                      header='Discount'
                      style={{ width: "10%" }}
                      body={(rowData: CreateSaleOrderItem) =>
                        formatCurrency(rowData.discountAmount)
                      }
                    ></Column>
                    <Column
                      field='subTotal'
                      header='Sub Total'
                      style={{ width: "10%" }}
                      body={(rowData: CreateSaleOrderItem) =>
                        formatCurrency(rowData.subTotal)
                      }
                    ></Column>
                    <Column
                      field=''
                      header='Action'
                      style={{ width: "10%" }}
                      body={actionBody}
                    ></Column>
                  </DataTable>
                </div>
                <div className='row mt-4'>
                  <div className='col-xxl-6 col-lg-6 col-md-12 order-lg-2'>
                    <div className='bg-gray p-3'>
                      <div className='d-flex align-items-center justify-content-between border-bottom mb-2'>
                        <h6>Sub Total</h6>
                        <h6>{formatCurrency(subTotal)}</h6>
                      </div>

                      <div className='d-flex align-items-center justify-content-between'>
                        <h6>Discount</h6>
                        <h6>{formatCurrency(totalDiscount)}</h6>
                      </div>
                      <div className='d-flex align-items-center justify-content-between'>
                        <h6>Round Of</h6>
                        <h6>{formatCurrency(roundOff)}</h6>
                      </div>
                      <div className='d-flex align-items-center justify-content-between'>
                        <h6>Grand Total</h6>
                        <h6>{formatCurrency(grandTotal)}</h6>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-lg-6 col-md-12 order-lg-1'>
                    <label>Notes</label>
                    <textarea
                      {...formik.getFieldProps("notes")}
                      className='form-control'
                      name='notes'
                      rows={5}
                      autoComplete='off'
                      disabled={formik.isSubmitting}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='card-footer'>
                <div className='text-right'>
                  <button className='btn btn-light border mr-2'>Discart</button>
                  {/* <button className='btn btn-saawree btn-small'>Submit</button> */}
                  <button
                    type='submit'
                    className='btn btn-saawree btn-small'
                    disabled={
                      formik.isSubmitting || !formik.isValid || !formik.touched
                    }
                  >
                    <span className='indicator-label'>Submit</span>
                    {formik.isSubmitting && (
                      <span className='indicator-progress'>
                        Please wait...{" "}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormikProvider>
    </>
  );
};

export default Page;
