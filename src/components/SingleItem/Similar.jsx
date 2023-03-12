import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { ScaleLoader } from "react-spinners";
import LazyLoad from "react-lazyload";

import { Link } from "react-router-dom";

import "react-circular-progressbar/dist/styles.css";

const Similar = (props) => {
  const [loading, setLoading] = useState(true);
  return (
    <LazyLoad>
      {props.similar && (
        <div className="px-5 flex flex-col gap-6 ">
          <h3 className="text-2xl text-stone-100">
            {props.itemType === "movie"
              ? "See similar movies"
              : "See similar shows"}
          </h3>
          <div className="flex scrollbar overflow-x-auto overflow-y-hidden gap-4 h-96 ">
            {props.similar.results &&
              props.similar.results.slice(0, 14).map(
                (similarItem, index) =>
                  similarItem.backdrop_path && (
                    <div
                      key={index}
                      className="flex  flex-shrink-0 relative  w-40 items-end "
                    >
                      <div className="absolute top-0 left-0 ">
                        <a href={`/${props.itemType}/${similarItem.id}`}>
                          <div className="relative h-full w-full  ">
                            <img
                              onLoad={() => {
                                setLoading(false);
                              }}
                              className="rounded-md h-64 w-40 object-cover "
                              src={
                                `https://image.tmdb.org/t/p/w300` +
                                similarItem.poster_path
                              }
                              alt="background photo"
                            />
                            {similarItem.vote_average === null ||
                            similarItem.vote_average === 0 ? (
                              ""
                            ) : (
                              <div className="absolute bottom-2 left-2">
                                <CircularProgressbar
                                  styles={buildStyles({
                                    textSize: "28px",
                                    textColor: "white",
                                    trailColor: "#065f46",
                                    pathColor: `
                                  ${
                                    similarItem.vote_average * 10 <= 30
                                      ? `#ef4444`
                                      : similarItem.vote_average * 10 > 30 &&
                                        similarItem.vote_average * 10 <= 50
                                      ? `#f97316`
                                      : similarItem.vote_average * 10 > 50 &&
                                        similarItem.vote_average * 10 < 70
                                      ? `#facc15`
                                      : similarItem.vote_average * 10 >= 70 &&
                                        similarItem.vote_average * 10 <= 84
                                      ? `#059669`
                                      : `#10b981`
                                  }
                                  
                                  `,
                                  })}
                                  className="h-10 w-10 bg-stone-800 rounded-full font-semibold "
                                  value={similarItem.vote_average * 10}
                                  text={`${
                                    similarItem.vote_average.toFixed(1) * 10 +
                                    "%"
                                  }`}
                                ></CircularProgressbar>
                              </div>
                            )}
                            {loading && (
                              <div className="absolute top-0 items-center  justify-center left-0 w-full h-full flex  ">
                                <ScaleLoader color="#10b981" />
                              </div>
                            )}
                          </div>
                        </a>
                        <h5 className="mt-2 font-medium line-clamp text-sm text-stone-100">
                          {similarItem.name || similarItem.title}
                        </h5>
                        <h6 className="mt-2 font-medium text-base  text-stone-300">
                          {(similarItem.release_date &&
                            similarItem.release_date.slice(0, 4)) ||
                            (similarItem.first_air_date &&
                              similarItem.first_air_date.slice(0, 4))}
                        </h6>
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
      )}
    </LazyLoad>
  );
};

export default Similar;
