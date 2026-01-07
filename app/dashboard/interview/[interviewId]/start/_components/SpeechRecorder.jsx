"use client";

import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Square } from "lucide-react";

export default function SpeechRecorder({ onStop }) {
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const handleClick = () => {
    if (isRecording) {
      stopSpeechToText();
      const text = results.map((r) => r.transcript).join(" ");
      onStop(text);
    } else {
      startSpeechToText();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-3 font-semibold rounded-md text-white ${
        isRecording ? "bg-red-600" : "bg-purple-600"
      }`}
    >
      {isRecording ? (
        <>
          <Square className="w-4 h-4 mr-2 inline" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic className="w-4 h-4 mr-2 inline" />
          Record Answer
        </>
      )}
    </button>
  );
}
