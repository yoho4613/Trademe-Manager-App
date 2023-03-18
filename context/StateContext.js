import axios from "axios";
import { createContext, useContext, useState } from "react";

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

  const fetchData = async (url, user, parse) => {
    const result = await axios.post("/api/mytrademe", {
      url: url,
      ...user,
    });

    parse(result.data);
    console.log(result.data);
    return result.data;
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchData, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useStateContext = () => useContext(UserContext);
