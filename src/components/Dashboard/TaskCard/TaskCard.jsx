import React, { useState } from "react";
import style from "./TaskCard.module.css";
import threeDot from "../../../assets/Icons/threeDot.png";
function TaskCard() {
  const [showDropdown, setshowDropdonw] = useState(false);
  const handleDropdonw = () => {
    setshowDropdonw((prev)=>!prev)
  };
  return (
    <div className={` poppins ${style.cardContainer}`}>
      <div className={` flexdr jcsb {}`}>
        <div className={`flexdr {}`}>
          <p>.</p>
          <p>high priority</p>
        </div>
        <div className="cp">
          <img src={threeDot} alt="" onClick={handleDropdonw} />
        </div>
        {showDropdown && (
          <div>
            <p>Edit</p>
            <p>Share</p>
            <p>delete</p>
          </div>
        )}
      </div>
      <div>Hero section</div>

      <div>
        <div>
          <div>
            <p>
              checklist(<span>0</span>/<span>0</span>)
            </p>
            <p></p>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <div>
          <button>feb10</button>
        </div>
        <div>
          <button>p</button>
          <button>t</button>
          <button>d</button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
