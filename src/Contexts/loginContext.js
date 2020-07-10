import React, { useEffect, useState } from "react";

export const LoginContext = React.createContext();

// export const LoginContextProvider = useContext(LoginContext);

const LoginThemeContext = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const tokenExists = sessionStorage.getItem("TOKEN") !== null;
    setLoggedIn(tokenExists);
    const sessionuser = sessionStorage.getItem("SESSION_USER");
    if (sessionuser !== null) {
      setUserData(JSON.parse(sessionuser));
    }
  }, []);

  const logOut = () => {
    sessionStorage.removeItem("TOKEN");
    sessionStorage.removeItem("SESSION_USER");
    setUserData({});
    setLoggedIn(false);
  };

  return (
    <LoginContext.Provider
      value={{ loggedIn, setLoggedIn, userData, setUserData, logOut }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginThemeContext;
