import React from "react";
import { footer as Footer } from "../partials/Footer";
import { Header } from "../partials/Header";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <section className='main-content'>{children}</section>
      <Footer />
    </>
  );
};

export default MainLayout;
