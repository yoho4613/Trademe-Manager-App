import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "../context/StateContext";
import Spinner from "./Spinner";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  const { setUser, isLoading } = useStateContext();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (JSON.parse(localStorage?.getItem("user"))?.oauth_token?.length) {
        setUser(JSON.parse(localStorage.getItem("user")));
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
      <main className="main-container relative min-w-screen min-h-screen">
        <Spinner loading={isLoading} />
        <ToastContainer  position="top-center" />
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
