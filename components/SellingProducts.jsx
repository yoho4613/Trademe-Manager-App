import React, { useContext } from 'react'
import { UserContext } from "../context/context";

const SellingProducts = () => {
  const {user, setUser} = useContext(UserContext)

  const getWatchlist = async (user) => {
    const options = {
      method: "GET",
      url: "https://api.tmsandbox.co.nz/v1/MyTradeMe/Watchlist/All.json",
      headers: {
        Authorization:
          'OAuth oauth_consumer_key="401B9EC73F95806FA7F389ABD1CE2439", oauth_nonce="EKLCChkkw1SUm5EHYcm87iqNGO7jh7MS", oauth_signature="h%2FAwGDhQcCb8%2BW2%2F5wJ0XsGDzJs%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1678757477", oauth_token="C395D139D723441EA7EB1809BA0D9EA3", oauth_version="1.0"',
      },
    };


  return (
    <div>
      Watchlist
    </div>
  )
}
}

export default SellingProducts