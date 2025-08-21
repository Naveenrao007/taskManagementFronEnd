import React from "react";
import { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import style from "./Dashboard.module.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Loading from "../Loading/Loading";
import getBoardData from "../../Service/BoardData";
import { toast, Bounce } from "react-toastify";
import { useRef } from "react";

function Dashboard() {
  const [dashboardData, setdashboardData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const hasErrorShown = useRef(false);
  
  const getdata = async () => {
    const res = await getBoardData();
    if (res.status == 400 && !hasErrorShown.current) {
      toast.error(res.data.message, {
        autoClose: 1800,
        transition:Bounce
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 2200);
      hasErrorShown.current = true;
    } else if (res.status == 200) {
      setIsLoading(false);
      setdashboardData(res.data.data)
    }
  };
  
  useEffect(() => {
    getdata();
  }, []);
  
  const updateDashboardData = (newData) => {
    setdashboardData(newData);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };
  
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`flexdr hightfull ${isNavOpen ? 'nav-open' : ''}`}>
          {/* Mobile Navigation Toggle */}
          <button 
            className="mobile-nav-toggle" 
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          
          {/* Navigation Sidebar */}
          <div className="width18vw hightfull">
            <Navbar OnLogout={() => setIsModalOpen(true)} onNavClick={closeNav} />
          </div>
          
          {/* Main Content */}
          <div className="width82vw">
            <Outlet context= {{dashboardData ,updateDashboardData }} />
          </div>
          
          {/* Mobile Overlay */}
          {isNavOpen && (
            <div 
              className={style.mobileOverlay} 
              onClick={closeNav}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Dashboard;
