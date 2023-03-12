import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const TrailerPopup = (props) => {
  const getTrailer = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/tv/trailer/${props.movieId}`
    );
    console.log(response.data);
    return response.data;
  };

  const { data: trailerMovie } = useQuery({
    queryKey: ["trailerMovie"],
    queryFn: getTrailer,
    refetchOnWindowFocus: false,
  });

  return (
    <div
      onClick={() => {
        props.setTrailerVisible(false);
      }}
      className="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black/90 z-[500] "
    >
      {trailerMovie && (
        <div className="w-full h-full">
          {trailerMovie.results.length === 0 ? (
            "No trailer found"
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <iframe
                className="w-full max-w-6xl aspect-video"
                src={`https://www.youtube.com/embed/${
                  trailerMovie.results[trailerMovie.results.length - 1].key
                }`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          )}
        </div>
      )}

      <button
        onClick={() => {
          props.setTrailerVisible(false);
        }}
      >
        <FontAwesomeIcon
          className="absolute top-4 right-4 p-2 text-2xl"
          icon={faClose}
        ></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default TrailerPopup;
