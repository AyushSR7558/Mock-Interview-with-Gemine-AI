import { db } from "@/db";
import { MockInterview } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";
import Link from "next/link";

const InterviewList = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="text-sm text-gray-500">
        Please sign in to view interviews.
      </div>
    );
  }

  const email = user.primaryEmailAddress?.emailAddress;

  if (!email) {
    return null;
  }

  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, email))
    .orderBy(desc(MockInterview.id));

  console.log(result);
  if(result.length == 0) return null;
  return (
    <div className="my-5">
      <h2 className="font-xl text-lg mb-4">Previous Interview List:</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {result.map((item, indx) => (
          <Link href={"/dashboard/interview/" + item.mockId + "/feedback"} key={indx}>
          <InterviewItemCard {...item}  /></Link>
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
