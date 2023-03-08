import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { Landing } from "../components";
import { UserContext } from "../context/context";


export default function Home(props) {
  const { user, setUser } = useContext(UserContext);

  const router = useRouter();
  let oauth_verifier;

  useEffect(() => {

  }, [oauth_verifier]);

  const loadUser = async () => {
    oauth_verifier = router.query.oauth_verifier;
    const localUser = JSON.parse(localStorage.getItem("user")) || {};
    await setUser({
      ...localUser,
      verifier: oauth_verifier,
    });
    localUser.verifier = oauth_verifier

    localStorage.setItem("user", JSON.stringify(localUser))

   const authToken =  await fetchItems({
      verifier: localUser.verifier,
      consumer: localUser.consumer,
      token: localUser.token,
      consumerSecret: localUser.consumerSecret,
      tokenSecret: localUser.tokenSecret
    })
    console.log(`authToken is  ${authToken}`)
  };

  const fetchItems = async (user) => {
    try {
      const result = await axios
        .post("/api/accessToken", user)
        .then((res) => console.log(res));

      return result 
    } catch (error) {
      console.log(error);
      console.log("it is error");
    }
  };

  return (
    <div>
      Hello Trademe
      <h1>User Name</h1>
      <p>Your Credencial</p>
      <p>{user ? user.token : "...fetching"}</p>
      <p>{user ? user.tokenSecret : "...fetching"}</p>
      <p>{user ? user.verifier : "...fetching"}</p>
      <Landing />
      <button onClick={() => loadUser()}>Login</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = await context;
  return { props: { query } };
}
