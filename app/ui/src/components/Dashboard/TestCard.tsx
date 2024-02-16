import React, { FC } from "react";

const TestCard: FC<{ val?: any }> = ({ val }) => {
  return (
    <div className="group  cursor-pointer bg-[rgba(255, 255, 255, 0.2)] h-[200px]  p-[7px] rounded-[18px] shadow-[0px_4px_10px_0px_#00000029,10px_10px_30px_0px_#00000005_inset] border-4 border-solid border-[#FFFFFF] hover:scale-110 transform transition-transform w-[155px]">
      <div className=" h-[100%] rounded-[18px] flex flex-col justify-center items-center gap-2">
        <img src="/providers/botImg.svg" alt="" />
        <h2 className="text-[20px] group-hover:text-[#51DC00] font-[600] text-[#343538]">
          Test
        </h2>
        <p className="text-[#34353880] font-[500] text-[14px]">{val}</p>
      </div>
    </div>
  );
};

export default TestCard;
