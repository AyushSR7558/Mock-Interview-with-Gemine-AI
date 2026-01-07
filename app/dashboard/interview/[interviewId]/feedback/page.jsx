import { db } from "@/db";
import { QuestioAndFeedBack } from "@/db/schema";
import { eq } from "drizzle-orm";
import CollapsibleComponent from "./__components/CollapsibleComponent";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FeedBackPage = async ({ params }) => {
  const { interviewId } = await params;

  const feedbacks = await db
    .select()
    .from(QuestioAndFeedBack)
    .where(eq(QuestioAndFeedBack.mockIdRef, interviewId))
    .orderBy(QuestioAndFeedBack.id);

  let avg = 0;
  feedbacks.forEach((item) => {
    avg += Number(item.rating);
  });

  avg /= feedbacks.length;


  return (
    <div className="p-10">
      <h1 className="text-3xl text-green-600 font-bold">Congratulations!</h1>

      <h2 className="font-bold text-2xl">Here is your Interview feedback</h2>

      <h2 className="text-purple-600 text-lg my-3">
        Overall Interview Rating <strong>{avg.toFixed(2)}</strong>
      </h2>

      <h2 className="text-sm text-gray-500 mb-6">
        Find below interview questions with correct answers and feedback
      </h2>

      {feedbacks.map((item) => (
        <CollapsibleComponent
          key={item.id}
          question={item.question}
          answer={item.correctAns}
          feedback={item.feedBack}
          myAns={item.userAns}
          rating={item.rating}
        />
      ))}
      <Link href={"/dashboard"}>
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default FeedBackPage;
