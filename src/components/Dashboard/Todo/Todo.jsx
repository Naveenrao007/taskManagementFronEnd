import React from "react";
import style from "./Todo.module.css"
import collapse from "../../../assets/Icons/collapse.png";
import createSign from "../../../assets/Icons/createSign.png";

import NewTask from "../../Models/NewTask/newTask";
function Todo() {
  const [isOpenNewTask, setisOpenNewTask] = useState(false);


  return (
    <div>
      <div className="flexdc">
        <div className="flexdr jcsb">
          <div>Todo</div>
          <div className="flexdr gap10px">
            <div className={style.createSign} onClick={}>
              <img className="cp" src={createSign} alt="" />
            </div>
            <div>
              <img src={collapse} alt="collapseSvg" />
            </div>
          </div>
        </div>
        <div className={`overflowY`}></div>
      </div>
      <NewTask
      />
    </div>
  );
}

export default Todo;
