import React, { useState, useEffect, useContext, useRef } from "react";
import PickRandomColor from "../helpers/randomColor";
import Paginate from "../Components/Paginate";
import LoadingComment from "../Skeletons/LoadingComment";
import { Link } from "react-router-dom";
//contexts
import { ModalTheme } from "../Contexts/modalContext";
import { MessagesContext } from "../Contexts/GlobalMessages";
// import {LoginContext} from "../Contexts/loginContext";
//helpers
import createMessage from "../helpers/createMessage";

const color = PickRandomColor();
console.log(color);

const OneBlog = ({ match }) => {
  const likeBtnRef = useRef();
  const { registerModal, setRegisterModal } = useContext(ModalTheme);
  // const {loggedIn} = useContext(LoginContext);
  const { setMessages } = useContext(MessagesContext);
  const [blogLiked, setBlogLiked] = useState(false);
  const [blog, setBlog] = useState({
    author: "",
    title: "",
    body: "",
    claps: 0,
    comments: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const mytoken = sessionStorage.getItem("TOKEN");
    setToken(mytoken);
    fetch(`http://localhost:5000/blogs/${match.params.bid}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBlog(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (token !== null) {
      //user is logged in and like request can be sent
      fetch(`http://localhost:5000/blogs/${match.params.bid}/like`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (res === 500) {
            return res.json();
          } else {
            return setBlogLiked(false);
          }
        })
        .then((res) => {
          if (res && res.error && res.error === "blog already liked!") {
            setBlogLiked(true);
          } else {
            return;
          }
        })
        .then(() => {
          return fetch(
            `http://localhost:5000/blogs/${match.params.bid}/unlike`,
            {
              method: "GET",
              headers: {
                Authorization: token,
              },
            }
          );
        })
        .then(() => {})
        .catch((err) => console.log(err));
    }
  }, [token]);

  useEffect(() => {
    if (blogLiked) {
      likeBtnRef.current.style.color = "var(--green)";
    } else {
      likeBtnRef.current.style.color = "#ccc";
    }
  }, [blogLiked]);

  const likeBlog = () => {
    if (!blogLiked) {
      fetch(`http://localhost:5000/blogs/${match.params.bid}/like`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            throw new Error("please login to continue");
          } else {
            return res.json();
          }
        })
        .then((res) => {
          setBlog({ ...blog, claps: blog.claps + 1 });
          setBlogLiked(true);
        })
        .catch((err) => {
          if (err.message === "please login to continue") {
            createMessage(err.message, setMessages, "error");
            setRegisterModal(!registerModal);
          }
        });
    } else {
      fetch(`http://localhost:5000/blogs/${match.params.bid}/unlike`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setBlog({ ...blog, claps: blog.claps - 1 });
          setBlogLiked(false);
        })
        .catch((err) => {
          console.log("why am i running?");
          console.log(err);
        });
    }
  };
  return (
    <div>
      <span
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
        <i className='far fa-thumbs-up hover fa-2x' ref={likeBtnRef}></i>
        {blog.claps}
      </span>
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
