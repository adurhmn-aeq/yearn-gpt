import React, { FC, useRef, useEffect, useState } from "react";
import "./CustumSlider.css";

const CustomSlider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null); // Specify the type of the ref
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = container;

        // Check if the scroll is at the beginning
        setShowLeftButton(scrollLeft > 0);

        // Check if the scroll is at the end
        setShowRightButton(scrollLeft + clientWidth < scrollWidth);
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    // Check the initial scroll position when the component mounts
    const container = containerRef.current;

    if (container) {
      setShowRightButton(
        container.scrollLeft + container.clientWidth < container.scrollWidth
      );
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;

      if (container) {
        setShowRightButton(
          container.scrollLeft + container.clientWidth < container.scrollWidth
        );
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft -= 470;
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += 470;
    }
  };

  return (
    <div className="w-[100%] relative">
      {showLeftButton && (
        <div
          className="bg-[black] h-[30px] w-[30px] flex justify-center rounded-[50%] items-center absolute top-[50%] left-[-13px] font-[600] cursor-pointer text-[#FFFFFF] translate-y-[-50%] z-10"
          onClick={scrollLeft}
        >
          &lt;
        </div>
      )}
      {showRightButton && (
        <div
          className="bg-[black] h-[30px] w-[30px] flex justify-center rounded-[50%] items-center absolute top-[50%] right-[-13px] font-[600] cursor-pointer text-[#FFFFFF] translate-y-[-50%] z-10"
          onClick={scrollRight}
        >
          &gt;
        </div>
      )}

      <div
        id="custumslider"
        style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
        className="overflow-x-auto flex gap-[50px] px-[15px] py-[15px]"
        ref={containerRef}
      >
        {/* {children} */}

        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="scroll-section"
            style={{ scrollSnapAlign: "start" }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
