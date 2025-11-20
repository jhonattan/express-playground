import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "movielens",
  password: "1234",
  port: 5432,
});
