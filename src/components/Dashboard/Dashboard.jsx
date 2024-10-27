import React from "react";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading/Loading";
import getBoardData from "../../Service/BoardData"
function Dashboard() {
  const[dashboardData, setdashboardData] = useState([{}])
  const [isLoading, setIsLoading] = useState(true);
  const  getdata = async()=>{
    const data = await getBoardData()
    console.log(data);
    setIsLoading(false)
    
  }
  useEffect(() => {

    getdata()
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flexdr hightfull">
      <div className="width18vw hightfull">
        <Navbar OnLogout={() => setIsModalOpen(true)} />
      </div>
      <div className="width82vw">
        
          <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
