import React from "react";
import { footer as Footer } from "../partials/Footer";
import { Header } from "../partials/Header";
import LoginThemeContext from "../../Contexts/loginContext";
import ModalThemeContext from "../../Contexts/modalContext";
import MessageThemeContext from "../../Contexts/GlobalMessages";

const MainLayout = ({ children }) => {
  return (
    <MessageThemeContext>
      <ModalThemeContext>
        <LoginThemeContext>
          <Header />
          <section className='main-content'>{children}</section>
          <Footer />
        </LoginThemeContext>
      </ModalThemeContext>
    </MessageThemeContext>
  );
};

export default MainLayout;
