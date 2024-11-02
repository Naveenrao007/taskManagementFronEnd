import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import style from "./TaskDetails.module.css";
import layoutImg from "../../../src/assets/Icons/codesandbox.png";

const TaskDetails = () => {
  const priorityObj = {
    high: "HIGH PRIORITY",
    mid: "MODERATE PRIORITY",
    low: "LOW PRIORITY",
  };

  const Elipsis = (text = "", maxLength = 10) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  };

  const location = useLocation();
  const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get("taskId");
  const fromArray = searchParams.get("fromArray");

  useEffect(() => {
    const fetchTaskData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BaseUrl}/dashboard/getTask`,
          {
            params: { taskId, fromArray },
          }
        );
        setTaskData(response.data.data);
      } catch (error) {
        console.error("Error fetching task data:", error);
        setError("Failed to load task details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (taskId && fromArray) {
      fetchTaskData();
    } else {
      setError("Missing required query parameters.");
      setLoading(false);
    }
  }, [taskId, fromArray]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className={style.container}>
      <div className={style.headingContainer}>
        <div>
          <img src={layoutImg} alt="Layout Icon" />
        </div>
        <div className={style.mainHeading}>Pro Manage</div>
      </div>
      <div className={style.taskDetailsContainer}>
        {taskData ? (
          <div>
            <p className={style.taskPriority}>
              <span className={`${style.dot} ${style.highcolor}`}></span>
              {priorityObj[taskData.priority]}
            </p>
            <h2 className={style.taskTitle}>{taskData.title}</h2>
            <ul className={style.ulContainer}>
              {taskData.checkList?.map((item, index) => (
                <ul className={style.ul} key={index}>
                  <li>
                    <input type="checkbox" checked={item.completed} readOnly />
                  </li>
                  <li>{Elipsis(item.title, 50)}</li>
                </ul>
              ))}
            </ul>
            <div className={style.dueDateContainer}>
              <p>Due Date</p>
              <p className={style.date}>Feb 10th</p>
            </div>
          </div>
        ) : (
          <p>No task details available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskDetails;
