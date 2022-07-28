import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
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
const Index = () => {
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
              date_of_birth: "",
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
            }) => (
              <form onSubmit={handleSubmit}>
                <Row className="g-2 mt-4">
                  <Col md>
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="First name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.first_name && touched.first_name
                            ? "input_error"
                            : ""
                        }
                        size="sm"
                      />
                      {errors.first_name && touched.first_name && (
                        <>
                          <span className="error_text">
                            {errors.first_name}
                          </span>
                        </>
                      )}
                    </FloatingLabel>
                  </Col>
                  <Col md>
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Last name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.last_name && touched.last_name
                            ? "input_error"
                            : ""
                        }
                        size="sm"
                      />
                      {errors.last_name && touched.last_name && (
                        <>
                          <span className="error_text">{errors.last_name}</span>
                        </>
                      )}
                    </FloatingLabel>
                  </Col>
                </Row>
                <FloatingLabel
                  controlId="floatingDate"
                  className="mb-3"
                  label="Date of birth"
                >
                  <Form.Control
                    type="date"
                    placeholder="dd/mm/yy"
                    name="date_of_birth"
                    value={values.date_of_birth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.date_of_birth && touched.date_of_birth
                        ? "input_error"
                        : ""
                    }
                    size="sm"
                  />
                  {errors.date_of_birth && touched.date_of_birth && (
                    <>
                      <span className="error_text">{errors.date_of_birth}</span>
                    </>
                  )}
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    size="sm"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "input_error" : ""
                    }
                  />
                  {errors.email && touched.email && (
                    <>
                      <span className="error_text">{errors.email}</span>
                    </>
                  )}
                </FloatingLabel>
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
  date_of_birth: yup.string().required("Date of birth is required"),
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
