import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./db/schema.js",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.dev_host,
    user: process.env.dev_user,
    password: process.env.dev_pass,
    database: process.env.dev_db,
  },
});
