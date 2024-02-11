import { Link } from "react-router-dom";

export const DashboardNewBtn = () => {
  return (
    <div className="mb-3">
      <div className="lg:min-h-[400px] flex flex-col sm:flex-nowrap rounded-2xl py-2 px-8">
        <div className="flex flex-col gap-1 mb-8">
          <h2 className="font-epilogue text-xl font-semibold text-secondary-500 dark:text-copy-500 dark:opacity-80">
            Get started with Bilic’s AI Agent
          </h2>
          <p className="font-work_sans max-w-sm text-base text-secondary-500 opacity-75 dark:opacity-50 dark:text-copy-50">
            Going through the following guide will help you better understand
            how bilic works.
          </p>
        </div>
        {/* Start Welcome Grid Row*/}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,320px))] gap-6">
          {/* Start Grid Card*/}
          <div className="bg-white dark:bg-[#0f141f] overflow-hidden p-5 rounded-3xl border-[1px] border-[#F7F7F7] dark:border-[#151a25] dark:shadow-[0 1px 4px #080b1136]">
            <figure className="mb-5">
              <div className="bg-[#f9f9f8] dark:bg-[#0d121c] flex justify-center items-center py-6 px-4 rounded-2xl mb-5">
                <svg
                  width="226"
                  height="152"
                  viewBox="0 0 226 152"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="225.333"
                    height="151.017"
                    rx="18"
                    className="fill-white dark:fill-[#0f141f]"
                  />
                  <rect
                    x="20.1799"
                    y="17.6792"
                    width="83.1299"
                    height="98.71"
                    rx="17"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="122.51"
                    y="17.6792"
                    width="83.1299"
                    height="98.71"
                    rx="17"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="112.667"
                    cy="129.104"
                    r="7.19922"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="134.79"
                    cy="129.104"
                    r="3.91309"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="90.5439"
                    cy="129.104"
                    r="3.91309"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="75.4082"
                    cy="129.104"
                    r="2.31543"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="149.926"
                    cy="129.104"
                    r="2.31543"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                </svg>
              </div>
              <figcaption className="flex flex-col gap-1">
                <h5 className="font-work_sans capitalize text-base font-medium text-secondary-500 dark:text-copy-500 dark:opacity-60">
                  Create Agent
                </h5>
                <p className="font-work_sans text-sm text-secondary-500 dark:text-copy-500 dark:opacity-40 opacity-70">
                  AI conducts the video interview questions via video stream
                </p>
              </figcaption>
            </figure>
            <Link
              to="/new/bot"
              type="button"
              className="relative flex flex-shrink-0 justify-center items-center rounded-lg h-10 w-auto overflow-clip px-6 py-1 bg-secondary-500 dark:bg-transparent border-[1px] dark:border-[0.8px] border-[#404040] dark:border-copy-50 min-w-[160px] shadow-[0_1px_2px_0_rgb(5,8,2,0.48),0_0_0_1px_rgb(5,8,2,1.0)] dark:shadow-none dark:border-opacity-10"
            >
              <div className="absolute top-0 h-10 w-[120%] flex flex-shrink-0 justify-center items-center rounded-full bg-gradient-button from-[#ffffff40] via-[#ffffff00] to-[#050802]">
                <span className="text-copy-500 text-sm font-work_sans font-normal dark:text-copy-500  whitespace-nowrap dark:opacity-40">
                  Create Agent
                </span>
              </div>
            </Link>
            {/* <Link
              to="/new/bot"
              className="flex justify-center items-center border-secondary-100 dark:border-[#182032] border-[1.2px] text-secondary-400 w-full dark:text-[#74819f] dark:opacity-80 p-3 py-2 rounded-lg text-sm font-medium"
            >
              Create Bot
            </Link> */}
          </div>
          {/* End Grid Card*/}

          {/* Start Grid Card*/}
          <div className="bg-white dark:bg-[#0f141f] overflow-hidden p-5 rounded-3xl border-[1px] border-[#F7F7F7] dark:border-[#151a25] dark:shadow-[0 1px 4px #080b1136]">
            <figure className="mb-5">
              <div className="bg-[#f9f9f8] dark:bg-[#0d121c] flex justify-center items-center py-6 px-4 rounded-2xl mb-5">
                <svg
                  width="226"
                  height="152"
                  viewBox="0 0 226 152"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.333374"
                    width="225.333"
                    height="151.017"
                    rx="18"
                    className="fill-white dark:fill-[#0f141f]"
                  />
                  <rect
                    x="20.9974"
                    y="17.6792"
                    width="184.976"
                    height="8.77051"
                    rx="4.38525"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="46.3861"
                    y="35.0771"
                    width="127.432"
                    height="8.77051"
                    rx="4.38525"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="46.3861"
                    y="52.4746"
                    width="50.8965"
                    height="8.77051"
                    rx="4.38525"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="111.558"
                    y="52.4746"
                    width="62.2598"
                    height="8.77051"
                    rx="4.38525"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="113"
                    cy="129.104"
                    r="7.19922"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="135.123"
                    cy="129.104"
                    r="3.91309"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="90.8773"
                    cy="129.104"
                    r="3.91309"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="75.7416"
                    cy="129.104"
                    r="2.31543"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="150.259"
                    cy="129.104"
                    r="2.31543"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <path
                    d="M40.387 97.0251H53.94C54.2693 97.0251 54.5775 96.863 54.7641 96.5916L58.424 91.268C58.8722 90.616 59.8643 90.7182 60.1702 91.4478L64.4305 101.607C64.7753 102.429 65.9424 102.423 66.2788 101.597L74.3378 81.816C74.6881 80.9562 75.919 80.9963 76.2126 81.877L82.9118 101.975C83.1703 102.75 84.1992 102.905 84.6743 102.24L89.438 95.5704C89.8619 94.9769 90.7581 95.0222 91.12 95.6555L94.8515 102.186C95.2512 102.885 96.2714 102.849 96.6208 102.124L106.733 81.121C107.091 80.3773 108.145 80.3631 108.523 81.0968L114.461 92.6233C114.828 93.3365 115.844 93.3485 116.228 92.6442L122.597 80.9682C122.981 80.264 123.996 80.276 124.364 80.9891L130.381 92.669C130.743 93.3729 131.741 93.3962 132.136 92.7101L138.829 81.0855C139.244 80.3641 140.308 80.4363 140.622 81.2072L149.023 101.827C149.345 102.618 150.446 102.667 150.837 101.909L156.829 90.2998C157.001 89.9673 157.344 89.7585 157.718 89.7585H179.817"
                    className="stroke-[#F7F7F7] dark:stroke-[#111622]"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <figcaption className="flex flex-col gap-1">
                <h5 className="font-work_sans capitalize text-base font-medium text-secondary-500 dark:text-copy-500 dark:opacity-60">
                  Create Bot
                </h5>
                <p className="font-work_sans text-sm text-secondary-500 dark:text-copy-500 dark:opacity-40 opacity-70">
                  AI conducts the video interview questions via video stream
                </p>
              </figcaption>
            </figure>
            <Link
              to="/new/agent"
              className="flex justify-center items-center border-secondary-100 dark:border-[#182032] border-[1.2px] text-secondary-400 w-full dark:text-[#74819f] dark:opacity-80 p-3 py-2 rounded-lg text-sm font-medium"
            >
              Create Agent
            </Link>
          </div>
          {/* end Grid Card*/}

          {/* Start Grid Card*/}
          <div className="bg-white dark:bg-[#0f141f] overflow-hidden p-5 rounded-3xl border-[1px] border-[#F7F7F7] dark:border-[#151a25] dark:shadow-[0 1px 4px #080b1136]">
            <figure className="mb-5">
              <div className="bg-[#f9f9f8] dark:bg-[#0d121c] flex justify-center items-center py-6 px-4 rounded-2xl mb-5">
                <svg
                  width="226"
                  height="152"
                  viewBox="0 0 226 152"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.666626"
                    width="225.333"
                    height="151.017"
                    rx="18"
                    className="fill-white dark:fill-[#0f141f]"
                  />
                  <rect
                    x="19.566"
                    y="25.8652"
                    width="94.7422"
                    height="7.80225"
                    rx="3.90112"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="19.566"
                    y="40.6455"
                    width="195.107"
                    height="7.80225"
                    rx="3.90112"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="19.566"
                    y="55.4258"
                    width="119.804"
                    height="7.80225"
                    rx="3.90112"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="19.566"
                    y="71.6074"
                    width="119.804"
                    height="7.80225"
                    rx="3.90112"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="19.566"
                    y="87.7886"
                    width="119.804"
                    height="7.80225"
                    rx="3.90112"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="151.259"
                    y="55.4258"
                    width="63.4141"
                    height="7.80225"
                    rx="3.90112"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="123.34"
                    y="25.8652"
                    width="91.333"
                    height="7.80225"
                    rx="3.90112"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="113.333"
                    cy="129.104"
                    r="7.19922"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="135.457"
                    cy="129.104"
                    r="3.91309"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="91.2106"
                    cy="129.104"
                    r="3.91309"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="76.0748"
                    cy="129.104"
                    r="2.31543"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="150.592"
                    cy="129.104"
                    r="2.31543"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                </svg>
              </div>
              <figcaption className="flex flex-col gap-1">
                <h5 className="font-work_sans capitalize text-base font-medium text-secondary-500 dark:text-copy-500 dark:opacity-60">
                  Audio Interview
                </h5>
                <p className="font-work_sans text-sm text-secondary-500 dark:text-copy-500 dark:opacity-40 opacity-70">
                  AI conducts the video interview questions via video stream
                </p>
              </figcaption>
            </figure>
            <button className="flex justify-center items-center border-[1px] border-[#f0f0f0] dark:border-copy-50 dark:border-opacity-10 text-secondary-400 w-full dark:text-copy-500 p-3 py-2 rounded-lg text-sm font-normal dark:text-opacity-40">
              Audio Interview
            </button>
          </div>
          {/* end Grid Card*/}

          {/* Start Grid Card*/}
          <div className="bg-white dark:bg-[#0f141f] overflow-hidden p-5 rounded-3xl border-[1px] border-[#F7F7F7] dark:border-[#151a25] dark:shadow-[0 1px 4px #080b1136]">
            <figure className="mb-5">
              <div className="bg-[#f9f9f8] dark:bg-[#0d121c] flex justify-center items-center py-6 px-4 rounded-2xl mb-5">
                <svg
                  width="226"
                  height="152"
                  viewBox="0 0 226 152"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="225.333"
                    height="151.017"
                    rx="18"
                    className="fill-white dark:fill-[#0f141f]"
                  />
                  <rect
                    x="20.1799"
                    y="17.6792"
                    width="83.1299"
                    height="98.71"
                    rx="17"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <rect
                    x="122.51"
                    y="17.6792"
                    width="83.1299"
                    height="98.71"
                    rx="17"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="112.667"
                    cy="129.104"
                    r="7.19922"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="134.79"
                    cy="129.104"
                    r="3.91309"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="90.5439"
                    cy="129.104"
                    r="3.91309"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="75.4082"
                    cy="129.104"
                    r="2.31543"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                  <circle
                    cx="149.926"
                    cy="129.104"
                    r="2.31543"
                    className="fill-[#F7F7F7] dark:fill-[#111622]"
                  />
                </svg>
              </div>
              <figcaption className="flex flex-col gap-1">
                <h5 className="font-work_sans capitalize text-base font-medium text-secondary-500 dark:text-copy-500 dark:opacity-60">
                  Video Interview
                </h5>
                <p className="font-work_sans text-sm text-secondary-500 dark:text-copy-500 dark:opacity-40 opacity-70">
                  AI conducts the video interview questions via video stream
                </p>
              </figcaption>
            </figure>
            <Link
              to="/new/bot"
              className="flex justify-center items-center border-[1px] border-[#f0f0f0] dark:border-copy-50 dark:border-opacity-10 text-secondary-400 w-full dark:text-copy-500 p-3 py-2 rounded-lg text-sm font-normal dark:text-opacity-40"
            >
              Video Interview
            </Link>
          </div>
          {/* End Grid Card*/}
        </div>
        {/* end Welcome Grid Row*/}
        {/* <div className="ml-4 mt-2 flex-shrink-0 flex gap-3">
          <Link
            to="/new/bot"
            className="cursor-pointer relative inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create new bot
          </Link>
          <Link
            to="/new/agent"
            className="cursor-pointer relative inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create new agent
          </Link>
        </div> */}
      </div>
    </div>
  );
};
