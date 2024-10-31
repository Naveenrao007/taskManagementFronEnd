import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import codeSandbox from "../../assets/Icons/codesandbox.png";
import database from "../../assets/Icons/database.png";
import layout from "../../assets/Icons/layout.png";
import settings from "../../assets/Icons/settings.png";
import logoutIcon from "../../assets/Icons/Logout.png";
import LogoutModal from "../../components/Logout/Logout";
import { Bounce, toast } from "react-toastify";

function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
  window.location.href = "/login";
    setShowModal(false);
  };

  return (
    <nav className={`poppins ${style.container}`}>
      <ul className="widthFull">
        <li className="flexdr pdleft2vw alignItmC mrtop1rem gap1rem">
          <div>
            <img src={codeSandbox} alt="img" />
          </div>
          <div>
            <h2 className={style.proManage}>Pro Manage</h2>
          </div>
        </li>
        <li className="mrtop2rem">
          <NavLink
            to="/dashboard/board"
            className={({ isActive }) =>
              isActive
                ? `flexdr tabsPadding ${style.navLinkActive}`
                : `flexdr tabsPadding ${style.navLink}`
            }
          >
            <div className="flexdr pdleft2vw alignItmC gap1rem">
              <div className="flex">
                <img src={layout} alt="layoutImg" />
              </div>
              <div>Board</div>
            </div>
          </NavLink>
        </li>
        <li className="mrtop2rem">
          <NavLink
            to="/dashboard/analytics"
            className={({ isActive }) =>
              isActive
                ? `flexdr tabsPadding ${style.navLinkActive}`
                : `flexdr tabsPadding ${style.navLink}`
            }
          >
            <div className="flexdr pdleft2vw alignItmC gap1rem">
              <div className="flex">
                <img src={database} alt="databaseImg" />
              </div>
              <div>Analytics</div>
            </div>
          </NavLink>
        </li>
        <li className="mrtop2rem">
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive
                ? `flexdr tabsPadding ${style.navLinkActive}`
                : `flexdr tabsPadding ${style.navLink}`
            }
          >
            <div className="flexdr pdleft2vw alignItmC gap1rem">
              <div className="flex">
                <img src={settings} alt="settingsImg" />
              </div>
              <div>Settings</div>
            </div>
          </NavLink>
        </li>
      </ul>

      <ul className="widthFull">
        <li className={`mrtop2rem ${style.logoutdiv}`}>
          <div
            className="flexdr cp tabsPadding atag logout-btn"
            onClick={() => setShowModal(true)}
          >
            <div className="flexdr pdleft2vw alignItmC gap1rem">
              <div className="flex">
                <img src={logoutIcon} alt="logoutImg" />
              </div>
              <div className="redcolor">Logout</div>
            </div>
          </div>
        </li>
      </ul>

      <LogoutModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        handleLogout={handleLogout}
      />
    </nav>
  );
}

export default Navbar;
