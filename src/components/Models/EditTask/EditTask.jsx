import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import style from "./EditTask.module.css";
import EditCheckList from "./EditCheckList/EditCheckList";
import Calendar from "react-calendar";
import AllUsers from "../AllUser/AllUser";
import { formatDate } from "../../../utils/Index";
import { revertFormattedDate } from "../../../utils/Index";

Modal.setAppElement("#root");

const EditTask = ({
  isOpenEditTask,
  onRequestClose,
  handleEditTask,
  initialTaskData,
}) => {
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    assignTo: "",
    dueDate: new Date(),
    checkList: [],
  });

  useEffect(() => {
    if (initialTaskData) {
      setTaskData(initialTaskData);
    }
  }, [initialTaskData]);

  const [errors, setErrors] = useState({});
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleEditCheckList = (updatedChecklist) => {
    setTaskData((prev) => ({
      ...prev,
      checkList: updatedChecklist,
    }));
  };

  const handleAssignToChange = (email) => {
    setTaskData((prev) => ({
      ...prev,
      assignTo: email,
    }));
  };

  const handleTitleChange = (e) => {
    setTaskData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handlePriorityChange = (priority) => {
    setTaskData((prev) => ({
      ...prev,
      priority,
    }));
  };

  const handleDueDateChange = (date) => {
    console.log("date", date);
    console.log("changes", revertFormattedDate(date));

    setTaskData((prev) => ({
      ...prev,
      dueDate: revertFormattedDate(date),
    }));
    setCalendarVisible(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!taskData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!taskData.priority) {
      newErrors.priority = "Priority is required.";
    }

    if (taskData.checkList.length === 0) {
      newErrors.checkList = "At least one checklist item is required.";
    } else {
      const checklistErrors = taskData.checkList
        .map((item, index) => {
          if (!item.title.trim()) {
            return `Item ${index + 1} must have a title.`;
          }
          return null;
        })
        .filter((error) => error !== null);

      if (checklistErrors.length > 0) {
        newErrors.checkList = checklistErrors;
      }
    }

    return newErrors;
  };

  const handleUpdate = () => {
    setErrors({});
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    handleEditTask(taskData);
  };

  return (
    <Modal
      isOpen={isOpenEditTask}
      onRequestClose={onRequestClose}
      contentLabel="Edit Task"
      className={style.modal_content}
      overlayClassName={style.modal_overlay}
    >
      <div className="flexdc jcsb">
        <div className={`${style.pdtop1rem}`}>
          <form className={`poppins ${style.formContainer}`}>
            <div className={`${style.title} ${style.commonPaddinglr}`}>
              <p className="inter">
                Edit Title <span className={`${style.mandatoryfield}`}>*</span>
              </p>
              <input
                className={`${style.inputfield} ${
                  errors.title ? style.error : ""
                }`}
                type="text"
                id="title"
                name="title"
                placeholder="Enter Task Title"
                value={taskData.title}
                onChange={handleTitleChange}
              />
              {errors.title && (
                <p className={style.errorMessage}>{errors.title}</p>
              )}
            </div>
            <div className={`${style.commonPaddinglr} flexdr jcsb`}>
              <h3 className={`inter ${style.priorityText}`}>
                Select Priority
                <span className={`${style.mandatoryfield}`}>*</span>
              </h3>
              <ul className={`flex gap1rem ${style.mrleft1rem}`}>
                <li
                  className={`${style.priorityOpt} ${
                    taskData.priority === "high" ? style.selectedPriority : ""
                  }`}
                  onClick={() => handlePriorityChange("high")}
                >
                  <span className={`${style.dot} ${style.red}`}></span>
                  <p>HIGH PRIORITY</p>
                </li>
                <li
                  className={`${style.priorityOpt} ${
                    taskData.priority === "mid" ? style.selectedPriority : ""
                  }`}
                  onClick={() => handlePriorityChange("mid")}
                >
                  <span className={`${style.dot} ${style.blue}`}></span>
                  <p>MODERATE PRIORITY</p>
                </li>
                <li
                  className={`${style.priorityOpt} ${
                    taskData.priority === "low" ? style.selectedPriority : ""
                  }`}
                  onClick={() => handlePriorityChange("low")}
                >
                  <span className={`${style.dot} ${style.green}`}></span>
                  <p>LOW PRIORITY</p>
                </li>
              </ul>
            </div>
            <div className={`${style.errorDiv}`}>
              {errors.priority && (
                <p className={`${style.errorMessage}`}>{errors.priority}</p>
              )}
            </div>
            <div className={`flexdr jcsb ${style.commonPaddinglr}`}>
              <div>Assign To</div>
              <AllUsers onAssignUser={handleAssignToChange} />
            </div>

            <div className={`flexdc alignItmFlexStart`}>
              <EditCheckList
                handleEditCheckList={handleEditCheckList}
                errors={errors}
                checkList={initialTaskData.checkList}
              />
              {errors.checkList && (
                <div
                  className={`${style.errorDiv} ${style.errorMessage} ${style.mrbtm1rem}`}
                >
                  {Array.isArray(errors.checkList) ? (
                    errors.checkList.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))
                  ) : (
                    <p>{errors.checkList}</p>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
        <div
          className={`${style.pdbtm1rem} ${style.buttonContainer} ${style.commonPaddinglr}`}
        >
          <div className={`${style.datecontainer}`}>
            <button
              className={`${style.btn_fonts} ${style.btn_select_date}`}
              onClick={() => setCalendarVisible((prev) => !prev)}
            >
              {taskData.dueDate
                ? formatDate(taskData.dueDate)
                : "Select Due Date"}
            </button>
            {calendarVisible && (
              <div className={`${style.openCalander} ${style.custom_calendar}`}>
                <Calendar
                  onChange={handleDueDateChange}
                  value={(taskData.dueDate)}
                />
              </div>
            )}
          </div>
          <div className={style.modal_buttons}>
            <button
              onClick={onRequestClose}
              className={`poppins ${style.btn_cancel} ${style.btn_fonts}`}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className={`poppins ${style.btn_logout} ${style.btn_fonts}`}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditTask;
