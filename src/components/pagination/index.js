import React, { useEffect, useState } from "react";
import { currentPage } from "../redux/action";
import { useDispatch } from "react-redux";
import "./style.css";
const Index = (props) => {
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  setTimeout(() => {
    setLoader(false);
  }, 1200);
  return (
    <div
      className="custom-pagination"
      style={{ pointerEvents: loader && "none" }}
    >
      <p
        className={`pg-btn-prev ${
          props.pg_data.prev_page === null && "pg-disabled"
        }`}
        onClick={() => {
          if (props.pg_data.prev_page !== null) {
            props.setParam(`?page=${page - 1}`);
            setPage(page - 1);
            setLoader(true);
            dispatch(currentPage(page - 1));
          }
        }}
      >
        {"<"}Prev
      </p>
      {[...Array(props.pg_data.totalPage)].slice(0, 3).map((el, i) =>
        props.pg_data.totalPage >= i + page ? (
          <p
            className={`pg-btn ${
              props.pg_data.page === i + page && "pg-active"
            }`}
            onClick={() => {
              props.setParam(`?page=${i + page}`);
              setPage(i + page);
              setLoader(true);
              dispatch(currentPage(i + page));
            }}
          >
            {i + page}
          </p>
        ) : null
      )}
      <p
        className={`pg-btn-next ${
          props.pg_data.next_page === null && "pg-disabled"
        }`}
        onClick={() => {
          if (props.pg_data.next_page !== null) {
            props.setParam(`?page=${page + 1}`);
            console.log("first", page + 1);
            setPage(page + 1);
            setLoader(true);
            dispatch(currentPage(1 + page));
          }
        }}
      >
        Next{">"}
      </p>
    </div>
  );
};

export default Index;
