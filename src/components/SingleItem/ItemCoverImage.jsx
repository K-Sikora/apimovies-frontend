import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import TrailerPopup from "../Homepage/TrailerPopup";
import TrailerTvPopup from "../Homepage/TrailerTvPopup";
const ItemCoverImage = (props) => {
  const [trailerVisible, setTrailerVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  return (
    <>
      <div className=" h-[60vh] relative md:mx-5 shadow-lg shadow-stone-700/30 group ">
        <img
          onLoad={() => {
            setLoading(false);
          }}
          className="w-full h-full object-cover"
          src={
            `https://image.tmdb.org/t/p/w1280` + props.itemData.backdrop_path
          }
          alt="cover image"
        />
        <div className="absolute left-2 bottom-2 h-40  z-[60] ">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w300` + props.itemData.poster_path}
          />
        </div>
        <div
          onClick={() => {
            setTrailerVisible(true);
          }}
          className="absolute flex items-center group justify-center top-0 left-0 h-full w-full  cursor-pointer duration-300 bg-black/30  hover:bg-black/50"
        ></div>
        {loading && (
          <div className="absolute top-0 items-center  justify-center left-0 w-full h-full flex  ">
            <ScaleLoader color="#10b981" />
          </div>
        )}
        <div className="top-1/2 flex items-center justify-center gap-2 left-1/2 absolute pointer-events-none -translate-y-1/2 -translate-x-1/2">
          <div className="border-[3px] h-12  w-12 rounded-full flex items-center justify-center  group-hover:border-emerald-600 group-hover:text-emerald-200 ease-linear duration-200 cursor-pointer pointer-events-none">
            <FontAwesomeIcon
              className="text-lg "
              icon={faPlay}
            ></FontAwesomeIcon>
          </div>
          <h4 className="text-lg font-medium ">Play trailer</h4>
        </div>
      </div>
      {trailerVisible && props.itemType === "tv" && (
        <TrailerTvPopup
          trailerVisible={trailerVisible}
          setTrailerVisible={setTrailerVisible}
          movieId={props.id}
        />
      )}
      {trailerVisible && props.itemType === "movie" && (
        <TrailerPopup
          trailerVisible={trailerVisible}
          setTrailerVisible={setTrailerVisible}
          movieId={props.id}
        />
      )}
    </>
  );
};

export default ItemCoverImage;
