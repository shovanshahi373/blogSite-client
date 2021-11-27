import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import CardSkeleton from "../Skeletons/CardSkeleton";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => {
        if (res.status > 400) throw new Error(res.err);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setBlogs(data.blogs);
      })
      .catch((err) => console.log(err));
  }, []);
  const style = {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  };
  return (
    <>
      <h1>hello world</h1>
      <section style={style}>
        {blogs.length ? (
          blogs.map((blog) => <BlogCard data={blog} />)
        ) : (
          <CardSkeleton number={10} />
        )}
      </section>
    </>
  );
};

export default AllBlogs;
