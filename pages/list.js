import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../constant/config";
import { GENERAL_ITEM_LISTING_FORMAT } from "../constant/trademeCategories";
import { useStateContext } from "../context/StateContext";

const dateOptions = [
  new Date(Date.now()),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 3),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 6),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 9),
  new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
];

const timeOption = {
  hours: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ],
  minutes: ["00", 15, 30, 45],
};

const List = () => {
  const router = useRouter();
  const { user, fetchData } = useStateContext();
  const [form, setForm] = useState(GENERAL_ITEM_LISTING_FORMAT);
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [hasSubTitle, setHasSubTitle] = useState(false);
  const [isFixedDate, setIsFixedDate] = useState(true);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
    time: "11:45",
  });
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
   
    getCategories();
  }, []);

  // useEffect(() => {
  //   if(typeof window !== undefined) {
  //     if(!localStorage.key("user"))
  //     toast.error("You need to login before start listing")
  //     router.push('/')
  //   }
  // }, [])

  useEffect(() => {
    if (Object.keys(selectedCategory).length) {
      const categoryKeys = Object.keys(selectedCategory);
      const lastKey = categoryKeys[categoryKeys.length - 1];
      setForm({ ...form, Category: selectedCategory[lastKey].Number });
      console.log(selectedCategory);

      axios
        .get(
          `${BASE_URL}/Categories/${selectedCategory[lastKey].Number}/Attributes.json`
        )
        // .then((res) => setForm({ ...form, Attributes: res.data }))
        .then((res) => setAttributes(res.data))
        .then(console.log(attributes))
        .catch((err) => console.log("no attributes"));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (form.Duration === 0) {
      setForm({
        ...form,
        EndDate: `\/Date(${new Date(
          `${selectedDate.month}/${selectedDate.date}/${selectedDate.year} ${selectedDate.time}`
        ).valueOf()})\/`,
      });
    }
  }, [selectedDate, form.Duration]);

  useEffect(() => {
    setForm({ ...form, Attributes: attributes });
    console.log(attributes);
    console.log(form)
  }, [attributes]);

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

  const handleListingType = (e) => {
    setForm({
      ...form,
      IsClassified: e.target.value === "auction" ? false : true,
    });
  };

  const handleDuration = (e) => {
    if (e.target.value === "fixed") {
      setIsFixedDate(true);
    } else {
      setIsFixedDate(false);
      setForm({
        ...form,
        Duration: 0,
      });
    }
  };

  const handleDate = (e) => {
    setSelectedDate({
      ...selectedDate,
      year: new Date(e.target.value).getFullYear(),
      month: new Date(e.target.value).getMonth(),
      date: new Date(e.target.value).getDate(),
    });
  };
  const handleTime = (e) => {
    setSelectedDate({ ...selectedDate, time: e.target.value });
  };

  function AttributeForm({ attribute, type, keyName }) {
    if (attribute.Name === "NumberPlate") {
      return (
        <div key={keyName}>
          <label className="mr-4" htmlFor={attribute.Name}>
            {attribute.DisplayName}
          </label>
          <input
            className="border-2"
            type="text"
            defaultValue={attribute.Value}
            id={attribute.Name}
            name={attribute.Name}
            onChange={(e) => {
              console.log(attribute);
              attribute.Value = e.target.value;
            }}
          />
        </div>
      );
    }
    if (type === 1) {
      return (
        <div key={keyName}>
          <label className="mr-4" htmlFor={attribute.Name}>
            {attribute.Name}
          </label>
          <input
            className="border-2"
            type="checkbox"
            id={attribute.Name}
            name={attribute.Name}
            defaultChecked={attribute.Value}
            onChange={(e) =>
              setAttributes(
                attributes.map((el) =>
                  el.Name === attribute.Name
                    ? e.target.checked
                      ? { ...el, Value: true }
                      : { ...el, Value: false }
                    : el
                )
              )
            }
          />
        </div>
      );
    } else if (type === 2 || type === 3 || type === 4) {
      if (attribute.Options) {
        return (
          <div key={keyName}>
            <label className="mr-4" htmlFor={attribute.Name}>
              {attribute.DisplayName}
            </label>
            <select
              defaultValue={attribute.Value}
              onChange={(e) => {
                setAttributes(
                  attributes.map((el) =>
                    el.Name === attribute.Name
                      ? { ...el, Value: e.target.value }
                      : el
                  )
                );
              }}
              id={attribute.Name}
              name={attribute.Name}
            >
              {attribute.Options &&
                attribute.Options.map((option, index) => (
                  <option key={index} value={option.Value}>
                    {option.Display}
                  </option>
                ))}
            </select>
          </div>
        );
      } else if (attribute.Range) {
        return (
          <div key={keyName}>
            <label className="mr-4" htmlFor={attribute.Name}>
              {attribute.DisplayName}
            </label>
            <input
              className="border-2"
              type="number"
              defaultValue={attribute.Value}
              id={attribute.Name}
              name={attribute.Name}
              min={attribute.Range.Lower}
              max={attribute.Range.Upper}
              onChange={(e) => {
                console.log(attribute);
                attribute.Value = e.target.value;
              }}
            />
          </div>
        );
      }
    }
  }
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
              // onChange={(e) =>
              //   { console.log(e.target.value)
              //     setSelectedCategory({
              //     firstCategory: e.target.value,
              //   })}
              // }
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
                    value={category}
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

        <div className="mt-4 border-t-2">
          <h3 className="block mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Select the listing Type
          </h3>

          <div className="flex flex-wrap items-center">
            <input
              type="radio"
              id="auction"
              name="listingType"
              className="border-3 mr-2"
              value="auction"
              defaultChecked
              onChange={(e) => handleListingType(e)}
            />
            <label className="mr-4" htmlFor="auction">
              Auction and Buy Now
            </label>
            <input
              type="radio"
              id="buynow"
              name="listingType"
              className="border-3 mr-2"
              value="buynow"
              onChange={(e) => handleListingType(e)}
            />
            <label className="mr-4" htmlFor="buynow">
              Buy Now Only
            </label>
          </div>

          <div className="flex justify-evenly flex-wrap">
            {form.IsClassified ? (
              <div className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder=" "
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  value={form.Quantity}
                  onChange={(e) =>
                    setForm({ ...form, Quantity: e.target.value })
                  }
                />
                <label
                  htmlFor="quantity"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Quantity
                </label>
              </div>
            ) : (
              <>
                <div className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
                  <input
                    type="number"
                    name="startPrice"
                    id="startPrice"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={form.StartPrice}
                    onChange={(e) =>
                      setForm({ ...form, StartPrice: e.target.value })
                    }
                  />
                  <label
                    htmlFor="startPrice"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Start Price
                  </label>
                </div>
                <div className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
                  <input
                    type="number"
                    name="reservePrice"
                    id="reservePrice"
                    placeholder=" "
                    value={form.ReservePrice}
                    onChange={(e) =>
                      setForm({ ...form, ReservePrice: e.target.value })
                    }
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label
                    htmlFor="reservePrice"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Reserve Price
                  </label>
                </div>
              </>
            )}
            <div className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
              <input
                type="number"
                name="buynowPrice"
                id="buynowPrice"
                placeholder=" "
                value={form.BuyNowPrice}
                onChange={(e) =>
                  setForm({ ...form, BuyNowPrice: e.target.value })
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="buynowPrice"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Buy Now
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t-2">
          <h3 className="block text-lg font-medium text-gray-900 dark:text-white">
            Title, Listing Duration
          </h3>
          <div className="flex justify-evenly flex-wrap">
            <div className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
              <input
                type="text"
                name="title"
                id="title"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={form.Quantity}
                onChange={(e) => setForm({ ...form, Title: e.target.value })}
              />
              <label
                htmlFor="title"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>
            <div className="relative mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
              <div className="absolute transform -translate-y-6">
                <input
                  type="checkbox"
                  name="hasSubTitle"
                  id="hasSubTitle"
                  className="mr-2"
                  onChange={(e) => setHasSubTitle((prev) => !prev)}
                />
                <label
                  htmlFor="hasSubTitle"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Enable SubTitle
                </label>
              </div>
              <input
                type="text"
                name="subTitle"
                id="subTitle"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                style={{
                  background: !hasSubTitle ? "rgba(0,0,0, 0.4)" : "inherit",
                }}
                value={form.Quantity}
                disabled={!hasSubTitle}
                onChange={(e) => setForm({ ...form, Title: e.target.value })}
              />
              <label
                htmlFor="subTitle"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Sub Title
              </label>
            </div>
            <div className="relative flex mt-6 w-4/6 md:w-3/12 mr-2 ml-2 ">
              <div className="w-2/5">
                <input
                  type="radio"
                  id="fixed"
                  name="duration"
                  className="border-3 mr-2"
                  defaultChecked
                  value="fixed"
                  onChange={(e) => handleDuration(e)}
                />
                <label className="text-sm" htmlFor="fixed">
                  Fixed Date
                </label>
                <br />
                <input
                  type="radio"
                  id="endDate"
                  name="duration"
                  className="border-3 mr-2"
                  value="endDate"
                  onChange={(e) => handleDuration(e)}
                />
                <label className="text-sm" htmlFor="endDate">
                  Select Time
                </label>
              </div>
              {isFixedDate ? (
                <div>
                  <select
                    id="fixedDuration"
                    name="fixedDuration"
                    className="w-full border-2"
                    defaultValue={7}
                    onChange={(e) =>
                      setForm({ ...form, Duration: Number(e.target.value) })
                    }
                  >
                    <option value={2}>2 days</option>
                    <option value={3}>3 days</option>
                    <option value={4}>4 days</option>
                    <option value={5}>5 days</option>
                    <option value={6}>6 days</option>
                    <option value={7}>7 days</option>
                    <option value={10}>10 days (extra)</option>
                  </select>
                </div>
              ) : (
                <div>
                  <select
                    className="inline-block border-2 w-full"
                    onChange={(e) => handleDate(e)}
                  >
                    {dateOptions.map((date, i) => (
                      <option key={i} value={date}>
                        {date.toString().slice(0, 11)}
                      </option>
                    ))}
                  </select>
                  <select
                    id="fixedDuration"
                    name="fixedDuration"
                    className="inline-block w-full border-2"
                    onChange={(e) => handleTime(e)}
                  >
                    {timeOption.hours.map((time) => {
                      return timeOption.minutes.map((min, i) => {
                        if (selectedDate.date === new Date().getDate()) {
                          if (
                            time === new Date().getHours() &&
                            min > new Date().getMinutes()
                          ) {
                            return <option key={i}>{`${time}:${min}`}</option>;
                          }
                          return;
                        } else {
                          return <option key={i}>{`${time}:${min}`}</option>;
                        }
                      });
                    })}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 border-t-2">
          <div className="relative mt-6 w-4/6 md:w-full mr-2 ml-2 order-2 ">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="8"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description..."
              name="description"
              value={form.Description}
              onChange={(e) =>
                setForm({ ...form, Description: [e.target.value] })
              }
            ></textarea>
          </div>
        </div>
        <div className="mt-4 border-t-2">
          <div className="flex justify-evenly mt-2  flex-wrap">
            {attributes.length &&
              attributes.map(
                (attribute, i) =>
                  (attribute.IsRequiredForSell ||
                    attribute.Options ||
                    attribute.Range ||
                    attribute.Name === "NumberPlate") && (
                    <div key={i} className="block w-2/5 mt-4">
                      <AttributeForm
                        attribute={attribute}
                        type={attribute.Type}
                        keyName={i}
                      />
                    </div>
                  )
              )}
          </div>
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

export default List;
