import React, { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  addressToDelete: number;
  onConfirm: (addressId: number) => void;
}
const ConfirmationModal: FC<Props> = ({ onConfirm, addressToDelete }) => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    onConfirm(addressToDelete);
  };

  return (
    <>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className='text-center'>Are you sure you want to delete ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              handleConfirm();
            }}
          >
            Yes
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              closeModal();
            }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
