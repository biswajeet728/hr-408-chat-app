import "dotenv/config";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";

// routes
import authRoute from "./routes/auth.route.js";
import messagesRoute from "./routes/message.route.js";
import path from "path";

const PORT = process.env.PORT;
const __dirname = path.resolve();

// db connect
connectDatabase();

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route

app.get("/test", (req, res) => {
  res.send("Hello from express");
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messagesRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}

// error handler
app.use(errorMiddleware);

server.listen(PORT || 5000, async () => {
  console.log("Server is running on port " + PORT);
});

export default app;
