import Context from "../context/context";
import { Navbar } from "../components";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Navbar />
        <Component {...pageProps} />
      </Context>
    </>
  );
}

export default MyApp;
