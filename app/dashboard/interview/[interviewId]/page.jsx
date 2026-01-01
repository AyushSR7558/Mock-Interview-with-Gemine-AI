import { GetInterviewDetail } from "@/app/actions/getInterviewDetails";
import { Webcam } from "lucide-react";
import InterviewChild from "./interviewChild";

const InterviewPage = async ({ params }) => {
  const { interviewId } = await params;

  const detail = await GetInterviewDetail(interviewId);
  return <InterviewChild detail={detail[0]} />;
};

export default InterviewPage;
