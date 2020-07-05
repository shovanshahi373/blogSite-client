import React, { useState, useEffect } from "react";
import PickRandomColor from "../helpers/randomColor";
import Paginate from "../Components/Paginate";
import LoadingComment from "../Skeletons/LoadingComment";
import { Link } from "react-router-dom";

const color = PickRandomColor();
console.log(color);

const OneBlog = ({ match }) => {
  const [blog, setBlog] = useState({
    author: "",
    title: "",
    body: "",
    upvotes: 0,
    comments: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${match.params.bid}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBlog(res);
      });
  }, []);

  const likeBlog = () => {
    fetch(`http://localhost:5000/blogs/${match.params.bid}/like`)
      .then((res) => {
        if (res.status === 401) {
          //redirect to login page
          // window.location.href = "/path/to/login"
        }
        console.log(res.status);
        return res.json();
      })
      .then((res) => console.log(res));
  };
  return (
    <div>
      {blog.claps ? (
        <button
          onClick={likeBlog}
          style={{
            position: "fixed",
            top: "50%",
            right: "10px",
            zIndex: "99",
            border: "none",
            outline: "none",
            cursor: "pointer",
            transform: "translateY(-50%)",
          }}
        >
          <i class='far fa-thumbs-up hover'></i>
          {blog.claps}
        </button>
      ) : null}
      <section
        style={{
          minHeight: "54vmax",
          backgroundColor: "var(--green)",
          margin: "0 -48px",
          position: "relative",
          padding: "10px",
          clipPath: "polygon(0 0,100% 0%,100% 75%,0% 100%)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          {blog.title}
        </h1>
        <h1>{blog.author}</h1>
        <p>{blog.body}</p>
      </section>

      <p>comments:</p>
      <ul>
        {blog.comments.length ? (
          blog.comments.map((comment) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <div
                  className='image-section'
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bolder",
                    // flex: 1,
                    textTransform: "uppercase",
                    color: "#fff",
                    fontSize: "40px",
                    backgroundImage: comment.avatar
                      ? `url(${comment.avatar})`
                      : `linear-gradient(${color},${color})`,
                    border: "3px solid var(--purple)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {comment.commentator[0]}
                </div>
                <div
                  style={{
                    flex: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span>{comment.commentator} says:</span>
                  <div
                    style={{
                      backgroundColor: "#fff",
                      padding: "10px",
                      borderRadius: "5px",
                      marginLeft: "10px",
                      position: "relative",
                    }}
                  >
                    {comment.body}
                    <div
                      style={{
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                        borderBottomRightRadius: "12px",
                        borderTopRightRadius: "12px",
                        backgroundColor: "#afa5a5",
                        display: "flex",
                        position: "absolute",
                        padding: "4px",
                        color: "white",
                        bottom: "0px",
                        right: "0px",
                        transform: "translate(50%, 50%)",
                      }}
                    >
                      <i class='far fa-thumbs-up'></i>
                      <span>{comment.upvotes}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <LoadingComment />
        )}
      </ul>
      <Paginate blogId={match.params.bid} itemCount={blog.comments.length} />
    </div>
  );
};

export default OneBlog;
