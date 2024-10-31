import React from "react";
import Modal from "react-modal";
import style from "./DeleteTask.module.css";

Modal.setAppElement("#root");

const DeleteModel = ({ showDeleteModal, onRequestClose, handleDelete }) => {
    
  return (
    <Modal
      isOpen={showDeleteModal}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      className={style.modal_content}
      overlayClassName={style.modal_overlay}
    >
      <h2 className={`open-sans ${style.heading_text}`}>
        Are you sure you want to Delete?
      </h2>
      <div className={style.modal_buttons}>
        <button
          onClick={handleDelete}
          className={` poppins ${style.btn_logout} ${style.btn_fonts}`}
        >
          Yes, Delete
        </button>
        <button
          onClick={onRequestClose}
          className={` poppins ${style.btn_cancel} ${style.btn_fonts}`}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModel;
