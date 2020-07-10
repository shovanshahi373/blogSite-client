import React, { useState, useEffect, useContext, useRef } from "react";
//helpers
// import PickRandomColor from "../helpers/randomColor";
import createMessage from "../helpers/createMessage";
//skeletons
// import LoadingComment from "../Skeletons/LoadingComment";
//sub-components
import Comments from "./OneBlog/Comments";
import NewComment from "./OneBlog/NewComment";
import Paginate from "../Components/Paginate";
//contexts
import { ModalTheme } from "../Contexts/modalContext";
import { MessagesContext } from "../Contexts/GlobalMessages";
import { LoginContext } from "../Contexts/loginContext";

// const color = PickRandomColor();
// console.log(color);

const OneBlog = ({ match }) => {
  const likeBtnRef = useRef();
  const { registerModal, setRegisterModal } = useContext(ModalTheme);
  const {
    loggedIn,
    setLoggedIn,
    logOut,
    userData: { name: username, avatar },
  } = useContext(LoginContext);
  const { setMessages } = useContext(MessagesContext);
  const [blogLiked, setBlogLiked] = useState(false);
  const [blog, setBlog] = useState({
    author: "",
    title: "",
    body: "",
    claps: 0,
    comments: [],
  });
  // const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState(null);
  const [commentsExist, setCommentsExist] = useState("");
  useEffect(() => {
    const mytoken = sessionStorage.getItem("TOKEN");
    setToken(mytoken);
    fetch(`http://localhost:5000/blogs/${match.params.bid}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!res.comments.length) {
          setCommentsExist("no comments...");
        }
        console.log("the res us", res);
        setBlog(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const setComments = (comment) => {
    setBlog({ ...blog, comments: [...blog.comments, comment] });
  };

  useEffect(() => {
    if (loggedIn) {
      const mytoken = sessionStorage.getItem("TOKEN");
      setToken(mytoken);
    }
    if (token !== null) {
      const bearer = token !== null ? "Bearer " + token : token;
      //user is logged in and like request can be sent
      fetch(`http://localhost:5000/blogs/${match.params.bid}/like`, {
        method: "GET",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 500) {
            return res.json();
          } else {
            return setBlogLiked(false);
          }
        })
        .then((res) => {
          // if (res && res.error && res.error === "blog already liked!") {
          if (res && res.error) {
            throw new Error(res.error);
          } else {
            return;
          }
        })
        .then(() => {
          const bearer = token !== null ? "Bearer " + token : token;
          return fetch(
            `http://localhost:5000/blogs/${match.params.bid}/unlike`,
            {
              method: "GET",
              headers: {
                Authorization: bearer,
                "Content-Type": "application/json",
              },
            }
          );
        })
        .then(() => {})
        .catch((err) => {
          if (err.message === "blog already liked!") {
            setBlogLiked(true);
          } else if (err.message === "jwt expired") {
            logOut();
          }
        });
    }
  }, [token, loggedIn]);

  useEffect(() => {
    if (blogLiked) {
      likeBtnRef.current.style.color = "var(--green)";
      likeBtnRef.current.classList.add("popAnimation");
    } else {
      likeBtnRef.current.style.color = "#ccc";
      likeBtnRef.current.classList.remove("popAnimation");
    }
  }, [blogLiked]);

  const likeBlog = () => {
    const bearer = token !== null ? "Bearer " + token : token;
    if (!blogLiked) {
      fetch(`http://localhost:5000/blogs/${match.params.bid}/like`, {
        method: "GET",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 401) {
            throw new Error("please login to continue");
          } else if (res.status === 408) {
            throw new Error("session has expired");
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
          } else if (err.message === "session has expired") {
            createMessage(err.message, setMessages, "error");
            setRegisterModal(!registerModal);
            logOut();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
          // createMessage(err.message, setMessages);
        });
    } else {
      fetch(`http://localhost:5000/blogs/${match.params.bid}/unlike`, {
        method: "GET",
        headers: {
          Authorization: bearer,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status === 408) {
            throw new Error("session has expired");
          }
        })
        .then((res) => {
          setBlog({ ...blog, claps: blog.claps - 1 });
          setBlogLiked(false);
        })
        .catch((err) => {
          if (err.message === "session has expired") {
            logOut();
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
          createMessage(err.message, setMessages);
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
        <i
          className='far fa-thumbs-up hover fa-2x'
          title={blogLiked ? "dislike" : "like"}
          ref={likeBtnRef}
        ></i>
        {blog.claps}
        {/* <br />
        {blogLiked ? (
          <kbd style={{ color: "#ccc" }}>
            <p>you and</p>
            <p>{`${blog.claps - 1} others`}</p>
            <p>liked this.</p>
          </kbd>
        ) : null} */}
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

      <NewComment
        user={{ name: username, avatar, blogRef: match.params.bid, token }}
        setComments={setComments}
      />
      <p>comments:</p>
      <Comments comments={blog.comments} isExists={commentsExist} />
      <Paginate blogId={match.params.bid} itemCount={blog.comments.length} />
    </div>
  );
};

export default OneBlog;
