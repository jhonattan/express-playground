import session from "express-session";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
  })
);
