import React from 'react';
import style from "./Logout.module.css"

const LogoutModal = ({ show, handleClose, handleLogout }) => {
  if (!show) return null;

  return (
    <div className={style.modal_container}>
      <div className={style.modal_content}>
        <h2>Are you sure you want to log out?</h2>
        <div className={style.modal_buttons}>
          <button onClick={handleClose} className={style.btn_cancel}>
            Cancel
          </button>
          <button onClick={handleLogout} className={style.btn_logout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
