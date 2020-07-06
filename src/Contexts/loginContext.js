import React, { useEffect, useState } from "react";

export const LoginContext = React.createContext();

// export const LoginContextProvider = useContext(LoginContext);

const LoginThemeContext = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <LoginContext.Provider
      value={{ loggedIn, setLoggedIn, userData, setUserData }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginThemeContext;
