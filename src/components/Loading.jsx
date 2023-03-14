import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="  w-full h-full absolute top-0 left-0   flex items-center justify-center z-40">
      <ClipLoader color="#10b981" />
    </div>
  );
};

export default Loading;
