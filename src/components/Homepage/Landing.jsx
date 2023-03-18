import React from "react";
import axios from "axios";
import LandingSwiper from "./LandingSwiper";
import { useQuery } from "react-query";
import Loading from "../Loading";
const Landing = () => {
  const getTrendingWeek = async () => {
    const response = await axios.get(
      "https://apimovies-backend.onrender.com/api/trending-week"
    );
    return response.data.results;
  };

  const { isLoading, data: trendingWeek } = useQuery({
    queryKey: ["trendingWeek"],
    queryFn: getTrendingWeek,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <div className="h-screen relative -mb-12 max-w-6xl mx-auto mt-0 p-2 md:px-5 rounded-md ">
        {isLoading ? (
          <Loading />
        ) : (
          <LandingSwiper trendingWeek={trendingWeek} />
        )}
      </div>
    </div>
  );
};

export default Landing;
