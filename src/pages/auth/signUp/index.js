import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SignUPImg from "../../../assets/svgs/signup.svg";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
const Index = () => {
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const signUp = async (values) => {
    try {
      const req = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        values
      );
      toast.success(req.data.message);
      setLoader(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoader(false);
    }
  };
  return (
    <>
      <ToastContainer pauseOnHover={true} />
      <div
        className="auth_page_container"
        style={{ marginTop: "3rem", gridGap: "5rem" }}
      >
        <div className="auth_card">
          <div className="auth_card_header">SIGN UP</div>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              date_of_birth: null,
              email: "",
              password: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              setLoader(true);
              signUp(values);
            }}
          >
            {({
              handleBlur,
              handleSubmit,
              handleChange,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Row className="g-2 mt-4">
                  <Col md>
                    <TextField
                      className="mb-3"
                      error={errors.first_name && touched.first_name}
                      id={
                        errors.email && touched.email
                          ? "outlined-error-helper-text"
                          : "outlined-basic"
                      }
                      label={
                        errors.first_name && touched.first_name
                          ? "Error"
                          : "First Name"
                      }
                      variant="outlined"
                      helperText={
                        errors.first_name &&
                        touched.first_name &&
                        errors.first_name
                      }
                      type="text"
                      value={values.first_name}
                      onChange={(e) => {
                        setFieldValue("first_name", e.target.value);
                      }}
                      onBlur={handleBlur}
                      fullWidth
                    />
                  </Col>
                  <Col md>
                    <TextField
                      className="mb-3"
                      error={errors.last_name && touched.last_name}
                      id={
                        errors.last_name && touched.last_name
                          ? "outlined-error-helper-text"
                          : "outlined-basic"
                      }
                      label={
                        errors.last_name && touched.last_name
                          ? "Error"
                          : "First Name"
                      }
                      variant="outlined"
                      helperText={
                        errors.last_name &&
                        touched.last_name &&
                        errors.last_name
                      }
                      type="text"
                      value={values.last_name}
                      onChange={(e) => {
                        setFieldValue("last_name", e.target.value);
                      }}
                      onBlur={handleBlur}
                      fullWidth
                    />
                  </Col>
                </Row>
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="mb-3"
                    label={
                      errors.date_of_birth && touched.date_of_birth
                        ? "Error"
                        : "Date Of Birth"
                    }
                    value={values.date_of_birth}
                    onChange={(newValue) => {
                      setFieldValue("date_of_birth", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        helperText={
                          errors.date_of_birth &&
                          touched.date_of_birth &&
                          errors.date_of_birth
                        }
                        fullWidth
                        {...params}
                        error={errors.date_of_birth && touched.date_of_birth}
                      />
                    )}
                  />
                </LocalizationProvider>

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
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4"
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            )}
          </Formik>
          <hr />
          <div className="auth_card_footer_text">
            Have an account ? <span onClick={() => navigate("/")}> LogIn</span>
          </div>
        </div>
        <div className="auth_page_img">
          <img
            src={SignUPImg}
            style={{ width: "100%" }}
            alt="somthing went wrong"
          />
        </div>
      </div>
    </>
  );
};
let schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  date_of_birth: yup
    .date()
    .typeError("please enter a valid date")
    .required()
    .min("1969-11-13", "Date is too early")
    .max("2012-11-13", "Date is not correct"),
  email: yup
    .string()
    .email("Enter an valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum."),
});
export default Index;
