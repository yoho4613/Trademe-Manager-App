import crypto from "crypto";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BASE_URL } from "../constant/config";
import { toast } from "react-toastify";

const UserContext = createContext();

export const StateContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const notifyError = () => toast.error(`There was an error. Refresh the page or try later`)
  

  const [user, setUser] = useState({
    consumer: "",
    consumerSecret: "",
    token: "",
    tokenSecret: "",
    verifier: "",
    oauth_token: "",
    token_secret: "",
  });

  

  const fetchData = async (url, user, parse, method, body) => {
    try {
      setIsLoading((loading) => !loading);
      const result = await axios.post("/api/mytrademe", {
        url: url,
        ...user,
        method,
        body,
      });

      if (parse) {
        parse(result.data);
      }
      setIsLoading((loading) => !loading);
      return result.data;
    } catch (error) {
      
      console.log("frontend error",error.response.data);
      setIsLoading((loading) => !loading);
      throw Error(error.response.data);
    }
  };

  const removeWatchlist = async (urlData, user, parse) => {
    setIsLoading((loading) => !loading);

    try {
      const consumerKey = user.consumer;
      const oauthToken = user.oauth_token;
      const consumerSecret = user.consumerSecret;
      const tokenSecret = user.token_secret;
      const url = BASE_URL + urlData;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: "",
        },
        url: url,
      };

      const oauthParams = {
        oauth_consumer_key: consumerKey,
        oauth_nonce: crypto.randomBytes(16).toString("hex"),
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_token: oauthToken,
        oauth_version: "1.0",
      };

      const signatureBaseString = `${options.method}&${encodeURIComponent(
        url
      )}&${encodeURIComponent(
        Object.entries({ ...options.params, ...oauthParams })
          .sort()
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&")
      )}`;

      const signingKey = `${encodeURIComponent(
        consumerSecret
      )}&${encodeURIComponent(tokenSecret)}`;

      const oauthSignature = crypto
        .createHmac("sha1", signingKey)
        .update(signatureBaseString)
        .digest("base64");

      options.headers.Authorization = `OAuth ${Object.entries(oauthParams)
        .map(([key, value]) => `${key}="${encodeURIComponent(value)}"`)
        .concat(`oauth_signature="${encodeURIComponent(oauthSignature)}"`)
        .join(", ")}`;

      const result = await axios
        .request(options)
        .then((res) => res)
        .catch((err) => console.log(err.message));

      if (parse) {
        parse(result.data);
      }

      setIsLoading((loading) => !loading);
      return result;
    } catch (error) {
      console.log(error.message);
      console.log("it is error ");
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchData,
        isLoading,
        setIsLoading,
        removeWatchlist,
        notifyError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useStateContext = () => useContext(UserContext);
