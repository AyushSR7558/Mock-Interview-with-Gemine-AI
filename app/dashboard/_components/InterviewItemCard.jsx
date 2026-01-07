import React from "react";

const InterviewItemCard = (item) => {
    console.log(item)
  return (
    <div className="m-2 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {item.jobPosition}
        </h3>

        {item.jobExperience && (
          <p className="text-sm text-gray-600">
            Experience:{" "}
            <span className="font-medium text-gray-800">
              {item.jobExperience}
            </span>
          </p>
        )}

        {item.Desc && (
          <p className="text-sm text-gray-700 line-clamp-3">
            {item.Desc}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t text-xs text-gray-500">
          <span>
            Created on:{" "}
            {item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "—"}
          </span>

          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
            Interview
          </span>
        </div>
      </div>
    </div>
  );
};

export default InterviewItemCard;
