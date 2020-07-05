import React from "react";
import styled, { css, keyframes } from "styled-components";

// const shine = keyframes`
//   100% {
//     background-position: 100% 100%;
//   }
// `;

// const animation = (props) =>
//   css`
//     ${shine}
//   `;

const Circle = styled.div((props) => ({
  height: props.size + "px",
  width: props.size + "px",
  borderRadius: "50%",
  backgroundColor: "#ccc",
}));

const Line = styled.div((props) => ({
  height: props.breadth + "px",
  width: props.length + "%",
  // backgroundColor: "#ccc",
  backgroundImage: "linear-gradient(to right,#9f9999  1%,#ccc 99%);",
  backgroundSize: "1000%, 50%",
  backgroundPosition: "0% 100%",
  borderRadius: "4px",
  marginBottom: "5px",
  // animationName: "shine",
  // animationDuration: "2s",
  // animationDirection: "alternate",
}));

const LoadingComment = ({ quantity = 5 }) => {
  return Array(quantity)
    .fill("loaders")
    .map((loader) => {
      return (
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <div>
            <Circle size={50} />
          </div>
          <div
            style={{
              flex: 1,
              marginLeft: "10px",
            }}
          >
            <Line className='shine' breadth={10} length={25} />
            <Line className='shine' breadth={20} length={100} />
            <Line className='shine' breadth={10} length={15} />
          </div>
        </div>
      );
    });
};

export default LoadingComment;
