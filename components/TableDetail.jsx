import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useStateContext } from "../context/StateContext";

const TableDetail = ({ category: category, data: data, url: url }) => {
  const { List: lists } = data;
  const { setIsLoading, removeWatchlist, user, fetchData } = useStateContext();
  const [search, setSearch] = useState("");
  const [list, setList] = useState(lists);
  const [isSelected, setIsSelected] = useState([]);
  const [response, setResponse] = useState({});
  //Only for Checking List Data
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (!data) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setList(lists?.map((el) => ({ ...el, isSelected: false })));
    }
  }, [data]);

  useEffect(() => {
    if (list) {
      setList(() =>
        lists.filter((item) =>
          item.Title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  useEffect(() => {
    setIsSelected(() => list?.filter((item) => item.isSelected));
  }, [list]);

  const handleSelect = (item) => {
    setList((list) =>
      list.map((el) =>
        el.ListingId === item.ListingId
          ? { ...el, isSelected: !item.isSelected }
          : el
      )
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setList((list) => list.map((item) => ({ ...item, isSelected: true })));
    } else {
      setList((list) => list.map((item) => ({ ...item, isSelected: false })));
    }
  };

  const handleDelete = async (item) => {
    if (category === "watchlist") {
      await removeWatchlist(
        `/MyTradeMe/WatchList/${item.ListingId}.json`,
        user
      );
      await fetchData(url, user, setList)
        .then((res) => {
          setList(res.List.map((el) => ({ ...el, isSelected: false })));
          toast.success("Listing successfully Deleted!");
        })
        .catch((err) =>
          toast.warning(`There was a problem with delete Info: ${err.message}`)
        );
    } else if (category === "selling") {
      console.log("delete");
      const reason = prompt("Please provide reason");
      await fetchData("/Selling/Withdraw.json", user, setResponse, "POST", {
        ListingId: item.ListingId,
        Type: 2,
        Reason: reason,
      }).then((res) => {
        if (!res.Success) {
          toast.error(
            "There was problem with withdrawing your listing. Listing could be withdrawn already. please check your listing and try again."
          );
        } else {
          toast.success("Listing successfully Deleted!");
          fetchData(url, user, setList).then((res) =>
            setList(res.List.map((el) => ({ ...el, isSelected: false })))
          );
        }
        console.log(res);
      });
    }
  };

  const handleDeleteAll = () => {
    isSelected.forEach(async (item) => {
      await removeWatchlist(`/MyTradeMe/WatchList/${item.ListingId}.json`, user)
        .then((res) => toast.success("Listing successfully Deleted!"))
        .catch((err) =>
          toast.warning(`There was a problem with delete Info: ${err.message}`)
        );
    });
    fetchData(url, user, setList).then((res) =>
      setList(res.List.map((el) => ({ ...el, isSelected: false })))
    );
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            href="#"
            onClick={() => handleDeleteAll()}
            className="font-medium  text-neutral-100 dark:text-neutral-500 hover:underline bg-rose-700 px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-2 py-3">
                Product name
              </th>
              <th scope="col" className="px-2 py-3">
                Start
              </th>
              <th scope="col" className="px-2 py-3">
                End
              </th>
              <th scope="col" className="px-2 py-3">
                Price
              </th>
              <th scope="col" className="px-2 py-3">
                Picture
              </th>
              <th scope="col" className="px-2 py-2">
                React
              </th>
              <th scope="col" className="px-2 py-2">
                View
              </th>
              <th scope="col" className="px-2 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {list &&
              (list.length ? (
                list.map((item, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          checked={item.isSelected}
                          onChange={() => handleSelect(item)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.Title}
                    </th>

                    <td className="px-2 py-4">
                      {`${new Date(
                        Number(item.StartDate.replace(/\D/g, ""))
                      ).toLocaleString("en-GB", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })} ${new Date(
                        Number(item.EndDate.replace(/\D/g, ""))
                      ).toLocaleTimeString("en-GB", { hour12: false })}`}
                    </td>
                    <td className="px-2 py-4">
                      {`${new Date(
                        Number(item.EndDate.replace(/\D/g, ""))
                      ).toLocaleString("en-GB", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })} ${new Date(
                        Number(item.EndDate.replace(/\D/g, ""))
                      ).toLocaleTimeString("en-GB", { hour12: false })}`}
                    </td>
                    <td className="px-2 py-4">{item.PriceDisplay}</td>
                    <td className="px-2 py-4">
                      {item.PictureHref ? (
                        <Image width={100} height={100} src={item.PictureHref} />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-2 py-2  text-green-500  font-bold">
                      {item.BidderAndWatchers ? item.BidderAndWatchers : 0}
                    </td>
                    <td className="px-2 py-2">
                      {item.ViewCount ? item.ViewCount : 0}
                    </td>

                    <td className="px-2 py-4">
                      {category === "watchlist" ? (
                        <Link
                          href={`/details/${category}?listId=${item.ListingId}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Detail
                        </Link>
                      ) : (
                        <Link
                          href={`/details/${category}?listId=${item.ListingId}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                      )}
                      {`  `}
                      <button
                        onClick={() => handleDelete(item)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Withdraw
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-2 py-4 content-center">
                    There's no Data...
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDetail;
