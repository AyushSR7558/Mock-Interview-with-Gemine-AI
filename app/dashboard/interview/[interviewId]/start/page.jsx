import { GetInterviewDetail } from "@/app/actions/getInterviewDetails";
import { Webcam } from "lucide-react";
import Page from "./clientSidePage"

const StartInterview= async ({params}) => {
  const { interviewId } = await params;

  const detail = await GetInterviewDetail(interviewId);

  return <Page detail={detail[0]} interviewId={interviewId} />;
}

export default StartInterview



