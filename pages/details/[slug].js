import React, { useEffect, useState } from "react";
import { navigation } from "../../components/Navbar";
// import { Spinner, TableDetail } from "../../components";
// import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";
import { ListingDetail } from "../../components";

const DetailPage = ({ params }) => {
  const router = useRouter();
  const {listId, slug:category} = router.query
  console.log(listId, category)
  
  return (
    <div>
      Hi
      <ListingDetail />
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
