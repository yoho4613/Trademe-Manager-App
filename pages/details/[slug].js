import React, { useEffect, useState } from "react";
import { navigation } from "../../components/Navbar";
// import { Spinner, TableDetail } from "../../components";
// import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import { ListingDetail } from "../../components";
import { useStateContext } from "../../context/StateContext";
import EditListing from "../../components/EditListing";
import { toast } from "react-toastify";

const DetailPage = ({ params }) => {
  const router = useRouter();
  const { listId, slug: category } = router.query;
  const { user, fetchData } = useStateContext();
  const [data, setData] = useState({});

  useEffect(() => {
    if (user.token_secret && listId) {
      const api =
        category === "selling"
          ? `/v1/Selling/Listings/${listId}.json`
          : `/v1/Listings/${listId}.json`;
      fetchData(api, user, setData).catch((err) =>
        toast.error(`There was an error. Refresh the page or try later`)
      );
    }
  }, [listId]);

  // Only showing data in console
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className=" px-6 py-6 ">
      <div className="text-center mt-6">
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
      </div>

      {category === "selling" ? (
        <EditListing data={data} category={category} />
      ) : (
        <ListingDetail data={data} category={category} />
      )}
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
