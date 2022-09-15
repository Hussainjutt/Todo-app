import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaUser, FaClipboardList } from "react-icons/fa";
import { RiTodoFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux/es/exports";
import Dummy from "../../../assets/images/dummy-man.png";
import ErrorImg from "../../../assets/images/errorImg.jpg";
const Index = () => {
  const data = useSelector((state) => state.profileReducer.userInfo);
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <ProSidebar>
      <SidebarHeader>
        <div className="mt-5 mb-5 user-img">
          <img
            src={
              data.profile_pic === null
                ? Dummy
                : `https://juttv1.herokuapp.com/img/users/${data.profile_pic}`
            }
            onError={(e) => (e.target.src = ErrorImg)}
            alt="Somthing went wrong"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem icon={<FaUser />} onClick={() => navigate("/profile")}>
            Profile
          </MenuItem>
          {data.user_type === "admin" && (
            <MenuItem
              icon={<FaClipboardList />}
              onClick={() => navigate("/editUsers")}
            >
              User's
            </MenuItem>
          )}
          <MenuItem icon={<RiTodoFill />} onClick={() => navigate("/todoList")}>
            Todo List
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <div className="sideBar-logout-button mt-4 mb-4" onClick={HandleLogout}>
          Logout
          <span>
            <FiLogOut />
          </span>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Index;
