import React, { useState } from "react";
import Modal from "react-modal";
import style from "./AddUser.module.css";
import { allUsers } from "../../../Service/GetAllUser";
Modal.setAppElement("#root");

const AddUser = ({ isOpen, onRequestClose, handleAddUser }) => {
  const [alluserData, setAllUserData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchChar, setSearchChar] = useState("");
  const [selectedUser, setselectedUser] = useState("");
  const handleuserdata = async () => {
    const response = await allUsers();
    if (response) {
      const data = response.data.users;
      setAllUserData(data);
      setUserData(data);
    }
  };
  const handleuserSearch = async (e) => {
    const searchChar = e.target.value;
    setSearchChar(searchChar);

    if (searchChar === "") {
      setUserData(alluserData);
    } else {
      const filteredUsers = alluserData.filter((user) =>
        user.email.toLowerCase().includes(searchChar.toLowerCase())
      );
      setUserData(filteredUsers);
    }
  };
  return (
    <Modal
      isOpenNew={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Logout Confirmation"
      className={style.modal_content}
      overlayClassName={style.modal_overlay}
    >
      <h2 className={`open-sans poppins ${style.heading_text}`}>
        Add people to the board
      </h2>
      <div className="poppins">
        <div>
          <input
            type="text"
            placeholder="Enter your Email "
            onClick={handleuserdata}
            value={selectedUser}
            onChange={handleuserSearch}
            className={style.inputfield}
          />
        </div>

        <div className={style.suggestionContainer}>
          <ul>
            {userData.map((item, index) => {
              return (
                <div
                  className={`${style.optiondiv}`}
                  key={index}
                  onClick={() => setselectedUser(item.email)}
                >
                  <li>{item.email}</li>
                  <li id={item.name}>ADD</li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={style.modal_buttons}>
        <button
          onClick={onRequestClose}
          className={` poppins ${style.btn_cancel} ${style.btn_fonts}`}
        >
          Cancel
        </button>
        <button
          onClick={handleAddUser}
          className={` poppins ${style.btn_logout} ${style.btn_fonts}`}
        >
          Add Email
        </button>
      </div>
    </Modal>
  );
};

export default AddUser;
