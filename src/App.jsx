import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { allfiles } from "./components";
import "react-toastify/dist/ReactToastify.css";
import "./common.css";
import Setting from "./components/Settings/Setting";
import Analytics from "./components/Analytics/Analytics";
import Board from "./components/Dashboard/Board/Board";

function App() {
  const { Login, Register, Dashboard, PageNotFound } = allfiles;

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  return (
    <BrowserRouter>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard/board" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
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
