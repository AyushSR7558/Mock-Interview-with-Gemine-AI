"use server";

import { db } from "@/db";
import { QuestioAndFeedBack } from "@/db/schema";

const createQuestionIntoDB = async ({
  interviewId,
  question,
  correctAns,
  userAns,
  feedBack,
  rating,
  createdBy,
}) => {
  try {
    await db.insert(QuestioAndFeedBack).values({
      mockIdRef: interviewId,
      question,
      correctAns,
      userAns,
      feedBack,
      rating: String(rating),
      createdBy,
    });

    return { success: true };
  } catch (error) {
    console.error("Error inserting question:", error);
    return { success: false };
  }
};

export default createQuestionIntoDB;
