import React from "react";
import Footer from "../partials/Footer";
import { Header } from "../partials/Header";
import Messages from "../partials/Messages";

const MainLayout = ({ children }) => {
  return (
    <>
      <Messages />
      <Header />
      <section className="main-content">{children}</section>
      <Footer />
    </>
  );
};

export default MainLayout;
