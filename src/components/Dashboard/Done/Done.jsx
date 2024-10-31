import React, { useState, useEffect } from "react";
import collapse from "../../../assets/Icons/collapse.png";
import { useOutletContext } from "react-router-dom";
import TaskCard from "../TaskCard/TaskCard";

function Done() {
  const [doneData, setDoneData] = useState();
  const { dashboardData } = useOutletContext();
  const [closeAllChecklists, setCloseAllChecklists] = useState(false);
  useEffect(() => {
    setDoneData(dashboardData.dashboard?.Done);
  }, [dashboardData]);

  const handleCollapseClick = () => {
    setCloseAllChecklists((prev) => !prev); 
  };
  return (
    <div>
      <div className="flexdc">
        <div className="flexdr jcsb">
          <div>Done</div>
          <div className="cp" onClick={handleCollapseClick}>
            <img src={collapse} alt="collapseSvg"   />
          </div>
        </div>
        <div className={`overflowY`}>
          <TaskCard taskData={doneData} fromArray="Done" closeAllChecklists={closeAllChecklists} />
        </div>
      </div>
    </div>
  );
}

export default Done;
