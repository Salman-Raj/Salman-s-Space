import React from "react";
import { useIssues } from "../context/IssueContext";
import { IssueType } from "../types";

const FilterBar: React.FC = () => {
  const { statusFilter, setStatusFilter, typeFilter, setTypeFilter } =
    useIssues();

  const issueTypes: (IssueType | "All")[] = [
    "All",
    "Common",
    "Frontend",
    "Backend",
    "QA",
  ];

  const getTypeColor = (type: IssueType | "All") => {
    switch (type) {
      case "Frontend":
        return "bg-blue-100 text-blue-800";
    case "Backend":
        return "bg-purple-100 text-purple-800";
      case "QA":
        return "bg-amber-100 text-amber-800";
      case "Common":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white shadow-sm mb-4 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
          {/* Status Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setStatusFilter("All")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border focus:z-10 focus:ring-2 focus:ring-indigo-500 ${
                  statusFilter === "All"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("Pending")}
                className={`px-4 py-2 text-sm font-medium border-t border-b focus:z-10 focus:ring-2 focus:ring-indigo-500 ${
                  statusFilter === "Pending"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("Resolved")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border focus:z-10 focus:ring-2 focus:ring-indigo-500 ${
                  statusFilter === "Resolved"
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                Resolved
              </button>
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Type:
            </span>
            {issueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                  typeFilter === type
                    ? `${getTypeColor(type)} ring-2 ring-offset-1 ring-${
                        type === "All" ? "gray" : type.toLowerCase()
                      }-400`
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
