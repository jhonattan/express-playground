import express from "express";
const router = express.Router();

type User = {
  user: string;
  password: number;
};

router.get("/", (req, res) => {
  const body: User = req.body;
  console.log(body);

  if (!body.user) {
    res.status(400).send("El campo user es obligatorio");
    return;
  }

  res.send("Lista de usuarios");
});

router.post("/", (_req, res) => {
  res.send("Crear un usuario");
});

export default router;
