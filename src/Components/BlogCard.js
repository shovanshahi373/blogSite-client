import React from "react";
import { withTheme } from "styled-components";
import { Card, ImageHolderStyle } from "../Styles/BlogCard";
import { Link } from "react-router-dom";

const BlogCard = ({ data }) => {
  return (
    <Link to={`/blogs/${data.blogId}`}>
      <Card>
        <div>
          <ImageHolderStyle>{data.author[0].toUpperCase()}</ImageHolderStyle>
          <Link to={`/blogs/author/${data.authorId}`}>
            <span
              style={{
                backgroundColor: "#eee",
              }}
            >
              {data.author}
            </span>
          </Link>
        </div>
        <h1>{data.title}</h1>
        {/* {} */}
        <p>
          {data.body.length > 4
            ? data.body.split("").slice(0, 4).join("").concat("...")
            : data.body}
          {data.body.length > 4 ? (
            <span style={{ color: "#fff" }}>
              <i>Read More</i>
            </span>
          ) : null}
        </p>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <span style={{ marginRight: "10px" }}>
            <i class='far fa-thumbs-up'>{data.claps}</i>
          </span>
          <span>
            <i class='far fa-comment'></i>
            {data.commentCount}
          </span>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
