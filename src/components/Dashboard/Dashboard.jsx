import React from "react";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading/Loading";
import getBoardData from "../../Service/BoardData"
function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getBoardData().then((res) => {
      console.log(res);

      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flexdr hightfull">
      <div className="width18vw hightfull">
        <Navbar OnLogout={() => setIsModalOpen(true)} />
      </div>
      <div className="width82vw ">
        
          <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
