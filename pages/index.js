import { useEffect } from "react";
import { Landing } from "../components";


export default function Home(props) {

  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");

    alanBtn({
      key: "2b2ff89b92b3fe83f2bc358a7062641e2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData === "play") {
          console.log("works");
        }
      },
      rootEl: document.getElementById("alan-btn"),
    });
  }, []);


  return (
    <div>
      <Landing />

    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = await context;
  return { props: { query } };
}
