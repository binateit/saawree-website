import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  isNavigating: boolean;
  cancelNavigation: () => void;
  confirmNavigation: () => void;
}
const ConfirmationChangesModal: FC<Props> = ({
  isNavigating,
  cancelNavigation,
  confirmNavigation,
}) => {
  return (
    <>
      <Modal show={isNavigating}>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className='text-center'>
            {" "}
            You have unsaved changes. Are you sure you want to leave this page?
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            className='btn btn-saawree-outline'
            onClick={() => {
              cancelNavigation();
            }}
          >
            Cancel
          </Button>
          <Button
            className='btn btn-saawree'
            variant='primary'
            onClick={() => {
              confirmNavigation();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmationChangesModal;
