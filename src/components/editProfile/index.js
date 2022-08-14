import React, { useEffect, useState, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Dummy from "../../assets/images/dummy-man.png";
import ErrorImg from "../../assets/images/errorImg.jpg";
import { addUserInfo } from "../../components/action/action";
import { Button } from "react-bootstrap";
import { TbLink } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const Index = ({ num }) => {
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
  });
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const data = useSelector((state) => state.profileReducer.userInfo);
  const token = useSelector((state) => state.profileReducer.token);
  const dispatch = useDispatch();
  const InputRef = useRef();
  useEffect(() => {
    if (num >= 1) {
      InputRef.current.focus();
    }
  }, [num]);
  const updateProfile = async (values) => {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("date_of_birth", values.date_of_birth);
    formData.append("profile_pic", values.profile_pic);
    try {
      const req = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/update_profile/${data.id}`,
        formData,
        {
          headers: {
            jwt_token: token,
          },
        }
      );
      dispatch(
        addUserInfo({
          ...req.data.data,
          date_of_birth: values.date_of_birth,
          id: data.id,
        })
      );
      toast.success("Profile Updated Successfully");
      setLoader(false);
      setFile("");
      setFileName("");
    } catch (err) {
      setLoader(false);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    setState({
      ...state,
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth,
      profile_pic: data.profile_pic,
    });
  }, [data]);
  return (
    <div className="edit_profile_page ">
      <ToastContainer pauseOnHover={true} />
      <Formik
        initialValues={{
          first_name: state.first_name,
          last_name: state.last_name,
          date_of_birth: state.date_of_birth,
          profile_pic: state.profile_pic,
        }}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values) => {
          setLoader(true);
          updateProfile(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="general_information">
              <h3>General Information</h3>
              <Row className="g-2 mb-4 mt-4">
                <Col md>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="First name"
                  >
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      ref={InputRef}
                      className={
                        errors.first_name && touched.first_name
                          ? "input_error"
                          : ""
                      }
                      size="sm"
                    />
                    {errors.first_name && touched.first_name && (
                      <>
                        <span className="error_text">{errors.first_name}</span>
                      </>
                    )}
                  </FloatingLabel>
                </Col>
                <Col md>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Last name"
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
                className="mb-5 mt-4"
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
              <h3>Profile Picture</h3>
              <div className="profile_picture_container mt-4">
                <div>
                  <img
                    src={
                      file == ""
                        ? data.profile_pic == null
                          ? Dummy
                          : `${process.env.REACT_APP_IMG_URL}/${values.profile_pic}`
                        : file
                    }
                    style={{
                      height: "100px",
                      width: "100px",
                      border: "1px solid black",
                      borderRadius: "50%",
                    }}
                    onError={(e) => (e.target.src = ErrorImg)}
                    alt="profile"
                  />
                </div>
                <p style={{ fontSize: "30px", cursor: "pointer" }}>
                  <input
                    type="file"
                    id="profile-pic"
                    style={{ display: "none" }}
                    name="profile_pic"
                    onChange={(event) => {
                      let formData = new FormData();
                      formData.append(
                        "profile_pic",
                        event.currentTarget.files[0]
                      );
                      setFieldValue(
                        "profile_pic",
                        event.currentTarget.files[0]
                      );
                      setFile(
                        URL.createObjectURL(event.currentTarget.files[0])
                      );
                      setFileName(event.currentTarget.files[0].name);
                    }}
                    onBlur={handleBlur}
                    className="oko"
                    size="sm"
                  />
                  <TbLink
                    onClick={() =>
                      document.getElementById("profile-pic").click()
                    }
                  />
                </p>
                <div>
                  <h4 style={{ whiteSpace: "wrap", maxWidth: "70%" }}>
                    Change Profile Image
                  </h4>
                  {fileName === "" ? (
                    <p>No file selected</p>
                  ) : (
                    <p
                      style={{
                        maxWidth: "50%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                      }}
                      title={fileName}
                    >
                      {fileName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="dark"
              className="w-50 mt-5"
              disabled={loader}
            >
              {loader ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Save all"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
let schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  date_of_birth: yup.string().required("Date of birth is required"),
});
export default Index;
