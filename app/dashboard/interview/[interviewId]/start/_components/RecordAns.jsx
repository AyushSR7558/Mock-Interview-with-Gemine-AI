"use client";

import createQuestionIntoDB from "@/app/actions/createQuestionIntoDB";
import main from "@/utils/gemineAPI";
import { WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useState } from "react";

const SpeechRecorder = dynamic(() => import("./SpeechRecorder"), {
  ssr: false,
});

const RecordAns = ({
  question,
  questionIndex,
  answers,
  setAnswers,
  interviewId,
}) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [saving, setSaving] = useState(false);

  const handleStopRecording = async (text) => {
    if (!text) return;

    setSaving(true);
    setCurrentAnswer(text);

    // ✅ Save in local state
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: text,
    }));

    try {
      const feedBackPrompt = `
Question: ${question.question}
User Answer: ${text}
Give rating and feedback in JSON with fields:
rating, feedback (3–5 lines). Remember it should be in the ans should be in JSON
`;

      console.log("Main Function of Gemini ap feedback started")

      const res = await main(feedBackPrompt);
      

      await createQuestionIntoDB({
        interviewId,
        question: question.question,
        correctAns: question.answer,
        userAns: text,
        feedBack: res.feedback,
        rating: res.rating,
        createdBy: "test-user@gmail.com", // replace with auth later
      });

      toast.success("Answer saved successfully");
    } catch (err) {
      toast.error("Failed to save answer");
      console.error(err);
    } finally {
      currentAnswer("");
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="relative w-full max-w-md rounded-2xl border bg-white shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <WebcamIcon className="text-gray-200 w-32 h-32" />
        </div>
        <Webcam mirrored className="relative z-10 w-full h-[280px]" />
      </div>

      <SpeechRecorder onStop={handleStopRecording} />

      <div className="w-full max-w-md p-4 border rounded-lg bg-muted">
        <h3 className="font-semibold mb-2">Your Answer</h3>
        <p className="text-sm whitespace-pre-wrap">
          {answers[questionIndex] || currentAnswer || "No answer yet"}
        </p>
      </div>

      {saving && (
        <p className="text-sm text-muted-foreground">Saving answer...</p>
      )}
    </div>
  );
};

export default RecordAns;
