import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import "swiper/css";
import "swiper/css/pagination";
import Loading from "../Loading";
import { Navigation, Pagination } from "swiper";
import TrailerPopup from "./TrailerPopup";
const BestPicks = () => {
  const getBestMovies = async () => {
    const response = await axios.get(
      "https://apimovies-backend.onrender.com/api/bestmovies"
    );

    return response.data.results;
  };

  const { data: bestMovies, isLoading } = useQuery({
    queryKey: ["bestMovies"],
    queryFn: getBestMovies,
    refetchOnWindowFocus: false,
  });

  const [loading, setLoading] = useState(true);
  const [movieId, setMovieId] = useState();
  const [trailerVisible, setTrailerVisible] = useState(false);

  return (
    <>
      <div className="max-w-6xl mx-auto px-5 dark:text-light text-dark-900 mb-14">
        <h2 className=" text-2xl">
          <span className=" bg-emerald-500 mr-2 px-[2px] rounded-md"></span>
          Best movies
        </h2>
        <div className="relative">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            pagination
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
            className="mySwiper upcoming h-[26rem] md:h-[24rem] py-6 lg:h-[24rem]  relative  "
          >
            {isLoading ? (
              <Loading />
            ) : (
              bestMovies
                ?.filter((item) => item.vote_count > 1000)
                .map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex flex-col relative justify-between p-1  "
                  >
                    <div className="relative flex items-center justify-center top-0 left-0">
                      <img
                        onLoad={() => {
                          setLoading(false);
                        }}
                        className=" h-60 md:h-52 shadow-lg shadow-dark-900/30 object-cover rounded-sm cursor-grab"
                        src={
                          item.poster_path !== null
                            ? `https://image.tmdb.org/t/p/w500` +
                              item.poster_path
                            : "/images/no-cover.png"
                        }
                      />
                      <div className="flex mt-2 absolute bottom-0 left-0 px-2 dark:bg-stone-900/50 w-full text-sm font-medium pointer-events-none  h-1/5 items-center">
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
                          className="h-10 w-10 translate-x-1 -translate-y-1 bg-stone-800 rounded-full font-semibold "
                          value={item.vote_average * 10}
                          text={`${item.vote_average.toFixed(1) * 10 + "%"}`}
                        ></CircularProgressbar>
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
                        <button className="h-[30px] w-full px-1 text-light  bg-dark-700 hover:bg-stone-600 duration-300 rounded-md text-sm font-medium">
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
    </>
  );
};

export default BestPicks;
