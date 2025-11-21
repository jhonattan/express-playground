import express, { RequestHandler, ErrorRequestHandler } from "express";
import { pool } from "./db";
//import { nextTick } from "process";

const app = express();
const port = 3000;

const handler1: RequestHandler = (_req, _res, next) => {
  console.log("Primer handler");
  next("route");
};

const handler2: RequestHandler = (_req, _res, next) => {
  console.log("Segundo handler");
  next();
};

const handler3: RequestHandler = (_req, res) => {
  console.log("Tercer handler");
  res.send("Finaliza el ciclo solicitud-respuesta");
};

app.get("/users", async (_req, res, next) => {
  try {
    const result = await pool.query("SELECT id FROM users limit 1;");
    res.status(201).json(result.rows);
  } catch (err) {
    next(err);

    // console.error(err);
    // res.status(500).json({ message: "Error fetching users" });
  }
});

app.get("/", handler1, handler2);
app.get("/", handler3);

app.get("/error", (_req, _res, next) => {
  const error = new Error("This is a test error!");
  next(error); // Pass error to error handler
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Algo salio mal");
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
