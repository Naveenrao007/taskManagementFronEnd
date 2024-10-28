import React, { useState } from "react";
import style from "./Todo.module.css";
import collapse from "../../../assets/Icons/collapse.png";
import createSign from "../../../assets/Icons/createSign.png";
import NewTask from "../../Models/NewTask/NewTask";
import { createNewtask } from "../../../Service/Newtask";
import { ToastContainer, toast, Bounce } from "react-toastify";
import TaskCard from "../TaskCard/TaskCard";
function Todo() {
  const [isOpenNewTask, setisOpenNewTask] = useState(false);
  const closeMoel= ()=>{
        
    setisOpenNewTask(false)

  }

  const handleNewTask = async(taskData) => {
    console.log("tofof",taskData);
  closeMoel()

    const response = await createNewtask(taskData);
      if (response.status === 400) { 
      toast.error(response.error.message, {
        autoClose: 1400,
      
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1900);
    } else if (response.status === 201) {
      toast.success(response.data.message, {
      
        autoClose: 2000,
       
      });

      
    } else if (response.status === 500) {
      toast.error("Internal server error", {
        autoClose: 5000,
              });
    } else if (response.status === 404) {
      toast.error("Url is incorrect", {
        autoClose: 5000,
       
      });
    }
  };
  return (
    <div className="">
     

      <div className="flexdc">
        <div className="flexdr jcsb">
          <div>Todo</div>
          <div className="flexdr gap10px">
            <div
              className={style.createSign}
              onClick={() => setisOpenNewTask(true)}
            >
              <img className="cp" src={createSign} alt="" />
            </div>
            <div>
              <img src={collapse} alt="collapseSvg" />
            </div>
          </div>
        </div>
        <div className={`overflowY`}>
          <TaskCard/>
        </div>
      </div>
      <NewTask
        isOpenNewTask={isOpenNewTask}
        onRequestClose={() => setisOpenNewTask(false)}
        handleNewTask={handleNewTask}
      />
    </div>
  );
}

export default Todo;
