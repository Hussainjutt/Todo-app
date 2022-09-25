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
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux/es/exports";
import Dummy from "../../../assets/images/dummy-man.png";
import ErrorImg from "../../../assets/images/errorImg.jpg";
import Skeleton from "@mui/material/Skeleton";

const menuItems = [
  { icon: FaUser, route: "/profile", title: "Profile" },
  { icon: RiTodoFill, route: "/todolist", title: "Todo List" },
  { icon: FaClipboardList, route: "/editUsers", title: "User's" },
];
const Index = (props) => {
  const data = useSelector((state) => state.profileReducer.userInfo);
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <ProSidebar>
      <span
        className="close-btn"
        onClick={() => {
          props.setSideBar(false);
        }}
      >
        <AiFillCloseCircle />
      </span>
      <SidebarHeader>
        {props.loader ? (
          <Skeleton
            variant="rounded"
            sx={{ bgcolor: "gray" }}
            width={70}
            height={66}
            animation="wave"
            className="mt-5 mb-5"
          />
        ) : (
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
        )}
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          {menuItems.map((el) => (
            <MenuItem
              style={{ pointerEvents: props.loader && "none" }}
              icon={
                props.loader ? (
                  <Skeleton
                    variant="rectangular"
                    width={15}
                    height={15}
                    animation="wave"
                  />
                ) : (
                  <el.icon />
                )
              }
              onClick={() => navigate(el.route)}
            >
              {props.loader ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={90}
                  height={40}
                  animation="wave"
                />
              ) : (
                el.title
              )}
            </MenuItem>
          ))}
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        {props.loader ? (
          <Skeleton
            className="mt-4 mb-4"
            sx={{ bgcolor: "gray" }}
            variant="rounded"
            height={50}
            width={150}
            animation="wave"
          />
        ) : (
          <div
            className="sideBar-logout-button mt-4 mb-4"
            onClick={HandleLogout}
          >
            Logout
            <span>
              <FiLogOut />
            </span>
          </div>
        )}
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Index;
