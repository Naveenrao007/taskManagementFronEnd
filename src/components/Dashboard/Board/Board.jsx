import React from 'react'
 import style from'./Board.module.css'
 import Backlog from '../Backlog/Backlog'
 import Todo from '../Todo/Todo'
 import Inprogress from '../Inprogress/Inprogress'
 import Done from '../Done/Done'
function Board() {
  return (
    <div>
      <header className={`${style.boardheader}`}>
          <div className="flexdr jcsb">
            <p>Welcome ! Raw</p>
            <p>20th oct 2024</p>
          </div>
          <div className="flexdr jcsb">
            <div>board</div>
            <div>dropdown</div>
          </div>
        </header>
        <div className={` ${style.gridcontainer}`}>
            <div className={`${style.gridcontent}`}>
              <Backlog />
            </div>
            <div className={`${style.gridcontent}`}>
              <Todo/>
            </div>
            <div className={`${style.gridcontent}`}>
              <Inprogress/>
            </div>
            <div className={`${style.gridcontent}`}>
              <Done />
            </div>
          </div>
    </div>
  )
}

export default Board