"use client";

import createQuestionIntoDB from "@/app/actions/createQuestionIntoDB";
import main from "@/utils/gemineAPI";
import { WebcamIcon, Loader2 } from "lucide-react";
import Webcam from "react-webcam";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

const SpeechRecorder = dynamic(() => import("./SpeechRecorder"), {
  ssr: false,
});

const RecordAns = ({
  question,
  questionIndex,
  answers,
  setAnswers,
  interviewId,
  disableNavigation,
  setDisableNavigation,
}) => {
  const [saving, setSaving] = useState(false);
  const { user, isLoaded } = useUser();

  const handleStopRecording = async (text) => {
    if (!isLoaded || !user) {
      toast.error("User not authenticated");
      return;
    }

    if (!text?.trim()) {
      toast.error("Empty answer not allowed");
      return;
    }
    // 🔒 Freeze index at stop time
    const lockedIndex = questionIndex;
    const lockedQuestion = question.question;

    const userEmail = user.primaryEmailAddress?.emailAddress;

    setSaving(true);
    setDisableNavigation(true);

    // ✅ Save answer locally using locked index
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: text,
    }));

    try {
      const feedBackPrompt = `
      Question: ${lockedQuestion}
      User Answer: ${text}

      Return ONLY valid JSON:
      {
        "rating": number (1-5),
        "feedback": "3 to 5 lines of feedback"
      }
      `;

      const res = await main(feedBackPrompt);

      await createQuestionIntoDB({
        interviewId,
        question: lockedQuestion,
        correctAns: question.answer,
        userAns: text,
        feedBack: res.feedback,
        rating: res.rating,
        createdBy: userEmail,
      });

      toast.success(`Answer saved for Question ${lockedIndex + 1}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save answer");
    } finally {
      setSaving(false);
      setDisableNavigation(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Webcam */}
      <div className="relative w-full max-w-md rounded-2xl border bg-white shadow-md overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <WebcamIcon className="text-gray-200 w-28 h-28" />
        </div>
        <Webcam mirrored className="relative z-10 w-full h-[280px]" />
      </div>

      <SpeechRecorder onStop={handleStopRecording} disabled={saving} />

      {/* Preview */}
      <div className="w-full max-w-md p-4 border rounded-xl bg-gray-50">
        <h3 className="font-semibold text-sm mb-2">Your Answer</h3>
        <p className="text-sm min-h-[60px] whitespace-pre-wrap">
          {answers[questionIndex] || "No answer yet"}
        </p>
      </div>

      {saving && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin" />
          Saving answer...
        </div>
      )}
    </div>
  );
};

export default RecordAns;
