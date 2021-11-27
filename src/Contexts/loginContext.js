import React, { useEffect, useState, useContext } from "react";
import Auth from "../Auths/auth";
import { useMessageContext } from "./GlobalMessages";
// import CreateMessage from "../helpers/createMessage";

export const LoginContext = React.createContext();
const auth = new Auth();

// export const LoginContextProvider = useContext(LoginContext);

const LoginThemeContext = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const { setMessages } = useMessageContext();

  useEffect(() => {
    auth
      .loginStatus()
      .then((res) => {
        console.log({ loggedIn });
        setLoggedIn(res);
      })
      .catch(
        (err) => {}
        // CreateMessage(err.message, setMessages, "error")
      );
    const sessionuser = sessionStorage.getItem("SESSION_USER");
    if (sessionuser !== null) {
      setUserData(JSON.parse(sessionuser));
    }
  }, []);

  const logOut = () => {
    auth
      .logout()
      .then((isloggedIn) => {
        sessionStorage.removeItem("SESSION_USER");
        setUserData({});
        setLoggedIn(isloggedIn);
      })
      .catch((err) => {
        console.log(err);
        // CreateMessage(err.message, setMessages, "error");
      });
  };

  const logIn = (credentials) =>
    auth
      .login(credentials)
      .then((res) => {
        if (res.status > 400) {
          throw new Error("failed to communicate with the server!");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.token) {
          sessionStorage.setItem("TOKEN", data.token);
        }
      })
      .catch((err) => {
        console.log(err.message);
        // CreateMessage(err.message, setMessages, "error");
      });

  return (
    <LoginContext.Provider
      value={{ loggedIn, setLoggedIn, userData, setUserData, logOut, logIn }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);

export default LoginThemeContext;
