import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  LISTING_FORMAT,
  LISTING_NUMBER,
  LISTING_STRING,
  LISTING_BOOLEAN,
  LISTING_ARRAY,
  LISTING_OBJECT,
} from "../constant/trademeCategories";
import { useStateContext } from "../context/StateContext";

const list = () => {
  const router = useRouter();
  const { user, fetchData } = useStateContext();
  const [form, setForm] = useState(LISTING_FORMAT);

  useEffect(() => {
    console.log(form);
  }, []);

  const handleSubmit = () => {
    fetchData("/Selling.json", user, setForm, "POST", JSON.stringify(form))
      .then((res) => {
        console.log(res);
        toast.success("Listing successfully updated!");
        router.push(`/a/selling`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `There was an error. Please check your form again. Error Type: ${err}`
        );
      });
  };

  return (
    <div>
      <form className="px-6 py-6">
        <div className="flex justify-between flex-wrap">
          {Object.entries(form).map((key, i) => (
            <div key={i} className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
              <input
                type={isNaN(key[1]) ? "text" : "number"}
                name={key[0]}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={key[1] || ""}
                onChange={(e) =>
                  setForm((form) => ({
                    ...form,
                    [key[0]]: isNaN(form[key[1]])
                      ? e.target.value
                      : Number(e.target.value),
                  }))
                }
              />
              <label
                htmlFor={key[0]}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                {key[0] === "Duration" ? "Duration (Days)" : key[0]}
              </label>
            </div>
          ))}
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
    </div>
  );
};

export default list;
