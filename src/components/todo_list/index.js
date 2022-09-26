import React, { useEffect, useState } from "react";
import "./style.css";
import { VscEdit } from "react-icons/vsc";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { currentPage } from "../redux/action/index";
import Pagination from "../pagination/index";
import { Skeleton } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import done from "../../assets/svgs/done-icon.svg";
import cancel from "../../assets/svgs/cancel-icon.svg";

const Index = (props) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState("");
  const [id, setId] = useState("");
  const [pageData, setPageData] = useState("");
  const [index, setIndex] = useState(0);
  const [updateTodo, setUpdateTodo] = useState({ i: "", todo: "" });
  const token = useSelector((state) => state.profileReducer.token);
  const searchTodo = useSelector((state) => state.todoReducer.data);
  const userID = useSelector((state) => state.profileReducer.userInfo.id);
  const todos = async () => {
    setLoader(true);
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/todos/user/${userID}${param}`,
        {
          headers: {
            jwt_token: token,
          },
        }
      );
      setData(req.data.result);
      setPageData(req.data);
      setLoader(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoader(false);
    }
  };
  const handleComplete = async (id, status, title) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          is_completed: status,
          title: title,
        },
        {
          headers: {
            jwt_token: token,
          },
        }
      );
      status
        ? toast.success("Todo completed successfully")
        : toast.success("Todo uncompleted successfully");
      setLoader(false);
      todos();
      setId("");
    } catch (err) {
      toast.error(err.response.data.message);
      setId("");
    }
  };
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: {
          jwt_token: token,
        },
      });
      toast.success("Todo deleted successfully");
      setId("");
      todos();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const handleDeleteTodoAll = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/todos/delete_all`, {
        headers: {
          jwt_token: token,
        },
      });
      toast.success("All Todos deleted successfully");
      todos();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const handleUpdateTodo = async (todoId) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/todos/${todoId}`,
        {
          title: updateTodo.todo,
        },
        {
          headers: {
            jwt_token: token,
          },
        }
      );
      toast.success("Todo updated successfully");
      setUpdateTodo({ ...updateTodo, todo: "", i: "" });
      setId("");
      todos();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    todos();
  }, [props.count, param]);
  useEffect(() => {
    if (searchTodo.length >= 0) {
      setData(searchTodo);
    }
    if (searchTodo.includes(true)) {
      todos();
    }
  }, [searchTodo, param]);
  return (
    <div className="list-wrapper">
      <div
        className="tabs-container"
        style={{
          boxShadow: index === 0 && "-5px 1px 5px -2px rgba(0, 0, 0, 0.2)",
        }}
      >
        {[
          { title: "All", param: "" },
          { title: "Active", param: "/?&status=false" },
          { title: "Completed", param: "/?&status=true" },
        ].map((el, i) => (
          <span
            className="tabs"
            onClick={() => {
              setParam(el.param);
              setIndex(i);
            }}
            style={{
              background: index === i && "white",
              boxShadow: index === i && "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              borderRadius: index === i && "5px 5px 0 0",
              color: index === i && "black",
              wordWrap: "break-word",
            }}
          >
            {props.loader ? (
              <Skeleton
                variant="text"
                sx={{ width: "30px" }}
                height={20}
                animation="wave"
              />
            ) : (
              el.title
            )}
          </span>
        ))}
      </div>
      <div
        className="list-item"
        style={{ borderRadius: index === 0 && "0 5px 5px 5px" }}
      >
        <ToastContainer pauseOnHover={true} />
        <ul className="list_container">
          {props.loader ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                <li className="item">
                  <span className="d-flex">
                    <Skeleton
                      variant="circular"
                      width={15}
                      height={15}
                      animation="wave"
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ marginLeft: "10px" }}
                      width={100}
                      height={20}
                      animation="wave"
                    />
                  </span>
                  <span className="d-flex">
                    <Skeleton
                      variant="rounded"
                      sx={{ marginRight: "10px" }}
                      width={20}
                      height={20}
                      animation="wave"
                    />
                    <Skeleton
                      variant="rounded"
                      sx={{ marginRight: "10px" }}
                      width={20}
                      height={20}
                      animation="wave"
                    />
                  </span>
                </li>
              ))}
              <div className="list-footer">
                <div>
                  <Skeleton
                    variant="rounded"
                    width={60}
                    height={17}
                    animation="wave"
                  />
                </div>
                <div>
                  <Skeleton
                    variant="rounded"
                    width={90}
                    height={17}
                    animation="wave"
                  />
                </div>
              </div>
            </>
          ) : loader ? (
            <p
              style={{
                textAlign: "center",
                marginLeft: "-21px",
                padding: "1rem",
              }}
            >
              <Spinner animation="grow" variant="info" size="lg" />
            </p>
          ) : data.length === 0 ? (
            <span
              style={{
                textAlign: "center",
                marginLeft: "-21px",
              }}
            >
              <p style={{ marginLeft: "-63px" }}> No Todos Found</p>
            </span>
          ) : (
            data.map((item, i) => (
              <li key={item.id} className="item">
                <div className="d-flex">
                  <div>
                    {id === i ? (
                      <Spinner animation="border" variant="primary" size="sm" />
                    ) : (
                      <input
                        type="checkbox"
                        className="checkbox"
                        value={item.is_completed}
                        onChange={(e) => {
                          if (e.target.checked) {
                            handleComplete(item.id, true, item.title);
                            setId(i);
                          }
                          if (e.target.checked === false) {
                            handleComplete(item.id, false, item.title);
                            setId(i);
                          }
                        }}
                        checked={item.is_completed}
                        disabled={updateTodo.i === i}
                      />
                    )}
                  </div>
                  {updateTodo.i === i ? (
                    <input
                      type="text"
                      className="update-todo"
                      value={updateTodo.todo}
                      onChange={(e) => {
                        setUpdateTodo({ ...updateTodo, todo: e.target.value });
                      }}
                    />
                  ) : (
                    <div
                      className={item.is_completed ? "completed" : "text"}
                      title={item.title}
                    >
                      {item.title}
                    </div>
                  )}
                </div>
                <div>
                  {updateTodo.i === i ? (
                    <>
                      <span
                        onClick={() => {
                          handleUpdateTodo(item.id);
                          setId(updateTodo.todo);
                        }}
                      >
                        {id === updateTodo.todo ? (
                          <Spinner
                            animation="border"
                            variant="success"
                            size="sm"
                          />
                        ) : (
                          <img src={done} width="22px" />
                        )}
                      </span>
                      &nbsp;
                      <span
                        onClick={() =>
                          setUpdateTodo({ ...updateTodo, i: "", todo: "" })
                        }
                      >
                        <img src={cancel} width="25px" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        onClick={() =>
                          setUpdateTodo({
                            ...updateTodo,
                            i: i,
                            todo: item.title,
                          })
                        }
                      >
                        <VscEdit />
                      </span>
                      &nbsp;&nbsp;
                      <span
                        onClick={() => {
                          handleDeleteTodo(item.id);
                          setId(item.id);
                        }}
                      >
                        {id === item.id ? (
                          <Spinner
                            animation="border"
                            variant="danger"
                            size="sm"
                          />
                        ) : (
                          <RiDeleteBin5Line />
                        )}
                      </span>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
          {!props.loader && (
            <div className="list-footer">
              <div>
                {data.filter((item) => item.is_completed === false).length}{" "}
                items left
              </div>
              <div>
                <p onClick={() => handleDeleteTodoAll()}>Clear completed</p>
              </div>
            </div>
          )}
          {pageData.totalPage > 1 && (
            <>
              <hr style={{ marginLeft: "-32px" }} />
              {props.loader ? (
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ paddingRight: "30px" }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
                    <Skeleton
                      variant="rounded"
                      width={30}
                      height={30}
                      animation="wave"
                    />
                  ))}
                </div>
              ) : (
                <Pagination
                  pg_data={pageData}
                  loader={loader}
                  setLoader={setLoader}
                  setParam={setParam}
                />
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Index;
