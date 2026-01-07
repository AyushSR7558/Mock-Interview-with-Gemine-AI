"use client";

import { Lightbulb } from "lucide-react";

const QuestionSection = ({
  mockInterviewQuestion,
  activeQuestionIndx,
  setActiveQuestionIndx,
}) => {
  if (!mockInterviewQuestion?.length) return null;

  return (
    <div className="p-6 m-2 border rounded-xl bg-background shadow-sm">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {mockInterviewQuestion.map((_, indx) => (
          <button
            key={indx}
            onClick={() => setActiveQuestionIndx(indx)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all
              ${
                activeQuestionIndx === indx
                  ? "bg-purple-600 text-white scale-105"
                  : "bg-secondary hover:bg-purple-100"
              }`}
          >
            Question {indx + 1}
          </button>
        ))}
      </div>

      <div className="mt-6 p-5 min-h-[10rem] rounded-lg bg-muted">
        {mockInterviewQuestion[activeQuestionIndx].question}
      </div>

      <div className="mt-10 border border-blue-200 rounded-lg p-5 bg-blue-50">
        <h2 className="flex gap-2 items-center text-blue-700 font-semibold">
          <Lightbulb className="h-5 w-5" />
          Note
        </h2>
        <p className="mt-2 pl-7 text-blue-800 text-sm">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </p>
      </div>
    </div>
  );
};

export default QuestionSection;
