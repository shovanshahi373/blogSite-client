import React, { useState, useEffect, useContext } from "react";

export const MessagesContext = React.createContext();

const MessageThemeContext = ({ children }) => {
  const [messages, updateMessages] = useState([]);

  const setMessages = (msgs) => {
    updateMessages((prev) => [...prev, ...msgs]);
  };

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

  useEffect(() => {
    setMessages([{ msg: "Welcome to the blogsite!" }]);
  }, []);

  return (
    <MessagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessageContext = () => useContext(MessagesContext);

export default MessageThemeContext;
