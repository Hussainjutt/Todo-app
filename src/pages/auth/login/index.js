import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import LogInImg from "../../../assets/svgs/login.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { Formik } from "formik";
import * as yup from "yup";
import { addToken, addUserInfo } from "../../../components/action/action";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
const Index = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
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
        date = date.toISOString().split("T")[0];
        dispatch(addUserInfo({ ...req.data.data, date_of_birth: date }));
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
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className={
                      errors.password && touched.password ? "input_error" : ""
                    }
                    size="sm"
                  />
                  {errors.password && touched.password && (
                    <>
                      <span className="error_text">{errors.password}</span>
                      <br />
                    </>
                  )}
                  <Form.Text
                    className="text-muted"
                    onClick={() => navigate("/confirmemail")}
                  >
                    Forgot your password?
                  </Form.Text>
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
