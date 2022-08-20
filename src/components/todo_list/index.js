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
import { updateTodo, currentPage } from "../redux/action/index";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
const Index = ({ count }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [param, setParam] = useState("");
  const [id, setId] = useState("");
  const [pageData, setPageData] = useState("");
  const [prev, setPrev] = useState(1);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
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
  useEffect(() => {
    todos();
  }, [count, param]);
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
        {" "}
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
            {el.title}
          </span>
        ))}
      </div>
      <div
        className="list-item"
        style={{ borderRadius: index === 0 && "0 5px 5px 5px" }}
      >
        <ToastContainer pauseOnHover={true} />
        <ul className="list_container">
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
                    {id === item.id ? (
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
                    <Pagination.Ellipsis
                      onClick={() => {
                        if (prev > 1) {
                          setPrev(prev - 1);
                        }
                        setParam(`?page=${pageData.page - 1}`);
                        dispatch(currentPage(pageData.page - 1));
                      }}
                    />
                  </>
                ) : null}

                {[...Array(pageData.totalPage)]
                  .slice(0, 3)
                  .map((el, i, arr) => (
                    <>
                      {pageData.totalPage > prev + i ? (
                        <Pagination.Item
                          onClick={() => {
                            setParam(`?page=${prev + i}`);
                            setPrev(prev + i);
                            dispatch(currentPage(prev + i));
                          }}
                          active={pageData.page === i + prev}
                          key={prev + i}
                        >
                          {prev + i}
                        </Pagination.Item>
                      ) : null}
                    </>
                  ))}
                <Pagination.Ellipsis
                  onClick={() => {
                    setPrev(prev + 1);
                    setParam(`?page=${prev + 1}`);
                    dispatch(currentPage(prev + 1));
                  }}
                />
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
    </div>
  );
};

export default Index;
