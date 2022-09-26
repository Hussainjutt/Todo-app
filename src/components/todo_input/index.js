import React, { useState } from "react";
import "./style.css";
import { RiAddCircleLine } from "react-icons/ri";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";

const Index = (props) => {
  const token = useSelector((state) => state.profileReducer.token);
  const userID = useSelector((state) => state.profileReducer.userInfo.id);
  const [loader, setLoader] = useState(false);
  const createTodo = async (values, resetForm) => {
    setLoader(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/todos`, values, {
        headers: {
          jwt_token: token,
        },
      });
      toast.success("Todo created successfully");
      setLoader(false);
      props.counter(props.count + 1);
      resetForm();
    } catch (err) {
      toast.error(err.response.data.message);
      setLoader(false);
    }
  };
  return (
    <>
      <ToastContainer pauseOnHover={true} />
      <Formik
        initialValues={{ title: "", created_by: userID }}
        validationSchema={schema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          createTodo(values, resetForm);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="input_container">
              {props.loader ? (
                <Skeleton
                  variant="rounded"
                  sx={{ width: "100%" }}
                  height={40}
                  animation="wave"
                />
              ) : (
                <>
                  <button className="icon" type="submit">
                    {loader ? (
                      <Spinner animation="border" variant="info" size="sm" />
                    ) : (
                      <RiAddCircleLine />
                    )}
                  </button>
                  <input
                    type="text"
                    placeholder="Create a new todo"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.title && touched.title ? "input_error" : ""
                    }
                    disabled={loader}
                  />
                </>
              )}
            </div>
            {errors.title && touched.title && (
              <span className="error">{errors.title}</span>
            )}
          </form>
        )}
      </Formik>
    </>
  );
};
let schema = yup.object().shape({
  title: yup.string(),
});
export default Index;
