import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Landing } from "../components";
import { UserContext } from "../context/context";

export default function Home(props) {
  const { user, setUser } = useContext(UserContext);

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
    if (localStorage.key("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <div>
      Hello Trademe
      <h1>User Name</h1>
      <p>Your Credencial</p>
      <p>token-{user ? user.token : "...fetching"}</p>
      <p>tokenSecret-{user ? user.tokenSecret : "...fetching"}</p>
      <p>verifier-{user ? user.verifier : "...fetching"}</p>
      <p>oauthToken-{user ? user.oauth_token : "...fetching"}</p>
      <p>OauthSecret-{user ? user.token_secret : "...fetching"}</p>
      <Landing />
      <button onClick={() => loadUser()}>Login</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = await context;
  return { props: { query } };
}
