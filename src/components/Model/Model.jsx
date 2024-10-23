import React from "react";
import style from "./Modal.module.css";

function CommonModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "Do you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  if (!isOpen) return null; 

  return (
    <div className={style.modalBackdrop}>
      <div className={style.modalContent}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={style.modalActions}>
          <button onClick={onClose} className={style.cancelBtn}>
            {cancelText}
          </button>
          <button onClick={onConfirm} className={style.confirmBtn}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommonModal;
