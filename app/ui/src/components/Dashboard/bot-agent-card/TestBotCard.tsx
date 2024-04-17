import React from "react";

const TestBotCard = () => {
  return (
    <div className="flex gap-[10px] items-center px-[25px] py-[18px] cursor-pointer hover:bg-[#1967FC1A]">
      <img className="w-[50px]" src="/providers/botImg.svg" alt="img" />
      <div className="flex gap-[7px] items-center">
        <h2 className="font-[600] text-[24px] text-[#343538]">James</h2>
        <p className="font-[500] text-[14px] text-[#34353880]">GPT 3.5 Turbo</p>
      </div>
    </div>
  );
};

export default TestBotCard;
