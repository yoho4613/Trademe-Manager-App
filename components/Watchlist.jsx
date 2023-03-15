import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { UserContext } from "../context/context";

const Watchlist = ({ user }) => {
  // const {user, setUser } = useContext(UserContext)
  const [watchlist, setWatchlist] = useState([]);
  console.log(user)

  useEffect(() => {
    // setWatchlist(() => getWatchlist(user));
    

      const watch = getWatchlist(user).then((res) => console.log(res));
    
  
  }, []);

  const getWatchlist = async (user) => {
    const result = await axios.post("/api/mytrademe", {
      url: "/MyTradeMe/Watchlist/All.json",
      ...user,
    });
    return result.data;
  };

  return <div>{watchlist ? <p>{watchlist}</p> : "loading..."}</div>;
};

export default Watchlist;
