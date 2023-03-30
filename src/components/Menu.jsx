import React from "react";
import { IoMdClose } from "react-icons/io";
import { BsDatabaseCheck } from "react-icons/bs";
import { BiMovie } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import { RiTvLine } from "react-icons/ri";
import { BsCodeSlash } from "react-icons/bs";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { BiSearchAlt, BiSearch } from "react-icons/bi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useQuery } from "react-query";
const Menu = (props) => {
  const handleClose = () => {
    props.setMenuVisible(false);
    document.body.style.overflow = "visible";
  };

  const navigate = useNavigate();
  const getRandomMovie = async () => {
    const response = await axios.get(
      "https://apimovies-backend.onrender.com/api/movie-random"
    );
    return response.data.results;
  };

  const { data: randomMovie } = useQuery({
    queryKey: ["randomMovie"],
    queryFn: getRandomMovie,
    refetchOnWindowFocus: false,
  });
  const handleRandomMovie = () => {
    randomMovie &&
      navigate(`/movie/${randomMovie[Math.floor(Math.random() * 19) + 1].id}`);
    location.reload();
  };
  const getRandomTv = async () => {
    const response = await axios.get(
      "https://apimovies-backend.onrender.com/api/tv-random"
    );
    return response.data.results;
  };

  const { data: randomTv } = useQuery({
    queryKey: ["randomTv"],
    queryFn: getRandomTv,
    refetchOnWindowFocus: false,
  });
  const handleRandomTv = () => {
    randomTv &&
      navigate(`/tv/${randomTv[Math.floor(Math.random() * 19) + 1].id}`);
    location.reload();
  };
  const toFocus = document.getElementById("focusInput");
  const handleRegularSearch = () => {
    props.setMenuVisible(false);
    props.setSearchVisible(true);
    toFocus.focus();
    document.body.style.overflow = "visible";
  };
  const handleAdvancedSearch = () => {
    navigate("/search");
    props.setMenuVisible(false);
    document.body.style.overflow = "visible";
  };
  return (
    <div>
      <AnimatePresence>
        {props.menuVisible && (
          <motion.div
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            exit={{ y: -1000 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="w-full h-screen dark:bg-dark-900 bg-light z-[300]  fixed left-0 top-0 dark:text-light text-dark-900"
          >
            <div className="grid grid-cols-2  grid-rows-2  px-4 -mt-10 h-full w-full">
              <div className=" flex flex-col  items-center gap-5 justify-end pb-10">
                <div className="text-lg h-14 bg-gradient-to-r rounded-md from-emerald-200 via-emerald-400 to-emerald-600 pb-1  md:text-3xl  font-medium pointer-events-none  ">
                  <div className="h-full w-full  dark:bg-dark-900 px-2 bg-light flex justify-center items-center gap-2">
                    <GiPerspectiveDiceSixFacesRandom className="text-3xl" />
                    Random
                  </div>
                </div>
                <button
                  onClick={handleRandomMovie}
                  className="flex items-center group relative gap-1 text-sm md:text-lg justify-center cursor-pointer  "
                >
                  <div className="w-0 group-hover:w-full h-[2px] absolute -bottom-2 left-0 bg-gradient-to-r rounded-sm from-emerald-400 via-emerald-500 to-emerald-600 dark:from-emerald-200 dark:via-emerald-400 dark:to-emerald-600 duration-500"></div>
                  <BiMovie className="text-xl md:text-2xl text-emerald-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-200 duration-500" />
                  Random movie
                </button>
                <button
                  onClick={handleRandomTv}
                  className="flex items-center gap-1 group relative text-sm md:text-lg justify-center cursor-pointer"
                >
                  <div className="w-0 group-hover:w-full h-[2px] absolute -bottom-2 left-0 bg-gradient-to-r rounded-sm from-emerald-400 via-emerald-500 to-emerald-600 dark:from-emerald-200 dark:via-emerald-400 dark:to-emerald-600 duration-500"></div>
                  <RiTvLine className="text-xl md:text-2xl text-emerald-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-200 duration-500" />
                  Random TV show
                </button>
              </div>
              <div className=" flex flex-col  items-center gap-5 justify-end pb-10">
                <div className="text-lg h-14 rounded-md bg-gradient-to-r from-emerald-200 via-emerald-400 pb-1 to-emerald-600  md:text-3xl  font-medium pointer-events-none   ">
                  <div className="h-full w-full  dark:bg-dark-900 px-2 bg-light flex  justify-center items-center gap-2">
                    <MdOutlineScreenSearchDesktop className="text-3xl" />
                    Search
                  </div>
                </div>

                <button
                  onClick={handleRegularSearch}
                  className="flex relative group items-center gap-1 text-sm md:text-lg justify-center cursor-pointer"
                >
                  <div className="w-0 group-hover:w-full h-[2px] absolute -bottom-2 left-0 bg-gradient-to-r rounded-sm from-emerald-400 via-emerald-500 to-emerald-600 dark:from-emerald-200 dark:via-emerald-400 dark:to-emerald-600 duration-500"></div>
                  <BiSearch className="text-xl md:text-2xl text-emerald-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-200 duration-500" />
                  Regular search
                </button>
                <button
                  onClick={handleAdvancedSearch}
                  className="flex relative group items-center gap-1 text-sm md:text-lg justify-center cursor-pointer"
                >
                  <div className="w-0 group-hover:w-full h-[2px] absolute -bottom-2 left-0 bg-gradient-to-r rounded-sm from-emerald-400 via-emerald-500 to-emerald-600 dark:from-emerald-200 dark:via-emerald-400 dark:to-emerald-600 duration-500"></div>
                  <BiSearchAlt className="text-xl md:text-2xl text-emerald-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-200 duration-500" />
                  Advanced search
                </button>
              </div>
              <div className=" flex flex-col  items-center  gap-5 justify-center pb-10">
                <div className="text-lg h-14  md:text-3xl justify-center items-center font-medium pointer-events-none bg-gradient-to-r rounded-md from-emerald-200 via-emerald-400 to-emerald-600 pb-1 ">
                  <div className="h-full w-full  dark:bg-dark-900 px-2 bg-light flex justify-center items-center gap-2">
                    <BsCodeSlash className="text-3xl" />
                    Code
                  </div>
                </div>
                <button className="flex items-center gap-1 text-lg justify-center">
                  <a href="#">
                    <AiFillGithub className="w-8 h-8 " />
                  </a>
                </button>
              </div>
              <div className=" flex flex-col gap-5 items-center  justify-center pb-10">
                <div className="text-lg h-14  md:text-3xl justify-center items-center pointer-events-none bg-gradient-to-r rounded-md from-emerald-200 via-emerald-400 to-emerald-600 pb-1 font-medium ">
                  <div className="h-full w-full  dark:bg-dark-900 px-2 bg-light flex justify-center items-center gap-2">
                    <BsDatabaseCheck className="text-3xl pointer-events-none" />
                    API
                  </div>
                </div>

                <a
                  href="https://www.themoviedb.org/documentation/api"
                  className=""
                >
                  <img
                    className="w-24 md:w-40 h-8"
                    src="/images/tmdb.svg"
                    alt="tmdb logo"
                  />
                </a>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 0.9 }}
              onClick={handleClose}
              className="right-4 top-4 absolute bg-gradient-to-tr from-emerald-700 to-emerald-600 shadow-lg shadow-dark-700/10 duration-300 p-3 rounded-full cursor-pointer"
            >
              <IoMdClose className="text-light text-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
