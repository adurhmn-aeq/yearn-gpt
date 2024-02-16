import { Disclosure } from "@headlessui/react";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../components/Common/Avatar";
import { ApplicationMenu } from "./ApplicationMenu";
import { ApplicationSidebar } from "./ApplicationSidebar";
import UpgradeButton from "../utils/widgets/upgradeButton";
import BurgerMenu from "../assets/menu-burger.png";
import useBreakpoint from "../hooks/useBreakpoint";

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
  const md = useBreakpoint({ breakpoint: "md" });
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const { isLogged, profile, logout } = useAuth();

  React.useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  // for opening and closing sidebar when screen sizr changes
  React.useEffect(() => {
    if (md) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [md]);

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
          <ApplicationSidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <div className="h-full flex-1">
            <div className="bg-white dark:bg-[#0b0f19] w-full h-full border-[1px] border-[#f3f3f1] dark:border-[#151a25] flex flex-col">
              <div className="w-full flex justify-between items-center py-4 px-2 sm:px-6 md:hidden">
                <button onClick={toggleSidebar} className="">
                  <img className="w-6" src={BurgerMenu} alt="burger" />
                </button>
                <div className="flex gap-3 items-center">
                  <svg
                    width="60"
                    height="18"
                    viewBox="0 0 42 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.32 16.1C5.28 16.1 4.34667 15.86 3.52 15.38C2.69333 14.8867 2.03333 14.2267 1.54 13.4C1.06 12.56 0.813333 11.62 0.8 10.58V1.24C0.8 0.973333 0.873333 0.766666 1.02 0.619999C1.18 0.459999 1.39333 0.38 1.66 0.38C1.91333 0.38 2.11333 0.459999 2.26 0.619999C2.42 0.766666 2.5 0.973333 2.5 1.24V6.96C2.94 6.36 3.51333 5.88 4.22 5.52C4.92667 5.14667 5.71333 4.96 6.58 4.96C7.59333 4.96 8.5 5.20667 9.3 5.7C10.1 6.18 10.7267 6.84 11.18 7.68C11.6467 8.52 11.88 9.46667 11.88 10.52C11.88 11.5867 11.6333 12.54 11.14 13.38C10.66 14.22 10 14.8867 9.16 15.38C8.33333 15.86 7.38667 16.1 6.32 16.1ZM6.32 14.58C7.06667 14.58 7.73333 14.4 8.32 14.04C8.92 13.68 9.38667 13.2 9.72 12.6C10.0667 11.9867 10.24 11.2933 10.24 10.52C10.24 9.76 10.0667 9.07333 9.72 8.46C9.38667 7.84667 8.92 7.36667 8.32 7.02C7.73333 6.66 7.06667 6.48 6.32 6.48C5.6 6.48 4.94 6.66 4.34 7.02C3.75333 7.36667 3.29333 7.84667 2.96 8.46C2.62667 9.07333 2.46 9.76 2.46 10.52C2.46 11.2933 2.62667 11.9867 2.96 12.6C3.29333 13.2 3.75333 13.68 4.34 14.04C4.94 14.4 5.6 14.58 6.32 14.58ZM16.0611 16C15.8078 16 15.6011 15.9267 15.4411 15.78C15.2811 15.62 15.2011 15.4067 15.2011 15.14V5.92C15.2011 5.65333 15.2811 5.44667 15.4411 5.3C15.6011 5.14 15.8078 5.06 16.0611 5.06C16.3144 5.06 16.5144 5.14 16.6611 5.3C16.8211 5.44667 16.9011 5.65333 16.9011 5.92V15.14C16.9011 15.4067 16.8211 15.62 16.6611 15.78C16.5144 15.9267 16.3144 16 16.0611 16ZM16.0411 3.08C15.7211 3.08 15.4478 2.96667 15.2211 2.74C14.9944 2.5 14.8811 2.22 14.8811 1.9C14.8811 1.56667 14.9944 1.29333 15.2211 1.08C15.4611 0.866666 15.7344 0.76 16.0411 0.76C16.3478 0.76 16.6144 0.866666 16.8411 1.08C17.0811 1.29333 17.2011 1.56667 17.2011 1.9C17.2011 2.22 17.0878 2.5 16.8611 2.74C16.6344 2.96667 16.3611 3.08 16.0411 3.08ZM23.2205 16C22.6605 16 22.1671 15.8533 21.7405 15.56C21.3138 15.2533 20.9805 14.8333 20.7405 14.3C20.5005 13.7667 20.3805 13.1533 20.3805 12.46V1.22C20.3805 0.966666 20.4538 0.766666 20.6005 0.619999C20.7605 0.459999 20.9671 0.38 21.2205 0.38C21.4605 0.38 21.6538 0.459999 21.8005 0.619999C21.9605 0.766666 22.0405 0.966666 22.0405 1.22V12.46C22.0405 13.0067 22.1471 13.46 22.3605 13.82C22.5871 14.1667 22.8738 14.34 23.2205 14.34H23.7205C23.9338 14.34 24.1071 14.42 24.2405 14.58C24.3738 14.7267 24.4405 14.92 24.4405 15.16C24.4405 15.4133 24.3405 15.62 24.1405 15.78C23.9538 15.9267 23.7071 16 23.4005 16H23.2205ZM27.6822 16C27.4289 16 27.2222 15.9267 27.0622 15.78C26.9022 15.62 26.8222 15.4067 26.8222 15.14V5.92C26.8222 5.65333 26.9022 5.44667 27.0622 5.3C27.2222 5.14 27.4289 5.06 27.6822 5.06C27.9355 5.06 28.1355 5.14 28.2822 5.3C28.4422 5.44667 28.5222 5.65333 28.5222 5.92V15.14C28.5222 15.4067 28.4422 15.62 28.2822 15.78C28.1355 15.9267 27.9355 16 27.6822 16ZM27.6622 3.08C27.3422 3.08 27.0689 2.96667 26.8422 2.74C26.6155 2.5 26.5022 2.22 26.5022 1.9C26.5022 1.56667 26.6155 1.29333 26.8422 1.08C27.0822 0.866666 27.3555 0.76 27.6622 0.76C27.9689 0.76 28.2355 0.866666 28.4622 1.08C28.7022 1.29333 28.8222 1.56667 28.8222 1.9C28.8222 2.22 28.7089 2.5 28.4822 2.74C28.2555 2.96667 27.9822 3.08 27.6622 3.08ZM37.3016 16.1C36.2482 16.1 35.3082 15.86 34.4816 15.38C33.6549 14.8867 33.0016 14.22 32.5216 13.38C32.0549 12.54 31.8216 11.5933 31.8216 10.54C31.8216 9.47333 32.0482 8.52 32.5016 7.68C32.9682 6.84 33.5949 6.18 34.3816 5.7C35.1816 5.20667 36.1016 4.96 37.1416 4.96C37.9416 4.96 38.6816 5.12 39.3616 5.44C40.0416 5.74667 40.6416 6.21333 41.1616 6.84C41.3216 7.02667 41.3749 7.22 41.3216 7.42C41.2816 7.60667 41.1616 7.77333 40.9616 7.92C40.8016 8.02667 40.6216 8.06667 40.4216 8.04C40.2349 8 40.0616 7.89333 39.9016 7.72C39.1682 6.89333 38.2482 6.48 37.1416 6.48C36.4082 6.48 35.7616 6.65333 35.2016 7C34.6549 7.34667 34.2282 7.82667 33.9216 8.44C33.6149 9.04 33.4616 9.74 33.4616 10.54C33.4616 11.3133 33.6216 12.0067 33.9416 12.62C34.2749 13.22 34.7282 13.7 35.3016 14.06C35.8882 14.4067 36.5549 14.58 37.3016 14.58C37.8082 14.58 38.2616 14.5133 38.6616 14.38C39.0749 14.2467 39.4416 14.04 39.7616 13.76C39.9482 13.6133 40.1349 13.5333 40.3216 13.52C40.5082 13.5067 40.6816 13.56 40.8416 13.68C41.0149 13.84 41.1149 14.02 41.1416 14.22C41.1682 14.42 41.1016 14.6 40.9416 14.76C39.9682 15.6533 38.7549 16.1 37.3016 16.1Z"
                      className="fill-[#020617] dark:fill-copy-50"
                    />
                  </svg>
                  <div className="bg-[#343538] rounded-md">
                    <p className="text-[12px] text-[#FFFFFF] font-[600] px-2 py-[2px]">
                      AGENTS
                    </p>
                  </div>
                </div>
              </div>
              <div className="mx-auto px-2 sm:px-6 lg:px-12 py-2 md:py-6 border-b border-solid border-[#F0F0F0] w-[100%]">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <img
                      className="absolute right-[-25px] top-[-10px]"
                      src="/providers/blink.svg"
                      alt="blink"
                    />
                    <h2 className="text-[#343538] text-[22px] sm:text-[26px] md:text-[32px] font-[600]">
                      {title}
                    </h2>
                  </div>
                  <UpgradeButton />
                </div>
              </div>
              <div className="flex-1 overflow-auto">{children}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
