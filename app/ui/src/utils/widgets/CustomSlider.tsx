import React, { FC } from "react";

const CustomSlider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // <div className="relative overflow-x-hidden px-[20px]">
    //   <div className="bg-[black] h-[30px] w-[30px] flex justify-center rounded-[50%] items-center absolute top-[50%] left-[-13px] font-[600] cursor-pointer text-[#FFFFFF] translate-y-[-50%]">
    //     &lt;
    //   </div>
    //   <div className="bg-[black] h-[30px] w-[30px] flex justify-center rounded-[50%] items-center absolute top-[50%] right-[-13px] font-[600] cursor-pointer text-[#FFFFFF] translate-y-[-50%]">
    //     &gt;
    //   </div>

    <div className="overflow-x-auto">
      <div className="flex gap-[50px] py-[15px] px-[10px]">{children}</div>
    </div>
    // </div>
  );
};

export default CustomSlider;
