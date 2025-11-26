import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Lista de daily logs");
});

router.post("/", (_req, res) => {
  res.send("Crear un daily log");
});

export default router;
