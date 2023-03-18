import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/StateContext";

const Landing = () => {
  const { user, setUser } = useStateContext();

  return (
    <div>
      <h1>Landing page</h1>
    </div>
  );
};

export default Landing;
