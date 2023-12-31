import { useState } from "react";
import { returnDueDate } from "../helpers/validate";

export default function SingleTodo() {
  const todayFormat = returnDueDate();
  const [showMore, setShowMore] = useState<Boolean>(false);
  const [isCompleted, setIsComplted] = useState<Boolean>(false);

  return (
    <>
      <div className="card text-center mt-2 ">
        <div className="card-body">
          <div className="row">
            <div className="col-10">
              <div className="form-check d-flex gap-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Default checkbox
                </label>
              </div>
            </div>
            <div
              className="col-2 "
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div>
                <div className="badge bg-primary">Primary</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="d-flex">
                <span className="mt-1 fw-bold ">Due date</span>
              </div>
              <div className="d-flex  text-secondary" style={{ fontSize: 13 }}>
                {todayFormat}
              </div>
            </div>

            <div className="col-6 d-flex justify-content-end ">
              <div>
                <div className="d-flex">
                  <span className="mt-1 fw-bold ">Assing to</span>
                </div>
                <div
                  className="d-flex   text-secondary"
                  style={{ fontSize: 13 }}
                >
                  Self
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mx-3">
          <p
            onClick={() => setShowMore((prev) => !prev)}
            className="text-primary"
            style={{ cursor: "pointer" }}
          >
            see more
          </p>
          <div className="d-flex gap-4">
            <i
              className="fa-solid fa-pen-to-square text-primary "
              style={{ cursor: "pointer" }}
            ></i>
            <i
              className="fa-solid fa-trash text-danger "
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
        <div
          className="card-footer container"
          style={{ display: showMore ? "block" : "none" }}
        >
          <div className="col-12">sd</div>
        </div>
      </div>
    </>
  );
}
