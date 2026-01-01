import { db } from "@/db/index";
import { MockInterview } from "@/db/schema";
import { eq } from "drizzle-orm";

  export const GetInterviewDetail = async (params) => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params));
      console.log(result);

      return result;
  };