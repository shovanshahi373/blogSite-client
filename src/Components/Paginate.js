import React from "react";
// import Paginator from "../helpers/paginator";
import { Link } from "react-router-dom";

const Paginate = ({ blogId, itemCount = 0, itemsPerPage = 2 }) => {
  const pages = Math.floor(itemCount / itemsPerPage);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {Array(pages)
        .fill("page")
        .map((page, index) => {
          return (
            <Link to={`/blogs/${blogId}?page=${index + 1}`}>
              <span
                style={{
                  border: "1px solid var(--purple)",
                  color: "var(--purple)",
                  padding: "5px",
                  margin: "0 3px",
                }}
              >
                {index + 1}
              </span>
            </Link>
          );
        })}
    </div>
  );
};

export default Paginate;
