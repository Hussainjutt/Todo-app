import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { RiAddCircleLine } from "react-icons/ri";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { deleteTodo } from "../redux/action/index";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const Index = ({ counter, count }) => {
  const token = useSelector((state) => state.profileReducer.token);
  const todo = useSelector((state) => state.todoReducer.todo);
  const userID = useSelector((state) => state.profileReducer.userInfo.id);
  const inpFocus = useRef();
  const dispatch = useDispatch();
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
      counter(count + 1);
      resetForm();
    } catch (err) {
      toast.error(err.response.data.message);
      setLoader(false);
    }
  };
  const updateTodo = async (values) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/todos/${todo.id}`,
        {
          title: values.title,
        },
        {
          headers: {
            jwt_token: token,
          },
        }
      );
      toast.success("Todo updated successfully");
      dispatch(deleteTodo());
      counter(count + 1);
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      dispatch(deleteTodo());
    }
  };
  useEffect(() => {
    document
      .getElementById("scroller")
      .scroll({ top: 0, left: 0, behavior: "smooth" });
    inpFocus.current.focus();
  }, [todo]);
  return (
    <>
      <ToastContainer pauseOnHover={true} />
      <Formik
        initialValues={{ title: todo.title, created_by: userID }}
        validationSchema={schema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          todo.id === "" ? createTodo(values, resetForm) : updateTodo(values);
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
                ref={inpFocus}
                className={errors.title && touched.title ? "input_error" : ""}
                disabled={loader}
              />
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
