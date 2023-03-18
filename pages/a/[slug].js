import React from "react";
import { navigation } from "../../components/Navbar";
import { useStateContext } from "../../context/StateContext";

const MenuPage = (props) => {
  const { user, fetchData } = useStateContext();


  return (
    <div>
      [slug]: {props.params}
      
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
