"use client";

import useSpeechToText from "react-hook-speech-to-text";
import { Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SpeechRecorder({ onStop, disabled }) {
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [localTranscript, setLocalTranscript] = useState("");
  const recordingRef = useRef(false);

  useEffect(() => {
    if (!recordingRef.current) return;

    const latestText = results
      .map((r) => r.transcript)
      .join(" ");

    setLocalTranscript(latestText);
  }, [results]);

  const handleClick = () => {
    if (isRecording) {
      stopSpeechToText();
      recordingRef.current = false;

      const finalText = localTranscript.trim();
      onStop(finalText);

      setLocalTranscript("");
    } else {
      setLocalTranscript("");
      recordingRef.current = true;
      startSpeechToText();
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`px-6 py-3 font-semibold rounded-md text-white transition
        ${
          isRecording
            ? "bg-red-600 hover:bg-red-700"
            : "bg-purple-600 hover:bg-purple-700"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
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
