import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  flex items-center justify-center">
      <ScaleLoader color="#10b981" />
    </div>
  );
};

export default Loading;
