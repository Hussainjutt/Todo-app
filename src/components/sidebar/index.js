import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Aside from "./aside/Aside";

const Layout = ({ children, title }) => {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [fix, setFix] = useState(true);
  const [width, setWidth] = useState("");
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <Header
        handleToggleSidebar={handleToggleSidebar}
        title={title}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        fix={fix}
        setFix={setFix}
        width={width}
      />
      <div className={`app  ${toggled ? "toggled" : ""}`}>
        <Aside
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          fix={fix}
          setWidth={setWidth}
        />
        <main>
          <div className="app-content">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
