import { createContext, useState } from "react";
import { BASE_URL } from "../config";

export const UserContext = createContext(null);

function Context({ children }) {
  const [user, setUser] = useState({
    consumer: "",
    consumerSecret: "",
    token: "",
    tokenSecret: "",
    verifier: "",
    oauth_token: "",
    token_secret: ""
  });

  const fetchData = async (user, url) => {
    const options = {
      method: "GET",
      url: `${BASE_URL}/v1/MyTradeMe/Watchlist/All.json`,
      headers: {
        Authorization:
          `OAuth oauth_consumer_key=${user.consumer}, oauth_signature=${user.consumerSecret}, oauth_signature_method="HMAC-SHA1, oauth_token=${user.oauth_token}, oauth_version="1.0"`,
      },
    };

    const result = await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    return result;
  }

  return (
    <UserContext.Provider value={{ user, setUser, fetchData }}>
      {children}
    </UserContext.Provider>
  );
}

export default Context;
