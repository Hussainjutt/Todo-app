import React from "react";
import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaUserCircle,
  FaGem,
  FaList,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import { RiLogoutBoxFill, RiFileList2Line } from "react-icons/ri";
import "react-pro-sidebar/dist/css/styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Dummy from "../../../assets/images/dummy-man.png";
import ErrorImg from "../../../assets/images/errorImg.jpg";

const Aside = ({ toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.profileReducer.userInfo);
  const HandleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <ProSidebar
      toggled={toggled}
      breakPoint="lg"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div className="sidebar-header">
          <p className="user-name text-white mb-2">
            {data.first_name == " "
              ? "user name"
              : data.first_name + " " + data.last_name}
          </p>
          <p className="user-email">{data.email}</p>
          <div className="d-flex justify-content-center">
            <div className="position-absolute bottom-0">
              <img
                src={
                  data.profile_pic == null
                    ? Dummy
                    : `https://juttv1.herokuapp.com/img/users/${data.profile_pic}`
                }
                onError={(e) => (e.target.src = ErrorImg)}
                className="user-image"
              />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaUserCircle />}>
            <NavLink exact to={"/profile"}>
              Profile
            </NavLink>
          </MenuItem>
          {data.user_type === "admin" && (
            <MenuItem icon={<RiFileList2Line />}>
              <NavLink exact to={"/editUsers"}>
                Users
              </NavLink>
            </MenuItem>
          )}
          <MenuItem icon={<FaList />}>
            <NavLink exact to={"/todoList"}>
              Todo List
            </NavLink>{" "}
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
              border: "1px solid #ADADAD",
              borderRadius: ".3rem",
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            <RiLogoutBoxFill />
            <span> Log Out</span>
          </span>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
