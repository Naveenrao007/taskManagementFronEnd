import React, { useState, useEffect } from "react";
import collapse from "../../../assets/Icons/collapse.png";
import { useOutletContext } from "react-router-dom";
import TaskCard from "../TaskCard/TaskCard";

function Inprogress() {
  const [inprogressData, setInprogressData] = useState([]);
  const { dashboardData, updateDashboardData } = useOutletContext();
  const [closeAllChecklists, setCloseAllChecklists] = useState(false);

  useEffect(() => {
    setInprogressData(dashboardData?.dashboard?.InProgress || []);
  }, [dashboardData]);

  const handleCollapseClick = () => {
    setCloseAllChecklists((prev) => !prev);
  };

  return (
    <div>
      <div className="flexdc">
        <div className="flexdr jcsb">
          <div>In Progress</div>
          <div className="cp" onClick={handleCollapseClick}>
            <img src={collapse} alt="Collapse Icon" />
          </div>
        </div>
        <div className="overflowY">
          <TaskCard
            taskData={inprogressData}
            fromArray="Inprogress"
            closeAllChecklists={closeAllChecklists}
          />
        </div>
      </div>
    </div>
  );
}

export default Inprogress;
