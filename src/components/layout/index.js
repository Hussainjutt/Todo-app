import React, { useEffect, useState } from "react";
import Header from "./header/index";
import SideBar from "./sidebar/index";
import "./style.css";
const Index = ({ children, title }) => {
  const [sidebar, setSideBar] = useState(false);
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 1500);
  return (
    <div className={`layout-main-container`}>
      <div className="header-wrapper">
        <Header setSideBar={setSideBar} loader={loader} title={title} />
      </div>
      <div className={`sideBar-wrapper ${sidebar && "show"}`}>
        <SideBar loader={loader} setSideBar={setSideBar} />
      </div>
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Index;
