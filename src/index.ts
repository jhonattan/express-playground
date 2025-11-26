import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import session from "express-session";
import connect from "connect-pg-simple";
import { pool } from "./db";
import { createUser, getUser, getUserByEmail } from "./data/user-data";

const app = express();
const port = 5500;

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

const pgSession = connect(session);

const sessionMiddleware = session({
  store: new pgSession({
    pool: pool,
  }),
  secret: "session-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 10000 },
});

app.use(cookieParser()); // Poblar req.cookies con objetos de cookies
app.use(express.json()); // Transformar req.body a JSON

// Arreglo de usuarios en memoria:
// El id será un string ya que usaremos 'crypto.randomUUID()' para generarlo
//const users: { id: string; email: string; password: string }[] = [];

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  //const user = users.find((u) => u.email === email);
  const user = await getUserByEmail(email);

  if (user) {
    res.status(400).send("El correo ya está registrado");
    return;
  }

  const costFactor = 10; // Cost factor
  const hashedPassword = await bcrypt.hash(password, costFactor);

  // const newUser = {
  //   id: crypto.randomUUID(),
  //   email,
  //   password: hashedPassword,
  // };

  //users.push(newUser);

  const newUser = await createUser(email, hashedPassword);

  res.status(201).json(newUser);
});

app.post("/login", sessionMiddleware, async (req, res) => {
  const { email, password } = req.body;
  //const user = users.find((u) => u.email === email);

  const user = await getUserByEmail(email);

  if (!user) {
    res.status(401).send("Credenciales incorrectas");
    return;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    // Guardamos el id del usuario en la sesión
    req.session.userId = user.id;
    res.send("Login exitoso");
  } else {
    res.status(401).send("Credenciales incorrectas");
  }
});

app.get("/user", sessionMiddleware, async (req, res) => {
  // leemos el id del usuario desde la sesión
  const userId = req.session.userId;

  //const user = users.find((u) => u.id === userId);

  if (!userId) {
    res.status(403).send("Acceso denegado");
    return;
  }

  const user = await getUser(Number(userId));

  if (user) {
    res.json(user);
  } else {
    res.status(403).send("Acceso denegado");
  }
});

app.post("/logout", sessionMiddleware, (req, res) => {
  // Borramos la sesión del lado del servidor
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al cerrar sesión");
      return;
    }
    // Opcionalmente, borramos la sesión del lado del cliente también
    res.clearCookie("connect.sid");
    res.send("Logout exitoso");
  });
});

app.listen(port, () => console.log(`Escuchando al puerto ${port}`));
