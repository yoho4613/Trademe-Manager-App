import crypto from "crypto";
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { BASE_URL, BASE_PAGE_SLUG } from "../constant/config";
import { toast } from "react-toastify";

const UserContext = createContext();

export const StateContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    consumer: "",
    consumerSecret: "",
    token: "",
    tokenSecret: "",
    verifier: "",
    oauth_token: "",
    token_secret: "",
  });
  const [navBar, setNavBar] = useState([
    { slug: "home", name: "Home", href: `/`, current: false },
    { slug: "list", name: "List an Item", href: `/list`, current: false },
    {
      slug: "selling",
      name: "Items I'm Selling",
      href: `${BASE_PAGE_SLUG}/selling`,
      current: false,
      url: "/MyTradeMe/SellingItems/All.json",
    },
    {
      slug: "watchlist",
      name: "Watchlist",
      href: `${BASE_PAGE_SLUG}/watchlist`,
      current: false,
      url: "/MyTradeMe/Watchlist/All.json",
    },
    {
      slug: "sold",
      name: "Sold Item",
      href: `${BASE_PAGE_SLUG}/sold`,
      current: false,
      url: "/MyTradeMe/SoldItems/Last45Days.json",
    },
    {
      slug: "unsold",
      name: "Unsold Item",
      href: `${BASE_PAGE_SLUG}/unsold`,
      current: false,
      url: "/MyTradeMe/UnsoldItems/ItemsICanRelist.json",
    },
  ]);

  const notifyError = () =>
    toast.error(`There was an error. Refresh the page or try later`);

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
      console.log("frontend error", error.response.data);
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
        navBar,
        setNavBar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useStateContext = () => useContext(UserContext);
