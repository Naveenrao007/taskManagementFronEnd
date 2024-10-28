import React, { useState } from "react";
import Modal from "react-modal";
import style from "./AddUser.module.css";
import { allUsers } from "../../../Service/GetAllUser";
import { toast } from "react-toastify";
import AddUserToBoard from "../../../Service/AddUserToBoard";
Modal.setAppElement("#root");

const AddUser = ({ isOpenAddUserModal, onRequestClose, handleAddUser }) => {
  const [alluserData, setAllUserData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchChar, setSearchChar] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const handleUserData = async () => {
    const response = await allUsers();
    console.log(response);

    if (response.status === 400) {
      toast.error(response.error.message, {
        autoClose: 1500,
      });

      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }, 2000);
    } else if (response.status === 200) {
      toast.success(response.data.message, {
        autoClose: 1500,
      });

      setAllUserData(response.data.users);
      setUserData(response.data.users);
    } else if (response.status === 500) {
      toast.error("Internal server error", {
        autoClose: 5000,
      });
    } else if (response.status === 404) {
      toast.error("Url is incorrect", {
        autoClose: 5000,
      });
    }
  };

  const handleUserSearch = (e) => {
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

  const handleAddUserToBoard = async (user) => {
    const res = await AddUserToBoard(user);
  };
  const handleSelectUser = (email) => {
    setSelectedUser(email);
    setSearchChar(email); // Populate input with selected email
    setUserData(alluserData); // Optionally reset the user data if needed
  };

  return (
    <div>
      <Modal
        isOpen={isOpenAddUserModal}
        onRequestClose={onRequestClose}
        contentLabel="Add people to the board"
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
              placeholder="Enter your Email"
              onClick={handleUserData}
              value={searchChar}
              onChange={handleUserSearch}
              className={style.inputfield}
            />
          </div>

          <div className={style.suggestionContainer}>
            {isOpenAddUserModal && (
              <ul>
                {userData.map((item, index) => (
                  <div
                    className={style.optiondiv}
                    key={index}
                    onClick={() => handleSelectUser(item.email)} // Use the new handler
                  >
                    <li>{item.email}</li>
                    <li id={item.name}>ADD</li>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={style.modal_buttons}>
          <button
            onClick={onRequestClose}
            className={`poppins ${style.btn_cancel} ${style.btn_fonts}`}
          >
            Cancel
          </button>
          <button
            onClick={() => handleAddUserToBoard(selectedUser)}
            className={`poppins ${style.btn_logout} ${style.btn_fonts}`}
          >
            Add Email
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddUser;
