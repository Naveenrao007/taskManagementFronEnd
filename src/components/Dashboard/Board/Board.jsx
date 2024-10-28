import React, { useState, useEffect, useRef } from "react";
import style from "./Board.module.css";
import Backlog from "../Backlog/Backlog";
import Todo from "../Todo/Todo";
import Inprogress from "../Inprogress/Inprogress";
import Peopleimg from "../../../assets/Icons/peoples.png";
import Dropdownimg from "../../../assets/Icons/dropdown.png";
import Done from "../Done/Done";
import getTodayDate from "../../../Service/Calander";
import AddUser from "../../Models/AddUser/Adduser";
import { useOutletContext } from "react-router-dom";

function Board() {
  const [isOpen, setOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState("today");
  const dropdownRef = useRef(null);
  const { dashboardData } = useOutletContext();
  console.log(dashboardData);
  
  const timeFilter = {
    today: "Today",
    thisweek: "This Week",
    thismonth: "This Month",
  };
  const timePeriodFormatted = timeFilter[timePeriod];
  const handleDropdown = () => {
    setOpen((prev) => !prev);
  };
  const todayDate = getTodayDate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  const [isOpenAddUserModal, setisOpenAddUserModal]  = useState(false)
  const handleAddUser = (e)=>{
    console.log(e.target.value);
    
  }


  return (
    <div>
      <header className={`${style.boardheader}`}>
        <div className="flexdr jcsb">
          <p className={`${style.name}`}>Welcome! {dashboardData.userName} </p>
          <p className={`${style.date}`}>{todayDate}</p>
        </div>
        <div className="flexdr jcsb">
          <div className="flexdr alignItmC gap1rem">
            <div className={`${style.heading}`}>Board</div>
            <div className="flexdr gap10px" onClick={() => setisOpenAddUserModal(true)}>
              <div>
                <img src={Peopleimg} alt="" />
              </div>
              <p className="font14px fw500 grayColor">Add people</p>
            </div>
          </div>
          <div className="">
            <div className="flexdr cp gap1rem" onClick={handleDropdown}>
              <p>{timePeriodFormatted}</p>
              <div>
                <img src={Dropdownimg} alt="dropdownImg" />
              </div>
            </div>
            {isOpen && (
              <div className={`${style.dropdownContainer}`} ref={dropdownRef}>
                <ul>
                  <li
                    className={`cp ${style.listOption}`}
                    onClick={() => {
                      setTimePeriod("today");
                      setOpen(false);
                    }}
                  >
                    Today
                  </li>
                  <li
                    className={`cp ${style.listOption}`}
                    onClick={() => {
                      setTimePeriod("thisweek");
                      setOpen(false);
                    }}
                  >
                    This week
                  </li>
                  <li
                    className={`cp ${style.listOption}`}
                    onClick={() => {
                      setTimePeriod("thismonth");
                      setOpen(false);
                    }}
                  >
                    This month
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className={` ${style.gridcontainer}`}>
        <div className={`${style.gridcontent}`}>
          <Backlog />
        </div>
        <div className={`${style.gridcontent}`}>
          <Todo />
        </div>
        <div className={`${style.gridcontent}`}>
          <Inprogress />
        </div>
        <div className={`${style.gridcontent}`}>
          <Done />
        </div>
      </div>

      <AddUser
        isOpenAddUserModal={isOpenAddUserModal}
        onRequestClose={() => setisOpenAddUserModal(false)}
        handleAddUser={handleAddUser}
      />
      
    </div>
  );
}

export default Board;
