import React from "react";
import Modal from "react-modal";
import style from "./Logout.module.css";

// Set the root element for the modal
Modal.setAppElement("#root");

const LogoutModal = ({ isOpen, onRequestClose, handleLogout }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Logout Confirmation"
      className={style.modal_content}
      overlayClassName={style.modal_overlay}
    >
      <h2 className={`open-sans ${style.heading_text}`}>Are you sure you want to log out?</h2>
      <div className={style.modal_buttons}>
        <button
          onClick={handleLogout}
          className={` poppins ${style.btn_logout} ${style.btn_fonts}`}
        >
          Yes, Logout
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

export default LogoutModal;
