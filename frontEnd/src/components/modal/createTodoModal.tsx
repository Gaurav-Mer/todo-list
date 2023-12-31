import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { taskType } from "../../helpers/constant";

interface Props {
  onClose: any;
  show: any; // Define the type for onClick
}
const CreateTodoModal: React.FC<Props> = ({ onClose, show }) => {
  interface TodoDate {
    title: string;
    assignTo: string;
    dueDate: string;
    dueTime: string;
    level: string;
    description: string;
  }
  const [newTodo, setNewTodo] = useState<TodoDate>({
    title: "",
    assignTo: "self",
    dueDate: "",
    dueTime: "",
    level: "new",
    description: "",
  });

  type Error = Record<string, string>;
  const [errorList, setErrorList] = useState<Error>({});
  const [loader, setLoader] = useState<Boolean>(false);

  const validateData = (data: TodoDate) => {
    let error: Record<string, string> = {};
    if (!data?.title || data?.title?.length <= 0) {
      error["title"] = "title can not be emtpy";
    } else if (data?.title?.length < 2) {
      error["title"] = "Title length can not be less than 2";
    } else if (data?.title?.length > 20) {
      error["title"] = "Title length can not be greater than 20";
    }

    if (!data?.description || data?.description?.length <= 0) {
      error["description"] = "Description can not be emtpy";
    } else if (data?.description?.length < 2) {
      error["description"] = "Description length can not be less than 2";
    } else if (data?.description?.length > 200) {
      error["description"] = "Description length can not be greater than 200";
    }

    if (data?.dueDate?.length <= 0) {
      error["dueDate"] = "Due Date can not be empty";
    }

    if (data?.dueTime?.length <= 0) {
      error["dueTime"] = "Due Time can not be empty";
    }

    return error;
  };

  const storeDataInDb = async () => {
    const dataToBeSend = JSON.parse(JSON.stringify(newTodo));
    try {
      const response = await fetch("http://localhost:3001/api/createTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToBeSend),
        credentials: "include", // Include credentials for cross-origin requests
      });
      if (response?.status !== 200) {
        setLoader(false);
      } else {
        onClose();
      }
    } catch (error) {
      console.log("error is =>", error);
      setLoader(false);
    }
  };
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    //validate
    setLoader(true);
    const errors = validateData(newTodo);
    if (Object.keys(errors)?.length > 0) {
      setLoader(false);
      return setErrorList(errors);
    }
    setErrorList({});
    storeDataInDb();
    //STORE TODO IN BACKEND:-
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = event.target.value;

    setNewTodo((prev) => ({ ...prev, level: value }));
  };

  const handleArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-primary bg-gradient modal-close">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-white"
          >
            Create New Todo
          </Modal.Title>
          <i
            onClick={onClose}
            className="fa-solid fa-xmark fa-xl text-white"
          ></i>
        </Modal.Header>
        <Modal.Body className="bg-main">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Title
              </label>
              <input
                type="text"
                placeholder="Enter Title"
                className={`form-control ${
                  errorList?.title ? "is-invalid " : ""
                }`}
                onChange={handleChange}
                value={newTodo?.title}
                name="title"
              />
              {errorList?.title ? (
                <div className="text-danger">{errorList?.title}</div>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="inputState" className="form-label">
                Assign to
              </label>
              <select
                //   onChange={handleChange}
                value={newTodo?.assignTo}
                id="inputState"
                name="assingTo"
                className={`form-control ${
                  errorList?.assignTo ? "is-invalid " : ""
                }`}
              >
                <option selected>Self </option>
                <option disabled value={"team"}>
                  Team
                </option>
              </select>{" "}
              {errorList?.assignTo ? (
                <div className="text-danger">{errorList?.assignTo}</div>
              ) : (
                ""
              )}
            </div>
            <div className="col-6">
              <label htmlFor="inputAddress" className="form-label">
                Due Date
              </label>
              <input
                type="date"
                className={`form-control ${
                  errorList?.dueDate ? "is-invalid " : ""
                }`}
                id="inputAddress"
                placeholder="Enter Description for todo"
                min={3}
                max={3}
                onChange={handleChange}
                value={newTodo?.dueDate}
                name="dueDate"
              />
              {errorList?.dueDate ? (
                <div className="text-danger">{errorList?.dueDate}</div>
              ) : (
                ""
              )}
            </div>
            <div className="col-6">
              <label htmlFor="inputAddress" className="form-label">
                Due Time
              </label>
              <input
                type="time"
                className={`form-control ${
                  errorList?.dueTime ? "is-invalid " : ""
                }`}
                id="inputAddress"
                placeholder="Enter Description for todo"
                name="dueTime"
                value={newTodo?.dueTime}
                onChange={handleChange}
              />
              {errorList?.dueTime ? (
                <div className="text-danger">{errorList?.dueTime}</div>
              ) : (
                ""
              )}
            </div>
            <div className="col-md-12">
              <label htmlFor="inputState" className="form-label">
                Progress Level
              </label>
              <select
                onChange={handleSelectChange}
                value={newTodo?.level}
                id="inputState"
                name="level"
                className={`form-control ${
                  errorList?.level ? "is-invalid " : ""
                }`}
              >
                {Object.keys(taskType)?.map((item: string, index) => {
                  return (
                    <option
                      value={(taskType as any)[item]}
                      selected={index === 0}
                      key={index}
                    >
                      {(taskType as any)[item]}{" "}
                    </option>
                  );
                })}
              </select>{" "}
            </div>

            <div className="col-12">
              <label htmlFor="exampleTextarea">Todo Description</label>
              <textarea
                name="description"
                placeholder="Enter description"
                onChange={handleArea}
                rows={3}
                value={newTodo?.description}
                className={`form-control mt-3 ${
                  errorList?.description ? "is-invalid " : ""
                }`}
              />
              {errorList?.description ? (
                <div className="text-danger">{errorList?.description}</div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-main">
          <Button onClick={onClose} variant="outline-danger">
            Cancel
          </Button>{" "}
          {loader ? (
            <div
              className="spinner-border text-primary  d-flex justify-content-center mx-auto "
              role="status"
            ></div>
          ) : (
            <Button onClick={submitForm}>Add todo</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateTodoModal;
