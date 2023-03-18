import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "../context/StateContext";

const Layout = ({ children }) => {
  const { user, setUser } = useStateContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (JSON.parse(localStorage?.getItem("user"))?.oauth_token?.length) {
        setUser(JSON.parse(localStorage.getItem('user')));
      }
    }
  }, []);

  return (
    <div className="layout">
      <Head>
        <title>Trademe-Manager</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
