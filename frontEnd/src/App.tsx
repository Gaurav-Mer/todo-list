import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./paths/home";
import Register from "./paths/register";
import Login from "./paths/login";
import Testing from "./paths/testing";
import { useEffect } from "react";

const AppRouter: React.FC = () => {
  const userData = { name: "Gaurav" };
  useEffect(() => {
    console.log("guarav here ");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            Object.keys(userData)?.length > 0 ? (
              <Home />
            ) : (
              <Navigate replace to={"/register"} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Testing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
