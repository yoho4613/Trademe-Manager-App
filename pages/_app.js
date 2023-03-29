import { useRef } from "react";
import { StateContext } from "../context/StateContext";

import "../styles/globals.css";
import Layout from "../components/Layout";




function MyApp({ Component, pageProps }) {

  
  return (
    <>
      <StateContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </>
  );
}

export default MyApp;
