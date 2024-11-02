import React, { useState } from "react";
import Modal from "react-modal";
import style from "./NewTask.module.css";
import Checklist from "./Checklist/Checklist";
import Calendar from "react-calendar";
import AllUsers from "../AllUser/AllUser";
import "react-calendar/dist/Calendar.css";
Modal.setAppElement("#root");

const NewTask = ({ isOpenNewTask, onRequestClose, handleNewTask }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    priority: "",
    assignTo: "",
    dueDate: null, 
    checklist: [],
  });
  const [errors, setErrors] = useState({});
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleChecklistUpdate = (updatedChecklist) => {
    setTaskData((prev) => ({
      ...prev,
      checklist: updatedChecklist,
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
    setTaskData((prev) => ({
      ...prev,
      dueDate:date,
    }));
    setOpenCalendar(false); 
  };

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!taskData.priority) {
      newErrors.priority = "Priority is required.";
    }
    if (taskData.checklist.length === 0) {
      newErrors.checklist = "At least one checklist item is required.";
    } else {
      const checklistErrors = taskData.checklist
        .map((item, index) => {
          if (!item.text.trim()) {
            return `Item ${index + 1} must have a title.`;
          }
          return null;
        })
        .filter((error) => error !== null);
      if (checklistErrors.length > 0) {
        newErrors.checklist = checklistErrors;
      }
    }
    return newErrors;
  };

  const handleSave = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});

    handleNewTask(taskData);
    setTaskData({
      title: "",
      priority: "",
      assignTo: "",
      dueDate: null,
      checklist: [],
    });
  };

  return (
    <Modal
      isOpen={isOpenNewTask}
      onRequestClose={onRequestClose}
      contentLabel="New Task"
      className={style.modal_content}
      overlayClassName={style.modal_overlay}
    >
      <div className="flexdc jcsb">
        <div className={`${style.pdtop1rem}`}>
          <form className={`poppins ${style.formContainer}`}>
            <div className={`${style.title} ${style.commonPaddinglr}`}>
              <p className="inter">
                Title <span className={`${style.mandatoryfield}`}>*</span>
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
              <Checklist
                onUpdateChecklist={handleChecklistUpdate}
                errors={errors}
              />
              {errors.checklist && (
                <div
                  className={`${style.errorDiv} ${style.errorMessage} ${style.mrbtm1rem}`}
                >
                  {Array.isArray(errors.checklist) ? (
                    errors.checklist.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))
                  ) : (
                    <p>{errors.checklist}</p>
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
              onClick={() => {
                setOpenCalendar((prev) => !prev);
              }}
            >
              {taskData.dueDate
                ? taskData.dueDate.toDateString()
                : "Select Due Date"}
            </button>
            {openCalendar && (
              <div className={`${style.openCalendar}`}>
                <Calendar
                  className={style.custom_calendar}
                  onChange={handleDueDateChange}
                  value={taskData.dueDate}
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
              onClick={handleSave}
              className={`poppins ${style.btn_logout} ${style.btn_fonts}`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewTask;
