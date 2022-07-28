import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { isAfter } from "date-fns";

const useAuth = () => {
  const userRole = useSelector(
    (state) => state.profileReducer.userInfo.user_type
  );
  let auth = { isAuthenticated: false };
  const token = useSelector((state) => state.profileReducer.token);
  const Exp = new Date(jwtDecode(token).exp * 1000);
  if (userRole === "admin" && isAfter(new Date(), Exp)) {
    console.log("True", userRole === "admin" && isAfter(new Date(), Exp));
    auth.isAuthenticated = false;
  } else {
    auth.isAuthenticated = true;
  }
  return auth.isAuthenticated;
};
const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
