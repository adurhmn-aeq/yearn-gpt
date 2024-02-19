import { Spin } from "antd";
import { Dispatch, SetStateAction } from "react";

type Props = {
  sessions: { id: string; name: string; email: string }[];
  sessionId: string;
  sessionMessage:
    | { id: string; message: string; isBot: boolean; createdAt: number }[]
    | undefined;
  setSessionId: Dispatch<SetStateAction<string>>;
  agentName: string;
  botName: string;
};

export default function AgentSessions({
  sessions,
  sessionId,
  sessionMessage,
  setSessionId,
  agentName,
  botName,
}: Props) {
  return (
    <>
      <div className="flex max-h-full">
        <div className="flex flex-col shadow-lg">
          <h1 className="text-lg font-semibold pl-6 my-4">Sessions</h1>
          <div className="flex flex-col bg-white px-4 w-[260px] dark:bg-black dark:border-gray-800 overflow-y-auto">
            {sessions.length > 0 ? (
              sessions.map(({ id, name, email }) => (
                <div
                  key={id}
                  className={[
                    sessionId === id ? "text-[#51DC00]" : "text-[#343538]",
                    "flex gap-2 flex-col px-2 py-4 border-b-2 border-[#F0F0F04D] hover:bg-[#F0F0F04D] hover:shadow-xl justify-between hover:cursor-pointer",
                  ].join(" ")}
                  onClick={() => {
                    setSessionId(id);
                  }}
                >
                  <p className="font-semibold text-sm">{name}</p>
                  <p className="opacity-80 text-xs">{email}</p>
                </div>
              ))
            ) : (
              <p className="text-[#343538] px-2 py-4">No sessions available</p>
            )}
          </div>
        </div>
        {/* Messages */}
        <div className="flex flex-col w-[400px] bg-[#F9F9F899] gap-4 p-4 overflow-y-auto">
          {sessionMessage ? (
            sessionMessage.map(({ id, isBot, message }) => (
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
    </>
  );
}
