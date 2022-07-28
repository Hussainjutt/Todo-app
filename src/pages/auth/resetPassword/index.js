import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
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
      <div
        className="auth_page_container"
        style={{ marginTop: "3rem", gridGap: "8rem" }}
      >
        <ToastContainer pauseOnHover={true} />
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
              handleChange,
              values,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="sm"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password ? "input_error" : ""
                    }
                  />
                  {errors.password && touched.password && (
                    <>
                      <span className="error_text">{errors.password}</span>
                    </>
                  )}
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Confirm Password"
                >
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    size="sm"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "input_error"
                        : ""
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <>
                      <span className="error_text">
                        {errors.confirmPassword}
                      </span>
                    </>
                  )}
                </FloatingLabel>
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
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export default Index;
