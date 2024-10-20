import React from "react";
import { NavLink } from "react-router-dom";
import codeSabdbox from "../../assets/Icons/codesandbox.png";
import database from "../../assets/Icons/database.png";
import layout from "../../assets/Icons/layout.png";
import settings from "../../assets/Icons/settings.png";
import Logout from "../../assets/Icons/Logout.png";
function Navbar() {
  return (
    <nav>
      <ul>
        <li className="flexdr">
          <div>
            <img src={codeSabdbox} alt="img" />
          </div>
          <div>
            <h2>Pro Manage</h2>
          </div>
        </li>
        <li>
          <NavLink to="/board" className="flexdr">
            <div >
              <img src={layout} alt="layoutImg" />
            </div>
            <div>Board</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className="flexdr">
            <div >
              <img src={database} alt="databaseImg" />
            </div>
            <div>Analytics</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/setting" className="flexdr" >
            <div >
              <img src={settings} alt="databaseImg" />
            </div>
            <div>Setting</div>
          </NavLink>
        </li>
      </ul>
      <div>
        <NavLink to="/logout" className="flexdr" >
          <div >
            <img src={Logout} alt="logoutImg" />
          </div>
          <div>Logout</div>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
