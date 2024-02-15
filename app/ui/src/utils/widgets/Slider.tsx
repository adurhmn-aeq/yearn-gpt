import React, { FC, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider, { Settings } from "react-slick";

// inorder to use this, you should undertand slick settings
// https://react-slick.neostack.com/docs/

const CarosalSlider: FC<{
  slickSettings: Settings;
  children: React.ReactNode;
}> = ({ slickSettings, children }) => {
  const [slider, setSlider] = useState<SlickSlider | null>(null);
  const numberOfChildren = React.Children.count(children);
  return (
    <div className="relative">
      <SlickSlider {...slickSettings} ref={(slider) => setSlider(slider)}>
        {children}
      </SlickSlider>
      {numberOfChildren > 1 && (
        <div
          onClick={() => slider && slider.slickPrev()}
          className="bg-[black] h-[30px] w-[30px] flex justify-center rounded-[50%] items-center absolute top-[50%] left-0 font-[600] cursor-pointer text-[#FFFFFF] translate-y-[-50%]"
        >
          &lt;
        </div>
      )}
      {numberOfChildren > 1 && (
        <div
          onClick={() => slider && slider.slickNext()}
          className="bg-[black] h-[30px] w-[30px] flex justify-center rounded-[50%] items-center absolute top-[50%] right-0 font-[600] cursor-pointer text-[#FFFFFF] translate-y-[-50%]"
        >
          &gt;
        </div>
      )}
    </div>
  );
};

// takes 100% width, use wrapper to control width
export default CarosalSlider;
