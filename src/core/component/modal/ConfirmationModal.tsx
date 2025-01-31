import React, { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  addressToDelete: number;
  onConfirm: (addressId: number) => void;
  setShowConfirmationModal: (state: boolean) => void;
}
const ConfirmationModal: FC<Props> = ({
  onConfirm,
  addressToDelete,
  setShowConfirmationModal,
}) => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    setShowConfirmationModal(false);
  };

  const handleConfirm = () => {
    onConfirm(addressToDelete);
  };

  return (
    <>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
          <span onClick={closeModal} style={{ cursor: "pointer" }}>
            X
          </span>
        </Modal.Header>
        <Modal.Body>
          <h5 className='text-center'>Are you sure you want to delete ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            className='btn btn-saawree-outline'
            onClick={() => {
              handleConfirm();
            }}
          >
            Yes
          </Button>
          <Button
            className='btn btn-saawree'
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
