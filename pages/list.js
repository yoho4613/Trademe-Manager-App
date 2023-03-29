import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../constant/config";
import { GENERAL_ITEM_LISTING_FORMAT } from "../constant/trademeCategories";
import { useStateContext } from "../context/StateContext";

const list = () => {
  const router = useRouter();
  const { user, fetchData } = useStateContext();
  const [form, setForm] = useState({});
  const [listingForm, setListingForm] = useState(GENERAL_ITEM_LISTING_FORMAT);
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(form);
  }, [selectedCategory]);

  useEffect(() => {
    console.log(selectedCategory);
    if (Object.keys(selectedCategory).length) {
      const categoryKeys = Object.keys(selectedCategory);
      const lastKey = categoryKeys[categoryKeys.length - 1];
      setForm({ ...form, Category: selectedCategory[lastKey].Number });
      setListingForm({
        ...listingForm,
        Category: selectedCategory[lastKey].Number,
      });


      // fetchData(
      //   `/Categories/${selectedCategory[lastKey].Number}/Details.json`,
      //   user,
      //   setForm
      // ).then((res) => console.log(res));
    }
  }, [selectedCategory]);

  const getCategories = async () => {
    setCategories(
      await axios
        .get(BASE_URL + "/v1/Categories.json")
        .then((res) => res.data)
        .then((res) => res.Subcategories)
        .catch((err) => ({}))
    );
  };

  const handleSubmit = () => {
    console.log(listingForm);
    fetchData(
      "/Selling.json",
      user,
      setForm,
      "POST",
      JSON.stringify(listingForm)
    )
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
        <div className="flex flex-wrap">
          <div className="relative mb-6 mt-6 w-4/6 md:w-4/12 mr-4 ml-4 ">
            <label
              htmlFor="categories"
              className="block mb-4 text-lg font-medium text-gray-900 dark:text-white"
            >
              Categories
            </label>
            <select
              size={12}
              id="categories"
              name="categories"
              className="w-full border-2"
            >
              {categories.length &&
                categories.map((category, i) => (
                  <option
                    onClick={() =>
                      setSelectedCategory({
                        firstCategory: category,
                      })
                    }
                    key={i}
                    value={category.name}
                    className="text-lg mb-1"
                  >
                    {category.Name}
                  </option>
                ))}
            </select>
          </div>

          {selectedCategory.firstCategory &&
            selectedCategory.firstCategory.Subcategories && (
              <div className="relative mt-6 w-4/6 md:w-4/12 mr-4 ml-4 ">
                <label
                  htmlFor="secondCategories"
                  className="block mb-4 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Second Categories
                </label>

                <select
                  size={12}
                  id="secondCategories"
                  name="secondCategories"
                  className=" w-full border-2"
                >
                  {selectedCategory.firstCategory.Subcategories.map(
                    (category, i) => (
                      <option
                        onClick={() =>
                          setSelectedCategory((prevCategory) => ({
                            firstCategory: prevCategory.firstCategory,
                            secondCategory: category,
                          }))
                        }
                        key={i}
                        value={category.name}
                        className="text-lg mb-1"
                      >
                        {category.Name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

          {selectedCategory.secondCategory &&
            selectedCategory.secondCategory.Subcategories && (
              <div className="relative mt-6 w-4/6 md:w-4/12 mr-4 ml-4 ">
                <label
                  htmlFor="thirdCategories"
                  className="block mb-4 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Third Categories
                </label>

                <select
                  size={12}
                  id="thirdCategories"
                  name="thirdCategories"
                  className="w-full border-2"
                >
                  {selectedCategory.secondCategory.Subcategories.map(
                    (category, i) => (
                      <option
                        onClick={() =>
                          setSelectedCategory((prevCategory) => ({
                            firstCategory: prevCategory.firstCategory,
                            secondCategory: prevCategory.secondCategory,
                            thirdCategory: category,
                          }))
                        }
                        key={i}
                        value={category.name}
                        className="text-lg mb-1"
                      >
                        {category.Name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}

          {selectedCategory.thirdCategory &&
            selectedCategory.thirdCategory.Subcategories && (
              <div className="relative mt-6 w-4/6 md:w-4/12 mr-4 ml-4 ">
                <label
                  htmlFor="forthCategories"
                  className="block mb-4 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Forth Categories
                </label>

                <select
                  size={12}
                  id="forthCategories"
                  name="forthCategories"
                  className="w-full border-2"
                >
                  {selectedCategory.thirdCategory.Subcategories.map(
                    (category, i) => (
                      <option
                        onClick={() =>
                          setSelectedCategory((prevCategory) => ({
                            firstCategory: prevCategory.firstCategory,
                            secondCategory: prevCategory.secondCategory,
                            thirdCategory: prevCategory.thirdCategory,
                            forthCategory: category,
                          }))
                        }
                        key={i}
                        value={category.name}
                        className="text-lg mb-1"
                      >
                        {category.Name}
                      </option>
                    )
                  )}
                </select>
              </div>
            )}
        </div>
        <div className="flex flex-wrap">
          {Object.entries(listingForm).map((key, i) => (
            <div key={i} className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
              <input
                type={
                  typeof GENERAL_ITEM_LISTING_FORMAT[key[0]] === "number"
                    ? "number"
                    : "text"
                }
                name={key[0]}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={key[1] || ""}
                onChange={(e) =>
                  setListingForm((listingForm) => ({
                    ...listingForm,
                    [key[0]]:
                      typeof GENERAL_ITEM_LISTING_FORMAT[key[0]] === "number"
                        ? Number(e.target.value)
                        : e.target.value,
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
