import React, { useRef } from "react";
import { useSessionAgent } from "../../../store";
import { SessionAgentMessage } from "./SessionAgentMessage";
import api from "../../../services/api";

export const SessionAgentChat = () => {
  const {
    messages,
    textToSpeechEnabled,
    defaultWebTextToSpeechLanguageType,
    sessionData,
    setMessages,
  } = useSessionAgent();
  const divRef = React.useRef<HTMLDivElement>(null);
  const isInitFetched = useRef(false);

  React.useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  React.useEffect(() => {
    if (!isInitFetched.current) {
      isInitFetched.current = true;
      (async () => {
        const response = await api.post("/agent/session/response", {
          isInitReq: true,
          response: "",
          session: sessionData.sessionId,
        });
        console.log({ data: response.data });
        setMessages([{ ...response.data.response, sources: [] }]);
      })();
    }
  }, []);

  console.log({ messages });

  return (
    <div className=" flex flex-col md:translate-x-0 transition-transform duration-300 ease-in-out">
      <div className="relative w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1">
          <div className="h-full ">
            <div className="">
              <div className="grow">
                {messages.length === 0 && (
                  <div>
                    {" "}
                    <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-400 dark:text-gray-600 flex gap-2 items-center justify-center h-screen">
                      Bilic Playground
                    </h1>
                  </div>
                )}
                {messages.map((message, index) => (
                  <SessionAgentMessage
                    key={index}
                    {...message}
                    textToSpeech={textToSpeechEnabled}
                    textToSpeechType={defaultWebTextToSpeechLanguageType}
                  />
                ))}
                <div className="w-full h-32 md:h-48 flex-shrink-0"></div>

                <div ref={divRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
