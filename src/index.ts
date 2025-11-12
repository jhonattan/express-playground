import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.send("Hola Mundo con Express y TypeScript!");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
