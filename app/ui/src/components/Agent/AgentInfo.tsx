import dateFormat from "dateformat";

type Props = {
  info: {
    name: string;
    id: string;
    user_id: number;
    initMsg: string;
    prompt: string;
    createdAt: string;
    model: string;
  };
};

export default function AgentInfo({ info }: Props) {
  return (
    <>
      {/* <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        
      </div> */}
      <div className="flex flex-col gap-3 p-4 min-w-[300px] text-sm">
        <div className="flex items-center pl-5">
          <img src="/providers/botImg.svg" alt="" />
          <div className="flex flex-col">
            <p>{info.name}</p>
            <p className="opacity-70">{info.model}</p>
          </div>
        </div>
        {/* <h1 className="text-lg font-bold ml-3">Agent Information</h1> */}
        <div className="bg-white sm:rounded-lg px-4 dark:bg-black">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <div className="text-sm opacity-70">Initiation Message:</div>
              {info.initMsg}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm opacity-70">Agent Prompt:</div>
              {info.prompt}
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm opacity-70">Created At:</div>
              {dateFormat(info.createdAt, "dddd, mmmm dS, yyyy, h:MM TT")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
