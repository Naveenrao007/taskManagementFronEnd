import React, { useEffect, useState } from "react";
import style from "./Analytics.module.css";
import getAnalytics from "../../Service/Analytics";
function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAnalytics();
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={`${style.analyticsContainer}`}>
      <h2 className={style.heading}>Analytics</h2>
      <div className={`flexdr gap1rem  ${style.marginTop}`}>
        <div className={style.taskContainer}>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Backlog Tasks
            </p>
            <p className={style.AnalyticsResult}>{data.totalBacklogTasks}</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>To-do Tasks
            </p>
            <p className={style.AnalyticsResult}>{data.totalTodoTasks}</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>In-Progress Tasks
            </p>
            <p className={style.AnalyticsResult}>{data.totalInprogressTasks}</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Completed Tasks
            </p>
            <p className={style.AnalyticsResult}>{data.totalDoneTasks}</p>
          </div>
        </div>
        <div className={style.taskContainer}>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Low Priority
            </p>
            <p className={style.AnalyticsResult}>{data.lowPriorityTasks} </p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Moderate Priority
            </p>
            <p className={style.AnalyticsResult}>
              {data.moderatePriorityTasks}
            </p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>High Priority
            </p>
            <p className={style.AnalyticsResult}>{data.highPriorityTasks}</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Due Date Tasks
            </p>
            <p className={style.AnalyticsResult}>{data.pastDueTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
