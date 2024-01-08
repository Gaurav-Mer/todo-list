import React, { useState } from "react";
import { taskType } from "../helpers/constant";
import styles from "../register.module.css";
import CreateTodoModal from "./modal/createTodoModal";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

interface StateProps {
  setTodoList: React.Dispatch<React.SetStateAction<any>>;
  userData: Record<any, any>;
}

const DesktopLeft: React.FC<StateProps> = ({ setTodoList, userData }) => {
  const navigator = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  const tType = queryParameters.get("tType");
  const aType = queryParameters.get("aType");

  //state
  const [modalShow, setModalShow] = useState(false);
  //function
  const handleCloseModal = () => {
    setModalShow((prev) => !prev);
  };

  const handleRoute = (type: any) => {
    if (type) {
      navigator(`?tType=${type}`);
    } else {
      navigator("/");
    }
  };

  const [userAvatar, setUserAvatar] = useState<any>(null);
  const sumitData = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", userAvatar);
      formData.append("id", "658e76f09ea8ef1ae7259dd1");
      const response = await fetch(`http://localhost:3001/api/uploadAvatar`, {
        method: "POST",

        body: formData,
      });
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  };

  const handleImage = async (file: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = file?.target?.files ? file.target.files[0] : null;

    try {
      const options = {
        maxSizeMB: 0.5,
        useWebWorker: true,
      };
      if (selectedFile) {
        const compressedImage = await imageCompression(selectedFile, options);
        setUserAvatar(compressedImage);
      }
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  console.log("user avaar", userData);
  return (
    <div className={`bg-white vh-100 p-4 `}>
      <div
        onClick={() => {
          setModalShow((prev) => !prev);
        }}
        className="bg-primary p-2 rounded-3 d-flex gap-4"
        style={{ cursor: "pointer" }}
      >
        <button
          className="bg-white fw-bold  rounded-2 text-primary "
          style={{ border: "none" }}
        >
          <i className="fa-solid fw-bold fa-list fa-sm"></i>{" "}
        </button>
        <span className="text-white">
          Create New <i className="fa-solid fa-plus ms-2 fa-sm "></i>
        </span>
      </div>
      <button className="border-0 bg-transparent text-secondary fs-5 mt-4">
        <i className="fa-solid fa-list-check fa-sm "></i>
        <span className="m-2" style={{ fontSize: 18, fontWeight: "600" }}>
          Assign to
        </span>
      </button>
      <ul className={styles.nested}>
        <li
          style={{
            color: !aType ? "#0d6efd" : "",
            fontWeight: !aType ? "500" : "",
            background: !aType ? "#f2f2f2" : "",
            padding: !aType ? 5 : "",
            borderRadius: !aType ? 5 : "",
          }}
        >
          <i className="fa-solid   fa-user fa-sm"></i> self
        </li>
        <li>
          <i
            className="fa-solid fa-user-group text-secondary me-1"
            style={{ fontSize: 12 }}
          ></i>
          Team <i className="fa-solid fa-lock fa-sm ms-3"></i>
        </li>
      </ul>
      <button className="border-0 bg-transparent text-secondary fs-5 mt-2">
        <i className="fa-solid fa-clipboard-list fa-sm"></i>
        <span className="m-2" style={{ fontSize: 18, fontWeight: "600" }}>
          Task Type
        </span>
      </button>
      <ul className={styles.nested}>
        <li
          onClick={() => handleRoute("")}
          style={{
            color: !tType ? "#0d6efd" : "",
            fontWeight: !tType ? "500" : "",
            background: !tType ? "#f2f2f2" : "",
            padding: !tType ? 5 : "",
            borderRadius: !tType ? 5 : "",
          }}
        >
          All
        </li>
        {Object.keys(taskType)?.map((item: string, index) => {
          const todoVal = (taskType as any)[item];
          return (
            <li
              style={{
                color:
                  tType?.toLowerCase() === todoVal?.toLowerCase()
                    ? "#0d6efd"
                    : "",
                fontWeight:
                  tType?.toLowerCase() === todoVal?.toLowerCase() ? "500" : "",
                background:
                  tType?.toLowerCase() === todoVal?.toLowerCase()
                    ? "#f2f2f2"
                    : "",
                padding:
                  tType?.toLowerCase() === todoVal?.toLowerCase() ? 5 : "",
                borderRadius:
                  tType?.toLowerCase() === todoVal?.toLowerCase() ? 5 : "",
              }}
              onClick={() => handleRoute(todoVal)}
              key={index}
            >
              {(taskType as any)[item]}
            </li>
          );
        })}
      </ul>
      {modalShow ? (
        <CreateTodoModal
          setTodoList={setTodoList}
          show={modalShow}
          onClose={handleCloseModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default DesktopLeft;
