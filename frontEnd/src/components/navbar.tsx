import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary bg-gradient  text-white">
      <div className="container-fluid">
        <a className="navbar-brand text-white fw-bold " href="#">
          Todo List
        </a>

        <div className="d-flex gap-4">
          {true ? (
            <img
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              className="rounded-circle"
              style={{ width: 40 }}
              alt="Avatar"
            />
          ) : (
            <div
              className="rounded-circle bg-secondary container fw-bold d-flex align-items-center justify-content-center"
              style={{ width: 40, height: 40 }}
            >
              G
            </div>
          )}
          <button className="text-white align-items-center d-flex container border-0 bg-transparent">
            <span className="d-none d-sm-block ">logout</span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
              style={{ marginLeft: 8 }}
            >
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
