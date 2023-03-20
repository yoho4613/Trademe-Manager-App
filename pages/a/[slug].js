import React, { useEffect, useState } from "react";
import { navigation } from "../../components/Navbar";
import { Spinner, TableDetail } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";

const MenuPage = ({ params }) => {
  const { user, fetchData } = useStateContext();
  const [nav, setNav] = useState(navigation.find((menu) => menu.current));
  const [data, setData] = useState({});
  const router = useRouter()

  useEffect(() => {
    if(!localStorage.key('user')) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    if (user.token_secret) {
      fetchData(nav.url, user, setData);
      console.log(nav.url)
    }

  }, [user.token_secret]);

  useEffect(() => {
    setNav(navigation.find((menu) => menu.current));

  }, [navigation]);

  return (
    <div className=" px-6 py-6">
      <Spinner />
      <h2 className="mt-0 mb-2 text-4xl font-medium leading-tight text-primary"></h2>
      <h1 className=" sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-12">
        {nav.name}
        <br />
        <span className="text-blue-600" style={{ fontSize: "70%" }}>
          for your business
        </span>
      </h1>

      <TableDetail category={params} data={data} url={nav.url} />
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
