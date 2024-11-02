import React, { useState, useEffect, useRef } from "react";
import style from "./EditCheckList.module.css";

const EditCheckList = ({ handleEditCheckList, checkList }) => {
  const [EditCheckList, setEditCheckList] = useState([]);
  const prevEditCheckListRef = useRef(EditCheckList);

  useEffect(() => {
    setEditCheckList(checkList);
  }, [checkList]);

  const handleCheckbox = (id) => {
    setEditCheckList((prevEditCheckList) =>
      prevEditCheckList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleTitleChange = (id, title) => {
    setEditCheckList((prevEditCheckList) =>
      prevEditCheckList.map((item) => {
        return item.id === id ? { ...item, title } : item;
      })
    );
  };

  useEffect(() => {
    if (prevEditCheckListRef.current !== EditCheckList) {
      handleEditCheckList(EditCheckList);
      prevEditCheckListRef.current = EditCheckList;
    }
  }, [EditCheckList, handleEditCheckList]);

  return (
    <div className={style.EditCheckListparentcontainer}>
      <div className={`inter ${style.EditCheckListTxt}`}>
        EditCheckList (
        <span>{EditCheckList.filter((i) => i.completed).length}</span>/
        <span>{EditCheckList.length}</span>)
        <span className={`${style.mandatoryfield}`}>*</span>
      </div>
      {EditCheckList.length > 0 && (
        <div className={style.overflowy}>
          <ul className={`flexdc gap1rem`}>
            {EditCheckList.map((item) => (
              <div className="flexdr inputBorder" key={item.id}>
                <ul
                  className={`flexdr  list_styleNone gap1rem ${style.EditCheckListcontainer}`}
                >
                  <p>name</p>
                  <li className={` list_styleNone ${style.checkbox}`}>
                    <input
                      className="cp"
                      type="checkbox"
                      onChange={() => handleCheckbox(item.id)}
                      checked={item.completed}
                      aria-label={`Checkbox for task: ${item.title}`}
                    />
                  </li>
                  <li className={style.width100per}>
                    <input
                      className={style.taskname}
                      type="text"
                      placeholder="Task name"
                      value={item.title}
                      onChange={(e) =>
                        handleTitleChange(item.id, e.target.value)
                      }
                    />
                  </li>
                </ul>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EditCheckList;
