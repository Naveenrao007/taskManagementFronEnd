import React from "react";
import collapse from "../../../assets/Icons/collapse.png";
function Backlog() {
  return (
    <div>
      <div className="flexdc ">
        <div className="flexdr jcsb">
          <div>Backlog</div>
          <div>
            <img src={collapse} alt="collapseSvg" />
          </div>
        </div>
        <div className={`overflowY pd10px`}>
          <div>tesing</div>
          <div>tesing</div>
          <div>tesing</div>
          <div>tesing</div>
          <div>tesing</div>
          <div>tesing</div>
          <div>tesing</div>
          <div>tesing</div>
          <div>tesing</div>
          <div>tesing</div>
        </div>
      </div>
    </div>
  );
}

export default Backlog;
