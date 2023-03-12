import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCircle,
  faListNumeric,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const ItemInfo = (props) => {
  return (
    <div className="px-5 flex flex-col gap-4">
      <h2 className=" text-2xl md:text-4xl">
        {props.itemData.name || props.itemData.title}
      </h2>
      <span className=" flex items-center gap-2">
        <p className="text-base md:text-lg text-stone-300">
          {props.itemData.release_date &&
            props.itemData.release_date.slice(0, 4)}
          {props.itemData.first_air_date &&
            props.itemData.first_air_date.slice(0, 4)}
        </p>
        <FontAwesomeIcon
          className="text-[6px] text-stone-200"
          icon={faCircle}
        ></FontAwesomeIcon>
        {props.itemData.runtime && (
          <p className="flex gap-1 text-sm md:text-base  items-center text-stone-300">
            <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
            {props.itemData.runtime}m
          </p>
        )}
        {props.itemData.number_of_seasons && (
          <h5
            onMouseOverCapture={() => {
              props.setEpisodesVisible(true);
            }}
            onMouseLeave={() => {
              props.setEpisodesVisible(false);
            }}
            className="flex gap-1 text-sm items-center relative cursor-default text-stone-300"
          >
            {props.itemData.number_of_seasons === 1
              ? props.itemData.number_of_seasons + " Season"
              : props.itemData.number_of_seasons + " Seasons"}
            <FontAwesomeIcon
              className="text-white"
              icon={faListNumeric}
            ></FontAwesomeIcon>
            <AnimatePresence>
              {props.episodesVisible && (
                <motion.span
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 z-[61] text-sm flex flex-col left-full text-left mx-2 rounded-md bg-black/50 gap-1 min-w-max py-2 px-3"
                >
                  {props.itemData.seasons.map((season, index) => (
                    <p key={index}>
                      Season {index + 1}:{" "}
                      <span className="text-stone-200">
                        {season.episode_count} episodes
                      </span>
                    </p>
                  ))}
                </motion.span>
              )}
            </AnimatePresence>
          </h5>
        )}
      </span>
    </div>
  );
};

export default ItemInfo;
