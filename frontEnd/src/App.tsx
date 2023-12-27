import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";

function App() {
  const handleData = async () => {
    try {
      const response = await fetch("http://localhost:3001", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Data submitted successfully!");
        // Add any further actions upon successful submission
      } else {
        console.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  useEffect(() => {
    handleData();
  }, []);

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
