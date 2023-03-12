import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faMoon,
  faClose,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedMobile, setIsFocusedMobile] = useState(true);
  const parentVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.05,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const focusLeaveHandler = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };
  const mobileFocusLeaveHandler = () => {
    setTimeout(() => {
      setIsFocusedMobile(false);
    }, 100);
  };

  const updateSearchHandler = (e) => {
    setCurrentQuery(e.target.value);
    setIsFocused(true);
    setIsFocusedMobile(true);
  };

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useQuery(["searchResults", currentQuery], async () => {
    const response = await axios.get(
      `http://localhost:8080/api/search-movie?query=${currentQuery}`
    );
    console.log(response.data.results);
    return response.data.results;
  });

  return (
    <header className="relative z-[200] top-0 left-0">
      <nav className=" bg-stone-900 flex items-center justify-center  md:h-20 h-16 ">
        <motion.div
          variants={parentVariant}
          animate="visible"
          initial="hidden"
          className=" py-4 md:py-5 w-full relative px-5 flex items-center justify-between max-w-6xl mx-auto"
        >
          <AnimatePresence>
            {searchVisible && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="md:hidden w-full flex items-center justify-center absolute top-0 left-0 h-16"
              >
                <div className="relative w-full h-full">
                  <input
                    onBlur={mobileFocusLeaveHandler}
                    onFocusCapture={updateSearchHandler}
                    onChange={updateSearchHandler}
                    autoFocus
                    className=" w-full h-full px-4 bg-stone-900 outline-none focus:outline-2 focus:-outline-offset-4 text-white focus:outline-emerald-400 pr-12"
                    placeholder="Search for a movie/show..."
                  />
                  <FontAwesomeIcon
                    className="absolute cursor-pointer right top-0 text-2xl right-0 p-5 text-white"
                    onClick={() => {
                      setSearchVisible(!searchVisible);
                      setCurrentQuery("");
                    }}
                    icon={faClose}
                  ></FontAwesomeIcon>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            variants={childVariant}
            className=" text-xl "
          >
            <Link
              to="/"
              className="flex justify-start items-center gap-6 text-emerald-50 "
            >
              <img
                src="/public/logo.png"
                className="w-8"
                alt="logo"
              />
              <h2 className="text-base text-emerald-50 first-letter:text-emerald-400 -ml-4  tracking-wide font-semibold pointer-events-none">
                findastream
              </h2>
            </Link>
          </motion.div>
          <motion.div
            variants={childVariant}
            className="hidden relative md:block  "
          >
            <div className="relative">
              <input
                onBlur={focusLeaveHandler}
                onFocusCapture={updateSearchHandler}
                onChange={updateSearchHandler}
                className="w-[26rem] text-stone-800 font-[Roboto] rounded-sm outline-none focus:outline-[2.5px] focus:outline-emerald-500 focus:-outline-offset-1 px-3  text-base py-[.4rem] placeholder:text-base "
                placeholder="Search for a movie/show..."
              />
              <FontAwesomeIcon
                className="absolute cursor-pointer  p-[0.6rem]  top-[0.7px] right-0 text-zinc-600 "
                icon={faSearch}
              ></FontAwesomeIcon>
            </div>

            <div className="hidden md:flex flex-col absolute w-full">
              {searchResults &&
                isFocused &&
                searchResults
                  .filter(
                    (item) =>
                      item.media_type !== "person" &&
                      item.poster_path !== null &&
                      item.backdrop_path !== null
                  )
                  .slice(0, 8)
                  .map((item, index) => {
                    return (
                      <a
                        key={index}
                        href={`/${item.media_type}/${item.id}`}
                      >
                        {" "}
                        <motion.div
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          transition={{ delay: index / 20 }}
                          className="text-white flex z-[200] cursor-pointer  py-2 px-2 bg-stone-800 gap-3 w-full hover:bg-stone-600 transition-[background-color] duration-500"
                        >
                          <img
                            className=" w-[60px]"
                            src={
                              item.poster_path
                                ? `https://image.tmdb.org/t/p/w200` +
                                  item.poster_path
                                : item.profile_path
                                ? `https://image.tmdb.org/t/p/w200` +
                                  item.profile_path
                                : "./images/no-cover.png"
                            }
                          />
                          <div className="flex flex-col justify-around">
                            <h3 className="text-base">
                              {item.title || item.name}
                            </h3>
                            {item.vote_average !== 0 && (
                              <span className="flex items-center gap-1">
                                {item.vote_average && (
                                  <FontAwesomeIcon
                                    className=" text-emerald-500 text-lg"
                                    icon={faStar}
                                  ></FontAwesomeIcon>
                                )}

                                <h4 className="">
                                  {item.vote_average
                                    ? item.vote_average.toFixed(2)
                                    : ""}
                                </h4>
                              </span>
                            )}

                            {item.media_type == "movie" ? (
                              <h5 className="text-sm">
                                Movie
                                {item.release_date &&
                                  ", " + item.release_date.slice(0, 4)}
                              </h5>
                            ) : item.media_type == "tv" ? (
                              <h5 className="text-sm">
                                TV Show
                                {item.first_air_date &&
                                  ", " + item.first_air_date.slice(0, 4)}{" "}
                              </h5>
                            ) : null}
                          </div>
                        </motion.div>
                      </a>
                    );
                  })}
            </div>
          </motion.div>

          <motion.div
            variants={childVariant}
            className="flex  items-center justify-end gap-6  text-xl text-emerald-50"
          >
            <FontAwesomeIcon
              className="cursor-pointer md:hidden"
              onClick={() => {
                setSearchVisible(!searchVisible);
              }}
              icon={faSearch}
            ></FontAwesomeIcon>
            <button className="flex items-center justify-center gap-2">
              <FontAwesomeIcon
                className="text-lg"
                icon={faBars}
              ></FontAwesomeIcon>
              <h2 className="text-sm font-bold">Menu</h2>
            </button>

            <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
          </motion.div>
        </motion.div>
      </nav>
      {searchVisible && (
        <div className="flex flex-col absolute md:hidden w-full">
          {searchResults &&
            isFocusedMobile &&
            searchResults
              .filter(
                (item) =>
                  item.media_type !== "person" &&
                  item.poster_path !== null &&
                  item.backdrop_path !== null
              )
              .slice(0, 8)
              .map((item, index) => {
                return (
                  <a
                    key={index}
                    href={`/${item.media_type}/${item.id}`}
                  >
                    {" "}
                    <motion.div
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      transition={{ delay: index / 20 }}
                      className="text-white flex z-[100] cursor-pointer  py-2 px-2 bg-stone-800 gap-3 w-full hover:bg-stone-600 transition-[background-color] duration-500"
                    >
                      <img
                        className=" w-[60px]"
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w200` +
                              item.poster_path
                            : item.profile_path
                            ? `https://image.tmdb.org/t/p/w200` +
                              item.profile_path
                            : "./images/no-cover.png"
                        }
                      />
                      <div className="flex flex-col justify-around">
                        <h3 className="text-base">{item.title || item.name}</h3>
                        {item.vote_average !== 0 && (
                          <span className="flex items-center gap-1">
                            {item.vote_average && (
                              <FontAwesomeIcon
                                className=" text-emerald-500 text-lg"
                                icon={faStar}
                              ></FontAwesomeIcon>
                            )}

                            <h4 className="">
                              {item.vote_average
                                ? item.vote_average.toFixed(2)
                                : ""}
                            </h4>
                          </span>
                        )}

                        {item.media_type == "movie" ? (
                          <h5 className="text-sm">
                            Movie
                            {item.release_date &&
                              ", " + item.release_date.slice(0, 4)}
                          </h5>
                        ) : item.media_type == "tv" ? (
                          <h5 className="text-sm">
                            TV Show
                            {item.first_air_date &&
                              ", " + item.first_air_date.slice(0, 4)}{" "}
                          </h5>
                        ) : null}
                      </div>
                    </motion.div>
                  </a>
                );
              })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
