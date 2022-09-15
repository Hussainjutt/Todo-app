import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ResetPassword from "../../../assets/svgs/resetpassword.svg";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
const Index = () => {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  var { token } = useParams();
  const [loading, setLoading] = useState(false);
  const resetPassword = async (values) => {
    setLoading(true);
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/resetPassword/${token}`,
        {
          password: values.password,
        }
      );
      toast.success("Password updated successfully");
      setLoading(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer pauseOnHover={true} />
      <div
        className="auth_page_container"
        style={{ marginTop: "3rem", gridGap: "8rem" }}
      >
        <div className="auth_card">
          <div className="auth_card_header">ResetPassword</div>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              resetPassword(values);
            }}
          >
            {({
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  className="mb-3"
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
                <TextField
                  error={errors.confirmPassword && touched.confirmPassword}
                  id={
                    errors.email && touched.email
                      ? "outlined-error-helper-text"
                      : "outlined-basic"
                  }
                  label={
                    errors.confirmPassword && touched.confirmPassword
                      ? "Error"
                      : "Confirm Password"
                  }
                  variant="outlined"
                  helperText={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
                  }
                  type={visibility2 ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={(e) => {
                    setFieldValue("confirmPassword", e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setVisibility2(!visibility2)}
                        >
                          {visibility2 ? <VisibilityOff /> : <Visibility />}
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
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <div className="auth_page_img">
          <img
            src={ResetPassword}
            style={{ width: "100%", maxHeight: "23rem" }}
            alt="somthing went wrong"
          />
        </div>
      </div>
    </>
  );
};
let schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum."),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export default Index;
