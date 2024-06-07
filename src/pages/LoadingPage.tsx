import React from "react";
import CircleLoader from "react-spinners/CircleLoader";
const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center mt-40 mx-auto w-full">
      <CircleLoader
        color={"#002B5D"}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingPage;
