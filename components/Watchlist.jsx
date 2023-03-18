import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";


const Watchlist = () => {
  const {user, fetchData } = useStateContext()
  const [watchlist, setWatchlist] = useState({});


  useEffect(() => {
    
    
  // getWatchlist(user)
  fetchData("/MyTradeMe/Watchlist/All.json", user, setWatchlist)

  }, []);

  return <div>{watchlist ? <p>{watchlist.Page}</p> : "loading..."}</div>;
};

export default Watchlist;
