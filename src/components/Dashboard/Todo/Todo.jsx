import React, {useState} from "react";
import style from "./Todo.module.css"
import collapse from "../../../assets/Icons/collapse.png";
import createSign from "../../../assets/Icons/createSign.png";
// import NewTask from "../../Models/NewTask/newTask";
function Todo() {
  // const [isOpenNewTask, setisOpenNewTask] = useState(false);

  // const handleNewTask = (e)=>{
  //   console.log(e.target.value);
    
  // }
  return (
    <div>
      <div className="flexdc">
        <div className="flexdr jcsb">
          <div>Todo</div>
          <div className="flexdr gap10px">
            <div className={style.createSign} >
              <img className="cp" src={createSign} alt="" />
            </div>
            <div>
              <img src={collapse} alt="collapseSvg" />
            </div>
          </div>
        </div>
        <div className={`overflowY`}></div>
      </div>
      {/* <NewTask
        isOpenNewTask={isOpenNewTask}
        onRequestClose={() => setisOpenNewTask(false)}
        handleNewTask={handleNewTask}/> */}
    </div>
  );
}

export default Todo;
