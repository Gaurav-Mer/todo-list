import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./paths/home";
import Register from "./paths/register";
import Login from "./paths/login";
import Testing from "./paths/testing";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, toggleRedirect } from "./reduxConfig/slices/todoSlices";
import { RootState } from "./reduxConfig/store";

const AppRouter: React.FC = () => {
  const store = useSelector((state: RootState) => state);
  console.log("store is =>", store?.redirect);

  const dispatch = useDispatch();
  const fetchDataFromToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/setAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for cross-origin requests
      });
      const jsonData = await response.json();
      console.log("Response is ", jsonData);
      if (response?.status === 200) {
        dispatch(setUserData({ tokenData: jsonData?.rData }));
      } else {
        dispatch(toggleRedirect(true));
      }
    } catch (error) {
      console.log("error is =>", error);
    }
  };

  useEffect(() => {
    const { userData } = store;
    if (Object.keys(userData)?.length > 0) {
      dispatch(setUserData({ tokenData: userData }));
    } else {
      fetchDataFromToken();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !store?.redirect ? <Home /> : <Navigate replace to={"/login"} />
          }
        />
        <Route
          path="/register"
          element={
            store?.redirect ? <Register /> : <Navigate replace to={"/"} />
          }
        />
        <Route
          path="/login"
          element={store?.redirect ? <Login /> : <Navigate replace to={"/"} />}
        />
        <Route path="/test" element={<Testing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
