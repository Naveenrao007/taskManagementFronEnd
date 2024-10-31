import React, {useState, useEffect } from "react";
import collapse from '../../../assets/Icons/collapse.png'
import { useOutletContext } from "react-router-dom";
import TaskCard from "../TaskCard/TaskCard";
function Inprogress() {
  const [inprogressData, setinprogressData] = useState()
  const { dashboardData } = useOutletContext();
  const [closeAllChecklists, setCloseAllChecklists] = useState(false);

  useEffect(()=>{
setinprogressData(dashboardData.dashboard?.Inprogress)
  },[dashboardData])
  const handleCollapseClick = () => {
    setCloseAllChecklists((prev) => !prev); 
  };
  return (
    <div>
    <div className="flexdc">
    <div className="flexdr jcsb">
          <div>In progress</div>
          <div className="cp" onClick={handleCollapseClick}>
            <img src={collapse} alt="collapseSvg"  />
          </div>

        </div>
        <div className={`overflowY`}>
        <TaskCard taskData = {inprogressData} fromArray="Inprogress" closeAllChecklists={closeAllChecklists}/>
        </div>
      </div>
    </div>
  );
}

export default Inprogress;
