import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Lista de ratings");
});

router.post("/", (_req, res) => {
  res.send("Crear un rating");
});

export default router;
