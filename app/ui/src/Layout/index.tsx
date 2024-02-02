import { Disclosure, Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../components/Common/Avatar";
import { ApplicationMenu } from "./ApplicationMenu";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { Spin } from "antd";
import { ApplicationSidebar } from "./ApplicationSidebar";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className={`bg-[#F9F9F8] text-neutral-700`}>
        <div className="flex h-screen w-screen">
          <ApplicationSidebar />
          <div className="h-full py-2 pr-2 flex-1">
            <div className="bg-white rounded-2xl w-full h-full p-4">
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
