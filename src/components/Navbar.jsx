import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faMoon,
  faClose,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { BsFillSunFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Menu from "./Menu";
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
      `https://apimovies-backend.onrender.com/api/search-movie?query=${currentQuery}`
    );
    return response.data.results;
  });

  const [switchVisible, setSwitchVisible] = useState("dark");

  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "dark");
    }
    document.documentElement.classList.add(localStorage.getItem("theme"));
    setSwitchVisible(localStorage.getItem("theme"));
  }, [switchVisible]);

  const handleDarkMode = () => {
    if (localStorage.getItem("theme") === "dark") {
      setSwitchVisible("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else if (localStorage.getItem("theme") === "light") {
      setSwitchVisible("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };
  const [menuVisible, setMenuVisible] = useState(false);
  const handleMenuOpen = () => {
    setMenuVisible(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <header className="relative z-[200] top-0 left-0">
      <nav className=" dark:bg-dark-900 bg-light duration-300 flex items-center justify-center  md:h-20 h-16 ">
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
                    className=" w-full h-full px-4 dark:bg-dark-900 bg-light outline-none focus:outline-2 focus:-outline-offset-4 dark:text-light text-dark-900 focus:outline-emerald-400 pr-12"
                    placeholder="Search for a movie/show..."
                  />
                  <FontAwesomeIcon
                    className="absolute cursor-pointer right top-0 text-2xl right-0 p-5 dark:text-light text-dark-900"
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
                src="/logo.png"
                className="w-8"
                alt="logo"
              />
              <h2 className="text-base dark:text-light text-dark-900 first-letter:text-emerald-400 -ml-4  tracking-wide font-semibold pointer-events-none">
                watchable
              </h2>
            </Link>
          </motion.div>
          <motion.div
            variants={childVariant}
            className="hidden relative md:block  "
          >
            <div className="relative">
              <input
                id="focusInput"
                onBlur={focusLeaveHandler}
                onFocusCapture={updateSearchHandler}
                onChange={updateSearchHandler}
                className="w-[26rem] text-dark-700 shadow-md shadow-dark-700/20  dark:bg-light outline-none focus:outline-[2.5px] focus:outline-emerald-500 focus:-outline-offset-1 px-3 rounded-md  text-base py-[.55rem] placeholder:text-base  "
                placeholder="Search for a movie/show..."
              />
              <FontAwesomeIcon
                className="absolute   p-[0.75rem]  top-[0.7px]  right-0 text-zinc-500 "
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
                          className="dark:text-white flex z-[200] cursor-pointer text-dark-900 py-2 px-2 dark:bg-stone-800 bg-light gap-3 w-full hover:bg-stone-200 dark:hover:bg-stone-600 transition-[background-color] duration-500"
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
              className="cursor-pointer md:hidden dark:text-light text-dark-900"
              onClick={() => {
                setSearchVisible(!searchVisible);
              }}
              icon={faSearch}
            ></FontAwesomeIcon>
            <button
              onClick={handleMenuOpen}
              className="flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon
                className="text-lg dark:text-light text-dark-900"
                icon={faBars}
              ></FontAwesomeIcon>
              <h2 className="text-sm font-bold dark:text-light text-dark-900">
                Menu
              </h2>
            </button>
            {switchVisible === "dark" ? (
              <BsFillSunFill
                className="w-5 h-5 dark:text-light text-dark-900 cursor-pointer"
                onClick={handleDarkMode}
              />
            ) : (
              <FontAwesomeIcon
                icon={faMoon}
                className="w-5 h-5 dark:text-light text-dark-900 cursor-pointer "
                onClick={handleDarkMode}
              ></FontAwesomeIcon>
            )}
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
                      className="text-white flex z-[100] cursor-pointer dark:border-none border-2  py-2 px-2 bg-light dark:bg-stone-800 gap-3 w-full dark:hover:bg-stone-600 hover:bg-stone-200 transition-[background-color] duration-500"
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
                        <h3 className="text-base dark:text-light text-dark-900 ">
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

                            <h4 className="dark:text-light text-dark-700">
                              {item.vote_average
                                ? item.vote_average.toFixed(2)
                                : ""}
                            </h4>
                          </span>
                        )}

                        {item.media_type == "movie" ? (
                          <h5 className="text-sm dark:text-light text-dark-900">
                            Movie
                            {item.release_date &&
                              ", " + item.release_date.slice(0, 4)}
                          </h5>
                        ) : item.media_type == "tv" ? (
                          <h5 className="text-sm dark:text-light text-dark-900">
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
      <Menu
        setMenuVisible={setMenuVisible}
        menuVisible={menuVisible}
        setSearchVisible={setSearchVisible}
      />
    </header>
  );
};

export default Navbar;
