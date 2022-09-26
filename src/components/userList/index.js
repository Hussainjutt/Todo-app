import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SwitchButton from "bootstrap-switch-button-react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Dummy from "../../assets/images/nouser.png";
import ErrorImg from "../../assets/images/errorImg.jpg";
import Spinner from "react-bootstrap/Spinner";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import Pagination from "../pagination/index";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Skeleton } from "@mui/material";

const Index = ({ loader }) => {
  const token = useSelector((state) => state.profileReducer.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [param, setParam] = useState("");
  const [pageData, setPageData] = useState("");
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/users${param}`,
        {
          headers: {
            jwt_token: token,
          },
        }
      );
      setData(req.data.result);
      setPageData(req.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [param]);
  return (
    <div className="container bootstrap snippets bootdey">
      <ToastContainer pauseOnHover={true} />
      <div className="row">
        <div className="col-lg-12">
          <div className="main-box no-header clearfix">
            <div className="main-box-body clearfix">
              <div
                className="table-responsive"
                style={{ paddingBottom: "2rem" }}
              >
                <table
                  className="table user-list"
                  style={{ position: "relative", minHeight: "100px" }}
                >
                  <thead>
                    <tr>
                      {[
                        { title: "User" },
                        { title: "Date Of Birth" },
                        { title: "Status" },
                        { title: "Email" },
                        { title: "Change Status" },
                      ].map((el) => (
                        <th>
                          {loader ? (
                            <Skeleton
                              variant="text"
                              sx={{ width: "50%" }}
                              height={40}
                              animation="wave"
                            />
                          ) : (
                            <span>{el.title}</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  {loader ? (
                    <tbody>
                      <>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                          <tr>
                            {[
                              { w: 120, h: 45, img: true },
                              { w: 70, h: 40 },
                              { w: 70, h: 40 },
                              { w: 150, h: 40 },
                              { w: 80, h: 60 },
                            ].map((el) => (
                              <td>
                                <span className="d-flex align-items-center">
                                  {el.img && (
                                    <Skeleton
                                      variant="rounded"
                                      sx={{ marginRight: "20px" }}
                                      width={50}
                                      height={50}
                                      animation="wave"
                                    />
                                  )}
                                  <span>
                                    <Skeleton
                                      variant="text"
                                      width={el.w}
                                      height={el.h}
                                      animation="wave"
                                    />
                                    {el.img && (
                                      <Skeleton
                                        variant="text"
                                        width={50}
                                        height={35}
                                        animation="wave"
                                      />
                                    )}
                                  </span>
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </>
                    </tbody>
                  ) : (
                    <>
                      {loading ? (
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "43%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <h1>L</h1>{" "}
                          <Spinner animation="grow" variant="info" size="lg" />
                          <h1>ading....</h1>
                        </span>
                      ) : (
                        <tbody>
                          {data.map((el, i) => (
                            <tr key={el.id}>
                              <td>
                                <img
                                  src={
                                    el.profile_pic === null
                                      ? Dummy
                                      : `${process.env.REACT_APP_IMG_URL}/${el.profile_pic}`
                                  }
                                  onError={(e) => (e.target.src = ErrorImg)}
                                />
                                <span className="user-link">
                                  {el.first_name + " " + el.last_name}
                                </span>
                                <span className="user-subhead">
                                  {el.user_type}
                                </span>
                              </td>
                              <td>
                                {
                                  new Date(el.date_of_birth)
                                    .toISOString()
                                    .split("T")[0]
                                }
                              </td>
                              <td>
                                <span
                                  className="label active"
                                  style={{
                                    backgroundColor: el.is_active ? "" : "red",
                                    padding: el.is_active ? "3px 8px" : "",
                                  }}
                                >
                                  {el.is_active ? ` Active ` : "Inactive"}
                                </span>
                              </td>
                              <td>
                                <span>{el.email}</span>
                              </td>
                              <td style={{ width: "20%" }}>
                                <span
                                  style={{
                                    pointerEvents: id === el.id ? "none" : "",
                                  }}
                                >
                                  <SwitchButton
                                    onlabel="Disable"
                                    offlabel="Enable"
                                    width={75}
                                    offstyle="secondary"
                                    onstyle="primary"
                                    checked={el.is_active}
                                    size="sm"
                                    disabled={id === el.id}
                                    onChange={async () => {
                                      try {
                                        await axios.delete(
                                          `${
                                            process.env.REACT_APP_API_URL
                                          }/users/delete/${el.id}?is_active=${
                                            el.is_active === true ? false : true
                                          }`,
                                          {
                                            headers: {
                                              jwt_token: token,
                                            },
                                          }
                                        );
                                        toast.success(
                                          `${el.first_name}
                                       ${el.last_name}
                                        is now ${
                                          el.is_active === true
                                            ? "disabled"
                                            : "enabled"
                                        }`
                                        );
                                        getAllUsers();
                                        setId("");
                                      } catch (err) {
                                        setId("");
                                        toast.error(err.message);
                                        toast.error(err.response.data.message);
                                      }
                                    }}
                                  />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </>
                  )}
                </table>
                {loader ? (
                  <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ maxWidth: "20rem", margin: "auto" }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((el) => (
                      <Skeleton
                        variant="rounded"
                        width={30}
                        height={30}
                        animation="wave"
                      />
                    ))}
                  </div>
                ) : (
                  <Pagination setParam={setParam} pg_data={pageData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
