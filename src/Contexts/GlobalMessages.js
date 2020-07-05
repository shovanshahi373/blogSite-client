import React, { useState, useEffect } from "react";

export const MessagesContext = React.createContext();

const MessageThemeContext = ({ children }) => {
  const [messages, setMessages] = useState([]);
  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessageThemeContext;

// useEffect(() => {
//   setMessages([{ msg: "dont mind me!" }]);
// }, []);
// useEffect(() => {
//   const messageDivs = document.querySelectorAll(".pause-on-hover");
//   console.log("on inital :", messageDivs);
//   if (messageDivs && messageDivs.length) {
//     messageDivs[messageDivs.length - 1].addEventListener(
//       "animationend",
//       () => {
//         messageDivs.forEach((msg) => {
//           console.log(msg);
//           msg.remove();
//         });
//         setMessages([]);
//       }
//     );
//   }
// }, [messages]);
