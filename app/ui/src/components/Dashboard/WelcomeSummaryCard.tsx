import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import messageImg from "../../assets/dashboard/message.svg";
import NotificationImg from "../../assets/dashboard/notification.svg";
import Blink from "../../assets/dashboard/blinkStar.svg";
import welcomeBot from "../../assets/dashboard/welcomeBot.svg";
import { useAuth } from "../../context/AuthContext";
import { Plan } from "../../utils/pricing";

const WelcomeSummaryCard = () => {
  const { profile } = useAuth();

  const {
    data: planData,
    isLoading,
    isSuccess,
  } = useQuery(
    ["fetchUsage"],
    async () => {
      const response = await api.get("/stripe/usage");
      return response.data as {
        active_plan: string;
        message_credits_total: number;
        message_credits_used: number;
      };
    },
    { refetchInterval: 10000 }
  );

  const { data, status } = useQuery(["getAllBotsAndAgents"], async () => {
    const response = await api.get("/agent/with-bots");
    return response.data;
  });
  const botsCount = data && data.filter(({ bot }: any) => bot);

  console.log("planData", planData?.active_plan);

  return (
    <div className="w-[100%] lg:w-[50%] lg:h-[617px] bg-[#AAD1FF] rounded-[20px] px-[25px] py-[30px] flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[10px]">
        <h2 className="font-[400] text-[24px] text-[#282828]">Hello,</h2>
        <h2 className="font-[600] text-[32px]">{profile?.username}!</h2>
        <p className="font-[500] text-[14px] text-[#282828]">
          Here’s is your review summary.
        </p>
      </div>
      <div className="flex flex-col gap-[30px]">
        <div className="flex gap-[20px]">
          <div
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            className="w-[44px] h-[49px] bg-[#824AED] flex justify-center items-center"
          >
            <img src={messageImg} alt="img" />
          </div>
          <div>
            <p className="font-[500] text-[14px] text-[#2828287D]">
              Bots Created
            </p>
            <h2 className="font-[700] text-[20px] text-[#282828]">
              {botsCount?.length ?? 0}
            </h2>
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
            className="w-[44px] h-[49px] bg-[#3AAFE4] flex justify-center items-center"
          >
            <img src={NotificationImg} alt="img" />
          </div>
          <div>
            <p className="font-[500] text-[14px] text-[#2828287D]">
              Bots Remaining
            </p>
            <h2 className="font-[700] text-[20px] text-[#282828]">
              {planData?.active_plan && botsCount
                ? Plan.bots[planData?.active_plan as keyof typeof Plan.bots] -
                  botsCount?.length
                : 0}
            </h2>
          </div>
        </div>
        <div className="flex justify-end">
          <img src={Blink} alt="img" />
          <img className="w-[81%] max-w-[250px]" src={welcomeBot} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeSummaryCard;
