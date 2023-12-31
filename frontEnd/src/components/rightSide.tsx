import { returnTodayFormat } from "../helpers/validate";
import SingleTodo from "./singleTodo";

export default function RightSide() {
  const todayFormat = returnTodayFormat();
  const arr = [1, 2, 3, 4, 5, 3, 32, 3, 3, 33, 3, 3, 33, 3, 3, 3, 3];
  return (
    <>
      <div className="container-fluid p-4">
        <h5>
          Hello Gaurav{" "}
          <i
            className="fa-solid fa-hand-sparkles"
            style={{ color: "orange" }}
          ></i>
        </h5>
        <h6 className="fw-normal">{todayFormat ?? todayFormat}</h6>
        <div className="mt-2">
          {arr?.map((item, index) => {
            return (
              <div key={index}>
                <SingleTodo />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
