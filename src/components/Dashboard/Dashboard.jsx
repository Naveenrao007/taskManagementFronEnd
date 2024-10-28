import React from "react";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading/Loading";
import getBoardData from "../../Service/BoardData";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useRef } from "react";
function Dashboard() {
  const [dashboardData, setdashboardData] = useState([{}]);

  const [isLoading, setIsLoading] = useState(true);
  const hasErrorShown = useRef(false);
  const getdata = async () => {
    const res = await getBoardData();
    console.log("data",res.status);
    console.log("data", res.data);

    if (res.status == 400 && !hasErrorShown.current) {
      toast.error(res.data.message, {
        autoClose: 1800,
      });
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }, 2200);
      hasErrorShown.current = true;
    } else if (res.status == 200) {
      setIsLoading(false);
      console.log(res.data);
      setdashboardData(res.data.data)
      console.log("ddd",dashboardData);
      
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flexdr hightfull">
          <div className="width18vw hightfull">
            <Navbar OnLogout={() => setIsModalOpen(true)} />
          </div>
          <div className="width82vw">
            <Outlet context= {{dashboardData}} />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
