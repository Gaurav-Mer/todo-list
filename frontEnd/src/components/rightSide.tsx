import React, { useState } from "react";
import { returnTodayFormat } from "../helpers/validate";
import SingleTodo from "./singleTodo";
import CardView from "./cardView";

type SingleTodo = Record<string, string>;
interface OverAllSt {
  todoList: SingleTodo[];
  userData: SingleTodo;
  setTodoList: React.Dispatch<React.SetStateAction<any>>;
}

const RightSide: React.FC<OverAllSt> = ({
  todoList,
  userData,
  setTodoList,
}) => {
  const todayFormat = returnTodayFormat();
  const [styleGrid, setStyleGrid] = useState(true);
  return (
    <>
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5>
            Hello {userData?.name}{" "}
            <i
              className="fa-solid fa-hand-sparkles"
              style={{ color: "orange" }}
            ></i>
          </h5>
          <div
            className=" p-1 rounded-2 mx-1 px-2"
            style={{ background: "#e5e0f5", cursor: "pointer" }}
          >
            {!styleGrid ? (
              <i
                onClick={() => setStyleGrid((prev) => !prev)}
                className="fa-solid fa-list-ol fw-bold"
              ></i>
            ) : (
              <i
                onClick={() => setStyleGrid((prev) => !prev)}
                className="fa-solid fa-border-all fa-lg text-secondary  fw-bold"
              ></i>
            )}
          </div>
        </div>
        <h6 className="fw-normal">{todayFormat ?? todayFormat}</h6>
        <div className="mt-2 row">
          {todoList?.length > 0 ? (
            todoList?.map((item, index) => {
              return (
                <div key={index} className={!styleGrid ? "col-4    my-2" : ""}>
                  {!styleGrid ? (
                    <CardView setTodoList={setTodoList} todo={item} />
                  ) : (
                    <SingleTodo setTodoList={setTodoList} todo={item} />
                  )}
                </div>
              );
            })
          ) : (
            <>
              <div className="d-flex justify-content-center ">
                <img src="./noData.jpg" className="" width={"20%"} />
              </div>
              <h4 className="d-flex justify-content-center mt-2">
                No Todo found!
              </h4>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RightSide;
