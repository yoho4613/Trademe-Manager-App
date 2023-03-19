import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Watchlist from "../components/Watchlist";
import { useStateContext } from "../context/StateContext";

export default function Home(props) {
  const { user, setUser } = useStateContext();

  const router = useRouter();

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
    if (typeof window !== "undefined") {
      if (JSON.parse(localStorage?.getItem("user"))?.oauth_token?.length) {
        setUser(JSON.parse(localStorage.getItem('user')));
      }
    }
  }, []);

 
  return (
    <div>
      {user?.oauth_token && <Watchlist user={user}/>}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = await context;
  return { props: { query } };
}
