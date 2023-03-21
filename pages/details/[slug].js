import React, { useEffect, useState } from "react";
import { navigation } from "../../components/Navbar";
// import { Spinner, TableDetail } from "../../components";
// import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import { ListingDetail } from "../../components";
import { useStateContext } from "../../context/StateContext";

const DetailPage = ({ params }) => {
  const router = useRouter();
  const { listId, slug: category } = router.query;
  const { user, fetchData } = useStateContext();
  const [data, setData] = useState({});

  useEffect(() => {
    if (user.token_secret && listId) {
      fetchData(`/v1/Listings/${listId}.json`, user, setData);
    }
  }, [listId]);

  // Only showing data in console
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <div className=" text-center mt-6">
      {/* <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        We invest in the world’s potential
      </h1> */}
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and
        capital can unlock long-term value and drive economic growth.
      </p>
      {/* <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Learn more
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg> 
      </a> */}
      </div>

      <ListingDetail data={data} category={category} />
    </div>
  );
};

export default DetailPage;

export async function getStaticPaths() {
  const paths = navigation.map((menu) => ({
    params: { slug: menu.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: { params: slug }, // will be passed to the page component as props
  };
}
