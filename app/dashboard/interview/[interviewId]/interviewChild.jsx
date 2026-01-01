"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Webcam from "react-webcam";

const InterviewChild = ({ detail }) => {
  const [enableWebCam, setEnableWebCam] = useState(false);
  console.log(detail)
  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <h2 className="font-bold text-2xl">Let's get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          {enableWebCam ? (
            <Webcam
              className="h-72 w-full border rounded-lg"
              onUserMedia={() => setEnableWebCam(true)}
              onUserMediaError={() => setEnableWebCam(false)}
            ></Webcam>
          ) : (
            <div>
              <WebcamIcon className="h-72 w-full my-7 p-10 bg-secondary rounded-lg border" />
              <Button variant="ghost" onClick={() => setEnableWebCam(true)}>
                Click to Turn on the Camera and microphone
              </Button>
            </div>
          )}
        </div>
        <div>
          <ul className="mt-5 border">
            <li className="p-1">
              {" "}
              <strong>Job Position:</strong> {detail.jobPosition}
            </li>
            <li className="p-1">
              <strong>Job Description:</strong> {detail.jobDesc}
            </li>
            <li className="p-1">
              <strong>Job Experiece:</strong>
              {detail.jobExperience}
            </li>
          </ul>
          <div className="my-2 border bg-yellow-100 items-center border-yellow-300">
            <h2 className="flex gap-2 items-center">
              <Lightbulb /><strong>Information</strong>
            </h2>
            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
      </div>
      <Link href={'/dashboard/interview/' + detail.mockId + '/start'}>
      <Button>Start Interview</Button>
      </Link>
    </div>
  );
};

export default InterviewChild;
