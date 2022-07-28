import React, { useState } from "react";
import "./style.css";
import TodoInput from "../../components/todo_input/index";
import TodoList from "../../components/todo_list/index";
import TodoSeach from "../../components/todo_search/index";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../components/sidebar";
const Index = () => {
  const [count, setCount] = useState(0);
  const [reload, setReload] = useState(false);
  const counter = (val) => {
    setCount(val + 1);
    if (val === true) {
      setReload(val);
    }
  };
  return (
    <Layout title={"Tods's"}>
      <div className="Layout_2" id="scroller">
        <div className="todo-main">
          <div style={{ maxWidth: "25rem", margin: "auto" }}>
            <div className="heading">TODO</div>
            <TodoInput counter={counter} count={count} />
            <TodoSeach count={reload} />
            <TodoList count={count} counter={counter} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
