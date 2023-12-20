import { Link } from "react-router-dom";

export const DashboardNewBtn = () => {
  return (
    <div className="mb-3">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-end sm:flex-nowrap">
        <div className="ml-4 mt-2 flex-shrink-0">
          <Link
            to="/new"
            className="cursor-pointer relative inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Create new bot
          </Link>
        </div>
      </div>
    </div>
  );
};
