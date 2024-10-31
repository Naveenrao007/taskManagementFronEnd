import React, { useState, useEffect } from "react";
import collapse from "../../../assets/Icons/collapse.png";
import { useOutletContext } from "react-router-dom";
import TaskCard from "../TaskCard/TaskCard";
function Backlog() {
    const [backlogData, setbacklogData] = useState();
    const { dashboardData } = useOutletContext();
    const [closeAllChecklists, setCloseAllChecklists] = useState(false);

    useEffect(() => {
      setbacklogData(dashboardData.dashboard?.Backlog);
    }, [dashboardData]);
    const handleCollapseClick = () => {
      setCloseAllChecklists((prev) => !prev); 
    };
    return (
      <div>
        <div className="flexdc">
          <div className="flexdr jcsb">
            <div>Backlog</div>
            <div className="cp" onClick={handleCollapseClick}>
              <img src={collapse} alt="collapseSvg"  />
            </div>
          </div>
          <div className={`overflowY`}>
            <TaskCard taskData={backlogData} fromArray="Backlog" closeAllChecklists={closeAllChecklists} />
          </div>
        </div>
      </div>
    );
  
}

export default Backlog;
