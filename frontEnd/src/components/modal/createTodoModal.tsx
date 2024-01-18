import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { taskType } from "../../helpers/constant";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxConfig/store";

interface Props {
  onClose: any;
  show: any; // Define the type for onClick
  isEdit?: boolean;
  editData?: Record<any, any>;
  isCompleted?: boolean;
  setTodoList?: React.Dispatch<React.SetStateAction<any>>;
}
const CreateTodoModal: React.FC<Props> = ({
  onClose,
  show,
  isEdit = false,
  editData = {},
  isCompleted = false,
  setTodoList,
}) => {
  const userData = useSelector((state: RootState) => state?.userData);

  const params = new URLSearchParams(location.search);
  const tType = params.get("tType");
  type AssoType = Record<any, any>;
  interface TodoDate {
    title: string;
    assignTo: string;
    dueDate: string;
    dueTime: string;
    level: string;
    description: string;
    associateWith: AssoType[];
  }
  const [newTodo, setNewTodo] = useState<TodoDate>({
    title: "",
    assignTo: "self",
    dueDate: "",
    dueTime: "",
    level: "New",
    description: "",
    associateWith: [{ email: "", role: "user" }],
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
    if (!isEdit) {
      dataToBeSend.associateWith.push({
        email: userData?.email,
        role: "admin",
      });
    }
    //adding id for updating
    if (isEdit) {
      dataToBeSend.id = editData?._id;
    }
    try {
      let url = isEdit
        ? "http://localhost:3001/api/createTodo/update"
        : "http://localhost:3001/api/createTodo";
      const response = await fetch(url, {
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
        if (
          !isEdit &&
          setTodoList &&
          (!tType ||
            (tType &&
              tType?.toLowerCase() === dataToBeSend?.level?.toLowerCase()))
        ) {
          setTodoList((prev: Record<any, any>[]) => [dataToBeSend, ...prev]);
        } else if (isEdit && setTodoList) {
          setTodoList((prev: Record<any, any>[]) => {
            let obj = [...prev];
            const cIndex = obj.findIndex((data) => data?._id === editData?._id);
            if (cIndex >= 0) {
              if (!tType) {
                obj[cIndex] = {
                  ...dataToBeSend,
                  _id: editData?._id,
                  id: editData?._id,
                };
              } else {
                if (
                  tType &&
                  tType?.toLowerCase() === dataToBeSend?.level?.toLowerCase()
                ) {
                  obj[cIndex] = {
                    ...dataToBeSend,
                    _id: editData?._id,
                    id: editData?._id,
                  };
                } else {
                  //   delete obj[cIndex];
                  obj.splice(cIndex, 1);
                }
              }
            }
            return obj;
          });
        }
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

  const handleUser = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log("handleCHAnge", e.target.name, index);
  };

  const addNewUser = (index: any, type: any) => {
    console.log("index is ", index);

    setNewTodo((prev) => {
      let obj = { ...prev };
      if (type === "desc") {
        //removing the element
        obj.associateWith.splice(index, 1);
      } else {
        obj.associateWith.push({ email: "", role: "user" });
      }
      return obj;
    });
  };

  //handle data for the edit TODO:
  useEffect(() => {
    if (isEdit) {
      let eData = {
        title: editData?.title,
        assignTo: editData?.assignTo,
        dueDate: editData?.dueDate,
        dueTime: editData?.dueTime,
        level: isCompleted ? "Completed" : editData?.level,
        description: editData?.description,
        associateWith: editData?.associateWith,
      };
      setNewTodo(eData);
    }
  }, [isEdit]);

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
            style={{ cursor: "pointer" }}
            className="fa-solid fa-xmark fa-xl text-white"
          ></i>
        </Modal.Header>
        <Modal.Body>
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
                <option
                  disabled={
                    userData?.email === "gouravmer22@gmail.com" ? false : true
                  }
                >
                  Team
                </option>
              </select>{" "}
              {errorList?.assignTo ? (
                <div className="text-danger">{errorList?.assignTo}</div>
              ) : (
                ""
              )}
            </div>
            {newTodo?.associateWith?.map((item, index) => {
              return (
                <>
                  <div className="col-6 bg-light border-2 pb-2">
                    <input
                      name="email"
                      id="inputStateEmail"
                      placeholder="Enter email"
                      onChange={(e) => handleUser(e, 1)}
                      value={newTodo?.description}
                      className={`form-control  ${
                        errorList?.description ? "is-invalid " : ""
                      }`}
                    />
                    {errorList?.description ? (
                      <div className="text-danger">
                        {errorList?.description}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-4  bg-light border-2 pb-3  ">
                    <select
                      onChange={handleSelectChange}
                      value={newTodo?.level}
                      id="inputStateRole"
                      name="role"
                      className={`form-control ${
                        errorList?.level ? "is-invalid " : ""
                      }`}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>

                  <div className="col-1 ms-4">
                    {newTodo?.associateWith?.length - 1 === index ||
                    newTodo?.associateWith?.length === (isEdit ? 2 : 1) ? (
                      <Button
                        size="sm"
                        onClick={() => addNewUser(index, "inc")}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => addNewUser(index, "desc")}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </Button>
                    )}
                  </div>
                </>
              );
            })}
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
