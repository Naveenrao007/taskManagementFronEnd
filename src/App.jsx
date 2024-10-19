import { useState } from "react";

import "./Common.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { allfiles } from "./components";
function App() {
  const { Login, Register, Navbar, Dashboard, PageNotFound } = allfiles;
  return (
    <BrowserRouter>
      <div>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
