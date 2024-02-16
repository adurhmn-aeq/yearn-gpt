import { useCallback, useState } from "react";
import { Plan as PlanInfo, PlanLookup } from "../../utils/pricing";
import { Spin, notification } from "antd";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import api from "../../services/api";

const TickSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className="h-5 w-5 shrink-0 text-green-500"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    ></path>
  </svg>
);
const pillActiveClasses =
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 underline-offset-4 hover:underline dark:text-zinc-50 h-9 px-4 relative w-1/2 border-zinc-200 bg-zinc-300 text-black shadow-sm m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium decoration-transparent focus:z-10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 sm:w-auto sm:px-8";
const pillActiveClass =
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 underline-offset-4 hover:underline dark:text-zinc-50 h-9 px-4 relative w-1/2 border-zinc-200 bg-zinc-300 text-black shadow-sm m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium decoration-transparent focus:z-10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 sm:w-auto sm:px-8";
const pillInActiveClass =
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 underline-offset-4 hover:underline dark:text-zinc-50 h-9 px-4 relative w-1/2 border border-transparent text-zinc-600 m-1 whitespace-nowrap rounded-md py-2 text-sm font-medium decoration-transparent focus:z-10 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 sm:w-auto sm:px-8";

const Header = ({
  activePill,
  togglePill,
}: {
  activePill: "monthly" | "yearly";
  togglePill: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[26px] font-[600] text-[#343538] sm:text-center sm:text-[39px]">
        Plans
      </h1>
      <p className="mt-4 text-center text-[#34353899] font-[500] text-[16px]">
        Get 2 months for free by subscribing yearly!
      </p>
      <div className="relative mt-2 flex self-center rounded-[50px] bg-[#51DC0014] p-0.5 sm:mt-4 lg:mt-6">
        <button
          onClick={togglePill}
          className={
            activePill === "monthly" ? pillActiveClass : pillInActiveClass
          }
        >
          Monthly billing
        </button>
        <button
          onClick={togglePill}
          className={
            activePill === "yearly" ? pillActiveClass : pillInActiveClass
          }
        >
          Yearly billing
        </button>
      </div>
    </div>
  );
};

function Plan({
  lookup,
  onAction,
  isLoading,
  activePlan,
  planStatus,
}: {
  lookup: PlanLookup;
  onAction: UseMutateAsyncFunction<any, any, string | undefined, unknown>;
  isLoading: boolean;
  activePlan: PlanLookup | "";
  planStatus?: "active" | "past_due";
}) {
  return (
    <div className="divide-y divide-zinc-400 rounded-lg bg-zinc-100 shadow-sm ">
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="flex gap-2 h-[30px] items-center">
            <h2 className="text-2xl font-semibold leading-6 text-black">
              {PlanInfo.titles[lookup]}
            </h2>
            {activePlan === lookup &&
              (planStatus === "active" ? (
                <div className="bg-green-200 ring-1 ring-green-700 text-green-700 py-1 px-2 rounded-full text-[12px]">
                  Active
                </div>
              ) : planStatus === "past_due" ? (
                <div className="bg-red-200 ring-1 ring-red-700 text-red-700 py-1 px-2 rounded-full text-[12px]">
                  Past Due
                </div>
              ) : null)}
          </div>
          <div className="py-4">
            {PlanInfo.features[lookup].map((feature, ind) => (
              <li key={ind} className="mb-3 flex space-x-2">
                <TickSVG />
                <span className="text-sm font-semibold text-zinc-700">
                  {feature}
                </span>
              </li>
            ))}
          </div>
        </div>
        <div>
          <p className="mt-8">
            <span className="white text-3xl font-bold">
              ${PlanInfo.prices[lookup]}
            </span>
            <span className="text-base font-medium text-zinc-900">
              /{lookup.split("_")[1] === "yearly" ? "year" : "month"}
            </span>
          </p>
          <button
            disabled={isLoading}
            onClick={() => onAction(lookup)}
            className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 bg-zinc-900 shadow hover:bg-zinc-800/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 mt-8 w-full rounded-md py-2 text-center text-sm font-semibold text-white"
          >
            {isLoading ? <Spin /> : activePlan ? "Manage" : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Subscription() {
  const [planType, setPlanType] = useState<"monthly" | "yearly">("monthly");

  const togglePlanType = useCallback(
    () => setPlanType((prev) => (prev === "monthly" ? "yearly" : "monthly")),
    []
  );

  const { data } = useQuery(["fetchSubscription"], async () => {
    const response = await api.get("/stripe/subscription/fetch");
    return response.data as {
      active_plan: PlanLookup | "";
      plan_status: "active" | "past_due";
    };
  });

  const onAction = useCallback(
    async (lookup?: string) => {
      if (data?.active_plan) {
        // manage
        return await api
          .get("/stripe/subscription/manage")
          .then((res) => res.data);
      } else {
        // subscribe
        return await api
          .get("/stripe/subscription/create", { params: { lookup } })
          .then((res) => res.data);
      }
    },
    [data]
  );

  const { mutateAsync, isLoading } = useMutation(onAction, {
    onSuccess: (data) => {
      window.location.replace(data.redirect);
    },
    onError: (error: any) => {
      notification.error({
        message: "Error",
        description: error?.message || "Something went wrong",
      });
    },
  });

  return (
    <div>
      <Header activePill={planType} togglePill={togglePlanType} />
      <div className="flex gap-8 flex-wrap py-12 items-center justify-center">
        <Plan
          activePlan={data?.active_plan || ""}
          planStatus={data?.plan_status}
          isLoading={isLoading}
          onAction={mutateAsync}
          lookup={
            planType === "monthly"
              ? PlanLookup.HOBBY_MONTHLY
              : PlanLookup.HOBBY_YEARLY
          }
        />
        <Plan
          activePlan={data?.active_plan || ""}
          planStatus={data?.plan_status}
          isLoading={isLoading}
          onAction={mutateAsync}
          lookup={
            planType === "monthly"
              ? PlanLookup.STARTUP_MONTHLY
              : PlanLookup.STARTUP_YEARLY
          }
        />
        <Plan
          activePlan={data?.active_plan || ""}
          planStatus={data?.plan_status}
          isLoading={isLoading}
          onAction={mutateAsync}
          lookup={
            planType === "monthly"
              ? PlanLookup.ENTERPRISE_MONTHLY
              : PlanLookup.ENTERPRISE_YEARLY
          }
        />
      </div>
    </div>
  );
}
