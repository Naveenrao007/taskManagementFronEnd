import { useState } from "react";

import "./Common.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { allfiles } from "./components";
import Setting from "./components/Settings/Setting";
import Analytics from "./components/Analytics/Analytics";
import Board from "./components/Dashboard/Board/Board";
function App() {
  const { Login, Register, Dashboard, PageNotFound } = allfiles;
  return (
    <BrowserRouter>
      <div>
        <Routes>
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
