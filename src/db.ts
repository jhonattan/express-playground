import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cookie-auth",
  password: "1234",
  port: 5432,
});

export const query = (text: string, params?: (string | number | boolean)[]) => {
  return pool.query(text, params);
};
