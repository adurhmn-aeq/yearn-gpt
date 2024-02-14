import React, { FC } from "react";

const BotCard: FC<{ bot?: any }> = ({ bot }) => {
  return (
    <div className="group min-w-[150px] cursor-pointer bg-[rgba(255, 255, 255, 0.2)] h-[200px]  p-[7px] rounded-[18px] shadow-[0px_4px_10px_0px_#00000029,10px_10px_30px_0px_#00000005_inset] border-4 border-solid border-[#FFFFFF] hover:scale-125 transform transition-transform">
      <div className=" h-[100%] rounded-[18px] flex flex-col justify-center items-center gap-2">
        <img src="/providers/botImg.svg" alt="" />
        <h2 className="text-[20px] group-hover:text-[#51DC00] font-[600] text-[#343538]">
          {bot.name.length > 7 ? bot.name.slice(0, 7) + "..." : bot.name}
        </h2>
        <p className="text-[#34353880] font-[500] text-[14px]">
          {bot.model.replace("-dbase", "")}
        </p>
      </div>
    </div>
  );
};

export default BotCard;
