import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import React from "react";
const ItemDetails = (props) => {
  return (
    <>
      {props.itemData.vote_average > 0 && (
        <div className="flex items-center font-semibold gap-5 px-5">
          <CircularProgressbar
            styles={buildStyles({
              textSize: "26px",
              textColor: "white",
              trailColor: "#065f46",
              pathColor: `
              ${
                props.itemData.vote_average * 10 <= 30
                  ? `#ef4444`
                  : props.itemData.vote_average * 10 > 30 &&
                    props.itemData.vote_average * 10 <= 50
                  ? `#f97316`
                  : props.itemData.vote_average * 10 > 50 &&
                    props.itemData.vote_average * 10 <= 70
                  ? `#facc15`
                  : props.itemData.vote_average * 10 > 70 &&
                    props.itemData.vote_average * 10 <= 84
                  ? `#059669`
                  : `#10b981`
              }
              
              `,
            })}
            className="h-12 w-12 "
            value={props.itemData.vote_average * 10}
            text={`${props.itemData.vote_average.toFixed(1) * 10 + "%"}`}
          ></CircularProgressbar>
          {props.itemData.popularity && (
            <p className="flex gap-1 items-center">
              <FontAwesomeIcon
                className="text-emerald-400 text-xl"
                icon={faChartColumn}
              ></FontAwesomeIcon>
              {props.itemData.popularity.toFixed(2)}
            </p>
          )}
          <div>
            <button
              onClick={() => {
                props.setIsVisibleKeywords(!props.isVisibleKeywords);
              }}
              className="flex items-center text-sm font-medium gap-2 cursor-pointer"
            >
              Keywords <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;
