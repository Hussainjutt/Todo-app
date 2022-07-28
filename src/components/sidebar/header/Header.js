import React from "react";
import { FaBars } from "react-icons/fa";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dummy from "../../../assets/images/dummy-man.png";
import ErrorImg from "../../../assets/images/errorImg.jpg";
import { removeToken, removeData } from "../../../components/action/action";
import { BiLogOut } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const data = useSelector((state) => state.profileReducer.userInfo);
  const dispatch = useDispatch();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleLogout = () => {
    dispatch(removeToken());
    dispatch(removeData());
    navigate("/");
  };
  return (
    <header>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div
              className={`btn-toggle ${classes.menuButton}`}
              onClick={() => props.handleToggleSidebar(true)}
            >
              <FaBars />
            </div>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>

            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <img
                  src={
                    data.profile_pic == null
                      ? Dummy
                      : `${process.env.REACT_APP_IMG_URL}/${data.profile_pic}`
                  }
                  onError={(e) => (e.target.src = ErrorImg)}
                  className="user-image"
                  style={{ width: "40px", height: "40px" }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={HandleLogout}>
                  Log-out
                  <BiLogOut />
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};

export default Header;
