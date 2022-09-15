import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import confirmEmail from "../../../assets/svgs/confirmemail.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik } from "formik";
import * as yup from "yup";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const Index = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const forgotPassword = async (values) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/forgotpassword`,
        values
      );
      toast.success("Password reset link has been sent to your email");
      setLoader(false);
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
        style={{ marginTop: "2rem", gridGap: "5rem" }}
      >
        <div className="auth_card">
          <div className="auth_card_header">Email Confirmation</div>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={schema}
            onSubmit={(values) => {
              setLoader(true);
              forgotPassword(values);
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
                <Button
                  variant="dark"
                  type="button"
                  className="w-25 mt-4"
                  onClick={() => navigate("/")}
                  disabled={loader}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-25 mt-4"
                  style={{ float: "right" }}
                  disabled={loader}
                >
                  {loader ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <div className="auth_page_img">
          <img
            src={confirmEmail}
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
});
export default Index;
