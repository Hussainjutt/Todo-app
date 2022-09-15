import React, { useEffect, useState } from "react";
import Header from "./header/index";
import SideBar from "./sidebar/index";
import "./style.css";
const Index = ({ children, title }) => {
  const [sidebar, setSideBar] = useState(false);
  return (
    <div className={`layout-main-container`}>
      <div className="header-wrapper">
        <Header sidebar={sidebar} setSideBar={setSideBar} title={title} />
      </div>
      <div className={`sideBar-wrapper ${sidebar && "show"}`}>
        <SideBar />
      </div>
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Index;
