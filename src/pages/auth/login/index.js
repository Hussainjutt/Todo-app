import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import LogInImg from "../../../assets/svgs/login.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Formik } from "formik";
import * as yup from "yup";
import { addToken, addUserInfo } from "../../../components/redux/action/index";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Index = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();
  const logIn = async (values) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        values
      );
      if (req.data.data.is_active === false) {
        toast.error("Your account is not active try again later");
        setLoader(false);
      } else {
        toast.success("Login Successful");
        const token = JSON.stringify(req.data.token);
        localStorage.setItem("token", token);
        let date = new Date(req.data.data.date_of_birth);
        dispatch(
          addUserInfo({
            ...req.data.data,
            date_of_birth: date.toISOString().split("T")[0],
          })
        );
        dispatch(addToken(req.data.token));
        setLoader(false);
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response.data.message);
      setLoader(false);
    }
  };
  useEffect(() => {
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  return (
    <>
      <ToastContainer pauseOnHover={true} />
      <div className="auth_page_container gap-5" style={{ marginTop: "5rem" }}>
        <div className="auth_card">
          <div className="auth_card_header">LOGIN</div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={schema}
            onSubmit={(values) => {
              setLoader(true);
              logIn(values);
            }}
          >
            {({
              handleBlur,
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  className="mb-3"
                  error={errors.email && touched.email}
                  id={
                    errors.email && touched.email
                      ? "outlined-error-helper-text"
                      : "outlined-basic"
                  }
                  label={
                    errors.email && touched.email ? "Error" : "Email Address"
                  }
                  variant="outlined"
                  helperText={
                    errors.email &&
                    touched.email &&
                    "Please Enter an valid Email"
                  }
                  type="email"
                  value={values.email}
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
                  onBlur={handleBlur}
                  fullWidth
                />
                <TextField
                  error={errors.password && touched.password}
                  id={
                    errors.email && touched.email
                      ? "outlined-error-helper-text"
                      : "outlined-basic"
                  }
                  label={
                    errors.password && touched.password ? "Error" : "Password"
                  }
                  variant="outlined"
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  type={visibility ? "text" : "password"}
                  value={values.password}
                  onChange={(e) => {
                    setFieldValue("password", e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setVisibility(!visibility)}
                        >
                          {visibility ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onBlur={handleBlur}
                  fullWidth
                />
                <Form.Text
                  className="text-muted"
                  onClick={() => navigate("/confirmemail")}
                >
                  Forgot your password?
                </Form.Text>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4"
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>
            )}
          </Formik>
          <hr />
          <div className="auth_card_footer_text">
            Don't have an account ?
            <span onClick={() => navigate("/signup")}> SignUp</span>
          </div>
        </div>
        <div className="auth_page_img">
          <img
            src={LogInImg}
            style={{ width: "100%" }}
            alt="somthing went wrong"
          />
        </div>
      </div>
    </>
  );
};
let schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter an valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
export default Index;
