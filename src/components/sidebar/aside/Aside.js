import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaUserCircle, FaList } from "react-icons/fa";
import { RiLogoutBoxFill, RiFileList2Line } from "react-icons/ri";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import Dummy from "../../../assets/images/dummy-man.png";
import ErrorImg from "../../../assets/images/errorImg.jpg";
const Aside = ({
  toggled,
  handleToggleSidebar,
  collapsed,
  setCollapsed,
  fix,
  screenSize,
}) => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.profileReducer.userInfo);
  const [index, setIndex] = useState("");
  const HandleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <ProSidebar
      toggled={toggled}
      collapsed={screenSize <= 992 ? false : collapsed}
      breakPoint="lg"
      onToggle={handleToggleSidebar}
      onMouseEnter={() => {
        if (fix) {
          return null;
        } else {
          setCollapsed(false);
        }
      }}
      onMouseLeave={() => {
        if (fix) {
          return null;
        } else {
          setCollapsed(true);
        }
      }}
    >
      <SidebarHeader>
        <div className="sidebar-header">
          <div className="d-flex justify-content-center">
            <div className="position-absolute bottom-0">
              <img
                src={
                  data.profile_pic === null
                    ? Dummy
                    : `https://juttv1.herokuapp.com/img/users/${data.profile_pic}`
                }
                style={{ border: !fix && "7px solid transparent" }}
                onError={(e) => (e.target.src = ErrorImg)}
                className="user-image"
                alt="Somthing went wrong"
              />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaUserCircle />}>
            <NavLink to={"/profile"}>Profile</NavLink>
          </MenuItem>
          {data.user_type === "admin" && (
            <MenuItem icon={<RiFileList2Line />}>
              <NavLink to={"/editUsers"}>User List</NavLink>
            </MenuItem>
          )}
          <MenuItem icon={<FaList />}>
            <NavLink to={"/todoList"}>Todo List</NavLink>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px",
          }}
        >
          <span
            onClick={HandleLogout}
            style={{
              border: "1px solid white",
              borderRadius: ".3rem",
              padding: "8px 10px",
              cursor: "pointer",
              color: "white",
            }}
            title="LogOut"
          >
            <RiLogoutBoxFill />
            {!collapsed && <span> Log Out</span>}
          </span>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
