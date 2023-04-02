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
    return response.data;
  };
  const { data: tvGenres } = useQuery({
    queryKey: "tvGenres",
    queryFn: getTvGenres,
    refetchOnWindowFocus: false,
  });

  const [currentSelect, setCurrentSelect] = useState();
  const handleTypeSelect = (e) => {
    setChosenGenres([]);
    setChosenGenresTv([]);
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
  }, []);
  const [chosenGenres, setChosenGenres] = useState([]);
  const [movieYear, setMovieYear] = useState();
  const [sortMovie, setSortMovie] = useState("popularity.desc");
  const [chosenGenresTv, setChosenGenresTv] = useState([]);
  useEffect(() => {
    refetch();
  }, [sortMovie]);
  useEffect(() => {
    if (currentSelect === "Movie") {
      refetch();
    } else {
      refetch2();
    }
  }, [movieYear]);
  //movie call
  const getMovieResults = async () => {
    const response = await axios.get(
      `https://apimovies-backend.onrender.com/api/movie-advanced/${movieYear}/${sortMovie}/${
        chosenGenres.length === 0 ? "b" : chosenGenres.toString()
      }`
    );
    console.log(response.data);

    return response.data;
  };

  const {
    data: movieResults,
    refetch: refetch,
    isRefetching: isRefetching,
    isLoading: isLoading2,
  } = useQuery({
    queryKey: ["movieResults", sortMovie, movieYear],
    queryFn: getMovieResults,
    refetchOnWindowFocus: false,
  });
  //end movie call

  //tv call
  const getTvResults = async () => {
    const response = await axios.get(
      `https://apimovies-backend.onrender.com/api/tv-advanced/${movieYear}/${sortMovie}/${
        chosenGenresTv.length === 0 ? "b" : chosenGenresTv.toString()
      }`
    );
    return response.data;
  };

  const {
    data: tvResults,
    refetch: refetch2,
    isRefetching: isRefetching2,
  } = useQuery({
    queryKey: ["tvResults", sortMovie, movieYear],
    queryFn: getTvResults,
    refetchOnWindowFocus: false,
  });
  //end tv call
  if (isLoading) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pb-8">
      <Navbar />
      <div className="px-5 py-8 flex flex-col max-w-6xl mx-auto dark:text-light text-dark-900   border-t-emerald-500">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center mb-10 text-xl md:text-2xl font-semibold"
        >
          Advanced search
        </motion.h2>
        <div className="flex pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className=" flex-1  "
          >
            <h3 className="text-xl mb-3">Type</h3>
            <div className="mb-2">
              <select
                onChange={handleTypeSelect}
                className="px-2 w-36 text-base py-1 rounded-md bg-transparent dark:bg-dark-900  border-2 border-emerald-500"
              >
                <option>Movie</option>
                <option>TV Show</option>
              </select>
            </div>
            <h3 className="text-lg mb-1">Sort by</h3>
            <div className="mb-2">
              <select
                onChange={(e) => {
                  setSortMovie(e.target.options[e.target.selectedIndex].value);
                }}
                className="px-2 w-36  bg-transparent text-base dark:bg-dark-900  py-1 rounded-md border-2 border-emerald-500"
              >
                <option value="popularity.desc">Popularity</option>
                <option value="release_date.desc">Newest</option>
                <option value="release_date.asc">Oldest</option>
                <option value="vote_average.desc">Average vote</option>
                <option value="vote_count.desc">Vote count</option>
              </select>
            </div>
            <h3 className="text-lg mb-1">Year</h3>

            <div className="mb-2">
              <input
                onChange={(e) => {
                  if (
                    e.target.value.length === 4 &&
                    parseInt(e.target.value) > 1895 &&
                    parseInt(e.target.value) <= 2027
                  ) {
                    setMovieYear(e.target.value);
                  }
                  if (e.target.value.length === 0) {
                    setMovieYear("b");
                  }
                }}
                className=" w-36  px-2 py-1 focus:shadow-lg focus:shadow-dark-900/5 -outline-offset-2 outline-none outline-emerald-500 focus:outline-2 focus:outline-emerald-600 bg-transparent  rounded-md duration-300"
                type="text"
              />
            </div>
          </motion.div>
          <div className=" flex-1 ">
            <div className="">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="text-xl mb-3"
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
                          className="flex px-[2px] py-1"
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
                                } else {
                                  chosenGenres.indexOf(e.target.dataset.id) !==
                                    -1 &&
                                    chosenGenres.splice(
                                      chosenGenres.indexOf(e.target.dataset.id),
                                      1
                                    );
                                }
                                refetch();
                              }}
                              type="checkbox"
                              data-id={item.id}
                              name={item.name}
                              id={item.name}
                              className="w-4 h-4 border-2 "
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
                          className="flex px-[2px] py-1"
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index / 40 }}
                            className="flex justify-center items-center pb-1 border-b-2 border-emerald-500"
                          >
                            <input
                              onChange={(e) => {
                                if (e.target.checked === true) {
                                  chosenGenresTv.push(e.target.dataset.id);
                                } else {
                                  chosenGenresTv.indexOf(
                                    e.target.dataset.id
                                  ) !== -1 &&
                                    chosenGenresTv.splice(
                                      chosenGenresTv.indexOf(
                                        e.target.dataset.id
                                      ),
                                      1
                                    );
                                }

                                refetch2();
                              }}
                              data-id={item.id}
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
        <div></div>
      </div>
      <section className=" max-w-6xl mx-auto min-h-screen">
        {isRefetching || isLoading2 || isRefetching2 ? (
          <div className=" translate-y-20">
            <Loading />
          </div>
        ) : movieCategoriesVisible ? (
          movieResults?.results.map((item) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex h-40 relative transition-colors duration-300 gap-4 bg-light dark:bg-stone-900  shadow-xl dark:shadow-stone-900/60 shadow-stone-900/30 mx-6 mt-6 pr-2 rounded-md"
            >
              <div className=" h-32 flex-shrink-0  ">
                <Link to={`/movie/${item.id}`}>
                  <img
                    className=" h-40 w-28 object-cover rounded-l-md pointer-events-none "
                    src={
                      item.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w300` + item.poster_path
                        : "/images/no-cover.png"
                    }
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
            </motion.div>
          ))
        ) : (
          tvResults?.results.map((item) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="flex h-40 relative transition-colors duration-300 gap-4 bg-light dark:bg-stone-900  shadow-xl dark:shadow-stone-900/60 shadow-stone-900/30 mx-6 mt-6 pr-2 rounded-md"
            >
              <div className=" h-32 flex-shrink-0  ">
                <Link to={`/tv/${item.id}`}>
                  <img
                    className=" h-40 w-28 object-cover rounded-l-md pointer-events-none "
                    src={
                      item.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w300` + item.poster_path
                        : "/images/no-cover.png"
                    }
                  />
                </Link>
              </div>
              <div className="flex   justify-around flex-col h-full">
                <div>
                  <Link to={`/tv/${item.id}`}>
                    <h4 className="text-base dark:text-light text-dark-900 md:text-xl inline-block">
                      {item.name}
                    </h4>
                  </Link>

                  <p className="text-sm text-stone-400">
                    {item.first_air_date}
                  </p>
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
                    : item.vote_average * 10 > 30 &&
                      item.vote_average * 10 <= 50
                    ? `#f97316`
                    : item.vote_average * 10 > 50 &&
                      item.vote_average * 10 <= 70
                    ? `#facc15`
                    : item.vote_average * 10 > 70 &&
                      item.vote_average * 10 <= 84
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
            </motion.div>
          ))
        )}
      </section>
    </div>
  );
};

export default AdvancedSearch;
