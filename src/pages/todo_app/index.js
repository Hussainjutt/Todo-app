import React, { useState } from "react";
import "./style.css";
import TodoInput from "../../components/todo_input/index";
import TodoList from "../../components/todo_list/index";
import TodoSeach from "../../components/todo_search/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../components/layout/index";
const Index = () => {
  const [count, setCount] = useState(0);
  return (
    <Layout title={"Tods's"}>
      <div className="todo-main">
        <div style={{ maxWidth: "35rem", margin: "auto" }}>
          <div className="heading">TODO</div>
          <TodoInput counter={setCount} count={count} />
          <TodoSeach />
          <TodoList count={count} counter={setCount} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
