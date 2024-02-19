"use client";

import { PropsWithChildren, useState } from "react";
import { TbChevronLeft } from "react-icons/tb";
import { Progress, Spin } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavRoutes } from "../utils/constants";
import UpgradeButton from "../utils/widgets/upgradeButton";
import { useAuth } from "../context/AuthContext";
import useBreakpoint from "../hooks/useBreakpoint";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { Plan } from "../utils/pricing";

type SidebarItemProps = {
  isCollapsed: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  className?: string;
};

export const SidebarItem = ({
  children,
  leftSlot,
  rightSlot,
  isCollapsed,
  className = "",
}: PropsWithChildren<SidebarItemProps>) => {
  return (
    <div className={[`flex items-center gap-2`, className].join(" ")}>
      <div className="size-[16px] shrink-0">{leftSlot}</div>
      <div
        className={[
          "flex-1 flex justify-between items-center gap-2 overflow-hidden",
          isCollapsed ? "w-0" : "w-auto",
        ].join(" ")}
      >
        <div>{children}</div>
        <div>{rightSlot}</div>
      </div>
    </div>
  );
};

export const ApplicationSidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const md = useBreakpoint({ breakpoint: "md" });
  // const [isCollapsed, setIsCollapsed] = useState(false);
  const { isLogged, profile, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data, isLoading, isSuccess } = useQuery(
    ["fetchUsage"],
    async () => {
      const response = await api.get("/stripe/usage");
      return response.data as {
        active_plan: string;
        message_credits_total: number;
        message_credits_used: number;
      };
    },
    { refetchInterval: 10000 }
  );

  const progressPercentage = isSuccess
    ? (data?.message_credits_used / data?.message_credits_total) * 100
    : 0;
  console.log("progressPercentage", data?.active_plan);
  return (
    <span
      className={[
        !md ? "h-[100vh] absolute z-20 bg-[#F9F9F809] backdrop-blur-sm" : "",
        isOpen && !md ? "w-[100vw]" : "",
      ].join(" ")}
      onClick={toggleSidebar}
    >
      <aside
        className={[
          `py-4 transition transition-all duration-300 bg-[#F9F9F8] overflow-auto shadow-[6px_0px_30px_0px_#0000001A] z-20 absolute md:static h-[100vh] md:min-h-full`,
          isOpen ? "w-[276px] px-4" : "w-0",
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col h-full">
            <div className="flex flex-col gap-[4px] h-full">
              <div className=" flex flex-col gap-10 pb-7 border-b-2 border-solid border-[#3435380F] pl-[10px]">
                <div className="gap-3 items-center pt-[20px] hidden md:flex">
                  {/* <button onClick={toggleSidebar}>close</button> */}
                  <Link to={"/"}>
                    <span className="gap-3 items-center hidden md:flex">
                      <svg
                        width="60"
                        height="24"
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
                        <p className="text-[14px] text-[#FFFFFF] font-[600] px-3 py-[2px]">
                          AGENTS
                        </p>
                      </div>
                    </span>
                  </Link>
                </div>
                <div className="flex gap-3">
                  <img
                    className="w-[48px] h-[48px] rounded-md"
                    src={profile?.avatar}
                    alt=""
                  />
                  <div className="flex flex-col justify-around">
                    <h2 className="text-[14px] text-[#343538] font-[600]">
                      {profile?.username}
                    </h2>

                    <p className="text-[12px] text-[#34353880] font-[400]">
                      {profile?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-[20px]">
                <h2 className="text-[12px] font-[500] text-[#34353880] pl-[10px] pb-[10px]">
                  MENU
                </h2>
                {NavRoutes.map((val, i) => (
                  <Link
                    key={i}
                    to={val.link}
                    onClick={() => {
                      !md && toggleSidebar();
                    }}
                  >
                    <SidebarItem
                      isCollapsed={isOpen}
                      className={`px-3 h-[48px] rounded-lg hover:bg-[#3435381A] dark:bg-[#151a25] cursor-pointer mt-2 ${
                        pathname === val.link ? "bg-[#3435381A]" : null
                      }`}
                      leftSlot={<>{val.icon}</>}
                    >
                      <span className="text-[14px] font-[400] text-[#343538] dark:text-copy-50 dark:opacity-60">
                        {val.name}
                      </span>
                    </SidebarItem>
                  </Link>
                ))}
              </div>
              <div className="border border-solid border-[#343538] rounded-[20px] px-[15px] py-[20px] flex flex-col justify-center items-center w-full gap-[20px] mt-2">
                <img src="/providers/planArrow.svg" alt="plan" />
                {isLoading ? (
                  <Spin />
                ) : (
                  <h2 className="font-[600] text-[20px] text-[#343538]">
                    {data?.active_plan
                      ? `${
                          Plan.titles[
                            data?.active_plan as keyof typeof Plan.titles
                          ]
                        } Plan`
                      : "Free Plan"}
                  </h2>
                )}
                <div className="w-[206px]">
                  <Progress
                    style={{ margin: 0 }}
                    percent={progressPercentage}
                    strokeColor={"#343538"}
                    showInfo={false}
                  />
                  <div className="flex justify-between">
                    <p className="font-[400] text-[12px] text-[#34353880]">
                      Message Credits
                    </p>
                    {isLoading ? (
                      <Spin size="small" />
                    ) : (
                      <p className="font-[600] text-[12px] text-[#343538]">
                        {`${data?.message_credits_used}/${data?.message_credits_total}`}
                      </p>
                    )}
                  </div>
                </div>
                <UpgradeButton onClick={() => navigate("/pricing")} />
              </div>
              <Link
                to={"/login"}
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <SidebarItem
                  isCollapsed={isOpen}
                  className={`px-3 h-[48px] rounded-lg hover:bg-[#3435381A] dark:bg-[#151a25] cursor-pointer mt-2`}
                  leftSlot={
                    <>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.51569 11.4375C8.51569 11.5867 8.45643 11.7298 8.35094 11.8352C8.24545 11.9407 8.10238 12 7.95319 12H2.65039C2.15328 11.9994 1.67669 11.8017 1.32518 11.4502C0.973672 11.0987 0.775949 10.6221 0.775391 10.125V1.875C0.775949 1.37789 0.973672 0.901301 1.32518 0.549791C1.67669 0.198282 2.15328 0.000558307 2.65039 0L7.95319 0C8.10238 0 8.24545 0.0592632 8.35094 0.164752C8.45643 0.270242 8.51569 0.413316 8.51569 0.5625C8.51569 0.711684 8.45643 0.854758 8.35094 0.960248C8.24545 1.06574 8.10238 1.125 7.95319 1.125H2.65039C2.45154 1.12522 2.26091 1.2043 2.1203 1.34491C1.97969 1.48551 1.90061 1.67615 1.90039 1.875V10.125C1.9006 10.3238 1.97969 10.5145 2.12029 10.6551C2.2609 10.7957 2.45154 10.8748 2.65039 10.875H7.95319C8.10238 10.875 8.24545 10.9343 8.35094 11.0398C8.45643 11.1452 8.51569 11.2883 8.51569 11.4375ZM11.0599 5.60227L8.38684 2.92917C8.33482 2.87598 8.27276 2.83364 8.20427 2.8046C8.13577 2.77555 8.0622 2.76039 7.9878 2.75998C7.9134 2.75956 7.83966 2.77391 7.77085 2.8022C7.70204 2.83048 7.63952 2.87213 7.58691 2.92474C7.53431 2.97735 7.49266 3.03988 7.46439 3.10869C7.43611 3.17751 7.42177 3.25125 7.42219 3.32565C7.42261 3.40004 7.43779 3.47362 7.46684 3.54211C7.49589 3.6106 7.53824 3.67265 7.59144 3.72466L9.30418 5.4375H4.87599C4.72681 5.4375 4.58373 5.49676 4.47824 5.60225C4.37276 5.70774 4.31349 5.85082 4.31349 6C4.31349 6.14918 4.37276 6.29226 4.47824 6.39775C4.58373 6.50324 4.72681 6.5625 4.87599 6.5625H9.30416L7.59134 8.27531C7.53888 8.32749 7.49722 8.38951 7.46877 8.45782C7.44031 8.52613 7.42561 8.59938 7.42551 8.67338C7.42541 8.74737 7.43991 8.82066 7.46818 8.88905C7.49645 8.95743 7.53794 9.01956 7.59026 9.07189C7.64258 9.12421 7.70472 9.1657 7.7731 9.19397C7.84149 9.22224 7.91478 9.23674 7.98877 9.23664C8.06277 9.23654 8.13602 9.22184 8.20433 9.19338C8.27263 9.16493 8.33465 9.12327 8.38684 9.0708L11.0599 6.39776C11.1654 6.29227 11.2247 6.1492 11.2247 6.00001C11.2247 5.85083 11.1654 5.70775 11.0599 5.60227Z"
                          fill="#343538"
                        />
                      </svg>
                    </>
                  }
                >
                  <span className="text-[14px] font-[400] text-[#343538] dark:text-copy-50 dark:opacity-60">
                    Logout
                  </span>
                </SidebarItem>
              </Link>
              <div className="flex justify-center items-center mt-[auto] pt-[8px]">
                <p className="text-[12px] font-[400] text-[#34353880]">
                  Copyright 2024 bilic.io
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </span>
  );
};
