import React from "react";
import LoadingComment from "../../Skeletons/LoadingComment";
import PickRandomColor from "../../helpers/randomColor";
import { getRelativeTime } from "../../helpers/time";
const color = PickRandomColor();

const Comments = ({ comments, isExists }) => {
  return (
    <>
      <ul>
        {comments.length ? (
          comments.map((comment) => {
            return (
              <div
                key={comment.id}
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
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{comment.commentator} says:</span>
                    <span
                      style={{
                        color: "#ccc",
                      }}
                    >
                      {/* {comment.createdAt
                      ? new Date(comment.createdAt).toDateString()
                      : ""} */}
                      {comment.createdAt
                        ? getRelativeTime(comment.createdAt)
                        : ""}
                    </span>
                  </div>
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
                      <i className='far fa-thumbs-up'></i>
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
      {!comments.length && <div style={{ color: "#ccc" }}>{isExists}</div>
        ? isExists
        : ""}
    </>
  );
};

export default Comments;
