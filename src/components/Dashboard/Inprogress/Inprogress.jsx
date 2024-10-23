import React from "react";
import collapse from '../../../assets/Icons/collapse.png'
function Inprogress() {
  return (
    <div>
    <div className="flexdc">
    <div className="flexdr jcsb">
          <div>In progress</div>
          <div>
            <img src={collapse} alt="collapseSvg" />
          </div>
        </div>
        <div className={`overflowY`}></div>
      </div>
    </div>
  );
}

export default Inprogress;
