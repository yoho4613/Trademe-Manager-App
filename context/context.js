import { createContext, useState } from "react";

export const UserContext = createContext(null);

function Context({ children }) {
  const [user, setUser] = useState({
    token: "",
    tokenSecret: "",
    verifier: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default Context;
