import type { NextPage } from "next";
import ContestsList from "../components/contests/ContestsList";

const Home: NextPage = () => {
  return (
    <div>
      <ContestsList />
    </div>
  );
};

export default Home;
