import React, { useState } from "react";
import "./style.css";
import { MdMenu } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import Dummy from "../../../assets/images/dummy-man.png";
import ErrorImg from "../../../assets/images/errorImg.jpg";
import Skeleton from "@mui/material/Skeleton";

const Index = (props) => {
  const data = useSelector((state) => state.profileReducer.userInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div
        className="sidebar-controller"
        onClick={() => props.setSideBar(true)}
      >
        <MdMenu />
      </div>
      <p className="page-title">
        {props.loader ? (
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", bgcolor: "#181818" }}
            width={120}
            height={60}
            animation="wave"
          />
        ) : (
          props.title
        )}
      </p>
      <div className="info-container">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {props.loader ? (
            <Skeleton
              variant="circular"
              sx={{ bgcolor: "gray" }}
              width={40}
              height={40}
              animation="wave"
            />
          ) : (
            <img
              src={
                data.profile_pic === null
                  ? Dummy
                  : `https://juttv1.herokuapp.com/img/users/${data.profile_pic}`
              }
              style={{ border: "4px solid gray" }}
              onError={(e) => (e.target.src = ErrorImg)}
              alt="Somthing went wrong"
            />
          )}
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
          <MenuItem onClick={HandleLogout}>
            Log-out
            <BiLogOut />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Index;
