import React, { useEffect, useState } from "react";
import styles from "../register.module.css";

export default function Register() {
  interface formFormat {
    name: string;
    email: string;
    avatar: string;
    password: string;
    confirmPassword: string;
  }
  const [formData, setFormData] = useState<formFormat>({
    name: "",
    email: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });
  type error = Record<string, string>;
  const [errorData, setErrorData] = useState<error>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ---------------------- handle the image change --------------
  const handleImage = (file: React.ChangeEvent<HTMLInputElement>) => {
    if (file.target.files && file.target.files[0]) {
      // ---- converting image to base64 ---------
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0]);
      reader.onload = () => {
        let baseURL = reader.result as string;
        setFormData((prev) => ({ ...prev, avatar: baseURL }));
      };
    }
  };

  const validateData = (data: formFormat) => {
    let error: Record<string, string> = {}; // Define the type of the error object
    if (!data?.name || data?.name?.length <= 0) {
      error["name"] = "Please Enter name";
    } else if (data?.name?.length > 20) {
      error["name"] = "Maximum 20 length allowed for name";
    }
    if (!data?.email || data?.email?.length <= 0) {
      error["email"] = "Please Enter email";
    } else if (data?.email?.length > 40) {
      error["email"] = "Maximum 40 length allowed";
    }

    if (!data?.password || data?.password?.length <= 0) {
      error["password"] = "Password can not be empty";
    } else if (data?.password?.length > 20) {
      error["password"] = "Maximum 20 length allowed";
    }

    if (!data?.confirmPassword || data?.confirmPassword?.length <= 0) {
      error["confirmPassword"] = "confirmPassword can not be empty";
    } else if (data?.confirmPassword?.length > 20) {
      error["confirmPassword"] = "Maximum 20 length allowed";
    }

    if (data?.password !== data?.confirmPassword) {
      error["confirmPassword"] = "Password did not match";
    }

    return error;
  };

  const sendDataToBackEnd = async () => {
    const dataToBeSend = JSON.parse(JSON.stringify(formData));
    delete dataToBeSend.confirmPassword;
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToBeSend),
      });
    } catch (error) {
      console.log("error is =>", error);
    }
  };
  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const errorList = validateData(formData);
    if (Object.keys(errorList)?.length > 0) {
      return setErrorData(errorList);
    }
    setErrorData({});
    sendDataToBackEnd();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/register");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once on mount

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className="mt-5">
          <h3>Create your account</h3>
          <div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter your Name
              </label>
              <div className="input-group ">
                <div className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </div>
                <input
                  onChange={(e) => handleChange(e)}
                  name="name"
                  type="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="John"
                  className={`form-control ${
                    errorData?.name ? "is-invalid " : ""
                  }`}
                />
              </div>
              {errorData?.name ? (
                <div className="text-danger">{errorData?.name}</div>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter your Email
              </label>

              <div className="input-group">
                <div className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                  </svg>
                </div>
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="abc@gmail.com"
                  className={`form-control ${
                    errorData?.email ? "is-invalid " : ""
                  }`}
                />
              </div>
              {errorData?.email ? (
                <div className="text-danger">{errorData?.email}</div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Enter Password
              </label>
              <div className="input-group ">
                <div className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-lock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="**********"
                  onChange={handleChange}
                  name="password"
                  className={`form-control ${
                    errorData?.password ? "is-invalid " : ""
                  }`}
                />
              </div>
              {errorData?.password ? (
                <div className="text-danger">{errorData?.password}</div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Confirm Password
              </label>
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-lock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="exampleInputPassword1"
                  placeholder="**********"
                  onChange={handleChange}
                  name="confirmPassword"
                  className={`form-control ${
                    errorData?.confirmPassword ? "is-invalid " : ""
                  }`}
                />
              </div>
              {errorData?.confirmPassword ? (
                <div className="text-danger">{errorData?.confirmPassword}</div>
              ) : (
                ""
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Select Avatar
              </label>
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fill-rule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </div>
                {formData?.avatar ? (
                  <p
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    {formData?.avatar?.slice(0, 20)}{" "}
                    <svg
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, avatar: "" }))
                      }
                      style={{ color: "red", marginTop: 5, cursor: "pointer" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-x-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                  </p>
                ) : (
                  <>
                    <label
                      style={{ width: "83%" }}
                      className="input-group-text"
                      htmlFor="inputGroupFile01"
                    >
                      Upload your avatar
                    </label>
                    <input
                      onChange={handleImage}
                      style={{ display: "none" }}
                      type="file"
                      className="form-control"
                      id="inputGroupFile01"
                    />
                  </>
                )}
              </div>
            </div>

            <button
              onClick={onSubmitForm}
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Submit
            </button>
            <p className="mt-2">
              Already Member ? <a href="/login">log In now</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
