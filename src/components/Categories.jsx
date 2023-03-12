import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "./Navbar";
const Categories = () => {
  const [currentUrlCategory, setCurrentUrlCategory] = useState();
  const { category, page } = useParams();
  const navigate = useNavigate();

  const prevPage = () => {
    if (parseInt(page) === 1) {
      null;
    } else {
      navigate(`/movie/category/${category}/${parseInt(page) - 1}`);
      window.location.reload();
      window && window.scroll(0, 0);
    }
  };
  const nextPage = () => {
    navigate(`/movie/category/${category}/${parseInt(page) + 1}`);
    window.location.reload();
    window && window.scroll(0, 0);
  };

  const getGenres = async () => {
    const response = await axios.get("http://localhost:8080/api/moviegenres");
    console.log(response.data);
    response.data.genres.map((item) => {
      item.name === category ? setCurrentUrlCategory(item.id) : null;
    });
    return response.data;
  };
  const { data: movieGenres } = useQuery({
    queryKey: "movieGenres",
    queryFn: getGenres,
    refetchOnWindowFocus: false,
  });
  const getCurrentCategory = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/movie/categories/${currentUrlCategory}/${parseInt(
        page
      )}`
    );
    console.log(response.data);
    return response.data;
  };
  const { data: currentCategory } = useQuery({
    queryKey: ["currentCategory"],
    queryFn: getCurrentCategory,
    refetchOnWindowFocus: false,
    enabled: !!currentUrlCategory,
  });
  const getCurrentCategoryBackdrop = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/movie/categories/${currentUrlCategory}/1`
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
  const [pageValue, setPageValue] = useState();
  const handleJumpToPage = () => {
    navigate(`/movie/category/${category}/${parseInt(pageValue)}`);
    window.location.reload();
    window && window.scroll(0, 0);
  };

  return (
    <div className="bg-stone-800">
      <Navbar />
      <div className="  text-white pb-4 ">
        <div className="relative py-24 md:py-28 lg:py-32 ">
          <h2 className="text-center absolute left-1/2 top-1/2 -translate-x-1/2 line-clamp  -translate-y-1/2 text-3xl md:text-4xl font-medium z-30 ">
            {movieGenres &&
              movieGenres.genres.map((item) =>
                item.name === category ? (
                  <p className=" first-letter:capitalize">{item.name} movies</p>
                ) : null
              )}
          </h2>
          <h2 className="text-center absolute left-1/2 bottom-0 -translate-x-1/2 line-clamp md:text-xl  -translate-y-1/2 text-lg  first-letter:capitalize z-30">
            {currentCategory &&
              "Total results: " + currentCategory.total_results}
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
          {currentCategory &&
            currentCategory.results.map((item) => (
              <div className="flex h-40 relative gap-4 bg-stone-900 shadow-xl shadow-stone-900/60 mx-6 mt-6 pr-2 rounded-md">
                <div className=" h-32 flex-shrink-0  ">
                  <Link to={`/movie/${item.id}`}>
                    <img
                      className=" h-40 w-28 object-cover rounded-l-md pointer-events-none "
                      src={`https://image.tmdb.org/t/p/w300` + item.poster_path}
                    />
                  </Link>
                </div>
                <div className="flex   justify-around flex-col h-full">
                  <div>
                    <Link to={`/movie/${item.id}`}>
                      <h4 className="text-base  md:text-xl inline-block">
                        {item.title}
                      </h4>
                    </Link>

                    <p className="text-sm text-stone-400">
                      {item.release_date}
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
              className="w-16 bg-stone-500 py-[3px] outline-none outline-offset-0 focus:outline-emerald-400 duration-150 text-center placeholder:text-stone-300 "
              placeholder={parseInt(page)}
              onChange={(e) => setPageValue(e.target.value)}
            />
            <button
              type="submit"
              disabled={
                currentCategory &&
                !(parseInt(pageValue) < currentCategory.total_pages)
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
        <div className="flex items-center justify-center pb-4"></div>
        <p className="flex justify-center items-center">
          {currentCategory && "Total pages: " + currentCategory.total_pages}
        </p>
      </div>
    </div>
  );
};

export default Categories;
