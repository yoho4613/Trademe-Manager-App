import { useEffect } from "react";
import { Landing } from "../components";
import { useStateContext } from "../context/StateContext";

export default function Home(props) {
  const {user} = useStateContext()


  // useEffect(() => {
  //   if (user.token_secret.length && hasProfile) {
  //     fetchData("/MyTradeMe/Summary.json", user, setProfile)
  //       .then((res) => {
  //         setHasProfile(false);
  //         console.log(res);
  //       })
  //       .catch((err) =>
  //         toast.error(
  //           "There was an error with fetching your profile. Please refresh the page or login again"
  //         )
  //       );
  //   }
  // }, [user.token_secret]);

  // useEffect(() => {
  //   if (profile && profile.hasOwnProperty("MemberId") && hasMember) {
  //     fetchData(`/Member/${profile.MemberId}/Profile.json`, user, setMember)
  //       .then((res) => {
  //         setHasMember(false);
  //         console.log(res);
  //       })
  //       .catch((err) =>
  //         toast.error(
  //           "There was an error with fetching your profile. Please refresh the page or login again"
  //         )
  //       );
  //   }
  // }, [profile]);


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
