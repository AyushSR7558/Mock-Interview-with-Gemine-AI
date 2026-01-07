"use client";

import React, { useState } from "react";
import QuestionSection from "./_components/QuestionSection";
import RecordAns from "./_components/RecordAns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = ({ detail, interviewId }) => {
  const mockInterviewQuestion = JSON.parse(detail.jsonMockResp);

  const [activeQuestionIndx, setActiveQuestionIndx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [disableNavigation, setDisableNavigation] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndx={activeQuestionIndx}
          setActiveQuestionIndx={setActiveQuestionIndx}
          disableNavigation={disableNavigation}
        />

        <RecordAns
          question={mockInterviewQuestion[activeQuestionIndx]}
          questionIndex={activeQuestionIndx}
          answers={answers}
          setAnswers={setAnswers}
          interviewId={interviewId}
          disableNavigation={disableNavigation}
          setDisableNavigation={setDisableNavigation}
        />
      </div>

      <div className="flex justify-end gap-6 mt-6">
        {activeQuestionIndx > 0 && (
          <Button
            disabled={disableNavigation}
            onClick={() => setActiveQuestionIndx((p) => p - 1)}
          >
            Prev Question
          </Button>
        )}

        {activeQuestionIndx < mockInterviewQuestion.length - 1 && (
          <Button
            disabled={disableNavigation}
            onClick={() => setActiveQuestionIndx((p) => p + 1)}
          >
            Next Question
          </Button>
        )}

        {activeQuestionIndx === mockInterviewQuestion.length - 1 && (
          <Link href={`/dashboard/interview/${interviewId}/feedback`}>
            <Button disabled={disableNavigation}>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Page;
