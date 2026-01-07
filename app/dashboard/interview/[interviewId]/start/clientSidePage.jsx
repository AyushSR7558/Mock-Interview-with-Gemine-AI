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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndx={activeQuestionIndx}
          setActiveQuestionIndx={setActiveQuestionIndx}
        />

        <RecordAns
          question={mockInterviewQuestion[activeQuestionIndx]}
          questionIndex={activeQuestionIndx}
          answers={answers}
          setAnswers={setAnswers}
          interviewId={interviewId}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndx > 0 ? (
          <Button className="bg-purple-600" onClick={() => {setActiveQuestionIndx(activeQuestionIndx - 1)}}>Prev Question</Button>
        ) : null}
        {activeQuestionIndx != mockInterviewQuestion.length - 1 ? (
          <Button className="bg-purple-600" onClick={() => {setActiveQuestionIndx(activeQuestionIndx + 1)}}>Next Question</Button>
        ) : null}

        {activeQuestionIndx == mockInterviewQuestion.length - 1 ? (
         <Link href={"/dashboard/interview/" + interviewId + "/feedback"}> <Button>End Interview </Button></Link>
        ) : null}
      </div>
    </div>
  );
};

export default Page;
