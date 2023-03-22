import React from "react";
import { IoMdClose } from "react-icons/io";
import { BsDatabaseCheck } from "react-icons/bs";
import { BiMovie } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import { RiTvLine } from "react-icons/ri";
import { BsCodeSlash } from "react-icons/bs";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { BiSearchAlt, BiSearch } from "react-icons/bi";
import { FaRandom } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
const Menu = (props) => {
  const handleClose = () => {
    props.setMenuVisible(false);
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
            className="w-full h-screen dark:bg-dark-900 bg-light z-[300] fixed left-0 top-0 dark:text-light text-dark-900"
          >
            <div className="grid grid-cols-2 grid-rows-2  h-full w-full">
              <div className=" flex flex-col items-center gap-4 justify-center">
                <div className="text-xl h-14 bg-gradient-to-r rounded-md from-emerald-200 via-emerald-400 to-emerald-600 pb-1  md:text-3xl  font-medium pointer-events-none ">
                  <div className="h-full w-full  dark:bg-dark-900 px-2 bg-light flex justify-center items-center gap-2">
                    <FaRandom className="text-3xl" />
                    Random
                  </div>
                </div>
                <p className="flex items-center gap-1 text-lg justify-center pointer-events-none">
                  <BiMovie className="text-2xl text-emerald-500" />
                  Random movie
                </p>
                <p className="flex items-center gap-1 text-lg justify-center pointer-events-none">
                  <RiTvLine className="text-2xl text-emerald-500" />
                  Random TV show
                </p>
              </div>
              <div className=" flex flex-col  items-center gap-4 justify-center">
                <div className="text-xl h-14 rounded-md bg-gradient-to-r from-emerald-200 via-emerald-400 pb-1 to-emerald-600   md:text-3xl  font-medium pointer-events-none   ">
                  <div className="h-full w-full  dark:bg-dark-900 px-2 bg-light flex  justify-center items-center gap-2">
                    <MdOutlineScreenSearchDesktop className="text-3xl" />
                    Search
                  </div>
                </div>
                <p className="flex items-center gap-1 text-lg justify-center pointer-events-none">
                  <BiSearchAlt className="text-2xl text-emerald-500" />
                  Advanced search
                </p>
                <p className="flex items-center gap-1 text-lg justify-center pointer-events-none">
                  <BiSearch className="text-2xl text-emerald-500" />
                  Regular search
                </p>
              </div>
              <div className=" flex flex-col items-center  gap-4 justify-center">
                <div className="text-xl h-14  md:text-3xl justify-center items-center font-medium pointer-events-none bg-gradient-to-r rounded-md from-emerald-200 via-emerald-400 to-emerald-600 pb-1 ">
                  <div className="h-full w-full  dark:bg-dark-900 px-2 bg-light flex justify-center items-center gap-2">
                    <BsCodeSlash className="text-3xl" />
                    Code
                  </div>
                </div>
                <p className="flex items-center gap-1 text-lg justify-center">
                  <AiFillGithub className="w-40 h-10 md:w-52  " />
                </p>
              </div>
              <div className=" flex flex-col gap-4 items-center  justify-center">
                <div className="text-xl h-14  md:text-3xl justify-center items-center pointer-events-none bg-gradient-to-r rounded-md from-emerald-200 via-emerald-400 to-emerald-600 pb-1 font-medium ">
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
                    className="w-40 md:w-52 h-10"
                    src="/images/tmdb.svg"
                    alt="tmdb logo"
                  />
                </a>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 0.9 }}
              onClick={handleClose}
              className="right-4 top-4 absolute bg-gradient-to-tr from-emerald-700 to-emerald-600 shadow-lg shadow-dark-700/20  duration-300 p-3 rounded-full cursor-pointer"
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
