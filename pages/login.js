import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../context/context";

function Login(props) {
  const [userId, setUserId] = useState();
  const [secret, setSecret] = useState("");
  const [auth, setAuth] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  let localUser;
  let oauth_verifier
  let oauth_token;

  useEffect(() => {
    if (auth) {
      sendToken();
    }
  }, [auth]);

  useEffect(() => {
    oauth_verifier = router.query.oauth_verifier;
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localUser = JSON.parse(localStorage.getItem("user"));
    }
    if (oauth_verifier) {
      localUser.verifier = oauth_verifier;
      fetchUser(localUser)
    }
  }, [oauth_verifier]);

  const fetchUser = async (user) => {
    try {
      const result = await axios
        .post("/api/accessToken", user)
        
     
      console.log(result.data)
      localUser.oauth_token = result.data.slice(12, 44)
      localUser.oauth_tokenSecret = result.data.slice(64, 96)
      localStorage.setItem('user', JSON.stringify(localUser))
      router.push('/')
      return result;
    } catch (error) {
      console.log(error);
      console.log("it is error from front");
    }
  }; 

  const sendToken = async () => {
    const data = {
      consumer: userId,
      consumerSecret: secret,
      token: auth.slice(12, 44),
      tokenSecret: auth.slice(64, 96),
    };
    localStorage.setItem("user", JSON.stringify(data));
    await setUser({
      ...user,
      ...data,
    });
    router.push(
      `https://secure.tmsandbox.co.nz/Oauth/Authorize?oauth_token=${data.token}`
    );
  };

  const fetchAPI = async (e) => {
    e.preventDefault();
    await fetchItems(userId, secret);
  };

  const fetchItems = async (consumer, secret) => {
    try {
      const result = await axios
        .post("/api/trademe", {
          consumer: consumer,
          secret: secret,
        })
        .then((res) => res.data.result);

      return result ? setAuth(result) : setIsWrong(true);
    } catch (error) {
      console.log(error);
      console.log("it is error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {isWrong && (
          <h1 className="text-red-600">Please check your credential</h1>
        )}
        <form>
          <div className="mb-4">
            <label
              htmlFor="consumer"
              className="block text-gray-700 font-medium mb-2"
            >
              API
            </label>
            <input
              id="consumer"
              type="text"
              name="consumer"
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="consumerSecret"
              className="block text-gray-700 font-medium mb-2"
            >
              SECRET
            </label>
            <input
              id="consumerSecret"
              type="password"
              name="consumerSecret"
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <button
            onClick={(e) => fetchAPI(e)}
            href="/"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-gray-700 mt-4">
          Don't have an account?{" "}
          <Link
            className="text-blue-500 hover:underline"
            target="_blank"
            href="https://www.trademe.co.nz/MyTradeMe/Api/DeveloperOptions.aspx"
          >
            Create API
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps(context) {
  const { query } = await context;
  return { props: { query } };
}
