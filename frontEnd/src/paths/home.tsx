import React, { useState } from "react";
import Navbar from "../components/navbar";
import DesktopLeft from "../components/desktopLeft";
import styles from "../register.module.css";
import RightSide from "../components/rightSide";

const Home: React.FC = () => {
  return (
    <div className={`container-fluid p-0 ${styles.bg}`}>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <DesktopLeft />
          </div>
          <div className="col-10">
            <RightSide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
