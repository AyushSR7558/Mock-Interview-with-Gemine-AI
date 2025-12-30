import mysql from "mysql2/promise";
import * as schema from "./schema";

const pool = mysql.createPool({
  host: process.env.dev_host,
  user: process.env.dev_user,
  password: process.env.dev_pass,
  database: process.env.dev_db,
});

export const db = drizzle(pool,{schema});
