import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import CardSkeleton from "../Skeletons/CardSkeleton";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBlogs(data.blogs);
      });
  }, []);
  const style = {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  };
  return (
    <>
      <h1>hello world</h1>
      {blogs.length ? (
        <section style={style}>
          {blogs.map((blog) => (
            <BlogCard data={blog} />
          ))}
        </section>
      ) : (
        <section style={style}>
          <CardSkeleton number={10} />
        </section>
      )}
    </>
  );
};

export default AllBlogs;
