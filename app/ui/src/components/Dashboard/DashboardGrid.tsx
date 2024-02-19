import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { ChevronRightIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Divider, Empty } from "antd";
import { sources } from "../../utils/sources";
import { getSessionLink } from "../../utils/agent";
import BotAgentCard from "./BotCard";
import UtilityButton from "../../utils/widgets/UtilityButton";
import BotCard from "./BotCard";
import AgentCard from "./AgentCard";
import TestCard from "./TestCard";
import CarosalSlider from "../../utils/widgets/Slider";
import CustomSlider from "../../utils/widgets/CustomSlider";

const slickSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 350,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const DashboardGrid = () => {
  // const { data, status } = useQuery(["getAllBots"], async () => {
  //   const response = await api.get("/bot");
  //   return response.data;
  // });
  const { data, status } = useQuery(["getAllBotsAndAgents"], async () => {
    const response = await api.get("/agent/with-bots");
    return response.data;
  });
  const botsCount = data && data.filter(({ bot }: any) => bot);
  const agentCount = data && data.filter(({ agent }: any) => agent);

  return (
    <div className="flex flex-col gap-[40px]">
      {status === "loading" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* create skelon loadinf */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              className="flex animate-pulse h-28 px-3 py-4 bg-gray-400 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer"
              key={item}
            ></div>
          ))}
        </div>
      ) : status === "error" ? (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Something went wrong
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-5 justify-between">
              <h2 className="text-[#34353899] font-[600] text-[18px]">
                My Bots
              </h2>
              <Link to={"/new/bot"}>
                <UtilityButton>Create Bot</UtilityButton>
              </Link>
            </div>
            <div className=" flex gap-[50px] flex-wrap w-full">
              {/* <div className=" flex gap-[50px] w-full overflow-x-auto "> */}
              {status === "success" && botsCount.length > 0 && (
                <>
                  <CustomSlider>
                    {botsCount?.map(({ bot }: any, i: any) => {
                      return bot ? (
                        <Link to={`/bot/${bot.id}`} key={bot.id}>
                          <BotCard bot={bot} />
                        </Link>
                      ) : null;
                    })}
                  </CustomSlider>
                </>
              )}
              {status === "success" && botsCount.length === 0 && (
                <div className="flex justify-center items-center w-[100%]">
                  <Empty description="No bots created yet" />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-5 justify-between">
              <h2 className="text-[#34353899] font-[600] text-[18px]">
                My Agents
              </h2>
              <Link to={"/new/agent"}>
                <UtilityButton>Create Agent</UtilityButton>
              </Link>
            </div>
            <div className=" flex gap-[50px] flex-wrap">
              {status === "success" && agentCount.length > 0 && (
                <>
                  <CustomSlider>
                    {agentCount?.map(({ agent }: any, i: any) => {
                      return agent ? (
                        <Link to={`/agent/${agent.id}`} key={agent.id}>
                          <AgentCard key={i} agent={agent} />
                        </Link>
                      ) : null;
                    })}
                  </CustomSlider>
                </>
              )}
              {status === "success" && agentCount.length === 0 && (
                <div className="flex justify-center items-center w-[100%]">
                  <Empty description="No Agents created yet" />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
