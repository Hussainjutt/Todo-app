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
import { updateTodo, currentPage } from "../action/action";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { API } from "../../config/api";
const Index = ({ count, counter }) => {
  const [ID, setID] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState("");
  const [_Id, setId] = useState("");
  const [pageData, setPageData] = useState("");
  const [prev, setPrev] = useState(1);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.profileReducer.token);
  const searchTodo = useSelector((state) => state.todoReducer.data);
  const userID = useSelector((state) => state.profileReducer.userInfo.id);
  const todoList = async () => {
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
    console.log(id, status, title);
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
      todoList();
      setID("");
    } catch (err) {
      toast.error(err.response.data.message);
      setLoader(false);
      setID("");
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
      todoList();
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
      todoList();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    todoList();
  }, [count, param]);
  useEffect(() => {
    setLoader(true);
    if (searchTodo.length >= 0) {
      setData(searchTodo);
    }
    if (searchTodo.includes(true)) {
      todoList();
    }
    setLoader(false);
  }, [searchTodo, param]);
  return (
    <div className="list-item">
      <ToastContainer pauseOnHover={true} />
      <ul className="ul">
        {loader ? (
          <p
            style={{
              textAlign: "center",
              marginLeft: "-21px",
              padding: "1rem",
            }}
          >
            <Spinner animation="grow" variant="info" size="lg" />
          </p>
        ) : data.length == 0 ? (
          <span
            style={{
              textAlign: "center",
              marginLeft: "-21px",
            }}
          >
            <p style={{ marginLeft: "-63px" }}> No Todos Found</p>
          </span>
        ) : (
          data.map((item) => (
            <li key={item.id} className="li">
              <div className="d-flex">
                <div>
                  {ID === item.id ? (
                    <Spinner animation="border" variant="primary" size="sm" />
                  ) : (
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={item.is_completed}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleComplete(item.id, true, item.title);
                          setID(item.id);
                        }
                        if (e.target.checked === false) {
                          handleComplete(item.id, false, item.title);
                          setID(item.id);
                        }
                      }}
                      checked={item.is_completed}
                    />
                  )}
                </div>
                <div
                  className={item.is_completed ? "completed" : "text"}
                  title={item.title}
                >
                  {item.title}
                </div>
              </div>
              <div>
                <span
                  onClick={() =>
                    dispatch(updateTodo({ id: item.id, title: item.title }))
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
                  {_Id === item.id ? (
                    <Spinner animation="border" variant="danger" size="sm" />
                  ) : (
                    <RiDeleteBin5Line />
                  )}
                </span>
              </div>
            </li>
          ))
        )}
        <div className="list-foter">
          <div>
            {data.filter((item) => item.is_completed === false).length} items
            left
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gridGap: ".2rem",
            }}
          >
            <p onClick={() => setParam("")}>All</p> &nbsp;
            <p onClick={() => setParam("/?&status=false")}>Active</p> &nbsp;
            <p onClick={() => setParam("/?&status=true")}>Completed</p>
          </div>{" "}
          <div>
            <p onClick={() => handleDeleteTodoAll()}>Clear completed</p>
          </div>
        </div>
        {pageData.totalPage > 1 && (
          <>
            <hr style={{ marginLeft: "-32px" }} />
            <Pagination>
              <Pagination.First
                onClick={() => {
                  setParam(`?page=1`);
                  setPrev(1);
                  dispatch(currentPage(1));
                }}
                disabled={pageData.prev_page === null}
              />

              <Pagination.Prev
                onClick={() => {
                  if (prev > 1) {
                    setPrev(prev - 1);
                  }
                  setParam(`?page=${pageData.page - 1}`);
                  dispatch(currentPage(pageData.page - 1));
                }}
                disabled={pageData.prev_page === null}
              />
              {prev >= 2 ? (
                <>
                  <Pagination.Item
                    onClick={() => {
                      setParam(`?pages=1`);
                      setPrev(1);
                      dispatch(currentPage(1));
                    }}
                  >
                    1
                  </Pagination.Item>
                  <Pagination.Ellipsis />
                </>
              ) : null}

              {[...Array(pageData.totalPage)].slice(0, 3).map((el, i) => (
                <>
                  {pageData.totalPage > prev + i ? (
                    <Pagination.Item
                      onClick={() => {
                        setParam(`?page=${prev + i}`);
                        setPrev(prev + i);
                        dispatch(currentPage(prev + i));
                      }}
                      active={pageData.page === i + prev}
                    >
                      {prev + i}
                    </Pagination.Item>
                  ) : null}
                </>
              ))}
              <Pagination.Ellipsis />
              <Pagination.Item
                onClick={() => {
                  setParam(`?page=${pageData.totalPage}`);
                  dispatch(currentPage(pageData.totalPage));
                }}
                active={pageData.page === pageData.totalPage}
              >
                {pageData.totalPage}
              </Pagination.Item>
              <Pagination.Next
                onClick={() => {
                  setPrev(prev + 1);
                  setParam(`?page=${prev + 1}`);
                  dispatch(currentPage(prev + 1));
                }}
                disabled={pageData.next_page === null}
              />
              <Pagination.Last
                onClick={() => {
                  setParam(`?page=${pageData.totalPage}`);
                  setPrev(pageData.totalPage);
                  dispatch(currentPage(pageData.totalPage));
                }}
                active={pageData.page === pageData.totalPage}
                disabled={pageData.next_page === null}
              />
            </Pagination>
          </>
        )}
      </ul>
    </div>
  );
};

export default Index;
