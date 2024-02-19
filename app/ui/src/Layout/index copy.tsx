import { Disclosure } from "@headlessui/react";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../components/Common/Avatar";
import { ApplicationMenu } from "./ApplicationMenu";
// import { ApplicationSidebar } from "./ApplicationSidebar";

//@ts-ignore
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
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
          <div className="hidden sm:block">{/* <ApplicationSidebar /> */}</div>
          <div className="h-full py-2 pr-2 flex-1">
            <div className="bg-white dark:bg-[#0b0f19] rounded-2xl w-full h-full border-[1px] border-[#f3f3f1] dark:border-[#151a25] overflow-y-scroll">
              <Disclosure as="nav" className="">
                {() => (
                  <>
                    <div className="mx-auto px-2 sm:px-6 lg:px-12 py-4">
                      <div className="flex justify-between">
                        <Link
                          to="/"
                          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 flex items-center mr-4"
                        >
                          {/* <img
                            className="h-8 w-auto"
                            src="https://www.bilic.io/favicon.ico"
                            alt="Dialoqbase"
                          /> */}
                          <span className="ml-1 text-base font-normal dark:text-white">
                            Agents Bilic
                          </span>
                          <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 ml-2">
                            {/* @ts-ignore */}
                            {`v${__APP_VERSION__}`}
                          </span>
                        </Link>
                        <div className=" ml-6 flex items-center gap-1">
                          <Link
                            to="/usage"
                            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 flex items-center px-3 dark:text-white"
                          >
                            <h1 className="text-slate-800 text-sm">Usage</h1>
                          </Link>
                          <Link
                            to="/pricing"
                            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 flex items-center px-3 dark:text-white"
                          >
                            <h1 className="text-slate-800 text-sm">Pricing</h1>
                          </Link>
                          <ApplicationMenu />
                        </div>
                      </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                      <div className="border-t border-gray-200 pt-4 pb-3">
                        <div className="flex items-center px-4">
                          <div className="flex-shrink-0">
                            <Avatar username={profile?.username || "admin"} />
                          </div>
                          <div className="ml-3">
                            <div className="text-base font-medium text-gray-800">
                              {profile?.username}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <Disclosure.Button
                            as={Link}
                            to="/settings"
                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                          >
                            Settings
                          </Disclosure.Button>
                          <Disclosure.Button
                            onClick={() => {
                              logout();
                              navigate("/login");
                            }}
                            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                          >
                            Sign out
                          </Disclosure.Button>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <>{children}</>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
