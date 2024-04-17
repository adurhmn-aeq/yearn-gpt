import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { ChevronRightIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Divider, Empty } from "antd";
import { sources } from "../../utils/sources";
import { getSessionLink } from "../../utils/agent";
import UtilityButton from "../../utils/widgets/UtilityButton";
import BotCard from "./BotCard";
import AgentCard from "./AgentCard";
import TestCard from "./TestCard";
import CarosalSlider from "../../utils/widgets/Slider";
import CustomSlider from "../../utils/widgets/CustomSlider";
import WelcomeSummaryCard from "./WelcomeSummaryCard";
import BotAgentCard from "./bot-agent-card";

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
    <div className="flex flex-col lg:flex-row gap-[35px] justify-center">
      <WelcomeSummaryCard />
      <BotAgentCard />
    </div>
  );
};
