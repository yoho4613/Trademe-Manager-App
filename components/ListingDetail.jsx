import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/StateContext";
import Image from "next/image";

const ListingDetail = ({ data: data, category: category }) => {
  const router = useRouter();
  const { user, removeWatchlist } = useStateContext();
  const [list, setList] = useState({});
  const [photos, setPhotos] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    setList(data);
    if (list.Photos) {
      setPhotos(list.Photos.map((el) => el.Value.Large));
    }
    if (list.EndDate) {
      setInterval(() => {
        checkTimeLeft(list.EndDate);
      }, 1000);
    }
  }, [data, list]);

  const handleDelete = async (item) => {
    if (category === "watchlist") {
      await removeWatchlist(
        `/MyTradeMe/WatchList/${item.ListingId}.json`,
        user
      );

      router.push(`/a/${category}`);
    }
  };

  const checkTimeLeft = (time) => {
    const endDate = Number(time.replace(/\D/g, ""));
    const currentDate = new Date().getTime();
    const timeleft = endDate - currentDate;

    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const days = Math.floor(timeleft / msPerDay);
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / msPerHour);
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / msPerMinute);
    const seconds = Math.floor((timeleft % (1000 * 60)) / msPerSecond);
    setTimeLeft({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  return (
    <div>
      {list && (
        <section className="py-10 font-poppins dark:bg-gray-800">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="flex flex-wrap mb-24 -mx-4">
              <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                <div className="sticky top-0 overflow-hidden ">
                  <div className="relative mb-6 lg:mb-10 lg:h-96">
                    <button
                      className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2"
                      onClick={() =>
                        setCurrentImg((current) =>
                          current === 0 ? photos.length - 1 : current - 1
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5 text-red-500 bi bi-chevron-left dark:text-red-200"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                        ></path>
                      </svg>
                    </button>
                    {list.Photos && (
                      <Image
                        className="object-contain w-full lg:h-full"
                        src={photos[currentImg]}
                        width={100}
                        height={100}
                        alt=""
                      />
                    )}
                    <button
                      className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                      onClick={() =>
                        setCurrentImg((current) =>
                          current >= photos.length - 1 ? 0 : current + 1
                        )
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5 text-red-500 bi bi-chevron-right dark:text-red-200"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div className="flex-wrap hidden -mx-2 md:flex">
                    {photos.map((photo, i) => (
                      <div
                        key={i}
                        className="w-1/2 p-2 sm:w-1/4"
                        onClick={() => setCurrentImg(i)}
                      >
                        <button
                          className={`${
                            currentImg === i && "border-red-400"
                          } block border border-gray-200 hover:border-red-400 dark:border-gray-700 dark:hover:border-red-300`}
                        >
                          <Image
                            className="object-contain w-full lg:h-28"
                            src={photo}
                            width={100}
                            height={100}
                            alt=""
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2">
                <div className="lg:pl-20">
                  <div className="mb-6 ">
                    {list.IsFeatured && (
                      <span className="px-2.5 py-0.5 text-xs text-green-600 bg-green-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                        Featured
                      </span>
                    )}
                    <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                      {list.Title}
                    </h2>

                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                      <span>{list.PriceDisplay}</span>
                      {list.MinimumNextBidAmount && (
                        <span className="ml-3 text-base font-bold text-gray-500 dark:text-gray-400">
                          current Price: ${list.MinimumNextBidAmount}
                        </span>
                      )}
                      {list.ReservePrice && (
                        <span className="ml-3 text-base font-bold text-gray-500  dark:text-gray-400">
                          Reserve Price: ${list.ReservePrice}
                        </span>
                      )}
                    </p>
                    {list.EndDate && (
                      <div>
                        <h2 className=" text-sm font-normal text-gray-700 dark:text-gray-400">
                          Closes:{" "}
                          {`${new Date(
                            Number(list.EndDate.replace(/\D/g, ""))
                          ).toLocaleString("en-GB", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                          })} ${new Date(
                            Number(list.EndDate.replace(/\D/g, ""))
                          ).toLocaleTimeString("en-GB", { hour12: false })}`}
                        </h2>
                        <p className=" text-sm font-normal text-gray-700 dark:text-gray-400">
                          {timeLeft &&
                            `${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} Minutes, ${timeLeft.seconds} seconds`}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                      Seller Information :
                    </h2>

                    {list.Member && (
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                        <div className="p-3 lg:p-5 ">
                          <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                            <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                              <div className="w-full mb-4 md:w-2/5">
                                <div className="flex ">
                                  <div>
                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                      NickName
                                    </p>
                                    <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                      {list.Member.Nickname}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full mb-4 md:w-2/5">
                                <div className="flex ">
                                  <div>
                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                      Member Since
                                    </p>
                                    <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                      {`${new Date(
                                        Number(
                                          list.Member.DateJoined.replace(
                                            /\D/g,
                                            ""
                                          )
                                        )
                                      ).toLocaleString("en-GB", {
                                        year: "2-digit",
                                        month: "2-digit",
                                      })}`}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                <div className="flex ">
                                  <div>
                                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                      Resion
                                    </p>
                                    <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                      {list.Member.Region}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                <div className="flex ">
                                  <div>
                                    {list.Member.IsAddressVerified ? (
                                      <h2 className="text-base font-semibold text-green-500 dark:text-gray-400">
                                        Address Verified
                                      </h2>
                                    ) : (
                                      <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Address not verified
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                    {list.AvailableToBuy && (
                      <span className="text-base text-gray-600 dark:text-gray-400">
                        Stock: {list.AvailableToBuy}
                      </span>
                    )}
                    <p className="mt-2 text-sm text-red-500 dark:text-red-200">
                      Shipping options
                    </p>
                    {list.ShippingOptions &&
                      list.ShippingOptions.map((option, i) => (
                        <div key={i}>
                          <span className="text-gray-600 dark:text-gray-400 ">
                            {option.Method}{" "}
                            {option.Price ? (
                              <span>${`${option.Price}`}</span>
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                      ))}
                    <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                      Description
                    </h2>

                    <p className="inline-block text-base font-semibold text-gray-700 dark:text-gray-400 ">
                      {list.Body}
                    </p>
                    {/* </div>

                  <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700"> */}
                  </div>
                  <div className="flex gap-4 mb-6">
                    <button
                      onClick={() => {
                        handleDelete(list);
                      }}
                      className="w-full px-4 py-3 text-center text-gray-100 bg-red-600 border border-transparent dark:border-gray-700 hover:border-red-500 hover:text-red-700 hover:bg-red-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                    >
                      Remove From Watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ListingDetail;
