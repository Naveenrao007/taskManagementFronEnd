import React from "react";
import style from "./Analytics.module.css";
function Analytics() {
  return (
    <div className={`${style.analyticsContainer}`}>
      <h2 className={style.heading}>Analytics</h2>
      <div className={`flexdr gap1rem  ${style.marginTop}`}>
        <div className={style.taskContainer}>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Backlog Tasks
            </p>
            <p className={style.AnalyticsResult}>16</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>To-do Tasks
            </p>
            <p className={style.AnalyticsResult}>16</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>In-Progress Tasks
            </p>
            <p className={style.AnalyticsResult}>16</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Completed Tasks
            </p>
            <p className={style.AnalyticsResult}>16</p>
          </div>
        </div>
        <div className={style.taskContainer}>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Low Priority
            </p>
            <p className={style.AnalyticsResult}>16</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Moderate Priority
            </p>
            <p className={style.AnalyticsResult}>16</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>High Priority
            </p>
            <p className={style.AnalyticsResult}>16</p>
          </div>
          <div className="flexdr jcsb">
            <p className={` flexdr gaphalfrem alignItmC  ${style.textname}`}>
              <span className={style.dot}></span>Due Date Tasks
            </p>
            <p className={style.AnalyticsResult}>16</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
