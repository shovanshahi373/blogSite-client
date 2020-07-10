import React, { useState, useContext, useEffect } from "react";
import { ModalTheme } from "../../Contexts/modalContext";
import { MessagesContext } from "../../Contexts/GlobalMessages";
import createMesg from "../../helpers/createMessage";
import CommentBoxStyle from "../../Styles/CommentBoxStyle";

const letterPerRow = 50;

const NewComment = ({ user, setComments }) => {
  const { setRegisterModal } = useContext(ModalTheme);
  const { setMessages } = useContext(MessagesContext);
  const [comment, setComment] = useState("");
  const [openInput, setOpenInput] = useState(false);
  const [row, setRow] = useState(2);
  // const [col, setCol] = useState(letterPerRow);
  const [token, setToken] = useState(null);
  const [col, setCol] = useState(60);
  // const [wordRate, setWordRate] = useState(letterPerRow);

  const addNewRow = (e) => {
    let newRows = Math.ceil(e.target.value.length / col);
    if (newRows <= 2) {
      newRows = 2;
    }
    setRow(newRows);
    setComment(e.target.value);
  };

  const toggleComment = () => {
    if (!user.name) {
      const msg = "login to continue";
      createMesg(msg, setMessages, "error");
      return setRegisterModal(true);
    }
    setOpenInput(!openInput);
  };

  const postComment = () => {
    console.log("the token is", user.token);

    const bearer = token !== null ? `Bearer ${token}` : token;
    console.log("the fucking bearer is", bearer);
    fetch(`http://localhost:5000/blogs/${user.blogRef}/comment`, {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: comment,
      }),
    })
      .then((res) => {
        if (res.status.toString()[0] === "5") throw new Error("server error!");
        else if (res.status === 408) throw new Error("session has expired");
        return res.json();
      })
      .then((res) => {
        console.log("after successful commenting!", res);
        setComments(res.data);
        setComment("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = sessionStorage.getItem("TOKEN");
    console.log("my token is,", token);
    setToken(token);
    window.addEventListener("resize", () => {
      const newRate = Math.round(
        Math.floor(0.075 * document.body.clientWidth),
        1
      );
      console.log(setCol);
      setCol(newRate);
    });
  }, []);

  return (
    <CommentBoxStyle avatar={user.avatar}>
      {openInput ? (
        <div>
          <div className='image-container'>{user.name[0]}</div>
          <div>
            <h3>{user.name}</h3>
            <textarea
              value={comment}
              placeholder={"write a comment..."}
              onChange={(e) => addNewRow(e)}
              rows={row}
              cols={col}
            />
            <div style={{ textAlign: "end" }}>
              <button onClick={toggleComment}>cancel</button>
              <button onClick={postComment}>comment</button>
            </div>
          </div>
        </div>
      ) : (
        <button className='writeComment' onClick={toggleComment}>
          write a comment
        </button>
      )}
    </CommentBoxStyle>
  );
};

export default NewComment;
