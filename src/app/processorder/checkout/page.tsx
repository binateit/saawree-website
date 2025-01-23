"use client";
import AddressModal from "@/core/component/modal/AddressModal";
import { CustomerAddress } from "@/core/models/customerModel";
import {
  getCustomerAddress,
  getCutsomerAddressById,
} from "@/core/requests/customerRoutes";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  setShipAddress: (id: number) => void;
  updateStep: (step: number) => void;
}

const CheckoutPage: FC<Props> = ({ setShipAddress, updateStep }) => {
  const { data: session } = useSession();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<CustomerAddress>();
  const [shipAddressId, setShipAddressId] = useState<number | null>(null);

  const router = useRouter();
  if (session?.user?.token === undefined) {
    router.push("/auth/login");
  }

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

  const { data: customerAddressList, isLoading: customerAddressLoading } =
    useQuery({
      queryKey: ["customerAddressList"],
      queryFn: () => getCustomerAddress(),
      refetchOnWindowFocus: false,
    });

  const orderCheckout = () => {
    if (shipAddressId) {
      setShipAddress(shipAddressId as number);
      updateStep(2);
      router.push("/processorder");
    } else {
      toast.error("Please select shipping address");
    }
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
  return (
    <div className='address-box'>
      <h3>Select a delivery address</h3>
      <div className='all-address'>
        {customerAddressList
          ?.filter((address) => address?.addressTypeId === 2)
          .map((address) => (
            <div className='address-list-item' key={address?.addressId}>
              <input
                type='radio'
                className='address-radio'
                id='add1'
                name='address'
                onChange={() => {
                  setShipAddressId(address?.customerAddressId as number);
                }}
              />
              <label className='address-label' htmlFor='add1'>
                <p className='select-add'>
                  {address?.displayAddress}{" "}
                  <div
                    onClick={() => {
                      onCustomerAddressChange(
                        address.customerAddressId as number
                      );
                    }}
                    className='add-link'
                  >
                    Edit Address
                  </div>
                </p>
              </label>
            </div>
          ))}
        <div className='add-new-address' onClick={addNewCustomerAdress}>
          <span data-toggle='modal' data-target='#add-address'>
            <i className='bi bi-plus'></i> Add new address
          </span>
        </div>

        <button
          className='btn-crt mt-4 d-none d-md-block'
          onClick={orderCheckout}
        >
          Continue with this address
        </button>
      </div>
      <AddressModal
        isModalOpen={isModalOpen}
        initialValues={editAddress as CustomerAddress}
        isEditMode={isEditMode}
        closeModal={closeModal}
      />
    </div>
  );
};

export default CheckoutPage;
