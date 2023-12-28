import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./paths/home";
import Register from "./paths/register";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Home />} />
        </Routes>
      </BrowserRouter>{" "}
    </>
  );
}

export default App;
