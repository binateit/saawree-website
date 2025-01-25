"use client";
import React, { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}
const CustomDateSelectModal: FC<Props> = ({ isModalOpen, closeModal }) => {
  const [customDate, setCustomDate] = useState({ from: "", end: "" });

  return (
    <div className='modal-dialog modal-dialog-centered' role='document'>
      <Modal
        show={isModalOpen}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title>Select Date Range</Modal.Title>
          <span onClick={closeModal} style={{ cursor: "pointer" }}>
            X
          </span>
        </Modal.Header>

        <Modal.Body>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-2'>
              <label className='mb-1'>From</label>
              <input
                type='date'
                className='form-control'
                placeholder='From'
                onChange={(e) =>
                  setCustomDate({ ...customDate, from: e.target.value })
                }
              />
            </div>
            <div className='col-xl-6 col-lg-6 col-md-12 mb-2'>
              <label className='mb-1'>To</label>
              <input
                type='date'
                className='form-control'
                placeholder='From'
                onChange={(e) =>
                  setCustomDate({ ...customDate, end: e.target.value })
                }
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button type='button' className='btn btn-saawree'>
            Search
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomDateSelectModal;
