import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  PAYMENT_METHOD,
  VALIDATE_PAYMENT_METHOD,
} from "../constant/trademeCategories";
import { useStateContext } from "../context/StateContext";

const EditListing = ({ category: category, data: data }) => {
  const router = useRouter();
  const { user, removeWatchlist, fetchData } = useStateContext();
  const [list, setList] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setList(data);
  }, [data]);

  useEffect(() => {
    if (list.Photos) {
      setPhotos(list.Photos.map((el) => el.Value.Large));
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

  const handleSubmit = () => {
    fetchData("/Selling/Edit.json", user, setList, "POST", JSON.stringify(list))
      .then((res) => {
        toast.success("Listing successfully updated!");
        router.push(`/a/${category}`);
      })
      .catch((err) => {
        toast.warning("There was an error. Please check your form again");
      });
  };

  return (
    <div>
      {list && (
        <form className="px-6 py-6">
          <div className="flex justify-between flex-wrap">
            {Object.keys(list).map((key, i) => {
              if (
                typeof list[key] === "boolean" ||
                key === "Category" ||
                key === "ListingId" ||
                key === "StartDate" ||
                key === "AdditionalData" ||
                key === "EmbeddedContent" ||
                key === "AvailablePromotions" ||
                key === "PhotoIds" ||
                key === "PromotionId" ||
                key === "Photos" ||
                key === "ShippingOptions" //this should be handled later
              ) {
                return "";
              } else if (key === "Description") {
                return (
                  <div
                    key={i}
                    className="relative mt-6 w-4/6 md:w-full mr-2 ml-2 order-2 "
                  >
                    <label
                      htmlFor={key}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="message"
                      rows="8"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Description..."
                      name={key}
                      value={list[key] || ""}
                      onChange={(e) =>
                        setList((list) => ({ ...list, [key]: e.target.value }))
                      }
                    ></textarea>
                  </div>
                );
              } else if (key === "PaymentMethods") {
                return (
                  <div
                    key={i}
                    className="relative mt-6 w-4/6 md:w-6/12 mr-2 ml-2 order-1 "
                  >
                    <label
                      htmlFor={list[key]}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select an option
                    </label>
                    <input
                      type="text"
                      name={key}
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm border-2 font-extrabold text-gray-900 bg-transparent  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={
                        list[key].map((el) => VALIDATE_PAYMENT_METHOD(el)) || ""
                      }
                      disabled
                      onChange={(e) =>
                        setList((list) => ({ ...list, [key]: e.target.value }))
                      }
                    />
                    <select
                      id="paymentMethod"
                      name={list[key]}
                      size="5"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {PAYMENT_METHOD.map((method, i) => (
                        <option
                          onClick={(e) => {
                            if (
                              list[key].includes(
                                VALIDATE_PAYMENT_METHOD(method)
                              )
                            ) {
                              list[key].splice(
                                list[key].indexOf(
                                  VALIDATE_PAYMENT_METHOD(method)
                                ),
                                1
                              );
                              setList((list) => ({
                                ...list,
                                [key]: [...list[key]],
                              }));
                            } else {
                              setList((list) => ({
                                ...list,
                                [key]: [
                                  ...list[key],
                                  VALIDATE_PAYMENT_METHOD(method),
                                ],
                              }));
                            }
                          }}
                          key={i}
                          value={method}
                        >
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              } else {
                /* else if (key === "ShippingOptions") {
                return (
                  <div key={"shipping"}>Shipping</div>
                )} */
                return (
                  <div
                    key={i}
                    className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 "
                  >
                    <input
                      type={isNaN(data[key]) ? "text" : "number"}
                      name={key}
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      value={list[key] || ""}
                      onChange={(e) =>
                        setList((list) => ({
                          ...list,
                          [key]: isNaN(list[key])
                            ? e.target.value
                            : Number(e.target.value) <= 0 ? 1 : Number(e.target.value),
                        }))
                      }
                    />
                    <label
                      htmlFor={key}
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {key === "Duration" ? "Duration (Days)" : key}
                    </label>
                  </div>
                );
              }
            })}
          </div>
          <div className=" text-right mt-6">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditListing;
