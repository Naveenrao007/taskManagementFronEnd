import React, { useState, useEffect, useRef } from "react";
import style from "./Checklist.module.css";

const Checklist = ({ onUpdateChecklist }) => {
  const [checklist, setChecklist] = useState([]);
  const prevChecklistRef = useRef(checklist);

  const handleAddChecklistItem = () => {
    setChecklist((prev) => [
      ...prev,
      { id: Date.now(), text: "", completed: false },
    ]);
  };

  const handleCheckbox = (id) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleTitleChange = (id, text) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) => {
        return item.id === id ? { ...item, text } : item;
      })
    );
  };

  const handleDelete = (id) => {
    setChecklist((prevChecklist) =>
      prevChecklist.filter((item) => item.id !== id)
    );
  };

  useEffect(() => {
    if (prevChecklistRef.current !== checklist) {
      onUpdateChecklist(checklist);
      prevChecklistRef.current = checklist;
    }
  }, [checklist, onUpdateChecklist]);

  return (
    <div className={style.checklistparentcontainer}>
      <div className={`inter ${style.checklistTxt}`}>
        Checklist (<span>{checklist.filter((i) => i.completed).length}</span>/
        <span>{checklist.length}</span>)
        <span className={`${style.mandatoryfield}`}>*</span>
      </div>
      {checklist.length > 0 && (
        <div className={style.overflowy}>
          <ul className={`flexdc gap1rem`}>
            {checklist.map((item) => (
              <div className="flexdr open-sans" key={item.id}>
                <ul className={`flexdr gap1rem ${style.checklistcontainer}`}>
                  <li className={style.checkbox}>
                    <input
                      className={`cp`}
                      type="checkbox"
                      onChange={() => handleCheckbox(item.id)}
                      checked={item.completed}
                      aria-label={`Checkbox for task: ${item.text}`}
                    />
                  </li>
                  <li className={style.width90per}>
                    <input
                      className={style.taskname}
                      type="text"
                      placeholder="Task name"
                      value={item.text}
                      onChange={(e) =>
                        handleTitleChange(item.id, e.target.value)
                      }
                    />
                  </li>
                  <li className={style.delete}>
                    <button
                      onClick={() => handleDelete(item.id)}
                      aria-label={`Delete task: ${item.text}`}
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9059 3.36922C15.2301 3.36922 15.5 3.63838 15.5 3.98088V4.29754C15.5 4.63171 15.2301 4.90921 14.9059 4.90921H1.09488C0.769883 4.90921 0.5 4.63171 0.5 4.29754V3.98088C0.5 3.63838 0.769883 3.36922 1.09488 3.36922H3.52464C4.01821 3.36922 4.44775 3.01839 4.55879 2.5234L4.68603 1.95507C4.88378 1.18091 5.53458 0.666748 6.27939 0.666748H9.72061C10.4573 0.666748 11.1154 1.18091 11.3059 1.91424L11.442 2.52256C11.5522 3.01839 11.9818 3.36922 12.4762 3.36922H14.9059ZM13.6715 14.9449C13.9252 12.5808 14.3694 6.96418 14.3694 6.90751C14.3856 6.73585 14.3296 6.57335 14.2186 6.44252C14.0995 6.32002 13.9487 6.24752 13.7826 6.24752H2.22379C2.05684 6.24752 1.89799 6.32002 1.78776 6.44252C1.67592 6.57335 1.62081 6.73585 1.62891 6.90751C1.6304 6.91792 1.64634 7.11576 1.67298 7.44652C1.79134 8.91589 2.121 13.0084 2.33401 14.9449C2.48476 16.3716 3.42084 17.2682 4.77674 17.3007C5.82305 17.3249 6.90096 17.3332 8.00318 17.3332C9.04138 17.3332 10.0958 17.3249 11.1745 17.3007C12.5774 17.2766 13.5127 16.3957 13.6715 14.9449Z"
                          fill="#CF3636"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </ul>
        </div>
      )}
      <div className="flexdr cp">
        <p className={`inter ${style.addnew}`} onClick={handleAddChecklistItem}>
          <span>+</span> Add New
        </p>
      </div>
    </div>
  );
};

export default Checklist;
