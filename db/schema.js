import {
  mysqlTable,
  int,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const MockInterview = mysqlTable("mockInterview", {
  id: int("id").primaryKey().autoincrement(),

  jsonMockResp: text("jsonMockResp").notNull(),

  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),

  jobDesc: text("jobDesc").notNull(),

  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),

  createdBy: varchar("createdBy", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(), // ✅ FIXED

  mockId: varchar("mockId", { length: 255 }).notNull(),
});

export const QuestioAndFeedBack = mysqlTable("questionAndFeedBack", {
  id: int("id").primaryKey().autoincrement(),
  mockIdRef: varchar("mockId", { length: 255 }).notNull(),
  question: text("question").notNull(),
  correctAns: text("correctAns").notNull(),
  userAns: text("userAns").notNull(),
  feedBack: text("feedBack"),
  rating: varchar("rating", { length: 2 }),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});
