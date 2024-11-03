import React, { useState, useEffect, useRef } from "react";
import style from "./Board.module.css";
import Backlog from "../Backlog/Backlog";
import Todo from "../Todo/Todo";
import Inprogress from "../Inprogress/Inprogress";
import Peopleimg from "../../../assets/Icons/peoples.png";
import Dropdownimg from "../../../assets/Icons/dropdown.png";
import Done from "../Done/Done";
import getTodayDate from "../../../Service/Calander";
import AddUser from "../../Models/AddUser/AddUser";
import { useOutletContext } from "react-router-dom";
import getBoardData from "../../../Service/BoardData";
import Loading from "../../Loading/Loading";

function Board() {
  const [isOpen, setOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState("thisweek");
  const dropdownRef = useRef(null);
  const { dashboardData, updateDashboardData } = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const timeFilter = {
    thisweek: "This Week",
    thismonth: "This Month",
    thisyear: "This Year",
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
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getBoardData(timePeriod);

      if (res.status === 400) {
        toast.error(res.data.message, {
          autoClose: 1800,
          transition: Bounce,
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else if (res.status === 200) {
        updateDashboardData(res.data.data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timePeriod]);

  const [isOpenAddUserModal, setisOpenAddUserModal] = useState(false);
  const handleAddUser = (e) => {
    console.log(e.target.value);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <header className={`${style.boardheader}`}>
        <div className="flexdr jcsb">
          <p className={`${style.name}`}>Welcome! {dashboardData.userName} </p>
          <p className={`${style.date}`}>{todayDate}</p>
        </div>
        <div className="flexdr jcsb">
          <div className="flexdr alignItmC gap1rem">
            <div className={`${style.heading}`}>Board</div>
            <div
              className="flexdr gap10px"
              onClick={() => setisOpenAddUserModal(true)}
            >
              <div>
                <img src={Peopleimg} alt="" />
              </div>
              <p className="font14px fw500 grayColor">Add people</p>
            </div>
          </div>
          <div className="">
            <div className="flexdr cp gap1rem" onClick={handleDropdown}>
              <p className={style.timePeriod}>{timePeriodFormatted}</p>
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
                  <li
                    className={`cp ${style.listOption}`}
                    onClick={() => {
                      setTimePeriod("thisyear");
                      setOpen(false);
                    }}
                  >
                    This Year
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
