import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import DesktopLeft from "../components/desktopLeft";
import styles from "../register.module.css";
import RightSide from "../components/rightSide";
import { useLocation } from "react-router-dom";
import TodoLoader from "../components/loader/todoLoader";

type OverAllSt = Record<string | any, string | any>;

const Home: React.FC<OverAllSt> = ({ userData }) => {
  const [todoList, setTodoList] = useState<Record<any, any>[]>([]);
  const location = useLocation();
  const [loader, setLoader] = useState<any>(true);

  const fetchAllTodos = async (type: any, signal: any) => {
    try {
      let url = "http://localhost:3001/api/getTodos";
      if (type && type !== null) {
        url = `http://localhost:3001/api/getTodos?filter=${type}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include", // Include credentials for cross-origin requests

        signal,
      });
      if (response.status === 200) {
        const respData = await response.json();
        if (respData?.success) {
          setLoader(false);
          return setTodoList(respData?.rData);
        }
      }
      setLoader(false);
      return setTodoList([]);
    } catch (error) {
      console.log("error is ", error);
      setLoader(false);
      return [];
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const params = new URLSearchParams(location.search);
    // const { pType } = Object.f1romEntries(params);
    const tType = params.get("tType");
    fetchAllTodos(tType, signal);
    return () => controller.abort();
  }, [location?.search]);

  return (
    <div className={`container-fluid p-0 ${styles.bg}`}>
      <Navbar userData={userData} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <DesktopLeft setTodoList={setTodoList} userData={userData} />
          </div>
          <div className="col-10">
            {loader ? (
              <TodoLoader />
            ) : (
              <RightSide
                setTodoList={setTodoList}
                todoList={todoList}
                userData={userData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
