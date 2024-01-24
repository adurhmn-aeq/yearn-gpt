import { useMessage } from "../../../hooks/useMessage";
import { Skeleton } from "antd";
import { SessionAgentChat } from "./SessionAgentChat";
import { SessionAgentForm } from "./SessionAgentForm";

export const SessionAgentPlayground = () => {
  const { isLoading } = useMessage();
  return (
    <div className="relative">
      <div className="flex flex-col">
        <div className="flex-grow">
          {isLoading ? (
            <div className="flex p-12 items-center justify-center h-full">
              <Skeleton active paragraph={{ rows: 10 }} />
            </div>
          ) : (
            <div>
              <div>
                <SessionAgentChat />
              </div>
              <div>
                <div className="bottom-0 w-full bg-transparent border-0 fixed pt-2">
                  <div className="stretch mx-2 flex flex-row gap-3 md:mx-4 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                    <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
                      <SessionAgentForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
