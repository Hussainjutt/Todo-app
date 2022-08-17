import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
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
              handleChange,
              values,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "input_error" : ""
                    }
                    size="sm"
                  />
                  {errors.email && touched.email && (
                    <>
                      <span className="error_text">{errors.email}</span>
                      <br />
                    </>
                  )}
                </FloatingLabel>
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
