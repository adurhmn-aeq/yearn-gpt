import React from "react";
import { DashboardGrid } from "../components/Dashboard/DashboardGrid";
import { DashboardNewBtn } from "../components/Dashboard/DashboardNewBtn";
import { useMessage } from "../hooks/useMessage";

export default function Root() {
  const { setMessages, setHistory, setIsFirstMessage, setHistoryId } =
    useMessage();

  React.useEffect(() => {
    setHistoryId(null);
    setIsFirstMessage(true);
    setMessages([]);
    setHistory([]);
  }, []);

  return (
    <div className="mx-auto py-4 px-[40px] sm:px-6 lg:px-[40px] flex flex-col gap-[50px]">
      {/* Create Bot Button */}
      <div className="flex flex-col gap-8">
        <div className="">
          <h2 className="text-[#343538] text-[39px] text-center">
            <span className="font-[500]">AI-Driven</span>{" "}
            <span className="font-[500] text-[#51DC00]">bots and agents</span>{" "}
            for{" "}
            <span className="font-[900]">
              FINANCE
              <br /> SECURITY
            </span>{" "}
            and{" "}
            <span className="font-[500] relative">
              compliance{" "}
              <img
                className="absolute right-0"
                src="/providers/compliance.svg"
                alt="img"
              />
            </span>
          </h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-[#34353899] font-[500] text-[16px]">
            Our AI driven agents are designed to enhance traditional finance
          </p>
          <p className="text-center text-[#34353899] font-[500] text-[16px]">
            compliance by providing advanced capabilities in tracking analyzing
            and investigating financial activities.
          </p>
        </div>
      </div>
      <DashboardGrid />
      {/* <DashboardNewBtn /> */}
    </div>
  );
}
