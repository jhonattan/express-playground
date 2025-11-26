import { query } from "../db";

export async function getUserByEmail(email: string) {
  return (await query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
}

export async function getUser(id: number) {
  return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}

export async function createUser(email: string, hashedPassword: string) {
  return (
    await query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword]
    )
  ).rows[0];
}
