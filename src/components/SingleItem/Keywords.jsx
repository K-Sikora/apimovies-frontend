import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const Keywords = (props) => {
  return (
    <>
      <AnimatePresence>
        {props.isVisibleKeywords && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-4 flex-wrap  px-5"
          >
            {props.keyword.keywords &&
              props.keyword.keywords.map((k, index) => (
                <motion.button
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: index / 20 }}
                  key={index}
                  className="capitalize text-stone-100 text-sm bg-stone-800 px-2 hover:bg-stone-700 transition-[background-color] duration-150 py-[1px] rounded-md "
                >
                  {k.name}
                </motion.button>
              ))}
            {props.keyword.results &&
              props.keyword.results.map((k, index) => (
                <motion.button
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: index / 20 }}
                  key={index}
                  className="capitalize text-stone-100 text-sm bg-stone-800 px-2 hover:bg-stone-700 transition-[background-color] duration-150 py-[1px] rounded-md "
                >
                  {k.name}
                </motion.button>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex gap-2 flex-wrap px-5">
        {props.itemData.genres &&
          props.itemData.genres.map((item, index) => (
            <a
              href={`http://localhost:5173/${props.itemType}/category/${item.name}/1`}
            >
              <button
                key={index}
                className="border-[2px] text-stone-200 font-normal border-stone-600 hover:border-stone-500 duration-300 px-4 text-sm py-2 rounded-full"
              >
                {item.name}
              </button>
            </a>
          ))}
      </div>
      {props.itemData.overview && (
        <div className="px-5 font-[Roboto] pb-5">
          <p>{props.itemData.overview}</p>
        </div>
      )}
    </>
  );
};

export default Keywords;
