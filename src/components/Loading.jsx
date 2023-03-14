import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=" h-screen w-full  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  flex items-center justify-center z-40">
      <ScaleLoader color="#10b981" />
    </div>
  );
};

export default Loading;
