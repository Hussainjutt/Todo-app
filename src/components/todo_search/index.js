import React, { useState, useEffect } from "react";
import "./style.css";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { searchTodos } from "../redux/action/index";
import axios from "axios";
const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const currentPage = useSelector((state) => state.todoReducer.page);
  const token = useSelector((state) => state.profileReducer.token);
  const dispatch = useDispatch();
  const searchTodo = async () => {
    try {
      const req = await axios.get(
        `${process.env.REACT_APP_API_URL}/todos/user/1/?search=${searchTerm}&page=${currentPage}`,
        {
          headers: {
            jwt_token: token,
          },
        }
      );
      console.log(req.data);
      dispatch(searchTodos(req.data.result));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchTerm.length > 0) {
      const delayDebounceFn = setTimeout(() => {
        searchTodo();
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      dispatch(searchTodos([true]));
    }
  }, [searchTerm, currentPage]);

  return (
    <div className="input_container_2">
      <input
        type="text"
        placeholder="Search your todo"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button
        className="icon_2"
        type="button"
        style={{ pointerEvents: "none" }}
      >
        <BiSearchAlt />
      </button>
    </div>
  );
};

export default Index;
