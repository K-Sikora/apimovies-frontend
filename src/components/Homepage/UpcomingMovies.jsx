import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Loading from "../Loading";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import TrailerPopup from "./TrailerPopup";
const date = new Date();

const LatestTrailers = () => {
  const getUpcomingMovies = async () => {
    const response = await axios.get(
      "https://app-backend.adaptable.app/api/movie/upcoming"
    );

    return response.data.results;
  };

  const { data: upcomingMovies, isLoading } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
    refetchOnWindowFocus: false,
  });

  const [loading, setLoading] = useState(true);
  const [movieId, setMovieId] = useState();
  const [trailerVisible, setTrailerVisible] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-5 mb-14 dark:text-light text-dark-900">
      <h2 className=" text-xl md:text-2xl">
        <span className=" bg-emerald-500 mr-2 px-[2px] rounded-md"></span>
        New and upcoming movies
      </h2>
      <div className="relative">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          pagination
          navigation={true}
          breakpoints={{
            "@0.00": {
              slidesPerView: 3,
            },
            "@0.75": {
              slidesPerView: 4,
            },
            "@1.00": {
              slidesPerView: 5,
            },
            "@1.40": {
              slidesPerView: 6,
            },
            "@1.50": {
              slidesPerView: 7,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper upcoming h-[26rem] md:h-[24rem] py-6 lg:h-[24rem]   relative  "
        >
          {isLoading ? (
            <Loading />
          ) : (
            upcomingMovies?.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col relative justify-between p-1  "
              >
                <div className="relative flex items-center justify-center top-0 left-0">
                  <img
                    onLoad={() => {
                      setLoading(false);
                    }}
                    className=" h-60 shadow-lg shadow-dark-900/30 md:h-52 object-cover rounded-sm cursor-grab"
                    src={
                      item.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w500` + item.poster_path
                        : "/images/no-cover.png"
                    }
                  />
                  <div className="flex mt-2 absolute bottom-0 left-0 px-2 pointer-events-none dark:bg-stone-900/50 w-full text-sm font-medium  h-1/5 items-center">
                    {new Date(item.release_date) < date && (
                      <CircularProgressbar
                        styles={buildStyles({
                          textSize: "28px",
                          textColor: "white",
                          trailColor: "#065f46",
                          pathColor: `
                                ${
                                  item.vote_average * 10 <= 30
                                    ? `#ef4444`
                                    : item.vote_average * 10 > 30 &&
                                      item.vote_average * 10 <= 50
                                    ? `#f97316`
                                    : item.vote_average * 10 > 50 &&
                                      item.vote_average * 10 < 70
                                    ? `#facc15`
                                    : item.vote_average * 10 >= 70 &&
                                      item.vote_average * 10 <= 84
                                    ? `#059669`
                                    : `#10b981`
                                }
                                
                                `,
                        })}
                        className="h-10 w-10 bg-stone-800 translate-x-1 -translate-y-1 rounded-full font-semibold "
                        value={item.vote_average * 10}
                        text={`${item.vote_average.toFixed(1) * 10 + "%"}`}
                      ></CircularProgressbar>
                    )}

                    {new Date(item.release_date) > date
                      ? `${item.release_date}`
                      : null}
                  </div>
                  {loading && (
                    <div className="absolute top-0 items-center  justify-center left-0 w-full h-full flex  ">
                      <ScaleLoader color="#10b981" />
                    </div>
                  )}
                </div>
                <h3 className="pointer-events-none  text-sm line-clamp ">
                  {item.title}
                </h3>

                <div className="flex flex-col gap-2">
                  <a href={`/movie/${item.id}`}>
                    <button className="h-[30px] w-full px-1 bg-dark-700 hover:bg-stone-600 text-light duration-300 rounded-md text-sm font-medium">
                      See details
                    </button>
                  </a>
                  <button
                    onClick={() => {
                      setMovieId(item.id);
                      setTrailerVisible(true);
                    }}
                    className="h-[30px] group flex items-center justify-center gap-1.5 text-light px-1 bg-stone-800 rounded-md text-sm font-medium"
                  >
                    <FontAwesomeIcon
                      className="text-xs group-hover:text-emerald-500 duration-300 "
                      icon={faPlay}
                    ></FontAwesomeIcon>
                    Trailer
                  </button>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
      {trailerVisible && (
        <TrailerPopup
          trailerVisible={trailerVisible}
          setTrailerVisible={setTrailerVisible}
          movieId={movieId}
        />
      )}
    </div>
  );
};

export default LatestTrailers;
