import React, { useState } from "react";
import "./style.css";
import TodoInput from "../../components/todo_input/index";
import TodoList from "../../components/todo_list/index";
import TodoSeach from "../../components/todo_search/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../components/layout/index";
import { Skeleton } from "@mui/material";
const Index = () => {
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 1500);
  return (
    <Layout title={"Tods's"}>
      <div className="todo-main">
        <div style={{ maxWidth: "35rem", margin: "auto" }}>
          <div className="heading">
            {loader ? (
              <Skeleton
                variant="text"
                sx={{ width: "140px" }}
                height={70}
                animation="wave"
              />
            ) : (
              "TODO"
            )}
          </div>
          <TodoInput counter={setCount} count={count} loader={loader} />
          <TodoSeach loader={loader} />
          <TodoList count={count} counter={setCount} loader={loader} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
