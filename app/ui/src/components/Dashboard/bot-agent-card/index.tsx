import AddButtonIcon from "../../../assets/dashboard/AddButtonIcon";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { Empty } from "antd";
import BotCard from "./BotCard";
import LoaderCard from "./LoaderCard";
import ErrorCard from "./ErrorCard";
import TestBotCard from "./TestBotCard";

const BotAgentCard = () => {
  const { data, status } = useQuery(["getAllBotsAndAgents"], async () => {
    const response = await api.get("/agent/with-bots");
    return response.data;
  });
  const botsCount = data && data.filter(({ bot }: any) => bot);
  const agentCount = data && data.filter(({ agent }: any) => agent);

  return (
    <div className="w-[100%] lg:w-[50%] lg:h-[617px] rounded-[20px] px-[0px] py-[30px] border border-[#E6E6E6] shadow-lg bg-[white]">
      <div className="flex flex-col w-full h-full gap-[10px]">
        <div className="flex justify-between px-[25px]">
          <h2 className="font-[600] text-[20px] text-[#282828]">My Bots</h2>
          <div className="cursor-pointer">
            <Link to={"/new/bot"}>
              <AddButtonIcon />
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-auto max-h-[617px] flex flex-col gap-[10px]">
          {status === "loading" ? (
            <LoaderCard />
          ) : status === "error" ? (
            <ErrorCard />
          ) : (
            <>
              {status === "success" && botsCount.length > 0 && (
                <>
                  {botsCount?.map(({ bot }: any, i: any) => {
                    return bot ? (
                      <Link to={`/bot/${bot.id}`} key={bot.id}>
                        <BotCard bot={bot} />
                      </Link>
                    ) : null;
                  })}
                </>
              )}

              {status === "success" && botsCount.length === 0 && (
                <div className="flex justify-center items-center w-full h-full">
                  <Empty description="No bots created yet" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotAgentCard;
