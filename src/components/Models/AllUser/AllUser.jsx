import React, { useState, useEffect } from "react";
import style from "./AllUser.module.css";
import { allUsers } from "../../../Service/GetAllUser";

const AllUsesr = ({ onAssignUser }) => {
  const [allEmails, setAllEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await allUsers();
        if (response.status === 200) {
          setAllEmails(response.data.users.map((user) => user.email));
          setFilteredEmails(response.data.users.map((user) => user.email));
        }
      } catch (error) {
        console.error("Failed to fetch emails", error);
      }
    };
    fetchEmails();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredEmails(
      allEmails.filter((email) =>
        email.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowDropdown(true);
  };

  const handleSelectEmail = (email) => {
    setSearchTerm(email);
    setShowDropdown(false); 
    onAssignUser(email); 
  };

  return (
    <div className={style.dropdownContainer}>
      <input
        type="text"
        placeholder="Select or search for an email"
        value={searchTerm}
        onClick={() => setShowDropdown(!showDropdown)}
        onChange={handleSearchChange}
        className={style.inputField}
      />

      {showDropdown && (
        <div className={style.dropdownList}>
          {filteredEmails.length > 0 ? (
            filteredEmails.map((email, index) => (
              <div 
                key={index}
                onClick={() => handleSelectEmail(email)}
                className={`flex jcsb ${style.dropdownItem}`}
              > <p className={`open-sans ${style.userIcon}`}>Ak</p>
                <p>{email}</p>
                <p className={style.assignBtn}>Assign</p>
              </div>
            ))
          ) : (
            <div className={style.noResults}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllUsesr;
