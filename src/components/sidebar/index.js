import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Aside from "./aside/Aside";

const Layout = ({ children, title }) => {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [fix, setFix] = useState(true);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <div className={`app  ${toggled ? "toggled" : ""}`}>
        <Aside
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          fix={fix}
        />
        <main>
          <Header
            handleToggleSidebar={handleToggleSidebar}
            title={title}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            fix={fix}
            setFix={setFix}
          />
          <div className="app-content">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Layout;
