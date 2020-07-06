import React, { useState } from "react";

export const ModalTheme = React.createContext();

const ModalContext = ({ children }) => {
  const [registerModal, setRegisterModal] = useState(false);
  return (
    <ModalTheme.Provider value={{ registerModal, setRegisterModal }}>
      {children}
    </ModalTheme.Provider>
  );
};

export default ModalContext;
