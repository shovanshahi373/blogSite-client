import React, { useState } from "react";

export const PasswordContext = React.createContext();

// export const usePasswordTheme = () => {
//   return useContext(PasswordContext);
// }

const PasswordThemeContext = ({ children }) => {
  const [strength, setStrength] = useState({
    subLength: {
      pattern: /.{6,11}/,
      achieved: false,
    },
    specialChars: {
      pattern: /[!@_]+/g,
      achieved: false,
    },
    digits: {
      pattern: /\d+/g,
      achieved: false,
    },
    superLength: {
      pattern: /.{12,}/,
      achieved: false,
    },
  });
  return (
    <PasswordContext.Provider value={{ strength, setStrength }}>
      {children}
    </PasswordContext.Provider>
  );
};

export default PasswordThemeContext;
