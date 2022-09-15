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
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Index = () => {
  const token = useSelector((state) => state.profileReducer.token);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [param, setParam] = useState("");
  const [prev, setPrev] = useState(1);
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
                      <th>
                        <span>User</span>
                      </th>
                      <th>
                        <span>Date of birth</span>
                      </th>
                      <th>
                        <span>Status</span>
                      </th>
                      <th>
                        <span>Email</span>
                      </th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
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
                            <span className="user-subhead">{el.user_type}</span>
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
                </table>
                <Pagination className="table_Pagination">
                  <Pagination.First
                    onClick={() => {
                      setParam(`?page=1`);
                      setPrev(1);
                    }}
                    disabled={pageData.prev_page === null}
                  />

                  <Pagination.Prev
                    onClick={() => {
                      if (prev > 1) {
                        setPrev(prev - 1);
                      }
                      setParam(`?page=${pageData.page - 1}`);
                    }}
                    disabled={pageData.prev_page === null}
                  />
                  {prev >= 2 ? (
                    <>
                      <Pagination.Item
                        onClick={() => {
                          setParam(`?pages=1`);
                          setPrev(1);
                        }}
                      >
                        1
                      </Pagination.Item>
                      {pageData.totalPage > 5 && <Pagination.Ellipsis />}
                    </>
                  ) : null}

                  {[...Array(pageData.totalPage)].slice(0, 3).map((el, i) => (
                    <>
                      {pageData.totalPage > prev + i ? (
                        <Pagination.Item
                          onClick={() => {
                            setParam(`?page=${prev + i}`);
                            setPrev(prev + i);
                          }}
                          active={pageData.page === i + prev}
                          key={el}
                        >
                          {prev + i}
                        </Pagination.Item>
                      ) : null}
                    </>
                  ))}
                  {pageData.totalPage > 5 && <Pagination.Ellipsis />}
                  <Pagination.Item
                    onClick={() => {
                      setParam(`?page=${pageData.totalPage}`);
                    }}
                    active={pageData.page === pageData.totalPage}
                  >
                    {pageData.totalPage}
                  </Pagination.Item>
                  <Pagination.Next
                    onClick={() => {
                      setPrev(prev + 1);
                      setParam(`?page=${prev + 1}`);
                    }}
                    disabled={pageData.next_page === null}
                  />
                  <Pagination.Last
                    onClick={() => {
                      setParam(`?page=${pageData.totalPage}`);
                      setPrev(pageData.totalPage);
                    }}
                    active={pageData.page === pageData.totalPage}
                    disabled={pageData.next_page === null}
                  />
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
