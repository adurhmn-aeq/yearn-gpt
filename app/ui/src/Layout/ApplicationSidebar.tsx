"use client";

import { PropsWithChildren, useState } from "react";

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
    <div
      className={[
        `flex items-center gap-2`,
        isCollapsed ? "mb-4" : "",
        className,
      ].join(" ")}
    >
      <div className="size-[16px] shrink-0">{leftSlot}</div>
      <div
        className={[
          "flex-1 flex justify-between items-center gap-2 overflow-hidden",
          isCollapsed ? "w-0 hidden" : "w-auto",
        ].join(" ")}
      >
        <div>{children}</div>
        <div>{rightSlot}</div>
      </div>
    </div>
  );
};

export const ApplicationSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={[
        `px-4 py-4 transition transition-all duration-300`,
        isCollapsed ? "w-[66px]" : "w-[240px]",
      ].join(" ")}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <SidebarItem
            isCollapsed={isCollapsed}
            className="pr-0 pl-2 pt-[14px] rounded-md mb-4 relative"
            leftSlot={
              <div className="flex">
                <svg
                  width="42"
                  height="17"
                  viewBox="0 0 42 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.32 16.1C5.28 16.1 4.34667 15.86 3.52 15.38C2.69333 14.8867 2.03333 14.2267 1.54 13.4C1.06 12.56 0.813333 11.62 0.8 10.58V1.24C0.8 0.973333 0.873333 0.766666 1.02 0.619999C1.18 0.459999 1.39333 0.38 1.66 0.38C1.91333 0.38 2.11333 0.459999 2.26 0.619999C2.42 0.766666 2.5 0.973333 2.5 1.24V6.96C2.94 6.36 3.51333 5.88 4.22 5.52C4.92667 5.14667 5.71333 4.96 6.58 4.96C7.59333 4.96 8.5 5.20667 9.3 5.7C10.1 6.18 10.7267 6.84 11.18 7.68C11.6467 8.52 11.88 9.46667 11.88 10.52C11.88 11.5867 11.6333 12.54 11.14 13.38C10.66 14.22 10 14.8867 9.16 15.38C8.33333 15.86 7.38667 16.1 6.32 16.1ZM6.32 14.58C7.06667 14.58 7.73333 14.4 8.32 14.04C8.92 13.68 9.38667 13.2 9.72 12.6C10.0667 11.9867 10.24 11.2933 10.24 10.52C10.24 9.76 10.0667 9.07333 9.72 8.46C9.38667 7.84667 8.92 7.36667 8.32 7.02C7.73333 6.66 7.06667 6.48 6.32 6.48C5.6 6.48 4.94 6.66 4.34 7.02C3.75333 7.36667 3.29333 7.84667 2.96 8.46C2.62667 9.07333 2.46 9.76 2.46 10.52C2.46 11.2933 2.62667 11.9867 2.96 12.6C3.29333 13.2 3.75333 13.68 4.34 14.04C4.94 14.4 5.6 14.58 6.32 14.58ZM16.0611 16C15.8078 16 15.6011 15.9267 15.4411 15.78C15.2811 15.62 15.2011 15.4067 15.2011 15.14V5.92C15.2011 5.65333 15.2811 5.44667 15.4411 5.3C15.6011 5.14 15.8078 5.06 16.0611 5.06C16.3144 5.06 16.5144 5.14 16.6611 5.3C16.8211 5.44667 16.9011 5.65333 16.9011 5.92V15.14C16.9011 15.4067 16.8211 15.62 16.6611 15.78C16.5144 15.9267 16.3144 16 16.0611 16ZM16.0411 3.08C15.7211 3.08 15.4478 2.96667 15.2211 2.74C14.9944 2.5 14.8811 2.22 14.8811 1.9C14.8811 1.56667 14.9944 1.29333 15.2211 1.08C15.4611 0.866666 15.7344 0.76 16.0411 0.76C16.3478 0.76 16.6144 0.866666 16.8411 1.08C17.0811 1.29333 17.2011 1.56667 17.2011 1.9C17.2011 2.22 17.0878 2.5 16.8611 2.74C16.6344 2.96667 16.3611 3.08 16.0411 3.08ZM23.2205 16C22.6605 16 22.1671 15.8533 21.7405 15.56C21.3138 15.2533 20.9805 14.8333 20.7405 14.3C20.5005 13.7667 20.3805 13.1533 20.3805 12.46V1.22C20.3805 0.966666 20.4538 0.766666 20.6005 0.619999C20.7605 0.459999 20.9671 0.38 21.2205 0.38C21.4605 0.38 21.6538 0.459999 21.8005 0.619999C21.9605 0.766666 22.0405 0.966666 22.0405 1.22V12.46C22.0405 13.0067 22.1471 13.46 22.3605 13.82C22.5871 14.1667 22.8738 14.34 23.2205 14.34H23.7205C23.9338 14.34 24.1071 14.42 24.2405 14.58C24.3738 14.7267 24.4405 14.92 24.4405 15.16C24.4405 15.4133 24.3405 15.62 24.1405 15.78C23.9538 15.9267 23.7071 16 23.4005 16H23.2205ZM27.6822 16C27.4289 16 27.2222 15.9267 27.0622 15.78C26.9022 15.62 26.8222 15.4067 26.8222 15.14V5.92C26.8222 5.65333 26.9022 5.44667 27.0622 5.3C27.2222 5.14 27.4289 5.06 27.6822 5.06C27.9355 5.06 28.1355 5.14 28.2822 5.3C28.4422 5.44667 28.5222 5.65333 28.5222 5.92V15.14C28.5222 15.4067 28.4422 15.62 28.2822 15.78C28.1355 15.9267 27.9355 16 27.6822 16ZM27.6622 3.08C27.3422 3.08 27.0689 2.96667 26.8422 2.74C26.6155 2.5 26.5022 2.22 26.5022 1.9C26.5022 1.56667 26.6155 1.29333 26.8422 1.08C27.0822 0.866666 27.3555 0.76 27.6622 0.76C27.9689 0.76 28.2355 0.866666 28.4622 1.08C28.7022 1.29333 28.8222 1.56667 28.8222 1.9C28.8222 2.22 28.7089 2.5 28.4822 2.74C28.2555 2.96667 27.9822 3.08 27.6622 3.08ZM37.3016 16.1C36.2482 16.1 35.3082 15.86 34.4816 15.38C33.6549 14.8867 33.0016 14.22 32.5216 13.38C32.0549 12.54 31.8216 11.5933 31.8216 10.54C31.8216 9.47333 32.0482 8.52 32.5016 7.68C32.9682 6.84 33.5949 6.18 34.3816 5.7C35.1816 5.20667 36.1016 4.96 37.1416 4.96C37.9416 4.96 38.6816 5.12 39.3616 5.44C40.0416 5.74667 40.6416 6.21333 41.1616 6.84C41.3216 7.02667 41.3749 7.22 41.3216 7.42C41.2816 7.60667 41.1616 7.77333 40.9616 7.92C40.8016 8.02667 40.6216 8.06667 40.4216 8.04C40.2349 8 40.0616 7.89333 39.9016 7.72C39.1682 6.89333 38.2482 6.48 37.1416 6.48C36.4082 6.48 35.7616 6.65333 35.2016 7C34.6549 7.34667 34.2282 7.82667 33.9216 8.44C33.6149 9.04 33.4616 9.74 33.4616 10.54C33.4616 11.3133 33.6216 12.0067 33.9416 12.62C34.2749 13.22 34.7282 13.7 35.3016 14.06C35.8882 14.4067 36.5549 14.58 37.3016 14.58C37.8082 14.58 38.2616 14.5133 38.6616 14.38C39.0749 14.2467 39.4416 14.04 39.7616 13.76C39.9482 13.6133 40.1349 13.5333 40.3216 13.52C40.5082 13.5067 40.6816 13.56 40.8416 13.68C41.0149 13.84 41.1149 14.02 41.1416 14.22C41.1682 14.42 41.1016 14.6 40.9416 14.76C39.9682 15.6533 38.7549 16.1 37.3016 16.1Z"
                    className={`${
                      isCollapsed ? "hidden" : ""
                    } fill-[#020617] dark:fill-copy-50`}
                  />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`w-5 h-5 cursor-pointer absolute end-0 top-[10px]`}
                  onClick={() => setIsCollapsed((s) => !s)}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 4a1 1 0 00-1 1v14a1 1 0 001 1h3V4H5zm4-2H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3H9zm1 2v16h9a1 1 0 001-1V5a1 1 0 00-1-1h-9zm6.707 10.707a1 1 0 000-1.414L15.414 12l1.293-1.293a1 1 0 00-1.414-1.414l-2 2a1 1 0 000 1.414l2 2a1 1 0 001.414 0z"
                    className="fill-[#020617] dark:fill-copy-50 dark:opacity-70"
                  ></path>
                </svg>
              </div>

              // <img src={Logo} alt="" role="logo" className="w-12 mb-3" />
              // <span className="bg-primary-500 w-8 h-8 rounded-md text-white flex justify-center items-center">
              //   B
              // </span>
            }
          >
            {/* <span className="text-sm font-medium">Bilic</span> */}
          </SidebarItem>
          <div className="flex flex-col gap-[4px]">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-3 py-1 rounded-lg bg-white dark:bg-[#151a25]"
              leftSlot={
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.51564 2.36899L3.02459 5.86851C2.27469 6.45176 1.66644 7.69326 1.66644 8.63479V14.8089C1.66644 16.742 3.24123 18.3251 5.17429 18.3251H14.823C16.756 18.3251 18.3308 16.742 18.3308 14.8173V8.75144C18.3308 7.74325 17.6559 6.45176 16.831 5.87684L11.6817 2.269C10.5152 1.45245 8.64049 1.49411 7.51564 2.36899Z"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.99863 14.9923V12.4927"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              }
            >
              <span
                className={`text-sm font-normal text-secondary-500 dark:text-copy-50 dark:opacity-60 whitespace-nowrap`}
              >
                Home
              </span>
            </SidebarItem>
          </div>
          <div
            className={`${
              isCollapsed ? "hidden" : ""
            } pt-6 pb-3 px-2 text-xs uppercase text-secondary-500 dark:text-copy-500 dark:opacity-40 font-medium opacity-60`}
          >
            <p>Agents</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-3 py-1"
              leftSlot={
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.49899 18.3309H12.4983C16.6644 18.3309 18.3309 16.6645 18.3309 12.4984V7.49905C18.3309 3.33295 16.6644 1.6665 12.4983 1.6665H7.49899C3.33289 1.6665 1.66644 3.33295 1.66644 7.49905V12.4984C1.66644 16.6645 3.33289 18.3309 7.49899 18.3309Z"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.58234 9.99861V8.76544C7.58234 7.17399 8.70719 6.53241 10.082 7.32397L11.1485 7.94055L12.215 8.55714C13.5899 9.3487 13.5899 10.6485 12.215 11.4401L11.1485 12.0567L10.082 12.6733C8.70719 13.4648 7.58234 12.8149 7.58234 11.2318V9.99861Z"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                    />
                  </svg>
                </>
              }
            >
              <span
                className={`text-sm font-normal text-secondary-500 dark:text-copy-50 dark:opacity-60 whitespace-nowrap`}
              >
                Video Transcript
              </span>
            </SidebarItem>
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-3 py-1"
              leftSlot={
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99866 12.9174C11.8401 12.9174 13.3315 11.426 13.3315 9.58455V5.00183C13.3315 3.16041 11.8401 1.66895 9.99866 1.66895C8.15724 1.66895 6.66577 3.16041 6.66577 5.00183V9.58455C6.66577 11.426 8.15724 12.9174 9.99866 12.9174Z"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.62451 8.04321V9.45969C3.62451 12.9759 6.48246 15.8338 9.99866 15.8338C13.5149 15.8338 16.3728 12.9759 16.3728 9.45969V8.04321"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.84048 5.36052C9.59038 5.08556 10.4069 5.08556 11.1568 5.36052"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.33209 7.37679C9.7737 7.26014 10.232 7.26014 10.6736 7.37679"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.99866 15.834V18.3336"
                      className="stroke-[#020617] dark:stroke-copy-50 opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              }
            >
              <span className="text-sm font-normal text-secondary-500 dark:text-copy-50 dark:opacity-60 whitespace-nowrap">
                Audio Transcript
              </span>
            </SidebarItem>
          </div>
          <div
            className={`${
              isCollapsed ? "hidden" : ""
            } pt-6 pb-3 px-2 text-xs uppercase text-secondary-500 dark:text-copy-500 dark:opacity-40 font-medium opacity-60`}
          >
            <p>Agents</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            {/* <SidebarItem
              isCollapsed={isCollapsed}
              className="px-2 py-1"
              leftSlot={<LuBuilding2 />}
            >
              <span className="text-sm font-medium">Companies</span>
            </SidebarItem> */}
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-3 py-1"
              leftSlot={
                <>
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3333 9.25968V8.42635C18.3333 4.25968 16.6667 2.59302 12.5 2.59302H7.50001C3.33334 2.59302 1.66667 4.25968 1.66667 8.42635V13.4264C1.66667 17.593 3.33334 19.2597 7.50001 19.2597H9.16667"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.75 15.093V13.8597C11.75 12.268 12.875 11.6263 14.25 12.418L15.3167 13.0347L16.3833 13.6513C17.7583 14.443 17.7583 15.743 16.3833 16.5347L15.3167 17.1513L14.25 17.768C12.875 18.5597 11.75 17.9097 11.75 16.3263V15.093Z"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.05832 10.3494H10.225"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.05832 7.01611H14.7098"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              }
            >
              <span className="text-sm font-normal text-secondary-500 dark:text-copy-50 dark:opacity-60 whitespace-nowrap">
                Video Agent
              </span>
            </SidebarItem>
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-3 py-1"
              leftSlot={
                <>
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3333 8.68278V7.84945C18.3333 3.68278 16.6667 2.01611 12.5 2.01611H7.49999C3.33332 2.01611 1.66666 3.68278 1.66666 7.84945V12.8494C1.66666 17.0161 3.33332 18.6828 7.49999 18.6828H9.16666"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.3841 15.8312V13.8607C10.3841 13.6322 10.4984 13.4189 10.6886 13.2925L13.4016 11.4891C13.583 11.3685 13.8256 11.4986 13.8256 11.7164V18.1466C13.8256 18.3697 13.5725 18.4985 13.3921 18.3673L10.6649 16.3828C10.4884 16.2544 10.3841 16.0494 10.3841 15.8312Z"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15.7565 16.3238C16.1449 16.0628 16.4044 15.5378 16.391 14.9236C16.3833 14.313 16.1037 13.7947 15.7054 13.546"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.1308 17.988C17.9049 17.299 18.4005 16.1633 18.3787 14.8908C18.3568 13.6183 17.8183 12.5006 17.0192 11.8364"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.05832 10.3494H10.225"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.05832 7.01611H14.7098"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              }
            >
              <span className="text-sm font-normal text-secondary-500 dark:text-copy-50 dark:dark:opacity-60 whitespace-nowrap">
                Audio Agent
              </span>
            </SidebarItem>
          </div>
          <div
            className={`${
              isCollapsed ? "hidden" : ""
            } pt-6 pb-3 px-2 text-xs uppercase text-secondary-500 dark:text-copy-500 dark:opacity-40 font-medium opacity-60`}
          >
            <p>Account</p>
          </div>
          <div className="flex flex-col gap-[4px]">
            <SidebarItem
              isCollapsed={isCollapsed}
              className="px-3 py-1"
              leftSlot={
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.0833 6.59999V10.8917C16.0833 13.4583 14.6167 14.5583 12.4167 14.5583H5.09165C4.71665 14.5583 4.35832 14.525 4.02498 14.45C3.81665 14.4167 3.61666 14.3584 3.43332 14.2917C2.18332 13.825 1.42499 12.7417 1.42499 10.8917V6.59999C1.42499 4.03332 2.89165 2.93335 5.09165 2.93335H12.4167C14.2833 2.93335 15.625 3.72501 15.9833 5.53335C16.0417 5.86668 16.0833 6.20832 16.0833 6.59999Z"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5842 9.10009V13.3918C18.5842 15.9584 17.1176 17.0584 14.9176 17.0584H7.59257C6.97591 17.0584 6.41758 16.9751 5.93425 16.7918C4.94258 16.4251 4.26758 15.6668 4.02591 14.4501C4.35924 14.5251 4.71758 14.5584 5.09258 14.5584H12.4176C14.6176 14.5584 16.0842 13.4584 16.0842 10.8918V6.60009C16.0842 6.20842 16.0509 5.85845 15.9842 5.53345C17.5676 5.86678 18.5842 6.98342 18.5842 9.10009Z"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.74872 10.9498C9.96374 10.9498 10.9487 9.96484 10.9487 8.74982C10.9487 7.53479 9.96374 6.5498 8.74872 6.5498C7.53369 6.5498 6.54871 7.53479 6.54871 8.74982C6.54871 9.96484 7.53369 10.9498 8.74872 10.9498Z"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.98334 6.91675V10.5834"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.5181 6.91699V10.5837"
                      className="stroke-[#020617] dark:stroke-copy-50 dark:dark:opacity-60"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              }
            >
              <span className="text-sm font-normal text-secondary-500 dark:text-copy-50 dark:dark:opacity-60 whitespace-nowrap">
                Plans
              </span>
            </SidebarItem>
          </div>
        </div>
        <SidebarItem
          isCollapsed={isCollapsed}
          className="px-2 py-1 opacity-70"
          leftSlot={
            <>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 13.3821C11.3807 13.3821 12.5 12.2628 12.5 10.8821C12.5 9.50137 11.3807 8.38208 10 8.38208C8.61929 8.38208 7.5 9.50137 7.5 10.8821C7.5 12.2628 8.61929 13.3821 10 13.3821Z"
                  className="stroke-[#020617] dark:stroke-copy-50 dark:dark:opacity-60"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.66669 11.6154V10.1488C1.66669 9.28211 2.37502 8.56544 3.25002 8.56544C4.75835 8.56544 5.37502 7.49878 4.61669 6.19044C4.18335 5.44044 4.44169 4.46544 5.20002 4.03211L6.64169 3.20711C7.30002 2.81544 8.15002 3.04878 8.54169 3.70711L8.63335 3.86544C9.38335 5.17378 10.6167 5.17378 11.375 3.86544L11.4667 3.70711C11.8584 3.04878 12.7084 2.81544 13.3667 3.20711L14.8084 4.03211C15.5667 4.46544 15.825 5.44044 15.3917 6.19044C14.6334 7.49878 15.25 8.56544 16.7584 8.56544C17.625 8.56544 18.3417 9.27377 18.3417 10.1488V11.6154C18.3417 12.4821 17.6334 13.1988 16.7584 13.1988C15.25 13.1988 14.6334 14.2654 15.3917 15.5738C15.825 16.3321 15.5667 17.2988 14.8084 17.7321L13.3667 18.5571C12.7084 18.9488 11.8584 18.7154 11.4667 18.0571L11.375 17.8988C10.625 16.5904 9.39169 16.5904 8.63335 17.8988L8.54169 18.0571C8.15002 18.7154 7.30002 18.9488 6.64169 18.5571L5.20002 17.7321C4.44169 17.2988 4.18335 16.3238 4.61669 15.5738C5.37502 14.2654 4.75835 13.1988 3.25002 13.1988C2.37502 13.1988 1.66669 12.4821 1.66669 11.6154Z"
                  className="stroke-[#020617] dark:stroke-copy-50 dark:dark:opacity-60"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          }
        >
          <span className="text-sm font-medium text-secondary-500 dark:text-copy-50 dark:opacity-60">
            Settings
          </span>
        </SidebarItem>
      </div>
    </aside>
  );
};
