import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
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
  if (isLoading) {
    return <NotFound />;
  }
  return (
    <div>
      <Navbar />
      <div className="px-5 py-2 max-w-6xl mx-auto dark:text-light text-dark-900  min-h-screen border-t-emerald-500">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center mb-4 text-xl md:text-2xl font-semibold"
        >
          Advanced search
        </motion.h2>
        <div className="flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className=" flex-1 p-2"
          >
            <h3 className="text-lg">Type</h3>
            <div>
              <select
                onChange={handleTypeSelect}
                className="px-2 text-base py-1 rounded-md dark:bg-dark-700 border-2 border-emerald-500"
              >
                <option>Movie</option>
                <option>TV Show</option>
              </select>
            </div>
            <h3 className="text-lg">Sort by</h3>
            <div>
              <select className="px-2 text-base py-1 rounded-md dark:bg-dark-700 border-2 border-emerald-500">
                <option>Popularity</option>
                <option>Newest</option>
                <option>Oldest</option>
                <option>Average vote</option>
                <option>Vote count</option>
              </select>
            </div>
            <h3 className="text-lg">Year</h3>

            <div>
              <input
                className="w-40 bg-dark-900/5 px-2 py-1 focus:shadow-lg focus:shadow-dark-900/5 -outline-offset-2 outline-none outline-emerald-500 focus:outline-2 focus:outline-emerald-600  duration-300"
                type="text"
                name=""
                id=""
              />
            </div>
          </motion.div>
          <div className=" flex-1 p-2">
            <div className="mt-4">
              <h3 className="text-lg">Categories</h3>
              <div className="w-full flex flex-wrap gap-2">
                {movieGenres?.genres.map(
                  (item, index) =>
                    movieCategoriesVisible && (
                      <AnimatePresence>
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
        <div className="mt-2">
          <button className=" bg-gradient-to-l from-emerald-300 via-emerald-400 to-emerald-500 text-light  py-2 rounded-lg w-full md:w-1/4 float-right">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
