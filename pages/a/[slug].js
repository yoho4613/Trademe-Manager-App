import React, { useEffect, useState } from "react";
import { navigation } from "../../components/Navbar";
import { Spinner, TableDetail } from "../../components";
import { useStateContext } from "../../context/StateContext";



const MenuPage = (props) => {
  const { user, fetchData, setIsLoading } = useStateContext();
  const [nav, setNav] = useState(navigation.find((menu) => menu.current));

  useEffect(() => {
    console.log(navigation)
  }, []);

  return (
    <div className=" px-6 py-6">
      <Spinner />
      <h2 className="mt-0 mb-2 text-4xl font-medium leading-tight text-primary">
      </h2>

      <h1 className=" sm:text-3xl md:text-4xl xl:text-5xl font-bold tracking-tight mb-12">
        {nav.name}
       <br /><span className="text-blue-600" style={{fontSize: '70%'}}>for your business</span></h1>


      <TableDetail category={props.params} url={props.api} />
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
