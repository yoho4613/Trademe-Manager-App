import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useStateContext } from "../context/StateContext";
import Spinner from "./Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { navigation } from "../constant/config";

const Layout = ({ children }) => {
  const { setUser, isLoading, navBar, setNavBar } = useStateContext();
  const router = useRouter();
  const alanBtnContainer = useRef();

  useEffect(() => {
    console.log(router.pathname);
    console.log(router.query);

    setNavBar((prev) =>
      prev.map((nav) => (nav.current ? { ...nav, current: false } : nav))
    );

    if (router.query.slug) {
      console.log(`is ${router.query.slug} ${router.query.slug}`);
      setNavBar((prev) =>
        prev.map((nav) =>
          nav.slug === router.query.slug ? { ...nav, current: true } : nav
        )
      );
    } else if (router.pathname === "/list") {
      console.log("is list", router.pathname);
      setNavBar((prev) =>
        prev.map((nav) =>
          nav.slug === "list" ? { ...nav, current: true } : nav
        )
      );
    } else if (router.pathname === "/") {
      console.log("is home", router.pathname);
      setNavBar((prev) =>
        prev.map((nav) =>
          nav.slug === "home" ? { ...nav, current: true } : nav
        )
      );
    }

    if (typeof window !== undefined) {
      if (
        localStorage.getItem("user") !== null &&
        router.pathname === "/login"
      ) {
        router.push("/");
        toast.info("You are logged in");
      }
    }
  }, [router.pathname, router.query]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        // !user.token_secret.length &&
        JSON.parse(localStorage?.getItem("user"))?.oauth_token?.length
      ) {
        setUser(JSON.parse(localStorage.getItem("user")));
      } else {
        localStorage.clear();
      }
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

  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");

    let alan;

    alan = alanBtn({
      key: "2b2ff89b92b3fe83f2bc358a7062641e2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({ command, pageName }) => {
        if (command === "login") {
          if (localStorage.key("user") === null) {
            router.push("/login");
          } else {
            alan.playText("You are already logged in");
          }
        } else if (command === "logout") {
          localStorage.clear();
          setUser({
            consumer: "",
            consumerSecret: "",
            token: "",
            tokenSecret: "",
            verifier: "",
            oauth_token: "",
            token_secret: "",
          });
          router.push("/");
        } else if (command === "page") {
          const foundMenu = navigation.find(
            ({ name }) => name.toLowerCase() === pageName.toLowerCase()
          );
          if (foundMenu) {
            router.push(`/${foundMenu.href}`);
          } else {
            alan.playText(
              `Sorry I could not find that page name of ${pageName}. Please try other name.`
            );
          }
        }
      },
      rootEl: document.getElementById("alan-btn"),
    });
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
