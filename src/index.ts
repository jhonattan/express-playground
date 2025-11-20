import express from "express";
import { pool } from "./db";

const app = express();
const port = 3000;

app.get("/users", async (_req, res) => {
  try {
    const result = await pool.query("SELECT id FROM users limit 1;");
    res.status(201).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// app.get("/users/:userId", (req, res) => {
//   const userId = req.params.userId;

//   //go to BD and get user data with userId

//   console.log(`${req.method} ${req.url}`);
//   res.json("Hola Mundo con Express y TypeScript!");
// });

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
