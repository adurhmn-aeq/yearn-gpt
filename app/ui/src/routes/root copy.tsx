import React from "react";
import { DashboardGrid } from "../components/Dashboard/DashboardGrid";
import { DashboardNewBtn } from "../components/Dashboard/DashboardNewBtn";
import { useMessage } from "../hooks/useMessage";

export default function Root() {
  const { setMessages, setHistory, setIsFirstMessage, setHistoryId } =
    useMessage();

  React.useEffect(() => {
    setHistoryId(null);
    setIsFirstMessage(true);
    setMessages([]);
    setHistory([]);
  }, []);

  return (
    <div className="mx-auto py-4 px-3 sm:px-6 lg:px-4">
      {/* Create Bot Button */}
      <DashboardNewBtn />
      <DashboardGrid />
    </div>
  );
}
