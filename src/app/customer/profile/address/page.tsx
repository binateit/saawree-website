"use client";
import AddressModal from "@/core/component/modal/AddressModal";
import ConfirmationModal from "@/core/component/modal/ConfirmationModal";
import { CustomerAddress } from "@/core/models/customerModel";
import { Result } from "@/core/models/model";
import {
  deleteCustomerAddress,
  getCustomerAddress,
  getCutsomerAddressById,
} from "@/core/requests/customerRoutes";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<CustomerAddress>();
  const [addressToDelete, setAddressToDelete] = useState<number>();
  const [refetch, setRefetch] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { data: customerAddressList, isLoading: customerAddressLoading } =
    useQuery({
      queryKey: ["customerAddressList"],
      queryFn: () => getCustomerAddress(),
      refetchOnWindowFocus: false,
    });
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onCustomerAddressChange = (e: number) => {
    getCutsomerAddressById(e).then((v) => {
      const result = v;
      if (result) {
        setEditAddress(result as CustomerAddress);
        setIsEditMode(true);
        openModal();
      } else {
        console.error("Invalid address data:", result);
      }
    });
    setIsEditMode(true);
    openModal();
  };

  const addNewCustomerAdress = () => {
    setEditAddress({
      address: {
        addressLine1: "",
        addressLine2: "",
        countryId: undefined,
        stateId: undefined,
        city: "",
        zipCode: "",
        phoneNumber: "",
      },
    });
    setIsEditMode(false);
    setModalOpen(true);
  };

  const handleDeleteButtonClick = (e: number) => {
    setAddressToDelete(e);
    setShowConfirmationModal(true);
  };

  const handleConfirm = async (e: number) => {
    try {
      let result: Result;
      result = (await deleteCustomerAddress(e)) as Result;
      if (result.succeeded) {
        toast.success("Address deleted successfully.");
        setRefetch(true);
      } else {
        if (result.statusCode === 400) {
          toast.error(result.exception);
        } else {
          toast.error("A Default address cannot be deleted.");
        }
      }
    } catch (ex) {
      console.error(ex);
    }
    setShowConfirmationModal(false);
  };

  return (
    <>
      <div className='card shadow detail-box'>
        <div className='card-header bg-white justify-content-between'>
          <h5 className='mb-0'>Address</h5>
        </div>
        <div className='card-body'>
          <div className='row'>
            {customerAddressList
              ?.filter((type) => type?.addressTypeId !== 0)
              .map((address) => (
                <div className='col-xl-6 col-lg-6 col-md-12 mb-3'>
                  <div className='p-2 profile-address mb-2'>
                    <h6 className='mb-2'>{`${address?.addressTypeName} Address`}</h6>
                    <p className='mb-2'>{address?.displayAddress}</p>
                  </div>
                  <div className='text-right'>
                    <div
                      className='btn btn-saawree-outline'
                      onClick={() => {
                        onCustomerAddressChange(
                          address.customerAddressId as number
                        );
                      }}
                    >
                      Edit
                    </div>
                    <button
                      className='btn btn-saawree-outline ml-1'
                      onClick={() => {
                        handleDeleteButtonClick(
                          address?.customerAddressId as number
                        );
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='card-footer text-right'>
          <div className='btn btn-saawree' onClick={addNewCustomerAdress}>
            Add new address
          </div>
        </div>
      </div>
      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={() => handleConfirm(addressToDelete as number)}
          addressToDelete={addressToDelete as number}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}
      <AddressModal
        isModalOpen={isModalOpen}
        initialValues={editAddress as CustomerAddress}
        isEditMode={isEditMode}
        closeModal={closeModal}
      />
    </>
  );
};

export default page;
