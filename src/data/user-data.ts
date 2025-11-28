import { query } from "../db";

export async function getUserByEmail(email: string) {
  return (await query("SELECT * FROM users WHERE email = $1", [email])).rows[0];
}

export async function getUser(id: number) {
  return (await query("SELECT * FROM users WHERE id = $1", [id])).rows[0];
}

export async function createUser(
  email: string,
  hashedPassword: string,
  role: string
) {
  return (
    await query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, role]
    )
  ).rows[0];
}
