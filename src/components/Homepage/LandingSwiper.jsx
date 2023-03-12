import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import "swiper/css";
const LandingSwiper = (props) => {
  const handleSwiperInit = (swiper) => {
    swiper.autoplay.start();

    setInterval(() => {
      if (swiper.params) {
        swiper.slideNext();
      }
    }, 6000);
  };

  const [loading, setLoading] = useState(true);

  return (
    <Swiper
      onInit={(swiper) => handleSwiperInit(swiper)}
      draggable={false}
      navigation={true}
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 6000,
        disableOnInteraction: true,
      }}
      loop={true}
      effect="fade"
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      className="mySwiper shadow-lg shadow-stone-700/10 h-5/6  bg-neutral-900 relative"
    >
      {props.trendingWeek &&
        props.trendingWeek
          .filter((item) => item.popularity > 1000)
          .map((item, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full relative group">
                <img
                  onLoad={() => setLoading(false)}
                  className="h-full w-full  object-cover top-0 left-0"
                  src={`https://image.tmdb.org/t/p/w1280` + item.backdrop_path}
                  alt="cover image"
                />
                <a href={`/${item.media_type}/${item.id}`}>
                  <div className="absolute top-0 left-0 bg-black/50 w-full h-full z-50  hover:bg-black/20 duration-300 cursor-pointer "></div>
                  <div className="absolute w-full left-0  bottom-[10%] gap-3 flex  pointer-events-none z-[100]">
                    <div className="w-10% ">
                      <div className=" h-40 w-24 ">
                        <img
                          className="w-full h-full"
                          src={
                            `https://image.tmdb.org/t/p/w200` + item.poster_path
                          }
                          alt="poster image"
                        />
                      </div>
                    </div>
                    <div className="flex w-90% justify-evenly flex-col ">
                      <h3 className="text-white text-xl font-medium font-[Roboto]">
                        {item.title || item.name}
                      </h3>
                      <FontAwesomeIcon
                        className=" self-start text-white border-2 duration-500 group-hover:border-emerald-500 rounded-full w-4 h-4 p-2 "
                        icon={faPlay}
                      ></FontAwesomeIcon>
                      <div className="flex items-center gap-2  ">
                        <FontAwesomeIcon
                          className=" text-emerald-500 text-lg"
                          icon={faStar}
                        ></FontAwesomeIcon>
                        <h4 className="text-white text-lg font-medium font-[Roboto]">
                          {item.vote_average.toFixed(1)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </a>
                {loading && (
                  <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center z-50">
                    <ScaleLoader color="#10b981" />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default LandingSwiper;
