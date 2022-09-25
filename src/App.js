import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todoapp from "./pages/todo_app/index";
import LogIn from "./pages/auth/login/index";
import SignUp from "./pages/auth/signUp/index";
import ConfirmEmail from "./pages/auth/confirmEmail/index";
import ResetPassword from "./pages/auth/resetPassword/index";
import Profile from "./pages/profile/index";
import EditUsers from "./pages/usersData/index";
import ProtectedRoutes from "./protectedRoutes";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/confirmEmail" element={<ConfirmEmail />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/todoList" element={<Todoapp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/editUsers" element={<EditUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
