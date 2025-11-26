import express from "express";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Lista de proyectos");
});

router.post("/", (_req, res) => {
  res.send("Crear un proyecto");
});

export default router;
