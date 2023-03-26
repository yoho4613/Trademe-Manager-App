import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";

const profile = () => {
  const { user } = useStateContext();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (user.oauth_token && user.token_secret) {
      getProfile(user);
    }

  }, [user.oauth_token]);

  const getProfile = async (user) => {
    const result = await axios.post("/api/mytrademe", {
      ...user,
      url: "/MyTradeMe/Summary.json",
    });

    setProfile(result.data);
    return result.data;
  };

  // Get Profile Photo If user has
  const getPhoto = async (user) => {
    const result = await axios.post("/api/mytrademe", {
      ...user,
      url: "/Photos.json"
    })
    console.log(result.data)
  }


  return (
    <div>
      <section
        style={{ fontFamily: "Montserrat" }}
        className=" bg-[#071e34] flex font-medium items-center justify-center h-screen"
      >
        <section className="w-120 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xl">{profile.Nickname}</span>
          </div>
          {profile && (
            <>
              <div className="mt-6 w-fit mx-auto">
                <img
                  src="https://api.lorem.space/image/face?w=120&h=120&hash=bart89fe"
                  className="rounded-full w-28 "
                  alt="profile picture"
                  srcSet=""
                />
              </div>
              <div className="mt-8 ">
                <h2 className="text-white font-bold text-2xl tracking-wide">
                  {profile.FirstName} {profile.LastName}
                </h2>
              </div>
           

              <h2 className="text-white font-bold text-2md tracking-wide">
                Member Since:{" "}
                {new Date(Number(profile?.DateJoined?.replace(/\D/g, "")))
                  .toString()
                  .slice(0, 16)}
              </h2>
              <div className="mt-3 text-white text-sm">
                {/* <span className="text-gray-400 font-semibold">Balance: </span> */}
                <span>Balance: ${profile.Balance}</span>
              </div>
              <div className="mt-3 text-white text-sm">
                {profile.IsAddressVerified ? (
                  <p className="text-emerald-400 font-semibold mt-2.5">
                    Address Verified
                  </p>
                ) : (
                  <p>Address is not verified"</p>
                )}
                <p>
                {profile.ClosestLocality}

                </p>
              </div>
            </>
          )}
        </section>
      </section>
    </div>
  );
};

export default profile;
