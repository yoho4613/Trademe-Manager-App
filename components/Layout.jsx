import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "../context/StateContext";
import Spinner from "./Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import useAlan from "./Alan";

const Layout = ({ children }) => {
  const {user, setUser, isLoading } = useStateContext();

  const alanBtnContainer = useRef();
 

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user.token_secret.length && JSON.parse(localStorage?.getItem("user"))?.oauth_token?.length) {
        setUser(JSON.parse(localStorage.getItem("user")));
      }
      // useAlan();
    }
  }, []);

  useEffect(() => {
    let timer = null;

    const startTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        localStorage.removeItem("user");
        setUser({
          consumer: "",
          consumerSecret: "",
          token: "",
          tokenSecret: "",
          verifier: "",
          oauth_token: "",
          token_secret: "",
        });
        router.push("/login");
      }, 30 * 60 * 1000); // 30 minutes in milliseconds
    };

    const stopTimer = () => {
      clearTimeout(timer);
    };

    startTimer();

    document.addEventListener("click", startTimer);
    document.addEventListener("keypress", startTimer);

    return () => {
      stopTimer();

      document.removeEventListener("click", startTimer);
      document.removeEventListener("keypress", startTimer);
    };
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
        <ToastContainer position="top-center" />
        {children}
        <div ref={alanBtnContainer} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
