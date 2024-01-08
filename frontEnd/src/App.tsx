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
import ProtectedRoute from "./paths/protectedRoute";

const AppRouter: React.FC = () => {
  const store = useSelector((state: RootState) => state);
  const [loadELement, setLoadElement] = useState(false);

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
      if (response?.status === 200) {
        if (jsonData?.hasOwnProperty("rData")) {
          if (jsonData?.rData?.id) {
            const profileData = await fetch(
              "http://localhost:3001/api/fetchProfileData"
            );
            if (profileData) {
              return dispatch(setUserData({ tokenData: jsonData?.rData }));

              const respData = await response.json();
              if (respData?.status === 200) {
                console.log("resp data is ->>>", respData);
                dispatch(setUserData({ tokenData: jsonData?.rData }));
              }
            }
          }
        }
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

  //this useEffect to load the dom after 100ms so that my userData get fetched and stored in STORE of redux
  useEffect(() => {
    const r = setTimeout(() => {
      setLoadElement(true);
    }, 500);
    return () => clearTimeout(r);
  }, []);
  // console.log("gaurav mer is her e");

  return (
    <>
      {loadELement ? (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              // element={
              //   !store?.redirect ? (
              //     <Home userData={store?.userData} />
              //   ) : (
              //     <Navigate replace to={"/login"} />
              //   )
              // }
              // element={<Home />}
              element={
                <ProtectedRoute userData={store?.userData} pageType="home">
                  <Home userData={store?.userData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              // element={
              //   store?.redirect ? <Register /> : <Navigate replace to={"/"} />
              // }
              element={
                <ProtectedRoute userData={store?.userData} pageType="register">
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              // element={store?.redirect ? <Login /> : <Navigate replace to={"/"} />}
              element={
                <ProtectedRoute userData={store?.userData} pageType="login">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/test" element={<Testing />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <div className="bg-main"></div>
      )}
    </>
  );
};

export default AppRouter;
