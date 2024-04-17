import React from "react";

const LoaderCard = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          className="flex animate-pulse h-[86px] px-3 py-4 bg-gray-400 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer mb-[10px]"
          key={item}
        ></div>
      ))}
    </>
  );
};

export default LoaderCard;
