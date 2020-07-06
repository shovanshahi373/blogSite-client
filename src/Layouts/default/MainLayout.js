import React from "react";
import { footer as Footer } from "../partials/Footer";
import { Header } from "../partials/Header";
import LoginThemeContext from "../../Contexts/loginContext";

const MainLayout = ({ children }) => {
  return (
    <LoginThemeContext>
      <Header />
      <section className='main-content'>{children}</section>
      <Footer />
    </LoginThemeContext>
  );
};

export default MainLayout;
