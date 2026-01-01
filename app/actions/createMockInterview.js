"use server";

import { db } from "@/db/index";
import { MockInterview } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import main from "@/utils/gemineAPI";

export async function createMockInterview({
  jobPosition,
  jobDescription,
  yoe,
  email,
}) {
  const response = await main(
    `Job Position: ${jobPosition},
     Job Description: ${jobDescription},
     Years of Experience: ${yoe},
     Based on this, give me 5 interview questions with answers in JSON format.
     Use fields: question, answer`
  );
  console.log(response);
  if (!response) {
    throw new Error("AI response failed");
  }

  console.log("TYPE:", typeof response);
  console.log("IS ARRAY:", Array.isArray(response));
  console.log("STRINGIFIED:", JSON.stringify(response).slice(0, 100));

  // Insert into DB (SAFE)
  const mockId = uuidv4();
  const result = await db
    .insert(MockInterview)
    .values({
      mockId: mockId,
      jobPosition,
      jobDesc: jobDescription,
      jobExperience: String(yoe),
      jsonMockResp: JSON.stringify(response),
      createdBy: email,
      createdAt: new Date(),
    })
    .$returningId();

    console.log(mockId);

  return mockId;
}
