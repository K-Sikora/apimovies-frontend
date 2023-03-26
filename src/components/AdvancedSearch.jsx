import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import NotFound from "./NotFound";
import { motion, AnimatePresence } from "framer-motion";
const AdvancedSearch = () => {
  const [movieCategoriesVisible, setMovieCategoriesVisible] = useState(true);
  const [TvCategoriesVisible, setTvCategoriesVisible] = useState(false);
  const getGenres = async () => {
    const response = await axios.get(
      "https://apimovies-backend.onrender.com/api/moviegenres"
    );
    console.log(response.data);
    return response.data;
  };
  const { data: movieGenres, isLoading } = useQuery({
    queryKey: "movieGenres",
    queryFn: getGenres,
    refetchOnWindowFocus: false,
  });

  const getTvGenres = async () => {
    const response = await axios.get(
      "https://apimovies-backend.onrender.com/api/tvgenres"
    );
    console.log(response.data.genres);
    return response.data;
  };
  const { data: tvGenres } = useQuery({
    queryKey: "tvGenres",
    queryFn: getTvGenres,
    refetchOnWindowFocus: false,
  });

  const [currentSelect, setCurrentSelect] = useState();
  const handleTypeSelect = (e) => {
    setCurrentSelect(e.target.value);
    if (e.target.value === "Movie") {
      setMovieCategoriesVisible(true);
      setTvCategoriesVisible(false);
    } else {
      setMovieCategoriesVisible(false);
      setTvCategoriesVisible(true);
    }
  };
  useEffect(() => {
    if (!currentSelect) {
      setCurrentSelect("Movie");
    }
  });

  const getMovieResults = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/movie-advanced/${movieYear}/${sortMovie}/${movieGenre}`
    );
    console.log(response.data);
    return response.data;
  };

  const {
    data: movieResults,
    refetch,
    isLoading2,
  } = useQuery({
    queryKey: ["movieResults"],
    queryFn: getMovieResults,
    refetchOnWindowFocus: false,
  });
  const [chosenGenres, setChosenGenres] = useState([]);
  const [movieYear, setMovieYear] = useState();
  const [sortMovie, setSortMovie] = useState("popularity.desc");
  const [movieGenre, setMovieGenre] = useState();
  const submitSearch = () => {
    console.log(chosenGenres);
    if (currentSelect === "Movie") {
      setMovieGenre(chosenGenres.toString());
      refetch();
      console.log(chosenGenres);
    } else {
      ("");
    }
  };
  if (isLoading) {
    return <NotFound />;
  }
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-5 py-2 flex flex-col max-w-6xl mx-auto dark:text-light text-dark-900   border-t-emerald-500">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center mb-4 text-xl md:text-2xl font-semibold"
        >
          Advanced search
        </motion.h2>
        <div className="flex pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className=" flex-1 p-2  "
          >
            <h3 className="text-lg mb-1">Type</h3>
            <div className="mb-2">
              <select
                onChange={handleTypeSelect}
                className="px-2 text-base py-1 rounded-md dark:bg-dark-700 border-2 border-emerald-500"
              >
                <option>Movie</option>
                <option>TV Show</option>
              </select>
            </div>
            <h3 className="text-lg mb-1">Sort by</h3>
            <div className="mb-2">
              <select
                onChange={(e) => {
                  setSortMovie(
                    e.target.options[e.target.selectedIndex].dataset.option
                  );
                }}
                className="px-2 text-base py-1 rounded-md dark:bg-dark-700 border-2 border-emerald-500"
              >
                <option data-option="popularity.desc">Popularity</option>
                <option data-option="release_date.desc">Newest</option>
                <option data-option="release_date.asc">Oldest</option>
                <option data-option="vote_average.desc">Average vote</option>
                <option data-option="vote_count.desc">Vote count</option>
              </select>
            </div>
            <h3 className="text-lg mb-1">Year</h3>

            <div className="mb-2">
              <input
                onChange={(e) => {
                  setMovieYear(e.target.value);
                }}
                className="w-40 bg-dark-900/5 px-2 py-1 focus:shadow-lg focus:shadow-dark-900/5 -outline-offset-2 outline-none outline-emerald-500 focus:outline-2 focus:outline-emerald-600 rounded-md duration-300"
                type="text"
                name=""
                id=""
              />
            </div>
          </motion.div>
          <div className=" flex-1 p-2 ">
            <div className="">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="text-lg mb-1"
              >
                Categories
              </motion.h3>
              <div className="w-full flex flex-wrap gap-2">
                {movieGenres?.genres.map(
                  (item, index) =>
                    movieCategoriesVisible && (
                      <AnimatePresence key={index}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2 }}
                          className="flex   px-2 py-1"
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index / 40 }}
                            className="flex justify-center items-center border-b-2 pb-1 border-emerald-500"
                          >
                            <input
                              onChange={(e) => {
                                if (e.target.checked === true) {
                                  chosenGenres.push(e.target.dataset.id);
                                  console.log(chosenGenres);
                                } else {
                                  chosenGenres.indexOf(e.target.dataset.id) !==
                                    -1 &&
                                    chosenGenres.splice(
                                      chosenGenres.indexOf(e.target.dataset.id),
                                      1
                                    );
                                  console.log(chosenGenres);
                                }
                              }}
                              type="checkbox"
                              data-id={item.id}
                              name={item.name}
                              id={item.name}
                              className="w-4 h-4"
                            />
                            <label
                              className="text-xs pl-1 md:text-sm"
                              htmlFor={item.name}
                            >
                              {item.name}
                            </label>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    )
                )}
                {tvGenres?.genres.map(
                  (item, index) =>
                    TvCategoriesVisible && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 1.2 }}
                          className="flex  px-2 py-1"
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index / 40 }}
                            className="flex justify-center items-center pb-1 border-b-2 border-emerald-500"
                          >
                            <input
                              type="checkbox"
                              name={item.name}
                              id={item.name}
                              className="w-4 h-4"
                            />
                            <label
                              className="text-xs pl-1 md:text-sm"
                              htmlFor={item.name}
                            >
                              {item.name}
                            </label>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={submitSearch}
            className=" bg-gradient-to-r hover:shadow-lg hover:shadow-dark-900/5 duration-300 from-emerald-400  to-emerald-500 text-light  py-2 rounded-lg w-full md:w-1/4 float-right"
          >
            Search
          </button>
        </div>
      </div>
      <section className=" max-w-6xl mx-auto">
        {isLoading2 ? (
          <Loading />
        ) : (
          movieResults &&
          movieResults.results.map((item) => (
            <div className="flex h-40 relative duration-300 gap-4 bg-light dark:bg-stone-900  shadow-xl dark:shadow-stone-900/60 shadow-stone-900/30 mx-6 mt-6 pr-2 rounded-md">
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
                    <h4 className="text-base dark:text-light text-dark-900 md:text-xl inline-block">
                      {item.title}
                    </h4>
                  </Link>

                  <p className="text-sm text-stone-400">{item.release_date}</p>
                </div>
                <p className="line-clamp dark:text-light text-dark-700 text-sm md:text-base">
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
          ))
        )}
      </section>
    </div>
  );
};

export default AdvancedSearch;
