import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "./Navbar";
const CategoriesTv = () => {
  const [currentUrlCategory, setCurrentUrlCategory] = useState();

  const { category, page } = useParams();
  const navigate = useNavigate();

  const prevPage = () => {
    if (parseInt(page) === 1) {
      null;
    } else {
      navigate(`/tv/category/${category}/${parseInt(page) - 1}`);
      window.location.reload();
      window && window.scroll(0, 0);
    }
  };
  const nextPage = () => {
    navigate(`/tv/category/${category}/${parseInt(page) + 1}`);
    window.location.reload();
    window && window.scroll(0, 0);
  };

  const getGenres = async () => {
    const response = await axios.get("http://localhost:8080/api/tvgenres");
    console.log(response.data);
    response.data.genres.map((item) => {
      item.name === category ? setCurrentUrlCategory(item.id) : null;
    });
    return response.data;
  };
  const { data: tvGenres } = useQuery({
    queryKey: "tvGenres",
    queryFn: getGenres,
    refetchOnWindowFocus: false,
  });
  const getCurrentTvCategory = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/tv/categories/${currentUrlCategory}/${parseInt(
        page
      )}`
    );
    console.log(response.data);
    return response.data;
  };

  const getCurrentCategoryBackdrop = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/tv/categories/${currentUrlCategory}/1`
    );
    console.log(response.data);
    return response.data;
  };
  const { data: currentCategoryBackdrop } = useQuery({
    queryKey: ["currentCategoryBackdrop"],
    queryFn: getCurrentCategoryBackdrop,
    refetchOnWindowFocus: false,
    enabled: !!currentUrlCategory,
  });

  const { data: currentTvCategory } = useQuery({
    queryKey: ["currentTvCategory"],
    queryFn: getCurrentTvCategory,
    refetchOnWindowFocus: false,
    enabled: !!currentUrlCategory,
  });
  const [pageValue, setPageValue] = useState();
  const handleJumpToPage = () => {
    navigate(`/tv/category/${category}/${parseInt(pageValue)}`);
    window.location.reload();
    window && window.scroll(0, 0);
  };
  return (
    <div className="bg-stone-800">
      <Navbar />
      <div className="  text-white pb-4 ">
        <div className="relative py-24 md:py-40 lg:py-48 ">
          <h2 className="text-center absolute left-1/2 top-1/2 -translate-x-1/2 line-clamp  -translate-y-1/2 text-3xl md:text-4xl font-medium capitalize z-30 ">
            {tvGenres &&
              tvGenres.genres.map((item) =>
                item.name === category ? <p>{item.name} TV shows</p> : null
              )}
          </h2>
          <h2 className="text-center absolute left-1/2 bottom-0 -translate-x-1/2 line-clamp md:text-2xl  -translate-y-1/2 text-lg  capitalize z-30">
            {currentTvCategory &&
              "Total results: " + currentTvCategory.total_results}
          </h2>
          {currentCategoryBackdrop && (
            <img
              src={
                `https://image.tmdb.org/t/p/w1280` +
                currentCategoryBackdrop.results[0].backdrop_path
              }
              className="w-full h-full object-cover absolute top-0 left-0 z-10 "
            />
          )}

          <div className="w-full h-full bg-black/30 absolute top-0 left-0 z-20"></div>
        </div>
        <div className="flex flex-col max-w-5xl mx-auto min-h-screen pb-6">
          {currentTvCategory &&
            currentTvCategory.results.map((item) => (
              <div className="flex h-40 gap-4 relative bg-stone-900 shadow-xl shadow-stone-900/60 mx-6 mt-6 pr-2 rounded-md">
                <div className=" h-32 flex-shrink-0  ">
                  <Link to={`/tv/${item.id}`}>
                    <img
                      className=" h-40 w-28 object-cover rounded-l-md pointer-events-none "
                      src={`https://image.tmdb.org/t/p/w300` + item.poster_path}
                    />
                  </Link>
                </div>
                <div className="flex   justify-around flex-col h-full">
                  <div>
                    <Link to={`/tv/${item.id}`}>
                      <h4 className="text-base  md:text-xl inline-block">
                        {item.name}
                      </h4>
                    </Link>

                    <p className="text-sm text-stone-400">
                      {item.first_air_date}
                    </p>
                  </div>
                  <p className="line-clamp text-stone-100 text-sm md:text-base">
                    {item.overview}{" "}
                  </p>
                </div>
                <div className="absolute left-1 bg-stone-900/80 rounded-full bottom-2">
                  <CircularProgressbar
                    styles={buildStyles({
                      textSize: "28px",
                      textColor: "white",
                      trailColor: "#065f46",
                      pathColor: `
              ${
                item.vote_average * 10 <= 30
                  ? `#ef4444`
                  : item.vote_average * 10 > 30 && item.vote_average * 10 <= 50
                  ? `#f97316`
                  : item.vote_average * 10 > 50 && item.vote_average * 10 <= 70
                  ? `#facc15`
                  : item.vote_average * 10 > 70 && item.vote_average * 10 <= 84
                  ? `#059669`
                  : `#10b981`
              }
              
              `,
                    })}
                    className="h-10 w-10 "
                    value={item.vote_average * 10}
                    text={`${item.vote_average.toFixed(1) * 10 + "%"}`}
                  ></CircularProgressbar>
                </div>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-3 justify-center py-4">
          <button
            onClick={() => prevPage()}
            className="py-2 px-3 bg-stone-600 hover:bg-emerald-700 duration-200 rounded-md flex justify-center items-center"
          >
            <FontAwesomeIcon
              className="text-sm"
              icon={faChevronLeft}
            ></FontAwesomeIcon>
          </button>
          <form className="flex gap-2">
            <input
              type="text"
              className="w-10 bg-stone-500 py-[3px] outline-none outline-offset-0 focus:outline-emerald-400 duration-150 text-center placeholder:text-stone-300 "
              placeholder={page}
              onChange={(e) => setPageValue(e.target.value)}
            />
            <button
              type="submit"
              disabled={
                currentTvCategory &&
                !(parseInt(pageValue) < currentTvCategory.total_pages)
              }
              className="bg-emerald-600 px-3 py-1"
              onClick={() => {
                if (parseInt(pageValue) > 0) {
                  handleJumpToPage();
                }
              }}
            >
              Go
            </button>
          </form>

          <button
            onClick={() => nextPage()}
            className="py-2 px-3 bg-stone-600 hover:bg-emerald-700 duration-200 rounded-md flex justify-center items-center"
          >
            <FontAwesomeIcon
              className="text-sm"
              icon={faChevronRight}
            ></FontAwesomeIcon>
          </button>
        </div>

        <p className="flex justify-center items-center">
          {currentTvCategory && "Total pages: " + currentTvCategory.total_pages}
        </p>
      </div>
    </div>
  );
};

export default CategoriesTv;
