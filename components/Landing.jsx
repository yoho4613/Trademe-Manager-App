import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/context";

const Landing = () => {
  const { user, setUser } = useContext(UserContext);

  
  return (
    <div>
      <h1>Landing page</h1>
    </div>
  );
};

export default Landing;
