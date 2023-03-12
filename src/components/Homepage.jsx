import React from "react";
import Landing from "./Homepage/Landing";
import Navbar from "./Navbar";
import UpcomingMovies from "./Homepage/UpcomingMovies";
import BestPicks from "./Homepage/BestPicks";
import BestTvPicks from "./Homepage/BestTvPicks";
const Homepage = () => {
  return (
    <div className="pb-10">
      <Navbar />
      <Landing />
      <UpcomingMovies />
      <BestPicks />
      <BestTvPicks />
    </div>
  );
};

export default Homepage;
