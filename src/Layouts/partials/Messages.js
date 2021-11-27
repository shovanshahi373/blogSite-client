import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { useMessageContext } from "../../Contexts/GlobalMessages";

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
  backgroundColor: `hsl(${props.color},100%,70%)`,
  color: `hsl(${props.textColor},100%,50%)`,
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

const GlobalMessage = () => {
  const { messages } = useMessageContext();

  return (
    <ContainerStyle>
      {messages.map(({ msg, timer = 3 }, i) => {
        const color = msg.includes("SUCCESS:")
          ? 150
          : msg.includes("ERROR:")
          ? 30
          : 245;
        const mymsg = msg.includes(":") ? msg.split(":")[1].trim() : msg;
        const textColor = color + 180;
        return (
          <React.Fragment key={i}>
            <GlobalMessageStyle
              className="pause-on-hover"
              timer={timer}
              textColor={textColor}
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
          </React.Fragment>
        );
      })}
    </ContainerStyle>
  );
};

export default GlobalMessage;
