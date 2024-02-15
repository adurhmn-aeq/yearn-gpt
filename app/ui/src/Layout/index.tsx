import { Disclosure } from "@headlessui/react";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../components/Common/Avatar";
import { ApplicationMenu } from "./ApplicationMenu";
import { ApplicationSidebar } from "./ApplicationSidebar";
import UpgradeButton from "../utils/widgets/upgradeButton";

//@ts-ignore
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const navigate = useNavigate();

  const { isLogged, profile, logout } = useAuth();

  React.useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  // const { data } = useQuery(["fetchCredits"], async () => {
  //   const response = await api.get("/credit");
  //   return response.data as {
  //     credits?: number;
  //   };
  // });

  return (
    <>
      <main
        className={`bg-[#F9F9F8] dark:bg-secondary-500 text-neutral-700 h-full`}
      >
        <div className="flex h-full w-screen align-center">
          <ApplicationSidebar />
          <div className="h-full flex-1">
            <div className="bg-white dark:bg-[#0b0f19] w-full h-full border-[1px] border-[#f3f3f1] dark:border-[#151a25] flex flex-col">
              <div className="mx-auto px-2 sm:px-6 lg:px-12 py-6 border-b border-solid border-[#F0F0F0] w-[100%]">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <img
                      className="absolute right-[-25px] top-[-10px]"
                      src="/providers/blink.svg"
                      alt="blink"
                    />
                    <h2 className="text-[#343538] text-[32px] font-[600]">
                      {title}
                    </h2>
                  </div>
                  <UpgradeButton />
                </div>
              </div>
              <div className="flex-1 overflow-auto">{children}</div>
              {/* <div className=" w-full h-full overflow-auto">{children}</div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
