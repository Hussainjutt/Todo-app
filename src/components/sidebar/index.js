import React, { useEffect, useState } from "react";
import Header from "./header/Header";
import Aside from "./aside/Aside";

function Layout({ children, title }) {
  const [rtl, setRtl] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <div
        className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}
        style={{ overflow: "hidden" }}
      >
        <Aside toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
        <main>
          <Header handleToggleSidebar={handleToggleSidebar} title={title} />
          <div className="app-content">{children}</div>
        </main>
      </div>
    </>
  );
}

export default Layout;
