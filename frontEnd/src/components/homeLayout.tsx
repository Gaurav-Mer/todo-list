import React, { useEffect, useRef, useState } from "react";
import MobileSideBar from "./mobileSidebar";
import { Button } from "primereact/button";
import Navbar from "./navbar";
import DesktopLeft from "./desktopLeft";
import TodoLoader from "./loader/todoLoader";
import RightSide from "./rightSide";
import styles from "../register.module.css";
import { useLocation } from "react-router-dom";

interface Props {
  Ptype: string;
  userData: Record<any, any>;
}

const HomeLayout: React.FC<Props> = ({ Ptype, userData }) => {
  const [loader, setLoader] = useState(false);
  const [todoList, setTodoList] = useState<Record<any, any>[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const intersectionRef = useRef<any>(null);

  const location = useLocation();

  const fetchAllTodos = async (type: any, signal: any) => {
    try {
      let url =
        Ptype === "team"
          ? "http://localhost:3001/api/getTodos?todoType=team"
          : "http://localhost:3001/api/getTodos";
      if (type && type !== null) {
        url =
          Ptype === "team"
            ? `http://localhost:3001/api/getTodos?filter=${type}&todoType=team`
            : `http://localhost:3001/api/getTodos?filter=${type}`;
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
          <div className="d-none d-md-block  col-2 p-0">
            <DesktopLeft setTodoList={setTodoList} userData={userData} />
          </div>
          <div className="col-12 col-md-10">
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
          <div className="bg-danger" ref={intersectionRef}>
            LOADING
          </div>
        </div>
      </div>
      <Button
        className="border-0 rounded-circle  d-block d-md-none"
        onClick={() => setVisible((prev) => !prev)}
        style={{ position: "fixed", right: 20, bottom: 30 }}
        icon={<i className="fa-solid fa-plus fa-lg"></i>}
      />
      <MobileSideBar
        userData={userData}
        setTodoList={setTodoList}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};
export default HomeLayout;
