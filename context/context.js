import { createContext, useState } from "react";

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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default Context;
