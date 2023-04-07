import React, { useEffect, useState } from "react";
import { navigation } from "../../constant/config";
import { Spinner, TableDetail } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const MenuPage = ({ params }) => {
  const { user, fetchData, navBar, setNavBar } = useStateContext();
  const [nav, setNav] = useState(navBar.find((menu) => menu.current));
  const [data, setData] = useState({});
  const [isFailedFetch, setIsFailedFetch] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    setNav(
      navBar.find((menu) => menu.slug === router.query.slug) ||
        navBar.find((menu) => menu.current)
    );
  }, [router.pathname, router.query]);
  // [user.token_secret, nav]);

  useEffect(() => {
    if (user.token_secret.length && !isFailedFetch) {
      fetchData(nav?.url, user, setData)
        .then((res) => console.log(res))
        .catch((err) => {
          setIsFailedFetch(true);
          toast.error(`There was an error. Refresh the page or try later`);
        });
    }
  }, [nav, router.pathname]);

  useEffect(() => {
    setNav(
      navBar.find((menu) => menu.slug === router.query.slug) ||
        navBar.find((menu) => menu.current)
    );
  }, [navBar]);

  return (
    <div className=" px-6 py-6">
      <Spinner />
      <h2 className="mt-0 mb-2 text-4xl font-medium leading-tight text-primary"></h2>
      <h1 className=" sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-12">
        {nav?.name}
        <br />
        <span className="text-blue-600" style={{ fontSize: "70%" }}>
          for your business
        </span>
      </h1>

      <TableDetail category={params} data={data} url={nav?.url} />
    </div>
  );
};

export default MenuPage;

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
