import React from "react";
import { navigation } from "../../components/Navbar";
import { Spinner, Table } from "../../components";
import { useStateContext } from "../../context/StateContext";

const MenuPage = (props) => {
  const { user, fetchData, setIsLoading } = useStateContext();

  return (
    <div className=" px-6 py-6">
      [slug]: {props.params} <br />
      name: {props.name}
      <Table category={props.params} />
    </div>
  );
};

// Need to extract the name from navigation and display the name



export default MenuPage;

export async function getStaticPaths() {
  const paths = navigation.map((menu) => ({
    params: { slug: menu.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: { params: slug } // will be passed to the page component as props
  };
}
