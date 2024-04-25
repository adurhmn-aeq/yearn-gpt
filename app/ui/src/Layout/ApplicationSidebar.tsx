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
import ConnectWallet from "../components/Common/ConnectWallet";
import { useDisconnect } from "wagmi";

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
  const {disconnect} = useDisconnect()
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
          `py-4 transition transition-all duration-300 bg-[#343538] overflow-auto shadow-[6px_0px_30px_0px_#0000001A] z-20 absolute md:static h-[100vh] md:min-h-full`,
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
                    <span className="gap-3 items-center hidden md:flex md:justify-center">
                      <img
                        className="w-[70%]"
                        src="./providers/yearnLogo.svg"
                        alt=""
                      />
                      {/* <div className="bg-[#343538] rounded-md">
                        <p className="text-[14px] text-[#FFFFFF] font-[600] px-3 py-[2px]">
                          AGENTS
                        </p>
                      </div> */}
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
                    <h2 className="text-[14px] text-[white] font-[600]">
                      {profile?.username}
                    </h2>

                    <p className="text-[12px] text-[white] font-[400]">
                      {profile?.email}
                    </p>
                  </div>
                </div>
              </div>
              <ConnectWallet />
              <div className="pt-[20px]">
                <h2 className="text-[12px] font-[500] text-[#FFFFFF4D] pl-[10px] pb-[10px]">
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
                      className={`px-3 h-[48px] rounded-lg hover:bg-[#FFFFFF1A] dark:bg-[#151a25] cursor-pointer mt-2 ${
                        pathname === val.link ? "bg-[#FFFFFF1A]" : null
                      }`}
                      leftSlot={<>{val.icon}</>}
                    >
                      <span className="text-[14px] font-[400] text-[white] dark:text-copy-50 dark:opacity-60">
                        {val.name}
                      </span>
                    </SidebarItem>
                  </Link>
                ))}
              </div>
              <div className="border border-solid border-[#343538] rounded-[20px] px-[15px] py-[20px] flex flex-col justify-center items-center w-full gap-[20px] mt-[58px] bg-[#FFFFFF0A]">
                <img
                  className="mt-[-58px]"
                  src="/providers/planArrow.svg"
                  alt="plan"
                />
                {isLoading ? (
                  <Spin />
                ) : (
                  <h2 className="font-[600] text-[20px] text-[#FFFFFF]">
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
                    strokeColor={"#1967FC"}
                    trailColor="#FFFFFF"
                    showInfo={false}
                  />
                  <div className="flex justify-between">
                    <p className="font-[400] text-[12px] text-[#FFFFFF80]">
                      Message Credits
                    </p>
                    {isLoading ? (
                      <Spin size="small" />
                    ) : (
                      <p className="font-[600] text-[12px] text-[#1967FC]">
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
                  disconnect()
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
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.51569 11.4375C8.51569 11.5867 8.45643 11.7298 8.35094 11.8352C8.24545 11.9407 8.10238 12 7.95319 12H2.65039C2.15328 11.9994 1.67669 11.8017 1.32518 11.4502C0.973672 11.0987 0.775949 10.6221 0.775391 10.125V1.875C0.775949 1.37789 0.973672 0.901301 1.32518 0.549791C1.67669 0.198282 2.15328 0.000558307 2.65039 0L7.95319 0C8.10238 0 8.24545 0.0592632 8.35094 0.164752C8.45643 0.270242 8.51569 0.413316 8.51569 0.5625C8.51569 0.711684 8.45643 0.854758 8.35094 0.960248C8.24545 1.06574 8.10238 1.125 7.95319 1.125H2.65039C2.45154 1.12522 2.26091 1.2043 2.1203 1.34491C1.97969 1.48551 1.90061 1.67615 1.90039 1.875V10.125C1.9006 10.3238 1.97969 10.5145 2.12029 10.6551C2.2609 10.7957 2.45154 10.8748 2.65039 10.875H7.95319C8.10238 10.875 8.24545 10.9343 8.35094 11.0398C8.45643 11.1452 8.51569 11.2883 8.51569 11.4375ZM11.0599 5.60227L8.38684 2.92917C8.33482 2.87598 8.27276 2.83364 8.20427 2.8046C8.13577 2.77555 8.0622 2.76039 7.9878 2.75998C7.9134 2.75956 7.83966 2.77391 7.77085 2.8022C7.70204 2.83048 7.63952 2.87213 7.58691 2.92474C7.53431 2.97735 7.49266 3.03988 7.46439 3.10869C7.43611 3.17751 7.42177 3.25125 7.42219 3.32565C7.42261 3.40004 7.43779 3.47362 7.46684 3.54211C7.49589 3.6106 7.53824 3.67265 7.59144 3.72466L9.30418 5.4375H4.87599C4.72681 5.4375 4.58373 5.49676 4.47824 5.60225C4.37276 5.70774 4.31349 5.85082 4.31349 6C4.31349 6.14918 4.37276 6.29226 4.47824 6.39775C4.58373 6.50324 4.72681 6.5625 4.87599 6.5625H9.30416L7.59134 8.27531C7.53888 8.32749 7.49722 8.38951 7.46877 8.45782C7.44031 8.52613 7.42561 8.59938 7.42551 8.67338C7.42541 8.74737 7.43991 8.82066 7.46818 8.88905C7.49645 8.95743 7.53794 9.01956 7.59026 9.07189C7.64258 9.12421 7.70472 9.1657 7.7731 9.19397C7.84149 9.22224 7.91478 9.23674 7.98877 9.23664C8.06277 9.23654 8.13602 9.22184 8.20433 9.19338C8.27263 9.16493 8.33465 9.12327 8.38684 9.0708L11.0599 6.39776C11.1654 6.29227 11.2247 6.1492 11.2247 6.00001C11.2247 5.85083 11.1654 5.70775 11.0599 5.60227Z"
                          // fill="#343538"
                        />
                      </svg>
                    </>
                  }
                >
                  <span className="text-[14px] font-[400] text-[white] dark:text-copy-50 dark:opacity-60">
                    Logout
                  </span>
                </SidebarItem>
              </Link>
              <div className="flex justify-center items-center mt-[auto] pt-[8px]">
                <p className="text-[12px] font-[400] text-[#FFFFFF80]">
                  Copyright 2024 yearngpt.ai
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </span>
  );
};
