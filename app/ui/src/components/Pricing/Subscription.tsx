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
  <div className="h-6 w-6 rounded-full flex justify-center items-center bg-primary-50 dark:bg-[#161d2d]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="h-3 w-3 shrink-0 text-primary-500 dark:text-copy-500 dark:text-opacity-60"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      ></path>
    </svg>
  </div>
);

const pillActiveClass =
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 underline-offset-4 hover:underline dark:text-zinc-50 h-9 px-4 relative w-1/2 border-zinc-200 bg-[#fff] dark:bg-[#121826] text-black m-1 whitespace-nowrap rounded-full py-2 text-sm font-medium decoration-transparent focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-50 focus:ring-opacity-50 sm:w-auto sm:px-8 dark:text-opacity-60 shadow-[0_1px_2px_0_rgb(192,220,187,0.36),0_1px_1px_0_rgb(0,0,0,0.06)] dark:shadow-none";
const pillInActiveClass =
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 underline-offset-4 hover:underline dark:text-zinc-50 h-9 px-4 relative w-1/2 border border-transparent text-zinc-600 m-1 whitespace-nowrap rounded-full py-2 text-sm font-medium decoration-transparent focus:z-10 focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-opacity-0 sm:w-auto sm:px-8 dark:text-opacity-60";

const Header = ({
  activePill,
  togglePill,
}: {
  activePill: "monthly" | "yearly";
  togglePill: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-extrabold text-secondary-500 sm:text-center lg:text-5xl dark:text-copy-500">
        Pricing Plans
      </h1>
      <p className="mt-3 text-center dark:text-copy-500 dark:text-opacity-70">
        Get 2 months for free by subscribing yearly!
      </p>
      <div className="relative mt-2 flex self-center rounded-full border border-[#eaf6e5] bg-[#f6fbf4] p-0.5 lg:mt-6 dark:bg-[#0f141f] dark:border-[#151a25] dark:shadow-[0 1px 4px #080b1136]">
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
    <div className="divide-y divide-zinc-400 bg-white border-[1px] border-[#f0f0f0] rounded-[24px] min-h-[600px] flex items-stretch dark:bg-[#0f141f] dark:border-[#151a25] dark:shadow-[0 1px 4px #080b1136]">
      <div className="flex min-h-full flex-col py-6 px-8">
        <div className="flex gap-2">
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-2xl font-semibold text-secondary-500 dark:text-copy-500 dark:text-opacity-90">
              {PlanInfo.titles[lookup]}
            </h2>
            <small className="text-sm text-secondary-500 uppercase font-semibold dark:text-copy-500 dark:text-opacity-70">
              {PlanInfo.heading[lookup]}
            </small>
            <p className="text-xs text-secondary-500 max-w-[252px] opacity-50 dark:text-copy-500">
              {PlanInfo.description[lookup]}
            </p>
          </div>
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
        <div className="mt-5 mb-7">
          <p className="dark:opacity-80">
            <span className="text-[44px] font-bold text-secondary-500 dark:text-copy-500">
              ${PlanInfo.prices[lookup]}
            </span>
            <span className="text-base font-medium text-secondary-500 dark:text-copy-500">
              /{lookup.split("_")[1] === "yearly" ? "year" : "month"}
            </span>
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm text-secondary-500 dark:text-copy-500 mb-5 dark:text-opacity-70">
            What's Included
          </p>
          {PlanInfo.features[lookup].map((feature, ind) => (
            <li key={ind} className="mb-3 flex space-x-2 items-center">
              <TickSVG />
              <span className="text-sm font-normal text-secondary-400 dark:text-copy-500 dark:text-opacity-60">
                {feature}
              </span>
            </li>
          ))}
        </div>
        <button
          disabled={isLoading}
          onClick={() => onAction(lookup)}
          className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 bg-zinc-900 shadow hover:bg-zinc-800/90 dark:bg-transparent dark:border-[1px] dark:border-[#182032] dark:text-copy-500 dark:text-opacity-60 dark:hover:bg-transparent h-9 px-4 mt-auto w-full rounded-full py-2 text-center text-sm font-semibold text-white"
        >
          {isLoading ? <Spin /> : activePlan ? "Manage" : "Subscribe"}
        </button>
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
