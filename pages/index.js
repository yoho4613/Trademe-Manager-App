import { Landing } from "../components";

export default function Home(props) {
  return (
    <div>
      <Landing />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = await context;
  return { props: { query } };
}
