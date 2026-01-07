"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const CollapsibleComponent = ({
  question,
  answer,
  feedback,
  myAns,
  rating,
}) => {
  return (
    <Collapsible className="group mb-5 rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      
      <CollapsibleTrigger
        className="
          flex w-full items-center justify-between 
          px-5 py-4 text-left font-semibold 
          text-gray-800 hover:text-purple-600
          transition
        "
      >
        <span>{question}</span>
        <span className="text-sm text-gray-400 group-data-[state=open]:rotate-180 transition">
          ▼
        </span>
      </CollapsibleTrigger>

      <CollapsibleContent
        className="
          px-5 pb-5 space-y-3 
          text-sm text-gray-700
          animate-in fade-in slide-in-from-top-1
        "
      >
        <p className="rounded-md bg-green-50 p-3 text-green-700">
          <strong>Correct Answer:</strong> {answer}
        </p>

        <p className="rounded-md bg-blue-50 p-3 text-blue-700">
          <strong>Feedback:</strong> {feedback}
        </p>

        <p className="rounded-md bg-gray-50 p-3">
          <strong>My Answer:</strong>{" "}
          <span className={myAns ? "text-gray-800" : "italic text-gray-400"}>
            {myAns === "" ? "Not Answered" : myAns}
          </span>
        </p>

        <div className="flex items-center justify-between rounded-md bg-purple-50 p-3">
          <span className="font-semibold text-purple-700">Rating</span>

          <span
            className={`
              rounded-full px-3 py-1 text-sm font-semibold
              ${
                rating
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }
            `}
          >
            {rating === "" ? "No Rating" : rating + "/10"}
          </span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleComponent;
