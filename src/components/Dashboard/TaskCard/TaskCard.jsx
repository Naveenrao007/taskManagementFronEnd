import React, { useState, useEffect } from "react";
import style from "./TaskCard.module.css";
import threeDot from "../../../assets/Icons/threedot.png";
import arrowDown from "../../../assets/Icons/arrowDown.png";
import {
  manageTaskStatus,
  deleteTask,
  UpdateTask,
} from "../../../Service/Newtask";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModel from "../../Models/Delete/DeleteTask";
import EditTask from "../../Models/EditTask/EditTask";
function TaskCard({ taskData, fromArray, closeAllChecklists }) {
  const [showDropdownTaskId, setShowDropdownTaskId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isOpenEditTask, setIsOpenEditTask] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);
  const [taskDetails, setTaskDetails] = useState([]);
  const [openChecklistIds, setOpenChecklistIds] = useState([]);
  const { dashboardData, updateDashboardData } = useOutletContext();

  const priorityObj = {
    high: "HIGH PRIORITY",
    mid: "MODERATE PRIORITY",
    low: "LOW PRIORITY",
  };

  const handleDropdown = (taskId) => {
    setShowDropdownTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  const toggleChecklist = (taskId) => {
    setOpenChecklistIds((prevIds) =>
      prevIds.includes(taskId)
        ? prevIds.filter((id) => id !== taskId)
        : [...prevIds, taskId]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${style.dropdownMenu}`)) {
        setShowDropdownTaskId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (closeAllChecklists) {
      setOpenChecklistIds([]);
    }
  }, [closeAllChecklists]);

  const handleTaskStatus = async (toArray, taskId) => {
    const data = {
      dashboardId: dashboardData.dashboard._id,
      taskId: taskId,
      fromArray: fromArray,
      toArray: toArray,
    };
    const res = await manageTaskStatus(data);
    if (res.status === 200) {
      updateDashboardData(res.data.data);
      toast.success("Task updated successfully");
    } else {
      toast.error("Unable to update task");
    }
  };

  const openDeleteModal = (taskId) => {
    setShowDeleteModal(true);
    setTaskToDeleteId(taskId);
  };

  const handleDelete = async () => {
    if (!taskToDeleteId) return;

    const data = {
      dashboardId: dashboardData.dashboard._id,
      taskId: taskToDeleteId,
      fromArray: fromArray,
    };
    const res = await deleteTask(data);
    if (res.status === 200) {
      updateDashboardData(res.data.data);
      toast.success("Task deleted successfully", { autoClose: 1500 });
      setShowDeleteModal(false);
    } else {
      toast.error("Unable to delete task");
    }
  };

  const openEditModel = (item) => {
    setIsOpenEditTask(true);
    setTaskDetails(item);
  };
  const handleEditTask = async (taskData) => {
    const data = {
      dashboardId: dashboardData.dashboard._id,
      taskId: taskData._id,
      taskData: taskData,
      fromArray,
    };
    try {
      const res = await UpdateTask(data);
      if (res.status === 200) {
        updateDashboardData(res.data.data);
        toast.success("Task updated successfully", { autoClose: 1000 });
        setTimeout(() => {
          setIsOpenEditTask(false);
        }, 800);
      } else {
        toast.error("Unable to update task");
      }
    } catch (error) {
      toast.error("An error occurred while updating the task");
    }
  };
  const handleShare = async (taskDetails) => {
    console.log("Share task:", taskDetails);

    const data = {
      dashboardId: dashboardData.dashboard._id,
      taskId: taskDetails._id,
      fromArray: fromArray,
    };

    const baseURL = window.location.origin;
    const queryString = new URLSearchParams(data).toString();
    const shareableLink = `${baseURL}/dashboard/getTask?${queryString}`;
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast.success("Task details link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy task details:", error);
      toast.error("Failed to copy task details.");
    }
  };

  return (
    <div className={`poppins ${style.cardContainer}`}>
      {taskData &&
        taskData.map((item) => (
          <div className={`${style.subcontainer}`} key={item._id}>
            <div className="flexdr jcsb">
              <div className={`flexdr alignItmC ${style.prioritydiv}`}>
                <p className={`${style.Prioritydot} ${item.priority ==="high"?style.highcolor:(item.priority==="mid"?style.midcolor:style.lowcolor)}`}>.</p>
                <p>{priorityObj[item.priority]}</p>
              </div>
              <div
                className={style.threeDotContainer}
                onClick={() => handleDropdown(item._id)}
              >
                <img src={threeDot} alt="Menu" />
                {showDropdownTaskId === item._id && (
                  <div className={style.dropdownMenu}>
                    <p
                      id={item._id}
                      className={style.dropdownItem}
                      onClick={() => openEditModel(item)}
                    >
                      Edit
                    </p>
                    <p
                      id={item._id}
                      className={style.dropdownItem}
                      onClick={() => handleShare(item)}
                    >
                      Share
                    </p>
                    <p
                      id={item._id}
                      className={`redcolor ${style.dropdownItem}`}
                      onClick={() => openDeleteModal(item._id)}
                    >
                      Delete
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div>{item.title}</div>

            <div>
              <div className="flexdr jcsb">
                <div>
                  Checklist (<span>{item.checkList.length}</span>)
                </div>
                <div className={`cp ${style.dropDownArrow}`}>
                  <img
                    onClick={() => toggleChecklist(item._id)}
                    src={arrowDown}
                    alt="arrow down"
                    style={{
                      transform: openChecklistIds.includes(item._id)
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
              </div>

              <div
                className={`${style.dropdownDiv} ${
                  openChecklistIds.includes(item._id)
                    ? style.dropdownDivOpen
                    : ""
                }`}
              >
                {Array.isArray(item.checkList) ? (
                  item.checkList.map((checkList) => (
                    <div className={`flexdr ${style.checklistdivborder}`} key={checkList.id}>
                      <input type="checkbox" id={checkList.id} />
                      <p>{checkList.title}</p>
                    </div>
                  ))
                ) : (
                  <div key={item.checkList.id}>
                    <input type="checkbox" id={item.checkList.id} />
                    <p>{item.checkList.title}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flexdr jcsb">
              <div className="flex">
                <button className={`${style.cardBtn}`}>Feb 10</button>
              </div>
              <div className={`flexdr ${style.gap10px}`}>
                <button
                  className={`${style.cardBtn} ${
                    fromArray === "Backlog" ? style.hidden : ""
                  }`}
                  onClick={() => handleTaskStatus("Backlog", `${item._id}`)}
                >
                  Backlog
                </button>
                <button
                  className={`${style.cardBtn} ${
                    fromArray === "Todo" ? style.hidden : ""
                  }`}
                  onClick={() => handleTaskStatus("Todo", `${item._id}`)}
                >
                  Todo
                </button>
                <button
                  className={`${style.cardBtn} ${
                    fromArray === "Inprogress" ? style.hidden : ""
                  }`}
                  onClick={() => handleTaskStatus("Inprogress", `${item._id}`)}
                >
                  Progress
                </button>
                <button
                  className={`${style.cardBtn} ${
                    fromArray === "Done" ? style.hidden : ""
                  }`}
                  onClick={() => handleTaskStatus("Done", `${item._id}`)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ))}
      <DeleteModel
        showDeleteModal={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        handleDelete={handleDelete}
      />
      <EditTask
        isOpenEditTask={isOpenEditTask}
        onRequestClose={() => setIsOpenEditTask(false)}
        handleEditTask={handleEditTask}
        initialTaskData={taskDetails}
      />
    </div>
  );
}

export default TaskCard;
