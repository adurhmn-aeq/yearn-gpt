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
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.0719 0.190604C9.94875 0.0980581 9.80493 0.0368379 9.65285 0.0122167C9.50076 -0.0124046 9.34497 0.000310951 9.19889 0.0492683C9.05281 0.0982257 8.92082 0.181957 8.81429 0.293252C8.70776 0.404546 8.62988 0.540067 8.58736 0.688144L7.55709 4.2926C7.33554 5.06928 6.91954 5.77662 6.34841 6.34773C5.77729 6.91883 5.06992 7.33482 4.2932 7.55635L0.687252 8.58658C0.489142 8.64368 0.314972 8.76365 0.191006 8.92838C0.0670396 9.09312 0 9.2937 0 9.49986C0 9.70603 0.0670396 9.90661 0.191006 10.0713C0.314972 10.2361 0.489142 10.356 0.687252 10.4131L4.2932 11.4434C5.0697 11.6649 5.77691 12.0807 6.348 12.6516C6.9191 13.2224 7.33523 13.9294 7.55709 14.7058L8.58736 18.3116C8.64401 18.5099 8.76374 18.6844 8.92841 18.8086C9.09308 18.9328 9.29373 19 9.5 19C9.70627 19 9.90692 18.9328 10.0716 18.8086C10.2363 18.6844 10.356 18.5099 10.4126 18.3116L11.4443 14.7058C11.6658 13.9294 12.0816 13.2224 12.6525 12.6516C13.2234 12.0807 13.9304 11.6649 14.7068 11.4434L18.3128 10.4131C18.5109 10.356 18.685 10.2361 18.809 10.0713C18.933 9.90661 19 9.70603 19 9.49986C19 9.2937 18.933 9.09312 18.809 8.92838C18.685 8.76365 18.5109 8.64368 18.3128 8.58658L14.7068 7.55635C14.7068 7.55635 13.2236 6.9182 12.6517 6.34765C12.081 5.77643 11.6655 5.06913 11.4443 4.2926L10.414 0.688144C10.3572 0.489485 10.2371 0.314796 10.0719 0.190604Z"
      fill="#1967FC"
    />
  </svg>
);
const pillActiveClass =
  " items-center justify-center transition-colors disabled:pointer-events-none relative py-2 px-6 bg-[#FFFFFF] rounded-[50px] shadow-[0px_1px_2px_0px_#0000000F] text-[14px] sm:text-[18px]";
const pillInActiveClass =
  " items-center justify-center transition-colors disabled:pointer-events-none relative py-2 px-6 text-[14px] sm:text-[18px]";

const Header = ({
  activePill,
  togglePill,
}: {
  activePill: "monthly" | "yearly";
  togglePill: () => void;
}) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-[24px] font-[600] text-[#343538] text-center sm:text-[39px]">
        Plans
      </h1>
      <p className="mt-4 text-center text-[#34353899] font-[500] text-[14px] sm:text-[16px]">
        Get 2 months for free by subscribing yearly!
      </p>
      <div className="relative mt-4 flex self-center rounded-[50px] bg-[#1967FC14] p-[7px] sm:mt-4 lg:mt-6 ">
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
  fetchLoading,
}: {
  lookup: PlanLookup;
  onAction: UseMutateAsyncFunction<any, any, string | undefined, unknown>;
  isLoading: boolean;
  activePlan: PlanLookup | "";
  planStatus?: "active" | "past_due";
  fetchLoading: boolean;
}) {
  return (
    <div className="bg-[#FFFFFF] border-[4px] border-[#FFFFFF] rounded-[8px] shadow-[0px_4px_10px_0px_#00000029,10px_10px_30px_0px_#00000005_inset]">
      <div className="flex h-full flex-col justify-between p-4">
        <div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex gap-2 h-[30px] items-center">
              <h2 className="font-[600] text-[28px] text-[#343538]">
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
            <h2 className="text-[14px] font-[600] text-[#343538]">
              FOR INDIVIDUALS AND SMALL BUISNESS
            </h2>
            <p className="text-[#34353899] font-[400] text-[12px]">
              Everything you need to support
            </p>
          </div>
          <div>
            <p className="mt-4 mb-4 sm:mt-8 sm:mb-8">
              <span className="text-[40px] sm:text-[54px] font-[600] text-[#343538]">
                ${PlanInfo.prices[lookup]}
              </span>
              <span className="text-[16px] font-[600] text-[#343538]">
                /{lookup.split("_")[1] === "yearly" ? "year" : "month"}
              </span>
            </p>
          </div>
          <div className="sm:py-4 flex flex-col gap-[16px]">
            <h2 className="text-[14px] text-[#343538] font-[600]">
              What’s Included
            </h2>
            <div>
              {PlanInfo.features[lookup].map((feature, ind) => (
                <li key={ind} className="mb-3 flex space-x-2">
                  <TickSVG />
                  <span className="text-[#34353899] text-[14px] font-[500]">
                    {feature}
                  </span>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {fetchLoading ? (
            <div className=" flex mt-12 ">
              <Spin />
            </div>
          ) : (
            <button
              disabled={isLoading}
              onClick={() => onAction(lookup)}
              className="inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-80 bg-[#1967FC] shadow hover:bg-[#295cbf] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 h-9 px-4 mt-12 w-full rounded-[10px] py-2 text-center text-sm font-semibold text-white"
            >
              {isLoading ? <Spin /> : activePlan ? "Manage" : "Subscribe"}
            </button>
          )}
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

  const { data, isLoading: fetchLoading } = useQuery(
    ["fetchSubscription"],
    async () => {
      const response = await api.get("/stripe/subscription/fetch");
      return response.data as {
        active_plan: PlanLookup | "";
        plan_status: "active" | "past_due";
      };
    }
  );

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
          fetchLoading={fetchLoading}
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
          fetchLoading={fetchLoading}
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
          fetchLoading={fetchLoading}
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
