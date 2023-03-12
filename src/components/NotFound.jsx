import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { motion, useCycle } from "framer-motion";
const NotFound = () => {
  const [opacity, cycleOpacity] = useCycle(0, 1);
  useEffect(() => {
    const interval = setInterval(() => {
      cycleOpacity();
    }, 700);
    return () => clearInterval(interval);
  }, [cycleOpacity]);

  useEffect(() => {
    setTimeout(() => {
      setLoadingError(true);
    }, 5000);
  }, []);

  const [loadingError, setLoadingError] = useState(false);
  return (
    <>
      <Navbar />
      <div className="bg-stone-900 flex-col min-h-screen gap-8 flex items-center relative -mt-16 md:-mt-20 justify-center">
        <div className="flex gap-4">
          <motion.div
            animate={{ opacity }}
            transition={{ duration: 0.15, delay: 0.1, ease: "easeIn" }}
            className="bg-emerald-500 w-6 h-6 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ opacity }}
            transition={{ duration: 0.15, delay: 0.2, ease: "easeIn" }}
            className="bg-emerald-500 w-6 h-6 rounded-full"
          ></motion.div>
          <motion.div
            animate={{ opacity }}
            transition={{ duration: 0.15, delay: 0.3, ease: "easeIn" }}
            className="bg-emerald-500 w-6 h-6 rounded-full"
          ></motion.div>
        </div>
        {loadingError && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ type: "spring" }}
            className="absolute bottom-1/4"
          >
            <h3 className="text-white text-lg px-8 md:px-20 font-medium text-center">
              Loading takes more than expected, make sure your internet
              connection is working properly and valid ID is set.
            </h3>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default NotFound;
