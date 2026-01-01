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

  jobDesc: varchar("jobDesc", { length: 255 }).notNull(),

  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),

  createdBy: varchar("createdBy", { length: 255 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(), // ✅ FIXED

  mockId: varchar("mockId", { length: 255 }).notNull(),
});
