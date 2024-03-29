import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";

import assets from "../assets";
import Image from "next/image";

const Profile = () => {
  const { user, fetchData, notifyError } = useStateContext();
  const [profile, setProfile] = useState({});
  const [member, setMember] = useState({});

  useEffect(() => {
    // console.log(profile);
    if (profile.MemberId) {
      fetchData(
        `/Member/${profile.MemberId}/Profile.json`,
        user,
        setMember
      ).catch((err) => notifyError());
    }
  }, [profile]);

  useEffect(() => {
    console.log(member);
  }, [member]);

  useEffect(() => {
    if (user.oauth_token.length && user.token_secret.length) {
      fetchData("/MyTradeMe/Summary.json", user, setProfile).catch((err) =>
        notifyError()
      );
    }
  }, [user.oauth_token]);

  
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
                <Image
                  src={member.Photo ? member.Photo : assets.kiwi}
                  width={100}
                  height={100}
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
              <h2 className="text-white font-bold text-2md tracking-wide">
                {profile.Email}
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
                  <p>Address is not verified</p>
                )}
                <p>{profile.ClosestLocality}</p>
              </div>
              {member && (
                <div className="mt-3 text-white text-sm">
                  <p>Biography: {member.Biography}</p>
                  <p>Quote: {member.Quote}</p>
                </div>
              )}
            </>
          )}
        </section>
      </section>
    </div>
  );
};

export default Profile;
