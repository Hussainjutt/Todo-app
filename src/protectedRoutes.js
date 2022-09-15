import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";
import isAfter from "date-fns/isAfter";

const useAuth = () => {
  let auth = { isAuthenticated: false };
  const token = JSON.parse(localStorage.getItem("token"));
  const Exp = new Date(jwtDecode(token).exp * 1000);
  if (isAfter(new Date(), Exp)) {
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
