import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import { Spin } from "antd";

const MessageCreditsUsage = ({
  used,
  remaining,
}: {
  used: number;
  remaining: number;
}) => {
  return (
    <div className="divide-y divide-zinc-400 rounded-lg bg-zinc-100 shadow-sm ">
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <h2 className="text-2xl font-semibold leading-6 text-black">
            Message Credits
          </h2>
          <div className="flex flex-col gap-2 py-4 items-center justify-center">
            <div className="flex gap-2 items-center">
              <h4 className="text-zinc-700 font-bold text-2xl">{used}</h4>
              <h6 className="text-zinc-600 font-bold text-md">Used</h6>
            </div>
            <div className="flex gap-2 items-center">
              <h4 className="text-zinc-700 font-bold text-2xl">{remaining}</h4>
              <h6 className="text-zinc-600 font-bold text-md">Remaining</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Usage() {
  const { data, isLoading } = useQuery(
    ["fetchUsage"],
    async () => {
      const response = await api.get("/stripe/usage");
      return response.data as {
        active_plan: string;
        message_credits_used: number;
        message_credits_total: number;
      };
    },
    { refetchInterval: 10000 }
  );

  console.log({ data });

  return (
    <div className="flex min-h-screen bg-white dark:bg-secondary-500 px-6 gap-10 flex-col items-center">
      <div></div>
      <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
        Usage Metrics
      </h1>
      {isLoading ? (
        <>
          <Spin />
        </>
      ) : (
        <div className="flex gap-8 flex-wrap py-12 items-center justify-center">
          <MessageCreditsUsage
            used={data!.message_credits_used!}
            remaining={data!.message_credits_remaining!}
          />
          <p>More metrics incoming...</p>
        </div>
      )}
    </div>
  );
}
