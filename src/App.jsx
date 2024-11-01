import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { allfiles } from "./components";
import "react-toastify/dist/ReactToastify.css";
import "./common.css";
import Setting from "./components/Settings/Setting";
import Analytics from "./components/Analytics/Analytics";
import Board from "./components/Dashboard/Board/Board";
import TaskDetails from "./pages/TaskDetails";

function App() {
  const { Login, Register, Dashboard, PageNotFound } = allfiles;
  
  
  return (
    <BrowserRouter>
      <div>
        <ToastContainer autoClose={3000} />

        <Routes>
        <Route path="/dashboard/getTask" element={<TaskDetails />} />
          <Route  path="/" element ={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard" element= {<Dashboard/>} >
        
            <Route index element={<Board />} />
            <Route path="board" element={<Board />} />
            <Route path="settings" element={<Setting />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
