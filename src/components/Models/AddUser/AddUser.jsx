import React, { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Reset state when modal is opened
  useEffect(() => {
    if (isOpenAddUserModal) {
      setShowFinalMessage(false);
      setSearchChar("");
      setSelectedUser("");
      setUserData(alluserData); // Reset user data if needed
    }
  }, [isOpenAddUserModal, alluserData]);

  const handleUserData = async () => {
    const response = await allUsers();

    if (response.status === 400) {
      toast.error(response.error.message, { autoClose: 1500 });
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }, 2000);
    } else if (response.status === 200) {
      toast.success(response.data.message, { autoClose: 1500 });
      setAllUserData(response.data.users);
      setUserData(response.data.users);
    } else if (response.status === 500) {
      toast.error("Internal server error", { autoClose: 5000 });
    } else if (response.status === 404) {
      toast.error("URL is incorrect", { autoClose: 5000 });
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
    setIsLoading(true);

    const res = await AddUserToBoard({ email: user });
    if (res.status === 200) {
      toast.success("User added to board successfully!", { autoClose: 1500 });
      setShowFinalMessage(true);
      setSelectedUser(user);
    } else {
      toast.error("Failed to add user. Please try again.", { autoClose: 1500 });
    }
    setIsLoading(false);
  };

  const handleSelectUser = (email) => {
    setSelectedUser(email);
    setSearchChar(email);
    setUserData(alluserData);
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
        {!showFinalMessage ? (
          <>
            <h2 className={`open-sans poppins ${style.heading_text}`}>
              Add people to the board
            </h2>
            <div className="poppins">
              <input
                type="text"
                placeholder="Enter your Email"
                onClick={handleUserData}
                value={searchChar}
                onChange={handleUserSearch}
                className={style.inputfield}
                disabled={isLoading}
              />
              <div className={style.suggestionContainer}>
                {isOpenAddUserModal && !isLoading && (
                  <ul>
                    {userData.map((item, index) => (
                      <div
                        className={style.optiondiv}
                        key={index}
                        onClick={() => handleSelectUser(item.email)}
                      >
                        <li>{item.email}</li>
                        <li id={item.name}>ADD</li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className={style.finalMessage}>
            <p>
              <strong>{selectedUser}</strong> added to board
            </p>
          </div>
        )}

        {isLoading ? (
          <div className={style.loadingMessage}>Adding user...</div>
        ) : showFinalMessage ? (
          <div className={style.modal_buttonfinal}>
            <button
              onClick={() => {
                onRequestClose();
              }}
              className={`poppins ${style.btn_okay} ${style.btn_fonts}`}
            >
              Okay, got it!
            </button>
          </div>
        ) : (
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
              disabled={!selectedUser}
            >
              Add Email
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AddUser;
