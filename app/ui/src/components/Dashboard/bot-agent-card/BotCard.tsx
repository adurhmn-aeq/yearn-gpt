import React, { FC } from "react";

const BotCard: FC<{ bot?: any }> = ({ bot }) => {
  return (
    <div className="flex gap-[10px] items-center px-[25px] py-[18px] cursor-pointer hover:bg-[#1967FC1A]">
      <img className="w-[50px]" src="/providers/botImg.svg" alt="img" />
      <div className="flex gap-[7px] items-center">
        <h2 className="font-[600] text-[24px] text-[#343538]">
          {bot.name.length > 7 ? bot.name.slice(0, 7) + "..." : bot.name}
        </h2>
        <p className="font-[500] text-[14px] text-[#34353880]">
          {" "}
          {bot.model.replace("-dbase", "")}
        </p>
      </div>
    </div>
  );
};

export default BotCard;
