import React from "react";
import Landing from "./Homepage/Landing";
import Layout from "../Layouts/Layout";
import UpcomingMovies from "./Homepage/UpcomingMovies";
import BestPicks from "./Homepage/BestPicks";
import BestTvPicks from "./Homepage/BestTvPicks";
const Homepage = () => {
  return (
    <Layout>
      <div className="pb-10">
        <Landing />
        <UpcomingMovies />
        <BestPicks />
        <BestTvPicks />
      </div>
    </Layout>
  );
};

export default Homepage;
