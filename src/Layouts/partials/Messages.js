import React, { useEffect, useContext } from "react";
import styled, { css, keyframes } from "styled-components";
import { MessagesContext } from "../../Contexts/GlobalMessages";

const messageIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const FadeIn = css`
  animation: ${messageIn} 1s linear infinite;
`;

const GlobalMessageStyle = styled.div((props) => ({
  padding: "10px",
  borderRadius: "5px",
  marginBottom: "10px",
  maxWidth: "60vw",
  transform: "translate(0%,-500%)",
  transition: "transform 1s",
  backgroundColor: props.color,
  animationName: "messageIn",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  animationDuration: props.timer + "s",
  animationFillMode: "forwards",
  animationDelay: props.delay + "s",
}));

const ContainerStyle = styled.div`
  display: inline-block;
  position: fixed;
  top: 2%;
  z-index: 9999999;
  right: 1%;
`;

const GlobalMessage = ({ items }) => {
  const { messages, setMessages } = useContext(MessagesContext);
  useEffect(() => {
    setMessages([{ msg: "dont mind me!" }]);
  }, []);
  useEffect(() => {
    const messageDivs = document.querySelectorAll(".pause-on-hover");
    console.log("on inital :", messageDivs);
    if (messageDivs && messageDivs.length) {
      messageDivs[messageDivs.length - 1].addEventListener(
        "animationend",
        () => {
          messageDivs.forEach((msg) => {
            console.log(msg);
            // msg.remove();
          });
          setMessages([]);
        }
      );
    }
  }, [messages]);
  return (
    <ContainerStyle>
      {messages.map(({ msg, timer = 3 }, i) => {
        const color = msg.includes("SUCCESS:")
          ? "var(--green)"
          : msg.includes("ERROR:")
          ? "var(--red)"
          : "var(--blue)";
        const mymsg = msg.includes(":") ? msg.split(":")[1].trim() : msg;
        return (
          <GlobalMessageStyle
            className='pause-on-hover'
            timer={timer}
            color={color}
            delay={i}
          >
            {mymsg}
            <i
              style={{
                marginLeft: "10px",
              }}
              className={`
            ${
              msg.includes("SUCCESS:")
                ? "far fa-check-circle"
                : msg.includes("ERROR:")
                ? "far fa-times-circle"
                : "fas fa-info-circle"
            }`}
            ></i>
          </GlobalMessageStyle>
        );
      })}
    </ContainerStyle>
  );
};

export default GlobalMessage;
