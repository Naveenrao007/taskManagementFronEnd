import React, { useEffect, useState } from "react";
import style from "./Todo.module.css";
import collapse from "../../../assets/Icons/collapse.png";
import createSign from "../../../assets/Icons/createSign.png";
import NewTask from "../../Models/NewTask/NewTask";
import { createNewtask } from "../../../Service/Newtask";
import { toast, Bounce } from "react-toastify";
import { useOutletContext } from "react-router-dom";
import getBoardData from "../../../Service/BoardData"
import TaskCard from "../TaskCard/TaskCard";
function Todo() {
  const [isOpenNewTask, setisOpenNewTask] = useState(false);
  const [tododData, settodoData] = useState([]);
  const { dashboardData, updateDashboardData } = useOutletContext();
  const [closeAllChecklists, setCloseAllChecklists] = useState(false);

  const closeModel = () => {
    setisOpenNewTask(false);
  };
  const handleCollapseClick = () => {
    setCloseAllChecklists((prev) => !prev);
  };
  useEffect(() => {
    settodoData(dashboardData.dashboard?.Todo);
  }, [dashboardData, tododData]);
  const handleNewTask = async (taskData) => {
    const response = await createNewtask(taskData);
    if (response.status === 400) {
      toast.error(response.error.message, {
        autoClose: 1000,
        transition: Bounce,
      });
      setTimeout(() => {
        closeModel();
        window.location.href = "/login";
      }, 1200);
    } else if (response.status === 201) {
       const boardData = await getBoardData()
      updateDashboardData(boardData.data.data)
      closeModel();
      toast.success(response.data.message, {
        autoClose: 2000,
      });
      closeModel();
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
          <div>To do</div>
          <div className="flexdr gap10px">
            <div
              className={style.createSign}
              onClick={() => setisOpenNewTask(true)}
            >
              <img className="cp" src={createSign} alt="" />
            </div>
            <div className="cp" onClick={handleCollapseClick}>
              <img src={collapse} alt="collapseSvg" />
            </div>
          </div>
        </div>
        <div className={`overflowY ${style.gap}`}>
          <TaskCard
            taskData={tododData}
            fromArray="Todo"
            closeAllChecklists={closeAllChecklists}
          />
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
