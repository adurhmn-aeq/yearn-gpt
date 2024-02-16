import { useState, useEffect } from "react";

// Define your breakpoints based on Tailwind CSS configuration
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const useBreakpoint = ({ breakpoint }: { breakpoint: string }) => {
  // State to hold the current window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    function updateWidth() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Function to check if the current window width matches the specified breakpoint
  const isBreakpoint = () => {
    switch (breakpoint) {
      case "sm":
        return windowWidth >= BREAKPOINTS.sm;
      case "md":
        return windowWidth >= BREAKPOINTS.md;
      case "lg":
        return windowWidth >= BREAKPOINTS.lg;
      case "xl":
        return windowWidth >= BREAKPOINTS.xl;
      default:
        return false;
    }
  };

  return isBreakpoint();
};

export default useBreakpoint;
