import { Spin, Select } from "antd";
import { Dispatch, SetStateAction } from "react";

type Props = {
  sessionId: string;
  setSessionId: Dispatch<SetStateAction<string>>;
  sessionData: {
    agent_id: string;
    createdAt: string;
    email: string;
    id: string;
    messages: {
      createdAt: string;
      id: string;
      isBot: boolean;
      message: string;
    }[];
    name: string;
    phone: string;
    user_id: number;
  } | null; // Define sessionData as nullable
  agentData: {
    createdAt: string;
    disabled: boolean;
    id: string;
    initMsg: string;
    model: string;
    name: string;
    prompt: string;
    sessions: {
      id: string;
      createdAt: string;
      email: string;
      name: string;
    }[];
    temperature: number;
    user_id: number;
  };
};

export default function AgentSessionsMobile({
  sessionId,
  setSessionId,
  agentData,
  sessionData,
}: Props) {
  const { messages: sessionMessage, name: agentName } = sessionData
    ? sessionData
    : ({} as any);
  const { name: botName, model, sessions } = agentData;

  const sessionsOption = sessions?.map((s) => ({
    value: s.id,
    label: (
      <span>
        <span className="text-sm font-medium text-[#343538] pr-2">
          {s.name}
        </span>
        <span className="text-xs text-[#343538] opacity-50">{s.email}</span>
      </span>
    ),
  }));

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full max-w-[400px] mx-auto">
      <div className="flex items-center w-full justify-start sm:justify-center px-4 pt-2">
        <img src="/providers/botImg.svg" alt="" />
        <div className="flex flex-col">
          <p className="text-xl sm:text-3xl font-semibold">{botName}</p>
          <p className="opacity-70 font-medium">{model}</p>
        </div>
      </div>
      {/* Select */}
      <div className="flex flex-col w-full gap-2 px-2">
        <span className="font-medium text-gray-800 text-xs sm:text-sm md:text-base dark:text-gray-200">
          Sessions
        </span>
        {sessionsOption && sessionId ? (
          <Select
            showSearch
            defaultValue={sessionId}
            placeholder="Select a chat model"
            onChange={(e) => setSessionId(e)}
            options={sessionsOption}
          />
        ) : (
          <span className="my-auto self-center">
            <Spin size="small" />
          </span>
        )}
      </div>
      {/* Messages*/}
      <div className="flex flex-col w-full bg-[#F9F9F899] gap-4 p-4 overflow-y-auto">
        {sessionMessage ? (
          sessionMessage.map(({ id, isBot, message }: any) => (
            <div
              key={id}
              className={[isBot ? "text-left" : "text-right", "text-xs"].join(
                " "
              )}
            >
              <p
                className={[
                  !isBot ? "text-[#51DC00]" : "text-[#343538]",
                  "mb-2",
                ].join(" ")}
              >
                {isBot ? botName : agentName}
              </p>
              <p className="text-[#343538]">{message}</p>
            </div>
          ))
        ) : (
          <span className="my-auto self-center">
            <Spin size="small" />
          </span>
        )}
      </div>
    </div>
  );
}
