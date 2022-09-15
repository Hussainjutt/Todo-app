import React, { useState, useEffect } from "react";
import Header from "./header/Header";
import Aside from "./aside/Aside";

const Layout = ({ children, title }) => {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [fix, setFix] = useState(true);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  const [winwidth, setWinwidth] = useState(null);
  useEffect(() => {
    window.addEventListener("resize", setWinwidth(window.innerWidth));
    window.addEventListener("DOMContentLoaded", setWinwidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", setWinwidth(window.innerWidth));
      window.addEventListener(
        "DOMContentLoaded",
        setWinwidth(window.innerWidth)
      );
    };
  }, [winwidth]);
  return (
    <>
      <Header
        handleToggleSidebar={handleToggleSidebar}
        title={title}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        fix={fix}
        setFix={setFix}
        width={winwidth}
      />
      <div className={`app  ${toggled ? "toggled" : ""}`}>
        <Aside
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          fix={fix}
          screenSize={winwidth}
        />
        <main>
          <div className="app-content">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
